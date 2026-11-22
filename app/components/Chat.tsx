"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Terminal,
  Cpu,
  AlertTriangle,
  MessageSquareCode,
  Sparkles,
  User,
  Briefcase,
  RefreshCw,
  X,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import SkillsMatrix from "./sections/SkillsMatrix";

interface ProviderFailureDetail {
  model: string;
  provider?: string;
  code?: string;
  reason: string;
}

interface ChatErrorState {
  code: string;
  title: string;
  message: string;
  details?: ProviderFailureDetail[];
}

function getErrorTitle(code: string): string {
  switch (code) {
    case "RATE_LIMIT":
      return "Rate Limit Reached";
    case "ALL_PROVIDERS_FAILED":
      return "AI Service Unavailable";
    case "MODEL_NOT_FOUND":
      return "AI Model Unavailable";
    case "QUOTA_EXCEEDED":
      return "Provider Quota Reached";
    case "AUTH_ERROR":
    case "MISSING_API_KEY":
      return "AI Configuration Error";
    case "TIMEOUT":
      return "Request Timed Out";
    case "NETWORK_ERROR":
      return "Connection Failed";
    default:
      return "System Error";
  }
}

function parseChatError(err: Error | undefined): ChatErrorState | null {
  if (!err) return null;
  const raw = err.message?.trim() || "";

  // Attempt to parse structured JSON payloads from /api/chat
  if (raw.startsWith("{")) {
    try {
      const parsed = JSON.parse(raw) as {
        code?: string;
        error?: string;
        details?: ProviderFailureDetail[];
      };
      const code = parsed.code || "SYSTEM_ERROR";
      return {
        code,
        title: getErrorTitle(code),
        message:
          parsed.error ||
          "The AI assistant could not process your request right now.",
        details: Array.isArray(parsed.details) ? parsed.details : undefined,
      };
    } catch {
      // Fall through to plain-text handling
    }
  }

  const lower = raw.toLowerCase();
  if (
    lower.includes("failed to fetch") ||
    lower.includes("networkerror") ||
    lower.includes("network")
  ) {
    return {
      code: "NETWORK_ERROR",
      title: getErrorTitle("NETWORK_ERROR"),
      message:
        "Could not reach the server. Check your internet connection and try again.",
    };
  }

  return {
    code: "SYSTEM_ERROR",
    title: "Request Failed",
    message:
      raw && raw !== "An error occurred."
        ? raw
        : "The AI assistant encountered an unexpected error. Please try again.",
  };
}

