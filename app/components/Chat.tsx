"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Terminal,
  Zap,
  Cpu,
  AlertTriangle,
  MessageSquareCode,
  Sparkles,
  User,
  Briefcase,
} from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import SkillsMatrix from "./sections/SkillsMatrix";

export default function Chat() {
  const [input, setInput] = useState("");
  const [activeModel, setActiveModel] = useState<string | null>(null);
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

  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      fetch: async (url, options) => {
        const response = await fetch(url, options);
        if (response.ok) {
          const modelUsed = response.headers.get("X-Model-Used");
          if (modelUsed) setActiveModel(modelUsed);
        }
        return response;
      },
    }),
  });

  // FOCUS ON LOAD
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (textOverride?: string) => {
    const finalInput = textOverride || input;
    if (!finalInput.trim() || status === "streaming") return;
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
              System Status: <span className="text-emerald-500">Ready</span>
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
          <div
            className={`w-2.5 h-2.5 rounded-full ${isBusy ? "bg-yellow-500 animate-pulse" : "bg-emerald-500"} shadow-[0_0_12px_rgba(234,179,8,0.4)]`}
          />
        </div>
      </div>

      {/* MESSAGES AREA - WIDER CONTAINER */}
      <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide bg-[radial-gradient(circle_at_50%_0%,rgba(234,179,8,0.03),transparent)]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12"
        >
          <SkillsMatrix />
        </motion.div>

        {messages.map((m) => (
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
              {m.parts.map(
                (part, i) =>
                  part.type === "text" && (
                    <div key={i} className="whitespace-pre-wrap">
                      {part.text}
                    </div>
                  ),
              )}
            </div>
          </motion.div>
        ))}

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
