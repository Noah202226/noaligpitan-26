import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createGroq } from "@ai-sdk/groq";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  UIMessage,
  UIMessageChunk,
} from "ai";
import { getAiKnowledgeBase } from "@/app/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────
type ProviderKey = "groq" | "google" | "openrouter" | "cerebras" | "mistral";

interface ModelConfig {
  provider: ProviderKey;
  modelId: string;
  label: string;
}

interface ProviderFailure {
  model: string;
  provider: ProviderKey;
  code: string;
  reason: string;
}

interface ClassifiedError {
  code: string;
  userMessage: string;
  cooldownMs: number;
  shouldFallback: boolean;
}

// ─── Free-Tier Multi-Provider Fallback Chain ──────────────────────────────────
// Ordered by speed & free-tier generosity. Unconfigured providers are skipped
// automatically, so you only need keys for the providers you want to enable.
const MODEL_CHAIN: ModelConfig[] = [
  // 1. Groq — ultra-fast, generous free tier (no credit card)
  {
    provider: "groq",
    modelId: "qwen/qwen3.8-27b",
    label: "Groq Qwen 3.8 27B",
  },
  {
    provider: "groq",
    modelId: "openai/gpt-oss-20b",
    label: "Groq GPT-OSS 20B",
  },
  {
    provider: "groq",
    modelId: "openai/gpt-oss-120b",
    label: "Groq GPT-OSS 120B",
  },

  // 2. Google AI Studio (Gemini) — generous free tier (no credit card)
  {
    provider: "google",
    modelId: "gemini-2.5-flash-lite",
    label: "Gemini 2.5 Flash-Lite",
  },
  {
    provider: "google",
    modelId: "gemini-2.5-flash",
    label: "Gemini 2.5 Flash",
  },

  // 3. OpenRouter — automatic $0 free-model router (no credit card)
  {
    provider: "openrouter",
    modelId: "openrouter/free",
    label: "OpenRouter Free",
  },

  // 4. Cerebras — ultra-fast open-weight inference
  {
    provider: "cerebras",
    modelId: "gpt-oss-120b",
    label: "Cerebras GPT-OSS 120B",
  },

  // 5. Mistral (La Plateforme) — free experiment tier (no credit card)
  {
    provider: "mistral",
    modelId: "mistral-small-latest",
    label: "Mistral Small",
  },
];

// HTTP headers must be ISO-8859-1 (ASCII-safe) ByteStrings
function toSafeHeaderValue(value: string): string {
  return value.replace(/[^\x20-\x7E]/g, "-");
}

// ─── In-memory rate limit tracker ────────────────────────────────────────────
const blockedUntil: Record<string, { until: number; reason: string; code: string }> = {};

function getModelKey(config: ModelConfig): string {
  return `${config.provider}:${config.modelId}`;
}

function getBlockedInfo(modelKey: string) {
  const entry = blockedUntil[modelKey];
  if (!entry) return null;
  if (Date.now() > entry.until) {
    delete blockedUntil[modelKey];
    return null;
  }
  return entry;
}

function blockModel(
  modelKey: string,
  reason: string,
  code: string,
  ms = 5 * 60 * 1000,
) {
  blockedUntil[modelKey] = { until: Date.now() + ms, reason, code };
  console.warn(`[chat] Blocked model "${modelKey}" for ${ms / 1000}s (${code}: ${reason})`);
}

// ─── Error Classification ─────────────────────────────────────────────────────
function classifyProviderError(err: unknown): ClassifiedError {
  const e = err as {
    message?: string;
    name?: string;
    status?: number;
    statusCode?: number;
    data?: { error?: { code?: string; message?: string } };
  };

  const status = e?.status ?? e?.statusCode;
  const rawMessage = (e?.data?.error?.message || e?.message || "").toLowerCase();
  const providerCode = (e?.data?.error?.code || "").toLowerCase();

  if (rawMessage.includes("missing_api_key")) {
    return {
      code: "MISSING_API_KEY",
      userMessage: "Provider API key is not configured on the server.",
      cooldownMs: 30 * 60 * 1000,
      shouldFallback: true,
    };
  }

  if (
    status === 404 ||
    providerCode === "model_not_found" ||
    rawMessage.includes("does not exist") ||
    rawMessage.includes("not found")
  ) {
    return {
      code: "MODEL_NOT_FOUND",
      userMessage: "Model does not exist or access is unavailable (404).",
      cooldownMs: 30 * 60 * 1000,
      shouldFallback: true,
    };
  }

  if (status === 401 || status === 403 || rawMessage.includes("unauthorized") || rawMessage.includes("invalid api key")) {
    return {
      code: "AUTH_ERROR",
      userMessage: "Provider authentication failed (401/403).",
      cooldownMs: 30 * 60 * 1000,
      shouldFallback: true,
    };
  }

  if (
    status === 429 ||
    rawMessage.includes("quota") ||
    rawMessage.includes("rate limit") ||
    rawMessage.includes("too many requests")
  ) {
    return {
      code: "QUOTA_EXCEEDED",
      userMessage: "Provider rate limit or quota reached (429).",
      cooldownMs: 5 * 60 * 1000,
      shouldFallback: true,
    };
  }

  if (status === 503 || status === 529 || rawMessage.includes("overloaded")) {
    return {
      code: "OVERLOADED",
      userMessage: "Provider is temporarily overloaded (503).",
      cooldownMs: 5 * 60 * 1000,
      shouldFallback: true,
    };
  }

  if (e?.name === "TimeoutError" || e?.name === "AbortError" || rawMessage.includes("timed out") || rawMessage.includes("aborted")) {
    return {
      code: "TIMEOUT",
      userMessage: "Provider took too long to respond (timeout).",
      cooldownMs: 2 * 60 * 1000,
      shouldFallback: true,
    };
  }

  if (status === 400) {
    return {
      code: "BAD_REQUEST",
      userMessage: "Invalid request sent to the AI provider (400).",
      cooldownMs: 0,
      shouldFallback: false,
    };
  }

  const fallbackDetail = e?.message
    ? e.message.replace(/\s+/g, " ").slice(0, 140)
    : "";

  return {
    code: "PROVIDER_ERROR",
    userMessage: status
      ? `Provider returned an unexpected error (${status}).`
      : fallbackDetail
        ? `Provider error: ${fallbackDetail}`
        : "Provider failed to generate a response.",
    cooldownMs: 2 * 60 * 1000,
    shouldFallback: true,
  };
}

