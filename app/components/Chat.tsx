"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Terminal, Zap } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import SkillsMatrix from "./sections/SkillsMatrix"; // Ensure the path is correct

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, stop } = useChat();

  // 1. Create a reference for the bottom of the message list
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 2. Auto-scroll function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 3. Trigger scroll whenever messages or status changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, status]);

  const handleMockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="flex flex-col w-full h-150 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-sm overflow-hidden relative shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)]">
      {/* SCANLINE EFFECT */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%]" />

      {/* Header */}
      <div className="px-6 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-blue-500" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
            AI_INTERFACE_V4.0
          </span>
        </div>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {/* SKILLS MATRIX AS SYSTEM STARTUP */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4 text-[10px] font-mono text-blue-500/60 uppercase tracking-[0.2em]">
            <Zap size={12} />
            <span>Initializing_Technical_Diagnostic...</span>
          </div>
          <SkillsMatrix />
        </motion.div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] font-mono">
            ERROR: {error.message}
          </div>
        )}

        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-2"
          >
            <div
              className={`text-[9px] font-semibold font-mono uppercase tracking-tighter ${
                m.role === "user"
                  ? "text-blue-400 text-right"
                  : "text-slate-500"
              }`}
            >
              {m.role === "user" ? "USER_PROMPT:" : "SYSTEM_RESPONSE:"}
            </div>
            <div
              className={`p-4 text-xs font-mono leading-relaxed ${
                m.role === "user"
                  ? "bg-blue-500/10 border-r-2 border-blue-500 text-blue-100 self-end ml-12"
                  : "bg-white/5 border-l-2 border-white/20 text-slate-300 mr-12"
              }`}
            >
              {m.parts.map((part, index) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div
                        key={`${m.id}-${index}`}
                        className="whitespace-pre-wrap"
                      >
                        {part.text}
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </motion.div>
        ))}

        {/* LOADING STATE INDICATOR */}
        {(status === "submitted" || status === "streaming") && (
          <div className="flex items-center gap-2 text-blue-500 animate-pulse font-mono text-[10px]">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></span>
            SYSTEM_THINKING...
          </div>
        )}

        {/* 4. Anchor element for auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleMockSubmit}
        className="p-6 bg-black/20 border-t border-white/10"
      >
        <div className="relative flex items-center">
          <span className="absolute left-4 text-blue-500 font-mono text-xs">
            {">"}
          </span>
          <input
            className="w-full bg-white/5 border border-white/10 rounded-sm pl-8 pr-12 py-3 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white placeholder:text-slate-700"
            value={input}
            placeholder="Query system for personal data..."
            onChange={(e) => setInput(e.target.value)}
          />

          {status === "submitted" || status === "streaming" ? (
            <button
              type="button"
              onClick={stop}
              className="absolute right-3 px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-500 text-[10px] font-mono hover:bg-red-500 hover:text-white transition-all"
            >
              ABORT
            </button>
          ) : (
            <button
              type="submit"
              className="absolute right-3 p-1 text-slate-500 hover:text-blue-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={status !== "ready"}
            >
              <Send size={16} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
