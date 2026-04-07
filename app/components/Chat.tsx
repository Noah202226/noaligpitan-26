"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot } from "lucide-react";

export default function Chat() {
  // 1. Local state for mock functionality
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI guide. How can I help you explore this portfolio?",
    },
    { id: "2", role: "user", content: "What technologies were used here?" },
    {
      id: "3",
      role: "assistant",
      content:
        "This project uses Next.js, Three.js (React Three Fiber), Tailwind CSS, and Framer Motion for animations!",
    },
  ]);

  // 2. Simple mock handler
  const handleMockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate AI thinking
    setIsLoading(true);
    setTimeout(() => {
      const botMsg = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "That's a great question! Since this is a UI mock, I'm just a hardcoded response for now.",
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto h-[500px] bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/5">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono tracking-widest uppercase text-slate-300">
            AI that tells about me
          </span>
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex items-start gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`p-2 rounded-full ${
                  m.role === "user"
                    ? "bg-blue-600 shadow-lg shadow-blue-500/20"
                    : "bg-slate-800 border border-white/10"
                }`}
              >
                {m.role === "user" ? (
                  <User size={14} className="text-white" />
                ) : (
                  <Bot size={14} className="text-white" />
                )}
              </div>
              <div
                className={`max-w-[85%] p-3 px-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-linear-to-br from-blue-500 to-indigo-600 text-white rounded-tr-none shadow-md"
                    : "bg-white/5 text-slate-200 rounded-tl-none border border-white/10 backdrop-blur-sm"
                }`}
              >
                {m.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start items-center gap-2"
          >
            <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleMockSubmit}
        className="p-4 bg-black/40 border-t border-white/10 backdrop-blur-md"
      >
        <div className="relative flex items-center gap-2">
          <input
            className="flex-1 bg-slate-900/50 border border-white/10 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder:text-slate-500"
            value={input}
            placeholder="Type a message..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-white text-black rounded-full hover:bg-slate-200 disabled:opacity-20 disabled:grayscale transition-all cursor-pointer"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