// ─── Per-IP throttle ──────────────────────────────────────────────────────────
const ipMap = new Map<string, { count: number; resetAt: number }>();
const MAX_PER_IP = 25;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkIp(ip: string): boolean {
  const now = Date.now();
  const entry = ipMap.get(ip);
  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_PER_IP) return false;
  entry.count++;
  return true;
}

// ─── Provider API Key Lookup ──────────────────────────────────────────────────
function getProviderApiKey(provider: ProviderKey): string | undefined {
  switch (provider) {
    case "groq":
      return process.env.GROQ_API_KEY?.trim() || undefined;
    case "google":
      return process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim() || undefined;
    case "openrouter":
      return process.env.OPENROUTER_API_KEY?.trim() || undefined;
    case "cerebras":
      return process.env.CEREBRAS_API_KEY?.trim() || undefined;
    case "mistral":
      return process.env.MISTRAL_API_KEY?.trim() || undefined;
  }
}

// ─── Build model instance ─────────────────────────────────────────────────────
function buildModel(config: ModelConfig) {
  const apiKey = getProviderApiKey(config.provider);

  if (!apiKey) {
    throw new Error(`MISSING_API_KEY_FOR_${config.provider.toUpperCase()}`);
  }

  switch (config.provider) {
    case "groq":
      return createGroq({ apiKey })(config.modelId);
    case "google":
      return createGoogleGenerativeAI({ apiKey })(config.modelId);
    case "openrouter":
      return createOpenAI({
        apiKey,
        baseURL: "https://openrouter.ai/api/v1",
        headers: {
          "HTTP-Referer":
            process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
          "X-Title": "Noa Ligpitan Portfolio",
        },
      }).chat(config.modelId);
    case "cerebras":
      return createOpenAI({
        apiKey,
        baseURL: "https://api.cerebras.ai/v1",
      }).chat(config.modelId);
    case "mistral":
      return createOpenAI({
        apiKey,
        baseURL: "https://api.mistral.ai/v1",
      }).chat(config.modelId);
    default:
      throw new Error(`Unknown provider: ${config.provider}`);
  }
}

// ─── Preflight Stream Helper ──────────────────────────────────────────────────
// streamText() is lazy and does not reject until chunks are pulled.
// Pulling chunks up to the first real output lets us catch provider errors
// (like 404 model_not_found or 429 quota) BEFORE committing an HTTP 200 stream.
async function startVerifiedStream(
  config: ModelConfig,
  systemPrompt: string,
  coreMessages: Awaited<ReturnType<typeof convertToModelMessages>>,
): Promise<ReadableStream<UIMessageChunk>> {
  const model = buildModel(config);

  let capturedStreamError: unknown = null;
  let hasCommittedOutput = false;

  const result = streamText({
    model,
    system: systemPrompt,
    messages: coreMessages,
    maxRetries: 0,
    abortSignal: AbortSignal.timeout(15_000),
    onError: ({ error }) => {
      capturedStreamError = error;
    },
  });

  const uiStream = result.toUIMessageStream({
    onError: (err) => {
      capturedStreamError = err;
      const classified = classifyProviderError(err);
      return JSON.stringify({
        code: classified.code,
        error: classified.userMessage,
        details: [
          {
            model: config.label,
            provider: config.provider,
            code: classified.code,
            reason: classified.userMessage,
          },
        ],
      });
    },
  });

  const reader = uiStream.getReader();
  const buffered: UIMessageChunk[] = [];

  try {
    while (true) {
      const { value, done } = await reader.read();

      if (capturedStreamError) {
        await reader.cancel().catch(() => {});
        throw capturedStreamError;
      }

      if (done) {
        if (!hasCommittedOutput) {
          throw new Error("EMPTY_STREAM: Provider returned an empty response.");
        }
        break;
      }

      if (value.type === "error") {
        await reader.cancel().catch(() => {});
        throw capturedStreamError ?? new Error(value.errorText || "Provider stream error");
      }

      buffered.push(value);

      // First actual output chunk confirms the provider accepted the request
      if (
        value.type === "text-delta" ||
        value.type === "reasoning-delta" ||
        value.type === "tool-input-start" ||
        value.type === "tool-input-available" ||
        value.type === "finish"
      ) {
        hasCommittedOutput = true;
        break;
      }
    }
  } catch (err) {
    await reader.cancel().catch(() => {});
    throw err;
  }

  return new ReadableStream<UIMessageChunk>({
    start(controller) {
      for (const chunk of buffered) {
        controller.enqueue(chunk);
      }
    },
    async pull(controller) {
      try {
        const { value, done } = await reader.read();
        if (done) {
          controller.close();
        } else {
          controller.enqueue(value);
        }
      } catch (err) {
        controller.error(err);
      }
    },
    async cancel(reason) {
      await reader.cancel(reason).catch(() => {});
    },
  });
}

