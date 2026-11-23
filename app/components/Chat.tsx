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

function renderInlineSegments(text: string) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((seg, i) => {
    if (seg.startsWith("**") && seg.endsWith("**")) {
      return (
        <strong key={i} className="text-slate-50 font-semibold">
          {seg.slice(2, -2)}
        </strong>
      );
    }
    if (seg.startsWith("`") && seg.endsWith("`")) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded bg-slate-900/90 border border-slate-700/70 font-mono text-sky-300 text-xs"
        >
          {seg.slice(1, -1)}
        </code>
      );
    }
    return seg;
  });
}

function renderFormattedLine(line: string, lineIndex: number) {
  const trimmed = line.trim();

  if (trimmed === "") {
    return <div key={lineIndex} className="h-2" />;
  }

  // Markdown headings (# / ## / ###)
  const headingMatch = trimmed.match(/^#{1,3}\s+(.+)$/);
  if (headingMatch) {
    return (
      <p
        key={lineIndex}
        className="font-display text-sm sm:text-[15px] font-bold text-slate-50 pt-1.5 pb-0.5 tracking-tight"
      >
        {renderInlineSegments(headingMatch[1])}
      </p>
    );
  }

  // Bullet list items
  const isBullet = /^[-*•]\s+/.test(trimmed);
  if (isBullet) {
    const content = trimmed.replace(/^[-*•]\s+/, "");
    return (
      <div key={lineIndex} className="flex items-start gap-2 pl-1">
        <span className="text-sky-400 select-none mt-0.5">•</span>
        <span className="flex-1">{renderInlineSegments(content)}</span>
      </div>
    );
  }

  // Numbered list items
  const numMatch = trimmed.match(/^(\d+\.)\s+(.+)$/);
  if (numMatch) {
    return (
      <div key={lineIndex} className="flex items-start gap-2 pl-1">
        <span className="font-mono text-xs text-sky-400 font-semibold select-none mt-0.5">
          {numMatch[1]}
        </span>
        <span className="flex-1">{renderInlineSegments(numMatch[2])}</span>
      </div>
    );
  }

  return <div key={lineIndex}>{renderInlineSegments(line)}</div>;
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
  const [httpError, setHttpError] = useState<ChatErrorState | null>(null);
  const [showDetails, setShowDetails] = useState(true);
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
          } else {
            setShowDetails(true);
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
        textClass: "text-rose-400",
        dotClass: "bg-rose-500 animate-pulse shadow-[0_0_12px_rgba(244,63,94,0.6)]",
      }
    : isBusy
      ? {
          label: "Thinking",
          textClass: "text-sky-400",
          dotClass:
            "bg-sky-400 animate-pulse shadow-[0_0_12px_rgba(56,189,248,0.6)]",
        }
      : {
          label: "Online",
          textClass: "text-emerald-400",
          dotClass:
            "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]",
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
            className={`fixed z-50 flex flex-col bg-[#0c1322]/98 border border-slate-700/80 rounded-2xl overflow-hidden shadow-[0_24px_72px_-16px_rgba(0,0,0,0.9),0_0_32px_-12px_rgba(56,189,248,0.22)] ${
              isExpanded
                ? "inset-3 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[860px] sm:h-[760px] sm:max-h-[90vh]"
                : "inset-3 sm:inset-auto sm:bottom-22 sm:right-6 sm:w-[560px] lg:w-[620px] sm:h-[660px] sm:max-h-[calc(100vh-7rem)]"
            }`}
          >
            {/* HEADER */}
            <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between gap-2 backdrop-blur-xl shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-amber-500/12 rounded-lg border border-amber-400/30 shrink-0">
                  <Terminal size={16} className="text-amber-400" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-display text-sm sm:text-base text-slate-50 font-bold tracking-tight leading-none">
                    ARKI_AI
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full ${statusMeta.dotClass}`}
                    />
                    <span className={statusMeta.textClass}>
                      {statusMeta.label}
                    </span>
                    <span className="text-slate-600">&middot;</span>
                    <span className="text-slate-400 truncate">
                      Noa&apos;s Portfolio Assistant
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  aria-label={isExpanded ? "Collapse chat" : "Expand chat"}
                  title={isExpanded ? "Compact popup" : "Expand modal"}
                  className="hidden sm:inline-flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {isExpanded ? (
                    <Minimize2 size={15} />
                  ) : (
                    <Maximize2 size={15} />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  title="Close (Esc)"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* MESSAGES AREA */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 custom-scrollbar bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.05),transparent)]">
              {messages.length === 0 && !activeError && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col justify-center items-start gap-3 px-2 py-4"
                >
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/12 border border-sky-400/30 text-xs font-medium text-sky-300">
                    <Sparkles size={12} />
                    AI Portfolio Assistant
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Ask me anything about{" "}
                    <span className="text-white font-semibold">
                      Noa Ligpitan
                    </span>{" "}
                    — projects, automation workflows, context engineering, or
                    technical stack.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
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
                          size={12}
                          className="text-sky-400"
                        />
                      )}
                      <span className="text-[11px] font-medium text-slate-400">
                        {m.role === "user" ? "You" : "ARKI_AI"}
                      </span>
                    </div>
                    <div
                      className={`px-4 py-3 rounded-xl text-sm leading-relaxed shadow-sm transition-all ${
                        m.role === "user"
                          ? "bg-sky-500/15 border border-sky-400/35 text-slate-50 text-right rounded-tr-xs"
                          : "bg-slate-800/80 border border-slate-700/70 text-slate-200 rounded-tl-xs space-y-1"
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
                              <div key={i} className="space-y-1">
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
                    className="rounded-xl border border-rose-400/35 bg-rose-950/35 p-4 text-left backdrop-blur-md space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle
                          size={16}
                          className="text-rose-400 shrink-0"
                        />
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-wider text-rose-400 font-semibold">
                            Alert {"//"} {activeError.code}
                          </p>
                          <p className="font-display text-sm text-rose-100 font-bold mt-0.5">
                            {activeError.title}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={dismissError}
                        aria-label="Dismiss error"
                        className="text-rose-300/70 hover:text-rose-100 transition-colors cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed">
                      {activeError.message}
                    </p>

                    {activeError.details && activeError.details.length > 0 && (
                      <div>
                        <button
                          type="button"
                          onClick={() => setShowDetails((prev) => !prev)}
                          className="flex items-center gap-1.5 font-mono text-[11px] text-rose-300 hover:text-rose-100 transition-colors cursor-pointer"
                        >
                          {showDetails ? (
                            <ChevronUp size={13} />
                          ) : (
                            <ChevronDown size={13} />
                          )}
                          {showDetails ? "Hide" : "Show"} diagnostics (
                          {activeError.details.length})
                        </button>

                        {showDetails && (
                          <ul className="mt-2 space-y-1.5 rounded-lg bg-slate-950/75 border border-rose-400/20 p-3 font-mono text-[11px] text-rose-200/85">
                            {activeError.details.map((d, idx) => (
                              <li key={idx} className="flex flex-col">
                                <span className="text-rose-300 font-semibold">
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

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleRetry}
                        disabled={isBusy}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 border border-rose-400/40 text-rose-100 hover:bg-rose-500/35 text-xs font-semibold transition-all disabled:opacity-40 cursor-pointer"
                      >
                        <RefreshCw size={12} />
                        Retry
                      </button>
                      <button
                        type="button"
                        onClick={dismissError}
                        className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {isBusy && (
                <div className="flex items-center gap-2.5 px-1 text-sky-400 text-xs font-medium">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span>Thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT AREA */}
            <div className="p-3.5 bg-slate-900/90 border-t border-slate-800 shrink-0">
              {/* QUICK ACTIONS */}
              {!isBusy && messages.length < 5 && (
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {quickActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleSubmit(action.text)}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/80 border border-slate-700/75 rounded-lg text-xs font-medium text-slate-300 hover:border-sky-400/50 hover:text-sky-200 transition-all cursor-pointer"
                    >
                      {action.icon}
                      {action.label}
                    </button>
                  ))}
                </div>
              )}

              <div className="relative group bg-slate-950/90 border border-slate-700/80 rounded-xl focus-within:border-sky-400/70 transition-all duration-200">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about projects, automation, or stack..."
                  className="w-full bg-transparent pl-3.5 pr-14 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none resize-none overflow-hidden max-h-28"
                />

                <div className="absolute right-2 bottom-1.5 flex gap-1.5">
                  {isBusy ? (
                    <button
                      onClick={stop}
                      className="px-2.5 py-1.5 bg-rose-500/15 border border-rose-400/35 text-rose-300 text-xs font-semibold hover:bg-rose-500 hover:text-white rounded-lg transition-all cursor-pointer"
                    >
                      Stop
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSubmit()}
                      disabled={!input.trim()}
                      aria-label="Send message"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-sky-300 hover:bg-slate-800 transition-colors disabled:opacity-25 cursor-pointer"
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
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        aria-label={isOpen ? "Close ARKI_AI chat" : "Open ARKI_AI chat"}
        aria-expanded={isOpen}
        className="fixed bottom-5 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-slate-900/95 border border-amber-400/55 text-slate-50 shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_24px_rgba(245,158,11,0.22)] hover:border-amber-300 hover:bg-slate-800 backdrop-blur-xl transition-all cursor-pointer"
      >
        <div className="relative flex items-center justify-center">
          {isOpen ? (
            <X size={18} className="text-amber-400" />
          ) : (
            <MessageSquareCode size={18} className="text-amber-400" />
          )}
          {!isOpen && (
            <span
              className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${statusMeta.dotClass}`}
            />
          )}
        </div>
        <span className="font-display text-sm font-bold tracking-tight">
          {isOpen ? "Close Chat" : "Ask ARKI_AI"}
        </span>
        {!isOpen && messages.length > 0 && (
          <span className="px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/45 font-mono text-[10px] text-amber-200 font-bold leading-none">
            {messages.length}
          </span>
        )}
      </motion.button>
    </>
  );
}
