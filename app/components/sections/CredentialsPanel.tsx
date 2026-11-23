"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  SiCisco,
  SiJavascript,
  SiPython,
  SiUdemy,
  SiWordpress,
} from "react-icons/si";
import {
  ArrowUpRight,
  BarChart3,
  Building2,
  Calendar,
  Globe,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { UNIFIED_DATA } from "@/app/lib/data";

type FilterGroup = "all" | "ai-data" | "programming" | "cms-academic";

const FILTERS: { id: FilterGroup; label: string }[] = [
  { id: "all", label: "All Credentials" },
  { id: "ai-data", label: "AI & Data" },
  { id: "programming", label: "Programming" },
  { id: "cms-academic", label: "CMS & Academic" },
];

const SUBJECT_ICONS: Record<
  string,
  { icon: React.ReactNode; badgeClass: string }
> = {
  ai: {
    icon: <Sparkles size={22} />,
    badgeClass:
      "bg-sky-500/15 border-sky-400/40 text-sky-300 group-hover:border-sky-300/70 group-hover:bg-sky-500/25",
  },
  data: {
    icon: <BarChart3 size={22} />,
    badgeClass:
      "bg-sky-500/12 border-sky-400/35 text-sky-300 group-hover:border-sky-300/65 group-hover:bg-sky-500/20",
  },
  python: {
    icon: <SiPython size={21} />,
    badgeClass:
      "bg-sky-500/12 border-sky-400/35 text-sky-300 group-hover:border-sky-300/65 group-hover:bg-sky-500/20",
  },
  javascript: {
    icon: <SiJavascript size={20} />,
    badgeClass:
      "bg-amber-500/14 border-amber-400/40 text-amber-300 group-hover:border-amber-300/70 group-hover:bg-amber-500/22",
  },
  wordpress: {
    icon: <SiWordpress size={21} />,
    badgeClass:
      "bg-sky-500/12 border-sky-400/35 text-sky-300 group-hover:border-sky-300/65 group-hover:bg-sky-500/20",
  },
  academic: {
    icon: <GraduationCap size={22} />,
    badgeClass:
      "bg-emerald-500/12 border-emerald-400/35 text-emerald-300 group-hover:border-emerald-300/65 group-hover:bg-emerald-500/20",
  },
};

const ISSUER_ICONS: Record<string, React.ReactNode> = {
  udemy: <SiUdemy size={14} className="text-sky-300 shrink-0" />,
  cisco: <SiCisco size={18} className="text-sky-300 shrink-0" />,
  virtualworkph: <Globe size={14} className="text-sky-300 shrink-0" />,
  college: <Building2 size={14} className="text-emerald-300 shrink-0" />,
};

export default function CredentialsPanel() {
  const [filter, setFilter] = useState<FilterGroup>("all");

  const visibleCredentials =
    filter === "all"
      ? UNIFIED_DATA.credentials
      : UNIFIED_DATA.credentials.filter((cred) => cred.filterGroup === filter);

  return (
    <div className="space-y-6">
      {/* HEADER + FILTER STRIP */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-50 tracking-tight">
            Credentials &amp; Certifications
          </h2>
          <p className="text-sm text-slate-400 mt-1.5">
            Training and academic certificates — click any card to view.
          </p>
        </div>

        <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
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

      {/* MODERN CREDENTIAL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleCredentials.map((cred, idx) => {
          const subject = SUBJECT_ICONS[cred.iconKey] ?? SUBJECT_ICONS.academic;
          const issuerIcon = ISSUER_ICONS[cred.issuerKey] ?? (
            <Globe size={14} className="text-sky-300 shrink-0" />
          );

          return (
            <motion.a
              key={cred.title}
              href={cred.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.04 }}
              whileHover={{ y: -3 }}
              className="relative overflow-hidden p-5 rounded-2xl bg-slate-800/55 border border-slate-700/65 hover:border-sky-400/55 hover:bg-slate-800/80 flex flex-col justify-between gap-4 group transition-all shadow-lg shadow-slate-950/20"
            >
              {/* Subtle top sheen on hover */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* TOP: ICON MEDALLION + TITLE + BADGES */}
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-all ${subject.badgeClass}`}
                >
                  {subject.icon}
                </div>

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[10px] font-semibold text-sky-300 bg-sky-500/10 border border-sky-400/25 px-2 py-0.5 rounded-md">
                      {cred.category}
                    </span>
                    {cred.featured && (
                      <span className="font-mono text-[10px] font-semibold text-amber-300 bg-amber-500/12 border border-amber-400/35 px-2 py-0.5 rounded-md">
                        Latest
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-base sm:text-[17px] font-bold text-slate-50 group-hover:text-sky-300 transition-colors leading-snug">
                    {cred.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                    {cred.summary}
                  </p>
                </div>
              </div>

              {/* FOOTER: ISSUER + DATE + VIEW CTA */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-700/55 text-xs">
                <span className="inline-flex items-center gap-2 text-slate-200 font-medium min-w-0">
                  <span className="w-6 h-6 rounded-md bg-slate-900/80 border border-slate-700/70 flex items-center justify-center shrink-0">
                    {issuerIcon}
                  </span>
                  <span className="truncate">{cred.issuer}</span>
                </span>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-400">
                    <Calendar size={12} className="text-slate-500" />
                    {cred.id}
                  </span>
                  <span className="inline-flex items-center gap-1 text-amber-300 group-hover:text-amber-200 font-semibold text-xs transition-colors">
                    View
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
