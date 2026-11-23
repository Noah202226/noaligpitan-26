"use client";
import React from "react";
import { motion } from "framer-motion";
import { UNIFIED_DATA } from "@/app/lib/data";

const SkillsMatrix = () => {
  const skillGroups = [
    {
      category: "Frontend Architecture",
      id: "FE_ARC",
      skills: UNIFIED_DATA.stack.frontend,
      level: 92,
    },
    {
      category: "Backend & API Design",
      id: "BE_LOG",
      skills: UNIFIED_DATA.stack.backend,
      level: 95,
    },
    {
      category: "Database & BaaS",
      id: "DB_INF",
      skills: UNIFIED_DATA.stack.database,
      level: 88,
    },
    {
      category: "Automation & AI",
      id: "AI_AUT",
      skills: UNIFIED_DATA.stack.automation_ai,
      level: 98,
    },
    {
      category: "Tools & Platforms",
      id: "DEV_OPS",
      skills: UNIFIED_DATA.stack.tools,
      level: 90,
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* CORE OPERATIONAL CAPABILITIES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {UNIFIED_DATA.capabilities.map((cap, idx) => (
          <motion.div
            key={cap.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            className="p-4 rounded-lg bg-sky-500/8 border border-sky-400/25 space-y-1.5"
          >
            <p className="font-display text-sm font-bold text-sky-300 tracking-tight">
              {cap.title}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {cap.detail}
            </p>
          </motion.div>
        ))}
      </div>

      {/* TECHNICAL STACK MODULES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillGroups.map((group, idx) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`p-5 rounded-lg border border-slate-700/60 bg-slate-800/55 hover:border-sky-400/45 hover:bg-slate-800/75 transition-all group space-y-3.5 ${
              idx === skillGroups.length - 1 ? "md:col-span-2" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="font-mono text-[11px] font-semibold text-sky-400/85 bg-sky-500/10 border border-sky-400/25 px-2 py-0.5 rounded shrink-0">
                  {group.id}
                </span>
                <h3 className="font-display text-base font-bold text-slate-50 group-hover:text-sky-300 transition-colors truncate">
                  {group.category}
                </h3>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <div className="h-1.5 w-24 sm:w-28 bg-slate-900/90 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${group.level}%` }}
                    transition={{ duration: 0.9, ease: "circOut" }}
                    className="h-full bg-linear-to-r from-sky-500 to-cyan-300 rounded-full"
                  />
                </div>
                <span className="font-mono text-xs font-semibold text-sky-300 w-9 text-right">
                  {group.level}%
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 font-mono text-xs text-slate-200 bg-slate-900/75 border border-slate-700/70 rounded-md hover:border-sky-400/50 hover:text-white transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillsMatrix;
