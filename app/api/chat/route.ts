import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGroq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { getAiKnowledgeBase } from "@/app/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────
type ProviderKey = "google" | "openai" | "groq";

interface ModelConfig {
  provider: ProviderKey;
  modelId: string;
  label: string;
}

// ─── Fallback Chain ───────────────────────────────────────────────────────────
// Order: Free/High-Quota first.
const MODEL_CHAIN: ModelConfig[] = [
  { provider: "groq", modelId: "llama-3.1-8b-instant", label: "groq" },
  {
    provider: "google",
    modelId: "gemini-2.5-flash-lite", // Latest high-speed free tier
    label: "Gemini 2.5 Lite (Free)",
  },
  { provider: "openai", modelId: "openai/gpt-oss-120b", label: "GPT OSS 120B" },
];

// ─── In-memory rate limit tracker ────────────────────────────────────────────
const blockedUntil: Record<string, number> = {};

function isBlocked(modelId: string): boolean {
  const until = blockedUntil[modelId] ?? 0;
  if (Date.now() > until) {
    delete blockedUntil[modelId]; // unblock
    return false;
  }
  return true;
}

function blockModel(modelId: string, ms = 5 * 60 * 1000) {
  blockedUntil[modelId] = Date.now() + ms;
  console.warn(`[chat] Blocked model "${modelId}" for ${ms / 1000}s`);
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

// ─── Build model instance ─────────────────────────────────────────────────────
function buildModel(config: ModelConfig) {
  const keys = {
    google: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    openai: process.env.OPENAI_API_KEY,
    groq: process.env.GROQ_API_KEY,
  };

  if (!keys[config.provider]) {
    throw new Error(`MISSING_API_KEY_FOR_${config.provider.toUpperCase()}`);
  }

  switch (config.provider) {
    case "google":
      return createGoogleGenerativeAI({ apiKey: keys.google })(config.modelId);
    case "openai":
      return createOpenAI({ apiKey: keys.openai })(config.modelId);
    case "groq":
      return createGroq({ apiKey: keys.groq })(config.modelId);
    default:
      throw new Error(`Unknown provider: ${config.provider}`);
  }
}

// ─── Main Handler ─────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    // IP guard
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!checkIp(ip)) {
      return Response.json(
        { error: "RATE_LIMIT: Too many requests. Try again later." },
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

    let lastError: any;

    // ── Try each model in the chain ──────────────────────────────────────────
    for (const config of MODEL_CHAIN) {
      if (isBlocked(config.modelId)) {
        console.log(`[chat] Skipping blocked model: ${config.label}`);
        continue;
      }

      try {
        console.log(`[chat] Trying model: ${config.label}`);
        const model = buildModel(config);

        const result = await streamText({
          model,
          system: systemPrompt,
          messages: coreMessages,
          maxRetries: 0,
          abortSignal: AbortSignal.timeout(15_000),
        });

        // Success — return stream
        return result.toUIMessageStreamResponse({
          headers: {
            "X-Model-Used": config.label,
            "X-Provider": config.provider,
          },
        });
      } catch (err: any) {
        lastError = err;
        const errorMsg = err?.message?.toLowerCase() || "";
        const status = err?.status || err?.statusCode;

        // DETECTION LOGIC: Catch quota, auth, and overload errors
        const isQuotaError =
          errorMsg.includes("quota") ||
          errorMsg.includes("limit") ||
          status === 429;
        const isAuthError = status === 401 || status === 403;
        const isOverloaded = status === 503 || status === 529;

        if (isQuotaError || isAuthError || isOverloaded) {
          console.warn(
            `[chat] Switching from ${config.label} due to: ${errorMsg || status}`,
          );
          blockModel(config.modelId, 5 * 60 * 1000); // 5 min cooldown
          continue;
        }

        if (status === 400) throw err; // Bad request, don't fallback
        continue;
      }
    }

    // All models failed
    console.error("[chat] All models exhausted. Last error:", lastError);
    return Response.json(
      {
        error:
          "SYSTEM_OFFLINE: All providers are currently busy. Try again soon.",
      },
      { status: 503 },
    );
  } catch (err) {
    console.error("[chat] Critical error:", err);
    return Response.json({ error: "SYSTEM_OFFLINE" }, { status: 500 });
  }
}
