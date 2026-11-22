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
    <div className="w-full space-y-5 font-mono">
      {/* CORE OPERATIONAL CAPABILITIES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {UNIFIED_DATA.capabilities.map((cap, idx) => (
          <motion.div
            key={cap.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            className="p-4 rounded-sm bg-blue-500/8 border border-blue-400/25 space-y-1.5"
          >
            <p className="text-xs sm:text-sm font-black text-blue-300 uppercase tracking-wide">
              {cap.title}
            </p>
            <p className="text-xs sm:text-sm font-sans text-slate-200 leading-relaxed">
              {cap.detail}
            </p>
          </motion.div>
        ))}
      </div>

      {/* TECHNICAL STACK MODULES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {skillGroups.map((group, idx) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`p-4 sm:p-5 rounded-sm border border-white/12 bg-white/4 hover:border-yellow-500/40 hover:bg-white/6 transition-all group space-y-3 ${
              idx === skillGroups.length - 1 ? "md:col-span-2" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[11px] text-yellow-500/75 font-bold tracking-tight shrink-0">
                  [{group.id}]
                </span>
                <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider group-hover:text-yellow-400 transition-colors truncate">
                  {group.category}
                </h3>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <div className="h-1.5 w-24 sm:w-32 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${group.level}%` }}
                    transition={{ duration: 0.9, ease: "circOut" }}
                    className="h-full bg-linear-to-r from-amber-600 to-yellow-400"
                  />
                </div>
                <span className="text-xs font-bold text-yellow-400 w-9 text-right">
                  {group.level}%
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-xs text-slate-200 bg-black/45 border border-white/12 rounded-xs hover:border-blue-400/55 hover:text-white transition-colors"
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
