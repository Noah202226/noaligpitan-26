"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useImperativeHandle,
} from "react";
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
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

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

function renderFormattedLine(line: string, lineIndex: number) {
  const trimmed = line.trim();
  const isBullet = /^[-*•]\s+/.test(trimmed);
  const content = isBullet ? trimmed.replace(/^[-*•]\s+/, "") : line;

  const segments = content.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((seg, i) => {
    if (seg.startsWith("**") && seg.endsWith("**")) {
      return (
        <strong key={i} className="text-white font-bold">
          {seg.slice(2, -2)}
        </strong>
      );
    }
    if (seg.startsWith("`") && seg.endsWith("`")) {
      return (
        <code
          key={i}
          className="px-1 py-0.5 rounded-xs bg-white/10 text-yellow-300 text-[11px]"
        >
          {seg.slice(1, -1)}
        </code>
      );
    }
    return seg;
  });

  if (isBullet) {
    return (
      <div key={lineIndex} className="flex items-start gap-2 pl-1">
        <span className="text-yellow-400/70 select-none">•</span>
        <span className="flex-1">{segments}</span>
      </div>
    );
  }

  return (
    <div key={lineIndex} className={trimmed === "" ? "h-2" : undefined}>
      {segments}
    </div>
  );
}

export interface ChatHandle {
  openWithPrompt: (prompt: string) => void;
}

interface ChatProps {
  ref?: React.Ref<ChatHandle>;
}

