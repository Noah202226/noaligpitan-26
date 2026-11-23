"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpenCheck,
  Check,
  Copy,
  FileCode2,
  GitBranch,
  Layers,
  MessageSquareCode,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Sparkles,
  Terminal,
  XCircle,
} from "lucide-react";
import { UNIFIED_DATA } from "@/app/lib/data";

type WorkflowSubView = "overview" | "skills" | "starter";

interface AiWorkflowPanelProps {
  onAskAi: (prompt: string) => void;
}

const SUB_VIEWS: { id: WorkflowSubView; label: string }[] = [
  { id: "overview", label: "Overview & Architecture" },
  { id: "skills", label: "Skills & Guardrails" },
  { id: "starter", label: "Starter Kit (Copy)" },
];

export default function AiWorkflowPanel({ onAskAi }: AiWorkflowPanelProps) {
  const workflow = UNIFIED_DATA.ai_workflow;
  const [subView, setSubView] = useState<WorkflowSubView>("overview");
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    workflow.templates[0].id,
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeTemplate =
    workflow.templates.find((t) => t.id === selectedTemplateId) ??
    workflow.templates[0];

  const handleCopy = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId((current) => (current === id ? null : current));
      }, 2000);
    } catch {
      // Fallback if clipboard API is unavailable
    }
  };

  return (
    <div className="space-y-7">
      {/* HEADER + SUB-VIEW SWITCHER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-50 tracking-tight">
            {workflow.headline}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            {workflow.tagline}
          </p>
        </div>

        <div className="flex flex-nowrap sm:flex-wrap gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          {SUB_VIEWS.map((v) => {
            const active = subView === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setSubView(v.id)}
                className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  active
                    ? "bg-sky-500/15 border-sky-400/55 text-sky-200"
                    : "bg-slate-800/55 border-slate-700/60 text-slate-400 hover:text-slate-100 hover:border-slate-600"
                }`}
              >
                {v.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW 1: OVERVIEW & ARCHITECTURE */}
      {subView === "overview" && (
        <div className="space-y-7">
          {/* VIBE CODING VS CONTEXT ENGINEERING */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <Sparkles size={17} className="text-sky-400" />
              <h3 className="font-display text-base font-bold text-slate-100">
                Why Context Engineering Beats Vibe Coding
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {workflow.comparison.map((row, idx) => (
                <motion.div
                  key={row.aspect}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="p-4 rounded-xl bg-slate-900/75 border border-slate-700/65 space-y-2.5"
                >
                  <p className="font-display text-sm font-bold text-slate-100">
                    {row.aspect}
                  </p>
                  <div className="space-y-2 text-xs sm:text-[13px] leading-relaxed">
                    <div className="p-2.5 rounded-lg bg-rose-500/8 border border-rose-400/20 flex items-start gap-2">
                      <XCircle
                        size={15}
                        className="text-rose-400 shrink-0 mt-0.5"
                      />
                      <div>
                        <span className="font-mono text-[10px] font-semibold text-rose-400 uppercase block mb-0.5">
                          Vibe Coding
                        </span>
                        <span className="text-slate-300">{row.vibeCoding}</span>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-500/8 border border-emerald-400/25 flex items-start gap-2">
                      <ShieldCheck
                        size={15}
                        className="text-emerald-400 shrink-0 mt-0.5"
                      />
                      <div>
                        <span className="font-mono text-[10px] font-semibold text-emerald-400 uppercase block mb-0.5">
                          My Context Engineering
                        </span>
                        <span className="text-slate-100">
                          {row.contextEngineering}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 4-LAYER AGENTIC STACK */}
          <div className="space-y-3.5 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <Layers size={17} className="text-sky-400" />
              <h3 className="font-display text-base font-bold text-slate-100">
                4-Layer Agentic Architecture (Used on This App)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {workflow.layers.map((layer) => (
                <div
                  key={layer.index}
                  className="p-5 rounded-xl bg-slate-800/55 border border-slate-700/65 hover:border-sky-400/50 transition-all space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-sky-400">
                        {layer.index}
                      </span>
                      <h4 className="font-display text-base font-bold text-slate-50">
                        {layer.title}
                      </h4>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-900/85 border border-slate-700/75 font-mono text-[11px] text-sky-300">
                      {layer.path}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {layer.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* BUILD-GATED DELIVERY LOOP */}
          <div className="space-y-3.5 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <GitBranch size={17} className="text-emerald-400" />
              <h3 className="font-display text-base font-bold text-slate-100">
                Verified Agentic Delivery Loop
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {workflow.delivery_loop.map((item) => (
                <div
                  key={item.step}
                  className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1"
                >
                  <span className="font-mono text-xs font-bold text-sky-400 block">
                    {item.step}
                  </span>
                  <p className="font-display text-xs sm:text-sm font-bold text-slate-50">
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-300 leading-snug">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: SKILLS & GUARDRAILS */}
      {subView === "skills" && (
        <div className="space-y-7">
          {/* LIVE WORKSPACE SKILLS CATALOG */}
          <div className="space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Terminal size={17} className="text-sky-400" />
                <h3 className="font-display text-base font-bold text-slate-100">
                  Live Workspace Skills (.agents/skills/)
                </h3>
              </div>
              <span className="font-mono text-xs font-medium text-sky-300 bg-sky-500/10 border border-sky-400/25 px-2.5 py-0.5 rounded-md">
                {workflow.skills_catalog.length} Active Runbooks
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {workflow.skills_catalog.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="p-4 rounded-xl bg-slate-800/55 border border-slate-700/65 hover:border-sky-400/45 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-sm font-bold text-sky-300">
                      /{skill.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-900/80 border border-slate-700 font-mono text-[10px] text-slate-300">
                      SKILL.md
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-400">
                    When used: <span className="text-slate-300">{skill.trigger}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {skill.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* COMMAND POLICY MATRIX */}
          <div className="space-y-3.5 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-emerald-400" />
              <h3 className="font-display text-base font-bold text-slate-100">
                Deterministic PreToolUse Command Policy (command-policy.mjs)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {workflow.guardrails.map((g) => {
                const style =
                  g.tone === "red"
                    ? {
                        card: "bg-rose-500/8 border-rose-400/30",
                        badge: "text-rose-300 border-rose-400/45 bg-rose-500/15",
                        icon: (
                          <ShieldAlert size={14} className="text-rose-400" />
                        ),
                      }
                    : g.tone === "amber"
                      ? {
                          card: "bg-amber-500/8 border-amber-400/30",
                          badge:
                            "text-amber-300 border-amber-400/45 bg-amber-500/15",
                          icon: (
                            <ShieldQuestion
                              size={14}
                              className="text-amber-400"
                            />
                          ),
                        }
                      : {
                          card: "bg-emerald-500/8 border-emerald-400/30",
                          badge:
                            "text-emerald-300 border-emerald-400/45 bg-emerald-500/15",
                          icon: (
                            <ShieldCheck
                              size={14}
                              className="text-emerald-400"
                            />
                          ),
                        };

                return (
                  <div
                    key={g.tier}
                    className={`p-4 rounded-xl border space-y-3 ${style.card}`}
                  >
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border font-mono text-[10px] font-bold uppercase tracking-wider ${style.badge}`}
                    >
                      {style.icon}
                      {g.tier}
                    </span>
                    <p className="font-display text-sm font-bold text-slate-50">
                      {g.title}
                    </p>
                    <ul className="space-y-1.5 text-xs sm:text-[13px] text-slate-200 leading-snug">
                      {g.rules.map((rule, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-slate-500 select-none">•</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: REUSABLE STARTER KIT (COPY-PASTE BLUEPRINTS) */}
      {subView === "starter" && (
        <div className="space-y-5">
          {/* QUICK REUSE STEPS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {workflow.reuse_steps.map((stepText, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-800/55 border border-slate-700/65 space-y-1.5"
              >
                <span className="font-mono text-xs font-bold text-sky-400">
                  Step 0{idx + 1}
                </span>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {stepText}
                </p>
              </div>
            ))}
          </div>

          {/* TEMPLATE PICKER + CODE PREVIEW */}
          <div className="rounded-xl border border-slate-700/75 bg-[#090e1a] overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 overflow-x-auto no-scrollbar">
                {workflow.templates.map((tpl) => {
                  const active = tpl.id === activeTemplate.id;
                  return (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => setSelectedTemplateId(tpl.id)}
                      className={`shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        active
                          ? "bg-sky-500/18 border-sky-400/55 text-sky-200"
                          : "bg-slate-800/60 border-slate-700/70 text-slate-400 hover:text-slate-100 hover:border-slate-600"
                      }`}
                    >
                      <FileCode2 size={13} />
                      {tpl.label}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() =>
                  handleCopy(activeTemplate.id, activeTemplate.code)
                }
                className="shrink-0 inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500/20 border border-amber-400/55 text-amber-200 hover:bg-amber-500/30 text-xs font-semibold transition-all cursor-pointer"
              >
                {copiedId === activeTemplate.id ? (
                  <>
                    <Check size={14} className="text-emerald-300" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy Template
                  </>
                )}
              </button>
            </div>

            <div className="px-4 py-2.5 border-b border-slate-800/80 bg-slate-900/40 flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs text-sky-300 font-semibold">
                {activeTemplate.filename}
              </span>
              <span className="text-xs text-slate-400">
                {activeTemplate.description}
              </span>
            </div>

            <pre className="p-4 sm:p-5 overflow-x-auto custom-scrollbar font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200">
              <code>{activeTemplate.code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* CTA FOOTER */}
      <div className="p-5 rounded-xl bg-linear-to-r from-sky-500/12 via-slate-800/75 to-amber-500/10 border border-sky-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <BookOpenCheck
            size={20}
            className="text-sky-400 shrink-0 mt-0.5"
          />
          <div>
            <p className="font-display text-base font-bold text-slate-50">
              Want AI-Accelerated Delivery Without Fragile Code?
            </p>
            <p className="text-sm text-slate-300 mt-0.5">
              Ask ARKI_AI how this context engineering workflow speeds up client
              builds while maintaining production quality.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onAskAi(
              "Explain Noa's Context Engineering & AI Workflow setup and why it produces more reliable software than vibe coding.",
            )
          }
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/20 border border-amber-400/55 text-amber-200 hover:bg-amber-500/30 text-xs font-semibold transition-all cursor-pointer"
        >
          <MessageSquareCode size={14} />
          Ask ARKI_AI
        </button>
      </div>
    </div>
  );
}
