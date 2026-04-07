"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Terminal } from "lucide-react";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", role: "assistant", content: "SYSTEM READY. Awaiting query..." },
  ]);

  const handleMockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Technical Response Mock
    setTimeout(() => {
      const botMsg = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `[LOG]: Processing intent "${input}". Accessing Noa's skill-vault... Result: Data matches high-proficiency in AI automation.`,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-2"
          >
            <div
              className={`text-[9px] font-mono uppercase tracking-tighter ${m.role === "user" ? "text-blue-400 text-right" : "text-slate-500"}`}
            >
              {m.role === "user" ? "AUTHORIZED_USER" : "SYSTEM_REPLY"}
            </div>
            <div
              className={`p-4 text-xs font-mono leading-relaxed ${
                m.role === "user"
                  ? "bg-blue-500/10 border-r-2 border-blue-500 text-blue-100 self-end ml-12"
                  : "bg-white/5 border-l-2 border-white/20 text-slate-300 mr-12"
              }`}
            >
              {m.content}
            </div>
          </motion.div>
        ))}
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
            placeholder="INPUT COMMAND..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-3 p-1 hover:text-blue-400 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
