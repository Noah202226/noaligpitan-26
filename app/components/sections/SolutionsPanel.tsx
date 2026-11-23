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
    <div className="space-y-7">
      {/* HEADER + AUDIENCE FILTER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-50 tracking-tight">
            Automation &amp; Custom Software
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Practical systems built to eliminate repetitive work for businesses
            and individuals.
          </p>
        </div>

        <div className="flex flex-nowrap sm:flex-wrap gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  active
                    ? "bg-sky-500/15 border-sky-400/55 text-sky-200"
                    : "bg-slate-800/55 border-slate-700/60 text-slate-400 hover:text-slate-100 hover:border-slate-600"
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
            className="p-5 rounded-xl border border-slate-700/65 bg-slate-800/55 hover:border-sky-400/50 hover:bg-slate-800/75 transition-all flex flex-col justify-between gap-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-md font-mono text-[10px] font-semibold uppercase tracking-wide border ${
                    service.audience === "personal"
                      ? "bg-emerald-500/12 border-emerald-400/35 text-emerald-300"
                      : "bg-sky-500/12 border-sky-400/35 text-sky-300"
                  }`}
                >
                  {service.badge}
                </span>
                <Cpu
                  size={15}
                  className="text-slate-500 group-hover:text-sky-400 transition-colors"
                />
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-slate-50 tracking-tight group-hover:text-sky-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mt-1">
                  {service.tagline}
                </p>
              </div>

              <ul className="space-y-1.5">
                {service.deliverables.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs sm:text-[13.5px] text-slate-300 leading-snug"
                  >
                    <CheckCircle2
                      size={15}
                      className="text-sky-400 shrink-0 mt-0.5"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs sm:text-[13px] font-medium text-emerald-300 bg-emerald-500/8 border border-emerald-400/20 px-3 py-2 rounded-lg">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-emerald-400 mr-1.5">
                  Outcome:
                </span>
                {service.outcome}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {service.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-0.5 font-mono text-[11px] text-slate-300 bg-slate-900/75 border border-slate-700/70 rounded-md"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onAskAi(service.chatPrompt)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
              >
                Ask ARKI_AI
                <ArrowRight size={13} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AUTOMATION BLUEPRINTS (BEFORE -> AFTER) */}
      <div className="space-y-3.5 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <Workflow size={17} className="text-sky-400" />
          <h3 className="font-display text-base font-bold text-slate-100">
            Automation Blueprints (Before → After)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {filteredBlueprints.map((bp, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/75 border border-slate-700/65 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-sm font-bold text-slate-50 leading-tight">
                    {bp.title}
                  </span>
                  <span className="font-mono text-[10px] font-medium px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 rounded-md shrink-0">
                    {bp.audience}
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-[13px] leading-relaxed">
                  <div className="p-2.5 rounded-lg bg-rose-500/8 border border-rose-400/20">
                    <span className="font-mono text-[10px] font-semibold text-rose-400 uppercase block mb-0.5">
                      Before (Manual)
                    </span>
                    <span className="text-slate-300">{bp.before}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-500/8 border border-emerald-400/25">
                    <span className="font-mono text-[10px] font-semibold text-emerald-400 uppercase block mb-0.5">
                      After (Automated)
                    </span>
                    <span className="text-slate-200">{bp.after}</span>
                  </div>
                </div>
              </div>

              <p className="font-mono text-[11px] text-sky-300 pt-1">
                {bp.stack}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4-STEP DELIVERY PROCESS */}
      <div className="space-y-3.5 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles size={17} className="text-sky-400" />
          <h3 className="font-display text-base font-bold text-slate-100">
            How We Build Your System
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {UNIFIED_DATA.process_steps.map((p) => (
            <div
              key={p.step}
              className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-sky-400">
                  {p.step}
                </span>
                <span className="font-display text-sm font-bold text-slate-50">
                  {p.title}
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* DIRECT CONSULTATION CTA */}
      <div className="p-5 rounded-xl bg-linear-to-r from-sky-500/12 via-slate-800/75 to-amber-500/10 border border-sky-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-display text-base font-bold text-slate-50">
            Ready to automate your operations?
          </p>
          <p className="text-sm text-slate-300 mt-0.5">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/20 border border-amber-400/55 text-amber-200 hover:bg-amber-500/30 text-xs font-semibold transition-all cursor-pointer"
          >
            <MessageSquareCode size={14} />
            Scope with ARKI_AI
          </button>
          <a
            href="https://web.facebook.com/ArcTechSolutions25"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-lg bg-slate-800/90 border border-slate-600/70 text-slate-100 hover:border-sky-400/60 hover:text-sky-200 text-xs font-semibold transition-all"
          >
            ArcTech FB →
          </a>
          <a
            href="https://www.linkedin.com/in/noaligpitan26/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-lg bg-slate-900/80 border border-slate-700/70 text-slate-300 hover:border-sky-400/60 hover:text-white text-xs font-semibold transition-all"
          >
            LinkedIn →
          </a>
        </div>
      </div>
    </div>
  );
}
