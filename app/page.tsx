"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Scene from "@/app/components/Scene";
import Chat from "./components/Chat";

type Section = "hero" | "projects" | "credentials";

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("hero");

  return (
    <main className="relative min-h-screen w-full overflow-hidden ">
      <Scene />

      {/* TECHNICAL OVERLAYS */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(2,6,23,0.8)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />

      {/* Corner HUD Brackets */}
      <div className="pointer-events-none fixed inset-10 z-50 border-t border-l border-white/10 w-20 h-20" />
      <div className="pointer-events-none fixed top-10 right-10 z-50 border-t border-r border-white/10 w-20 h-20" />
      <div className="pointer-events-none fixed bottom-10 left-10 z-50 border-b border-l border-white/10 w-20 h-20" />
      <div className="pointer-events-none fixed bottom-10 right-10 z-50 border-b border-r border-white/10 w-20 h-20" />

      <section className="relative z-10 mx-auto max-w-[1600px] px-8 min-h-screen flex items-center justify-center py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch w-full">
          {/* LEFT: IDENTITY & CORE INFO */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
            {/* MODULE 1: IMMERSIVE IDENTITY CARD */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-sm relative overflow-hidden group min-h-[450px] cursor-pointer"
            >
              {/* 1. IMAGE LAYER (Full Card Backround) */}
              <div className="absolute inset-0 z-0 overflow-hidden ">
                <div className="absolute -inset-12 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/40 transition-all duration-700 " />
                <img
                  src="/noa-profile.png"
                  alt="Noa"
                  className="relative w-full h-full object-cover grayscale-50 group-hover:grayscale-0 group-hover:cursor-pointer transition-all duration-700"
                />
              </div>

              {/* 2. TOP BLUE ACCENT LINE */}
              <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500 to-transparent z-20" />

              {/* 3. CONTENT OVERLAY (Highlighted Details) */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 text-center bg-linear-to-b from-transparent via-black/10 to-black/90">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-4xl font-black tracking-tighter uppercase italic text-white">
                      Noa Ligpitan
                    </h3>
                    <p className="text-[12px] font-mono text-blue-400 uppercase tracking-[0.5em] mt-2">
                      Full Stack Developer / Automation Integration
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 w-full pt-4">
                    <div className="p-3 bg-white/10 border border-white/10 text-center backdrop-blur-sm">
                      <p className="text-[9px] text-slate-400 font-mono">
                        STATUS
                      </p>
                      <p className="text-xs font-bold text-emerald-400">
                        AVAILABLE
                      </p>
                    </div>
                    <div className="p-3 bg-white/10 border border-white/10 text-center backdrop-blur-sm">
                      <p className="text-[9px] text-slate-400 font-mono">TZ</p>
                      <p className="text-xs font-bold">GMT+8</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* QUICK STATS MODULE */}
            <div className="grid grid-cols-1 gap-4">
              {["04+ YRS EXP", "REMOTE / PH", "B2B SOLUTIONS"].map(
                (stat, i) => (
                  <div
                    key={i}
                    className="px-6 py-4 border-l-4 border-blue-500 bg-white/5 flex justify-between items-center"
                  >
                    <span className="text-[10px] font-mono text-slate-400">
                      0{i + 1}_NODE
                    </span>
                    <span className="text-sm font-black italic uppercase tracking-widest text-white">
                      {stat}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* CENTER: DYNAMIC CONTENT AREA */}
          <div className="lg:col-span-4 flex flex-col justify-center border-x border-white/5 px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="text-blue-500 font-mono text-xs tracking-tighter mb-2">
                  {`> system_exec --${activeSection}`}
                </div>

                {activeSection === "hero" && (
                  <>
                    <h1 className="text-6xl font-black uppercase tracking-tighter leading-[0.9] text-white">
                      Solving <br />{" "}
                      <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
                        Complex
                      </span>{" "}
                      <br /> Chaos.
                    </h1>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">
                      I architect AI-driven automation workflows that eliminate
                      business friction. From custom LLM integrations to
                      high-performance 3D interfaces.
                    </p>
                  </>
                )}

                {/* Other sections handle similar to previous versions... */}
                {activeSection === "projects" && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-black italic underline decoration-blue-500 underline-offset-8 uppercase text-white">
                      Deployments
                    </h2>
                    <div className="space-y-2 pt-4">
                      {[
                        "CRM Automation",
                        "3D Analytics Engine",
                        "AI Agentic Workflow",
                      ].map((p) => (
                        <div
                          key={p}
                          className="p-3 border border-white/10 hover:bg-blue-500/10 cursor-pointer transition-colors font-mono text-xs text-white"
                        >
                          [RUN] {p}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col gap-4 mt-16">
              {["hero", "projects", "credentials"].map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSection(s as any)}
                  className={`text-left font-mono text-[10px] tracking-[0.3em] uppercase transition-all flex items-center gap-4 group ${
                    activeSection === s
                      ? "text-blue-400"
                      : "text-slate-500 hover:text-white"
                  }`}
                >
                  <div
                    className={`h-px transition-all ${activeSection === s ? "w-12 bg-blue-400" : "w-4 bg-slate-700 group-hover:w-8 group-hover:bg-white"}`}
                  />
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: CHAT INTERFACE */}
          <div className="lg:col-span-4 h-full flex items-center">
            <Chat />
          </div>
        </div>
      </section>
    </main>
  );
}
