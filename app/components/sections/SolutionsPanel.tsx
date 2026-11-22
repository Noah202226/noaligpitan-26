"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  MessageSquareCode,
  Sparkles,
  Workflow,
} from "lucide-react";
import { UNIFIED_DATA } from "@/app/lib/data";

type AudienceFilter = "all" | "business" | "personal";

interface SolutionsPanelProps {
  onAskAi: (prompt: string) => void;
}

const FILTERS: { id: AudienceFilter; label: string }[] = [
  { id: "all", label: "All Solutions" },
  { id: "business", label: "Business Ops" },
  { id: "personal", label: "Personal Automation" },
];

export default function SolutionsPanel({ onAskAi }: SolutionsPanelProps) {
  const [filter, setFilter] = useState<AudienceFilter>("all");

  const filteredServices = UNIFIED_DATA.services.filter((s) =>
    filter === "all" ? true : s.audience === filter,
  );

  const filteredBlueprints = UNIFIED_DATA.automation_blueprints.filter((b) =>
    filter === "all" ? true : b.audience.toLowerCase() === filter,
  );

  return (
    <div className="space-y-6">
      {/* HEADER + AUDIENCE FILTER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black italic text-white uppercase tracking-tighter">
            Automation &amp; Custom Software
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Practical systems built to eliminate repetitive work for businesses
            and individuals.
          </p>
        </div>

        <div className="flex flex-nowrap sm:flex-wrap gap-2 overflow-x-auto no-scrollbar shrink-0">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-xs font-mono text-[11px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  active
                    ? "bg-yellow-500/20 border-yellow-400/60 text-yellow-300"
                    : "bg-white/3 border-white/10 text-slate-400 hover:text-white hover:border-white/25"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-5 rounded-sm border border-white/12 bg-white/4 hover:border-blue-400/45 hover:bg-white/6 transition-all flex flex-col justify-between gap-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-xs font-mono text-[10px] font-bold uppercase tracking-widest border ${
                    service.audience === "personal"
                      ? "bg-emerald-500/15 border-emerald-400/35 text-emerald-300"
                      : "bg-blue-500/15 border-blue-400/35 text-blue-300"
                  }`}
                >
                  {service.badge}
                </span>
                <Cpu
                  size={15}
                  className="text-slate-600 group-hover:text-yellow-400 transition-colors"
                />
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight group-hover:text-blue-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1">
                  {service.tagline}
                </p>
              </div>

              <ul className="space-y-1.5">
                {service.deliverables.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-300 leading-snug"
                  >
                    <CheckCircle2
                      size={14}
                      className="text-yellow-400/85 shrink-0 mt-0.5"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs font-mono text-emerald-300/95 bg-emerald-500/8 border border-emerald-500/20 px-3 py-2 rounded-xs">
                OUTCOME: {service.outcome}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {service.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-0.5 text-[11px] font-mono text-slate-300 bg-black/40 border border-white/12 rounded-xs"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onAskAi(service.chatPrompt)}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
              >
                Ask ARKI_AI
                <ArrowRight size={13} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AUTOMATION BLUEPRINTS (BEFORE -> AFTER) */}
      <div className="space-y-3 pt-3 border-t border-white/10">
        <div className="flex items-center gap-2">
          <Workflow size={16} className="text-yellow-400" />
          <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-white">
            Automation Blueprints (Before {"->"} After)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {filteredBlueprints.map((bp, idx) => (
            <div
              key={idx}
              className="p-4 rounded-sm bg-black/35 border border-white/12 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-white leading-tight">
                    {bp.title}
                  </span>
                  <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-white/10 text-slate-200 rounded-xs shrink-0">
                    {bp.audience}
                  </span>
                </div>

                <div className="space-y-2 text-xs leading-relaxed">
                  <div className="p-2.5 rounded-xs bg-red-500/8 border border-red-500/20">
                    <span className="font-mono text-[10px] font-bold text-red-400 uppercase block mb-0.5">
                      Before (Manual)
                    </span>
                    <span className="text-slate-200">{bp.before}</span>
                  </div>
                  <div className="p-2.5 rounded-xs bg-emerald-500/8 border border-emerald-500/25">
                    <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase block mb-0.5">
                      After (Automated)
                    </span>
                    <span className="text-slate-100">{bp.after}</span>
                  </div>
                </div>
              </div>

              <p className="font-mono text-[11px] text-blue-300/95 pt-1">
                {bp.stack}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4-STEP DELIVERY PROCESS */}
      <div className="space-y-3 pt-3 border-t border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-blue-400" />
          <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-white">
            How We Build Your System
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {UNIFIED_DATA.process_steps.map((p) => (
            <div
              key={p.step}
              className="p-3.5 rounded-xs bg-white/4 border border-white/12 space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black text-yellow-400">
                  {p.step}
                </span>
                <span className="text-sm font-bold text-white uppercase">
                  {p.title}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* DIRECT CONSULTATION CTA */}
      <div className="p-4 sm:p-5 rounded-sm bg-linear-to-r from-blue-500/15 via-yellow-500/10 to-transparent border border-blue-400/35 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm sm:text-base font-black uppercase tracking-wider text-white">
            Ready to automate your operations?
          </p>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            Tell ARKI_AI your workflow bottleneck or reach out directly to scope
            a custom build.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() =>
              onAskAi(
                "I want to automate my operations or build custom software. What details do you need from me to get started?",
              )
            }
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xs bg-yellow-400/20 border border-yellow-400/55 text-yellow-200 hover:bg-yellow-400/30 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <MessageSquareCode size={14} />
            Scope with ARKI_AI
          </button>
          <a
            href="https://web.facebook.com/ArcTechSolutions25"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xs bg-white/8 border border-white/20 text-white hover:border-blue-400/60 hover:text-blue-300 font-mono text-xs font-bold uppercase tracking-wider transition-all"
          >
            ArcTech FB →
          </a>
          <a
            href="https://www.linkedin.com/in/noaligpitan26/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xs bg-white/5 border border-white/15 text-slate-200 hover:border-blue-400/60 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
          >
            LinkedIn →
          </a>
        </div>
      </div>
    </div>
  );
}