export default function Chat({ ref }: ChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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
      label: "Services",
      text: "How can you automate my business or personal workflows?",
      icon: <Sparkles size={12} />,
    },
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

  // Auto-focus textarea when modal opens
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => textareaRef.current?.focus(), 120);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Close popup on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status, activeError, isOpen]);

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

  useImperativeHandle(ref, () => ({
    openWithPrompt: (prompt: string) => {
      setIsOpen(true);
      if (status !== "streaming" && status !== "submitted") {
        dismissError();
        sendMessage({ text: prompt });
      } else {
        setInput(prompt);
      }
    },
  }));

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
    <>
      {/* BACKDROP (mobile always, desktop when expanded) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-xs ${
              isExpanded ? "block" : "sm:hidden"
            }`}
          />
        )}
      </AnimatePresence>

      {/* POPUP CHAT MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="ARKI_AI Chat Assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`fixed z-50 flex flex-col bg-[#050505]/98 border border-white/20 rounded-xl overflow-hidden shadow-[0_20px_70px_-15px_rgba(0,0,0,0.9),0_0_40px_-12px_rgba(234,179,8,0.28)] ${
              isExpanded
                ? "inset-3 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[780px] sm:h-[720px] sm:max-h-[88vh]"
                : "inset-3 sm:inset-auto sm:bottom-22 sm:right-6 sm:w-[460px] sm:h-[620px] sm:max-h-[calc(100vh-7rem)]"
            }`}
          >
            {/* SCANLINE EFFECT */}
            <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(234,179,8,0.06),rgba(0,255,0,0.02),rgba(59,130,246,0.06))] bg-size-[100%_2px,3px_100%]" />

            {/* HEADER */}
            <div className="px-4 py-3 border-b border-white/10 bg-white/3 flex items-center justify-between gap-2 backdrop-blur-xl shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-1.5 bg-yellow-500/10 rounded-md border border-yellow-500/25 shrink-0">
                  <Terminal size={14} className="text-yellow-400" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-mono tracking-[0.3em] text-white font-bold uppercase">
                    ARKI_AI
                  </span>
                  <span className="text-[8px] font-mono text-slate-400 tracking-widest uppercase flex items-center gap-1.5">
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full ${statusMeta.dotClass}`}
                    />
                    <span className={statusMeta.textClass}>
                      {statusMeta.label}
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <AnimatePresence>
                  {activeModel && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="hidden xs:flex sm:flex items-center gap-1.5 px-2 py-1 bg-white/4 border border-white/10 rounded-sm max-w-36"
                    >
                      <Cpu size={10} className="text-yellow-400/70 shrink-0" />
                      <span className="text-[8px] font-mono text-slate-300 uppercase tracking-wider truncate">
                        {activeModel}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  aria-label={isExpanded ? "Collapse chat" : "Expand chat"}
                  title={isExpanded ? "Compact popup" : "Expand modal"}
                  className="hidden sm:inline-flex p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {isExpanded ? (
                    <Minimize2 size={13} />
                  ) : (
                    <Maximize2 size={13} />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  title="Close (Esc)"
                  className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* NOTIFICATION BAR (FALLBACK TOAST) */}
            <AnimatePresence>
              {fallbackNotice && !activeError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  role="status"
                  className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/25 flex items-center justify-between gap-2 text-[10px] font-mono text-amber-200 shrink-0"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Info size={13} className="text-amber-400 shrink-0" />
                    <span className="truncate">{fallbackNotice}</span>
                  </div>
                  <button
                    onClick={() => setFallbackNotice(null)}
                    aria-label="Dismiss notice"
                    className="text-amber-400/70 hover:text-amber-200 transition-colors shrink-0"
                  >
                    <X size={13} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* MESSAGES AREA */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[radial-gradient(circle_at_50%_0%,rgba(234,179,8,0.04),transparent)]">
              {messages.length === 0 && !activeError && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col justify-center items-start gap-3 px-2 py-4 font-mono"
                >
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs bg-yellow-500/10 border border-yellow-500/25 text-[9px] uppercase tracking-[0.25em] text-yellow-400">
                    <Sparkles size={11} />
                    AI Portfolio Assistant
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Ask me anything about{" "}
                    <span className="text-white font-bold">Noa Ligpitan</span> —
                    projects, automation workflows, work experience, or
                    technical stack.
                  </p>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Pick a quick prompt below or type your question.
                  </p>
                </motion.div>
              )}

              {messages.map((m) => {
                const textParts = m.parts.filter(
                  (part) => part.type === "text" && part.text.length > 0,
                );
                const hasReasoningOnly =
                  m.role !== "user" &&
                  textParts.length === 0 &&
                  m.parts.some((part) => part.type === "reasoning");

                if (
                  m.role !== "user" &&
                  textParts.length === 0 &&
                  !hasReasoningOnly
                ) {
                  return null;
                }

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={m.id}
                    className={`flex flex-col gap-1.5 ${m.role === "user" ? "items-end pl-8" : "items-start pr-4"}`}
                  >
                    <div className="flex items-center gap-1.5 px-1">
                      {m.role !== "user" && (
                        <MessageSquareCode
                          size={11}
                          className="text-yellow-500/50"
                        />
                      )}
                      <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-slate-500">
                        {m.role === "user" ? "You" : "ARKI_AI"}
                      </span>
                    </div>
                    <div
                      className={`px-4 py-3 rounded-xl font-mono text-[13.5px] leading-[1.6] shadow-sm transition-all ${
                        m.role === "user"
                          ? "bg-yellow-500/12 border border-yellow-500/30 text-yellow-50 text-right rounded-tr-xs"
                          : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-xs backdrop-blur-sm space-y-1"
                      }`}
                    >
                      {hasReasoningOnly ? (
                        <span className="text-xs text-slate-400 italic animate-pulse">
                          Synthesizing response...
                        </span>
                      ) : m.role === "user" ? (
                        m.parts.map(
                          (part, i) =>
                            part.type === "text" && (
                              <div key={i} className="whitespace-pre-wrap">
                                {part.text}
                              </div>
                            ),
                        )
                      ) : (
                        m.parts.map(
                          (part, i) =>
                            part.type === "text" && (
                              <div key={i} className="space-y-0.5">
                                {part.text
                                  .split("\n")
                                  .map((line, li) =>
                                    renderFormattedLine(line, li),
                                  )}
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
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    role="alert"
                    className="rounded-lg border border-red-500/35 bg-red-950/35 p-3.5 font-mono text-left backdrop-blur-md space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle
                          size={15}
                          className="text-red-400 shrink-0"
                        />
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-red-400 font-bold">
                            SYSTEM_ALERT {"//"} {activeError.code}
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
                        <X size={13} />
                      </button>
                    </div>

                    <p className="text-[11px] text-red-200/90 leading-relaxed">
                      {activeError.message}
                    </p>

                    {activeError.details && activeError.details.length > 0 && (
                      <div>
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
                          {showDetails ? "Hide" : "Show"} diagnostics (
                          {activeError.details.length})
                        </button>

                        {showDetails && (
                          <ul className="mt-1.5 space-y-1 rounded-md bg-black/40 border border-red-500/20 p-2.5 text-[10px] text-red-200/80">
                            {activeError.details.map((d, idx) => (
                              <li key={idx} className="flex flex-col">
                                <span className="text-red-300 font-bold">
                                  [{d.model}]
                                </span>
                                <span className="text-slate-300">
                                  {d.reason}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-0.5">
                      <button
                        type="button"
                        onClick={handleRetry}
                        disabled={isBusy}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/20 border border-red-500/40 text-red-100 hover:bg-red-500/35 text-[10px] uppercase tracking-widest transition-all disabled:opacity-40"
                      >
                        <RefreshCw size={11} />
                        Retry
                      </button>
                      <button
                        type="button"
                        onClick={dismissError}
                        className="px-2.5 py-1 rounded-md border border-white/10 text-slate-400 hover:text-white text-[10px] uppercase tracking-widest transition-all"
                      >
                        Dismiss
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {isBusy && (
                <div className="flex items-center gap-3 px-1 text-yellow-500/70 font-mono text-[10px] tracking-widest uppercase">
                  <div className="flex gap-1">
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
            <div className="p-3.5 bg-white/2 border-t border-white/10 shrink-0">
              {/* QUICK ACTIONS */}
              {!isBusy && messages.length < 5 && (
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {quickActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleSubmit(action.text)}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-white/4 border border-white/10 rounded-md text-[10px] font-mono text-slate-300 hover:border-yellow-500/45 hover:text-yellow-400 transition-all"
                    >
                      {action.icon}
                      {action.label}
                    </button>
                  ))}
                </div>
              )}

              <div className="relative group bg-black/60 border border-white/15 rounded-lg focus-within:border-yellow-500/55 focus-within:bg-yellow-500/3 transition-all duration-300">
                <span className="absolute left-3.5 top-3 text-yellow-500/60 font-mono text-xs select-none">
                  {">"}
                </span>
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about projects, stack, or experience..."
                  className="w-full bg-transparent pl-8 pr-14 py-2.5 text-[13px] font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none resize-none overflow-hidden max-h-28"
                />

                <div className="absolute right-2 bottom-1.5 flex gap-1.5">
                  {isBusy ? (
                    <button
                      onClick={stop}
                      className="px-2.5 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 text-[9px] font-mono hover:bg-red-500 hover:text-white rounded-md transition-all uppercase tracking-widest"
                    >
                      Abort
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSubmit()}
                      disabled={!input.trim()}
                      aria-label="Send message"
                      className="p-1.5 text-slate-400 hover:text-yellow-400 transition-colors disabled:opacity-25"
                    >
                      <Send size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING CHAT LAUNCHER BUTTON */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-label={isOpen ? "Close ARKI_AI chat" : "Open ARKI_AI chat"}
        aria-expanded={isOpen}
        className="fixed bottom-5 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#090d1a]/95 border border-yellow-400/50 text-white shadow-[0_8px_30px_rgba(0,0,0,0.75),0_0_24px_rgba(234,179,8,0.28)] hover:border-yellow-400 hover:shadow-[0_8px_35px_rgba(0,0,0,0.85),0_0_30px_rgba(234,179,8,0.45)] backdrop-blur-xl transition-all cursor-pointer"
      >
        <div className="relative flex items-center justify-center">
          {isOpen ? (
            <X size={19} className="text-yellow-400" />
          ) : (
            <MessageSquareCode size={19} className="text-yellow-400" />
          )}
          {!isOpen && (
            <span
              className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${statusMeta.dotClass}`}
            />
          )}
        </div>
        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
          {isOpen ? "Close" : "Ask ARKI_AI"}
        </span>
        {!isOpen && messages.length > 0 && (
          <span className="px-1.5 py-0.5 rounded-full bg-yellow-400/20 border border-yellow-400/40 font-mono text-[9px] text-yellow-300 font-bold leading-none">
            {messages.length}
          </span>
        )}
      </motion.button>
    </>
  );
}