// ─── Main Handler ─────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    // IP guard
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!checkIp(ip)) {
      return Response.json(
        {
          code: "RATE_LIMIT",
          error:
            "Hourly message limit reached (25 messages/hour). Please try again later.",
        },
        { status: 429 },
      );
    }

    const { messages }: { messages: UIMessage[] } = await req.json();
    const coreMessages = await convertToModelMessages(messages);

    // Using verified data from resume
    const systemPrompt = `You are an expert AI representative for Noa V. Ligpitan. 
Role: Full-Stack Developer with 4 years of experience.
Knowledge Base: ${getAiKnowledgeBase()}
Keep responses concise and scannable.`;

    const configuredChain = MODEL_CHAIN.filter((config) =>
      Boolean(getProviderApiKey(config.provider)),
    );

    if (configuredChain.length === 0) {
      return Response.json(
        {
          code: "MISSING_API_KEY",
          error:
            "No AI provider API keys are configured. Add at least one key (GROQ_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY, OPENROUTER_API_KEY, CEREBRAS_API_KEY, or MISTRAL_API_KEY) to .env.local.",
        },
        { status: 503 },
      );
    }

    const failedAttempts: ProviderFailure[] = [];

    // ── Try each configured model in the chain ───────────────────────────────
    for (const config of configuredChain) {
      const modelKey = getModelKey(config);
      const blocked = getBlockedInfo(modelKey);
      if (blocked) {
        console.log(`[chat] Skipping blocked model: ${config.label}`);
        failedAttempts.push({
          model: config.label,
          provider: config.provider,
          code: blocked.code,
          reason: `${blocked.reason} (temporarily bypassed)`,
        });
        continue;
      }

      try {
        console.log(`[chat] Trying model: ${config.label}`);
        const verifiedStream = await startVerifiedStream(
          config,
          systemPrompt,
          coreMessages,
        );

        const headers: Record<string, string> = {
          "X-Model-Used": toSafeHeaderValue(config.label),
          "X-Provider": toSafeHeaderValue(config.provider),
        };

        if (failedAttempts.length > 0) {
          const skipped = failedAttempts.map((f) => f.model).join(", ");
          headers["X-Fallback-Notice"] = toSafeHeaderValue(
            `Primary model (${skipped}) unavailable - automatically switched to ${config.label}.`,
          );
        }

        return createUIMessageStreamResponse({
          stream: verifiedStream,
          headers,
        });
      } catch (err: unknown) {
        const classified = classifyProviderError(err);
        console.warn(
          `[chat] Model "${config.label}" (${config.modelId}) failed [${classified.code}]:`,
          err instanceof Error ? err.message : err,
        );

        failedAttempts.push({
          model: config.label,
          provider: config.provider,
          code: classified.code,
          reason: classified.userMessage,
        });

        if (classified.cooldownMs > 0) {
          blockModel(
            modelKey,
            classified.userMessage,
            classified.code,
            classified.cooldownMs,
          );
        }

        if (!classified.shouldFallback) {
          return Response.json(
            {
              code: classified.code,
              error: classified.userMessage,
              details: failedAttempts,
            },
            { status: 400 },
          );
        }
      }
    }

    // All models failed
    console.error("[chat] All models exhausted:", failedAttempts);
    return Response.json(
      {
        code: "ALL_PROVIDERS_FAILED",
        error:
          "AI assistant is currently unavailable. All configured providers failed to respond.",
        details: failedAttempts,
      },
      { status: 503 },
    );
  } catch (err) {
    console.error("[chat] Critical error:", err);
    return Response.json(
      {
        code: "SYSTEM_OFFLINE",
        error:
          "Unexpected server error while processing your request. Please try again.",
      },
      { status: 500 },
    );
  }
}