export default function Chat() {
  const [input, setInput] = useState("");
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);
  const [httpError, setHttpError] = useState<ChatErrorState | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // QUICK ACTIONS DATA
  const quickActions = [
    {
      label: "View Stack",
      text: "What is your full tech stack?",
      icon: <Cpu size={12} />,
    },
    {
      label: "Experience",
      text: "Tell me about your work at DPWH.",
      icon: <Briefcase size={12} />,
    },
    {
      label: "Automation",
      text: "How do you use n8n for business automation?",
      icon: <Sparkles size={12} />,
    },
    {
      label: "Identity",
      text: "What is your professional philosophy?",
      icon: <User size={12} />,
    },
  ];

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        fetch: async (url, options) => {
          const response = await fetch(url, options);
          if (response.ok) {
            setHttpError(null);
            setShowDetails(false);
            const modelUsed = response.headers.get("X-Model-Used");
            if (modelUsed) setActiveModel(modelUsed);
            const notice = response.headers.get("X-Fallback-Notice");
            setFallbackNotice(notice || null);
          } else {
            try {
              const data = (await response.clone().json()) as {
                code?: string;
                error?: string;
                details?: ProviderFailureDetail[];
              };
              const code = data.code || `HTTP_${response.status}`;
              setHttpError({
                code,
                title: getErrorTitle(code),
                message:
                  data.error ||
                  `Server responded with status ${response.status}.`,
                details: Array.isArray(data.details) ? data.details : undefined,
              });
            } catch {
              setHttpError({
                code: `HTTP_${response.status}`,
                title: "Server Error",
                message: `Request failed with HTTP ${response.status}. Please try again.`,
              });
            }
          }
          return response;
        },
      }),
    [],
  );

  const {
    messages,
    sendMessage,
    regenerate,
    clearError,
    status,
    error,
    stop,
  } = useChat({
    transport,
  });

  const activeError = httpError ?? parseChatError(error);

  // Auto-dismiss fallback notice after 8 seconds
  useEffect(() => {
    if (!fallbackNotice) return;
    const timer = setTimeout(() => setFallbackNotice(null), 8000);
    return () => clearTimeout(timer);
  }, [fallbackNotice]);

  // FOCUS ON LOAD
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status, activeError]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const dismissError = () => {
    setHttpError(null);
    setShowDetails(false);
    clearError();
  };

  const handleRetry = () => {
    dismissError();
    if (messages.length > 0) {
      regenerate();
    } else {
      textareaRef.current?.focus();
    }
  };

  const handleSubmit = (textOverride?: string) => {
    const finalInput = textOverride || input;
    if (!finalInput.trim() || status === "streaming") return;
    dismissError();
    sendMessage({ text: finalInput });
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isBusy = status === "submitted" || status === "streaming";

  const statusMeta = activeError
    ? {
        label: "Error",
        textClass: "text-red-400",
        dotClass: "bg-red-500 animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.6)]",
      }
    : isBusy
      ? {
          label: "Processing",
          textClass: "text-yellow-400",
          dotClass:
            "bg-yellow-500 animate-pulse shadow-[0_0_12px_rgba(234,179,8,0.6)]",
        }
      : fallbackNotice
        ? {
            label: "Fallback Active",
            textClass: "text-amber-400",
            dotClass: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.5)]",
          }
        : {
            label: "Ready",
            textClass: "text-emerald-500",
            dotClass:
              "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]",
          };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto h-187.5 bg-[#050505] border border-white/10 rounded-xl overflow-hidden relative shadow-[0_0_50px_-12px_rgba(234,179,8,0.15)] transition-all duration-500">
      {/* SCANLINE EFFECT */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(234,179,8,0.06),rgba(0,255,0,0.02),rgba(59,130,246,0.06))] bg-size-[100%_2px,3px_100%]" />

      {/* HEADER */}
      <div className="px-6 py-4 border-b border-white/5 bg-white/1 flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <Terminal size={16} className="text-yellow-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-[0.4em] text-white font-bold uppercase">
              ARKI_AI
            </span>
            <span className="text-[8px] font-mono text-slate-500 tracking-widest uppercase">
              System Status:{" "}
              <span className={statusMeta.textClass}>{statusMeta.label}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <AnimatePresence>
            {activeModel && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/3 border border-white/10 rounded-md"
              >
                <Cpu size={12} className="text-yellow-400/70" />
                <span className="text-[9px] font-mono text-slate-300 uppercase tracking-widest">
                  {activeModel}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <div className={`w-2.5 h-2.5 rounded-full ${statusMeta.dotClass}`} />
        </div>
      </div>

      {/* NOTIFICATION BAR (FALLBACK / ERROR TOAST) */}
      <AnimatePresence>
        {fallbackNotice && !activeError && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            role="status"
            className="px-5 py-2.5 bg-amber-500/10 border-b border-amber-500/25 flex items-center justify-between gap-3 text-[11px] font-mono text-amber-200"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Info size={14} className="text-amber-400 shrink-0" />
              <span className="truncate">{fallbackNotice}</span>
            </div>
            <button
              onClick={() => setFallbackNotice(null)}
              aria-label="Dismiss notice"
              className="text-amber-400/70 hover:text-amber-200 transition-colors shrink-0"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MESSAGES AREA - WIDER CONTAINER */}
      <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide bg-[radial-gradient(circle_at_50%_0%,rgba(234,179,8,0.03),transparent)]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12"
        >
          <SkillsMatrix />
        </motion.div>

        {messages.map((m) => {
          const textParts = m.parts.filter(
            (part) => part.type === "text" && part.text.length > 0,
          );
          const hasReasoningOnly =
            m.role !== "user" &&
            textParts.length === 0 &&
            m.parts.some((part) => part.type === "reasoning");

          if (m.role !== "user" && textParts.length === 0 && !hasReasoningOnly) {
            return null;
          }

          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={m.id}
              className={`flex flex-col gap-3 ${m.role === "user" ? "items-end pl-12" : "items-start pr-12"}`}
            >
              <div className="flex items-center gap-2 px-2">
                {m.role !== "user" && (
                  <MessageSquareCode size={12} className="text-yellow-500/50" />
                )}
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-600">
                  {m.role === "user" ? "Local_Access" : "Arki_System_Log"}
                </span>
              </div>
              <div
                className={`p-5 rounded-xl font-mono text-[14px] leading-[1.6] shadow-sm transition-all ${
                  m.role === "user"
                    ? "bg-yellow-500/5 border border-yellow-500/20 text-yellow-50 text-right rounded-tr-none"
                    : "bg-white/3 border border-white/10 text-slate-300 rounded-tl-none backdrop-blur-sm"
                }`}
              >
                {hasReasoningOnly ? (
                  <span className="text-xs text-slate-500 italic animate-pulse">
                    Synthesizing response...
                  </span>
                ) : (
                  m.parts.map(
                    (part, i) =>
                      part.type === "text" && (
                        <div key={i} className="whitespace-pre-wrap">
                          {part.text}
                        </div>
                      ),
                  )
                )}
              </div>
            </motion.div>
          );
        })}

        {/* INLINE ERROR FEEDBACK CARD */}
        <AnimatePresence>
          {activeError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              role="alert"
              className="rounded-xl border border-red-500/35 bg-red-950/30 p-5 font-mono text-left backdrop-blur-md space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle
                    size={16}
                    className="text-red-400 shrink-0"
                  />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-red-400 font-bold">
                      SYSTEM_ALERT // {activeError.code}
                    </p>
                    <p className="text-xs text-red-100 font-bold mt-0.5">
                      {activeError.title}
                    </p>
                  </div>
                </div>
                <button
                  onClick={dismissError}
                  aria-label="Dismiss error"
                  className="text-red-300/60 hover:text-red-200 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              <p className="text-[12px] text-red-200/90 leading-relaxed">
                {activeError.message}
              </p>

              {activeError.details && activeError.details.length > 0 && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowDetails((prev) => !prev)}
                    className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-red-300/80 hover:text-red-200 transition-colors"
                  >
                    {showDetails ? (
                      <ChevronUp size={12} />
                    ) : (
                      <ChevronDown size={12} />
                    )}
                    {showDetails ? "Hide" : "Show"} provider diagnostics (
                    {activeError.details.length})
                  </button>

                  {showDetails && (
                    <ul className="mt-2 space-y-1.5 rounded-lg bg-black/40 border border-red-500/20 p-3 text-[11px] text-red-200/80">
                      {activeError.details.map((d, idx) => (
                        <li key={idx} className="flex flex-col">
                          <span className="text-red-300 font-bold">
                            [{d.model}]
                          </span>
                          <span className="text-slate-300">{d.reason}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleRetry}
                  disabled={isBusy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-100 hover:bg-red-500/35 text-[10px] uppercase tracking-widest transition-all disabled:opacity-40"
                >
                  <RefreshCw size={12} />
                  Retry Request
                </button>
                <button
                  type="button"
                  onClick={dismissError}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white text-[10px] uppercase tracking-widest transition-all"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isBusy && (
          <div className="flex items-center gap-4 px-2 text-yellow-500/60 font-mono text-[10px] tracking-widest uppercase">
            <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
            <span>Analyzing_Input_Matrix...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA */}
      <div className="p-8 bg-white/1 border-t border-white/5">
        {/* QUICK ACTIONS */}
        {!isBusy && messages.length < 5 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => handleSubmit(action.text)}
                className="flex items-center gap-2 px-3 py-2 bg-white/2 border border-white/10 rounded-lg text-[10px] font-mono text-slate-500 hover:border-yellow-500/40 hover:text-yellow-400 transition-all"
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        )}

        <div className="relative group bg-white/2 border border-white/10 rounded-xl focus-within:border-yellow-500/40 focus-within:bg-yellow-500/2 transition-all duration-500">
          <span className="absolute left-5 top-4.5 text-yellow-500/50 font-mono text-sm select-none">
            {">"}
          </span>
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Query technical archives or ask about experience..."
            className="w-full bg-transparent pl-10 pr-20 py-4 text-[14px] font-mono text-slate-200 placeholder:text-slate-800 focus:outline-none resize-none overflow-hidden max-h-40"
          />

          <div className="absolute right-3 bottom-3 flex gap-2">
            {isBusy ? (
              <button
                onClick={stop}
                className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-mono hover:bg-red-500 hover:text-white rounded-lg transition-all uppercase tracking-widest"
              >
                Abort
              </button>
            ) : (
              <button
                onClick={() => handleSubmit()}
                disabled={!input.trim()}
                className="p-2.5 text-slate-600 hover:text-yellow-400 transition-colors disabled:opacity-20"
              >
                <Send size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
