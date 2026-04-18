"use client";
import React from "react";
import { motion } from "framer-motion";
import { UNIFIED_DATA } from "@/app/lib/data"; // Adjust path as needed

const SkillsMatrix = () => {
  // Mapping the stack categories to the UI structure
  const skillGroups = [
    {
      category: "Frontend Architecture",
      id: "FE_ARC",
      skills: UNIFIED_DATA.stack.frontend,
      level: 92,
    },
    {
      category: "Server-Side Logic",
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
      category: "Automation & Neural",
      id: "AI_AUT",
      skills: UNIFIED_DATA.stack.automation_ai,
      level: 98,
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-10 font-mono">
      {/* HUD HEADER - YELLOW THEME */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
          <h2 className="text-[10px] font-bold tracking-[0.4em] text-white uppercase">
            Current Tech
          </h2>
        </div>
        <span className="text-[9px] text-slate-500 tracking-widest uppercase">
          Status: <span className="text-yellow-400">Optimized</span>
        </span>
      </div>

      {/* DYNAMIC SKILLS LIST */}
      <div className="grid grid-cols-1 gap-y-12">
        {skillGroups.map((group, idx) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
              <div className="space-y-1">
                <p className="text-[8px] text-yellow-500/60 font-bold tracking-tighter">
                  SYSTEM_ID: {group.id}
                </p>
                <h3 className="text-sm font-black text-white uppercase tracking-wider group-hover:text-yellow-400 transition-colors">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-col items-end gap-2 w-full md:w-48">
                <div className="flex justify-between w-full text-[9px] font-bold">
                  <span className="text-slate-500 uppercase">Load_Factor</span>
                  <span className="text-yellow-400">{group.level}%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${group.level}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-linear-to-r from-amber-600 to-yellow-400"
                  />
                </div>
              </div>
            </div>

            {/* DYNAMIC TAGS FROM LIB/DATA.TS */}
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-yellow-500/40 font-bold">//</span>
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
