"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiFacebook, SiYoutube, SiX } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

import Scene from "@/app/components/Scene";
import Chat, { ChatHandle } from "./components/Chat";
import SkillsMatrix from "./components/sections/SkillsMatrix";
import SolutionsPanel from "./components/sections/SolutionsPanel";

import { UNIFIED_DATA } from "@/app/lib/data";

type Section =
  | "mission"
  | "solutions"
  | "skills"
  | "projects"
  | "experience"
  | "credentials";

const SECTIONS: { id: Section; label: string }[] = [
  { id: "mission", label: "Mission" },
  { id: "solutions", label: "Solutions" },
  { id: "skills", label: "Tech & Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "credentials", label: "Credentials" },
];

const STATUSES = [
  { text: "OPEN FOR WORK", color: "text-emerald-400" },
  { text: "SIDE PROJECTS", color: "text-blue-400" },
  { text: "FULL-TIME JOB", color: "text-cyan-400" },
  { text: "PART-TIME JOB", color: "text-indigo-400" },
];

const SOCIAL_LINKS = [
  {
    icon: <SiFacebook size={16} />,
    href: "https://web.facebook.com/ArcTechSolutions25",
    label: "Side Hustle",
  },
  {
    icon: <FaLinkedin size={16} />,
    href: "https://www.linkedin.com/in/noaligpitan26/",
    label: "LinkedIn",
  },
  {
    icon: <SiYoutube size={16} />,
    href: "https://www.youtube.com/@devBrosPh",
    label: "YouTube",
  },
  {
    icon: <SiX size={16} />,
    href: "https://x.com/Xavier26_2022",
    label: "X / Twitter",
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("mission");
  const [statusIndex, setStatusIndex] = useState(0);
  const chatRef = useRef<ChatHandle>(null);

  const handleAskAi = (prompt: string) => {
    chatRef.current?.openWithPrompt(prompt);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUSES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const [primaryRole, secondaryRole] = UNIFIED_DATA.identity.role.split(" & ");
  const philosophyHeading = UNIFIED_DATA.identity.philosophy.split(".")[0];
  const philosophySubtext = UNIFIED_DATA.identity.philosophy
    .substring(UNIFIED_DATA.identity.philosophy.indexOf(".") + 1)
    .trim();

  const corePreviewSkills = [
    ...UNIFIED_DATA.stack.frontend.slice(0, 2),
    ...UNIFIED_DATA.stack.backend.slice(0, 2),
    ...UNIFIED_DATA.stack.database.slice(0, 2),
    ...UNIFIED_DATA.stack.automation_ai.slice(0, 2),
  ];

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden lg:h-screen lg:overflow-hidden">
      <Scene />

      {/* TECHNICAL OVERLAYS */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(2,6,23,0.9)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[40px_40px]" />

      <section className="relative z-10 mx-auto max-w-[1640px] px-4 sm:px-8 lg:px-10 xl:px-14 min-h-screen lg:h-screen flex items-start lg:items-center justify-center py-5 pb-24 lg:py-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-stretch w-full lg:h-[calc(100vh-3.5rem)] lg:max-h-[920px]">
          {/* LEFT: IDENTITY COLUMN */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-3.5 min-h-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-md relative overflow-hidden group h-80 sm:h-96 lg:flex-1 lg:min-h-[300px] shadow-2xl shadow-blue-500/10"
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute -inset-12 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-500/40 transition-all duration-700" />
                <img
                  src="/noa-full-body.jpg"
                  alt={UNIFIED_DATA.identity.name}
                  className="relative w-full h-full object-cover object-top grayscale-50 group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
              </div>

              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-blue-400 to-transparent z-20 shadow-[0_0_15px_rgba(96,165,250,0.8)]" />

              <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 text-center bg-linear-to-b from-transparent via-black/30 to-black/95">
                <div className="space-y-3.5">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <h1 className="text-3xl xl:text-4xl font-black tracking-tighter uppercase italic text-white drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                      {UNIFIED_DATA.identity.name}
                    </h1>
                    <p className="text-xs font-mono text-yellow-400 font-bold uppercase tracking-[0.2em] mt-2 leading-snug drop-shadow-md">
                      {primaryRole}{" "}
                      <span className="text-white/30">{"//"}</span>{" "}
                      {secondaryRole}
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-2.5 w-full">
                    <div className="px-3 py-2 bg-white/10 border border-white/20 text-center backdrop-blur-md relative overflow-hidden h-14 flex flex-col justify-center rounded-xs">
                      <p className="text-[9px] text-slate-300 font-mono mb-0.5 tracking-widest uppercase">
                        OPEN FOR
                      </p>
                      <div className="relative h-4">
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={statusIndex}
                            initial={{ y: 14, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -14, opacity: 0 }}
                            className={`text-[11px] font-black tracking-tight ${STATUSES[statusIndex].color} uppercase`}
                          >
                            {STATUSES[statusIndex].text}
                          </motion.p>
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="px-3 py-2 bg-white/10 border border-white/20 text-center backdrop-blur-md h-14 flex flex-col justify-center rounded-xs">
                      <p className="text-[9px] text-slate-300 font-mono mb-0.5 tracking-widest uppercase">
                        LOC_TIME
                      </p>
                      <p className="text-[11px] font-black text-white">
                        {UNIFIED_DATA.identity.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Experience Stats & Socials */}
            <div className="flex flex-col gap-2.5 shrink-0">
              <div className="flex lg:grid lg:grid-cols-1 gap-2 overflow-x-auto no-scrollbar pb-0.5 lg:pb-0">
                {[
                  `${UNIFIED_DATA.identity.experience_years} YRS EXP`,
                  "API INTEGRATION",
                  "B2B SOLUTIONS",
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 4 }}
                    className="shrink-0 whitespace-nowrap px-3.5 lg:px-4 py-2 lg:py-2.5 border-l-3 border-blue-500 bg-white/5 border-y border-r border-y-white/10 border-r-white/10 flex justify-between items-center gap-2.5 backdrop-blur-sm group rounded-r-xs"
                  >
                    <span className="text-xs sm:text-sm font-black italic uppercase tracking-[0.14em] text-white group-hover:text-blue-400 transition-colors">
                      {stat}
                    </span>
                    <div className="h-2 w-2 bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)] shrink-0" />
                  </motion.div>
                ))}
              </div>

              {/* SOCIAL ACCOUNTS: single horizontal swipe row on mobile, 2x2 grid on desktop */}
              <div className="flex lg:grid lg:grid-cols-2 gap-2 overflow-x-auto no-scrollbar pb-0.5 lg:pb-0">
                {SOCIAL_LINKS.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(59, 130, 246, 0.12)",
                    }}
                    className="shrink-0 whitespace-nowrap px-3.5 lg:px-3 py-2.5 border border-white/10 bg-white/5 backdrop-blur-sm flex items-center gap-2 group transition-all rounded-xs"
                  >
                    <div className="text-blue-400 group-hover:text-yellow-400 transition-colors shrink-0">
                      {social.icon}
                    </div>
                    <span className="text-[11px] font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: WIDE DYNAMIC CONTENT PANEL (MISSION, SOLUTIONS, SKILLS, PROJECTS, EXPERIENCE, CREDENTIALS) */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col bg-white/[0.03] backdrop-blur-xl border border-white/15 rounded-lg overflow-hidden min-h-0">
            {/* TOP HUD NAVIGATION TABS: horizontal swipe row on mobile, wrapped/full on desktop */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-white/10 bg-black/35 shrink-0">
              <div className="flex flex-nowrap lg:flex-wrap items-center gap-2 overflow-x-auto no-scrollbar">
                {SECTIONS.map((s) => {
                  const isActive = activeSection === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveSection(s.id)}
                      className={`shrink-0 whitespace-nowrap px-3.5 py-2 rounded-xs font-mono text-xs sm:text-[13px] font-bold tracking-[0.12em] uppercase transition-all border cursor-pointer ${
                        isActive
                          ? "bg-blue-500/20 border-blue-400/60 text-blue-200 shadow-[0_0_14px_rgba(59,130,246,0.28)]"
                          : "bg-white/3 border-white/10 text-slate-400 hover:text-white hover:border-white/25"
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SCROLLABLE DETAIL CONTENT */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 custom-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/25 text-blue-400 font-mono text-[11px] tracking-widest uppercase">
                    {`--> ${activeSection}`}
                  </div>

                  {activeSection === "mission" && (
                    <div className="space-y-6">
                      <h2 className="text-4xl sm:text-5xl xl:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-white">
                        {philosophyHeading}.
                      </h2>
                      <div className="space-y-3 max-w-3xl">
                        <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-medium">
                          {philosophySubtext}
                        </p>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                          {UNIFIED_DATA.identity.summary}
                        </p>
                      </div>

                      {/* What I Build & Automate CTA Strip */}
                      <div className="p-5 rounded-sm bg-blue-500/8 border border-blue-400/25 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-mono text-xs uppercase tracking-[0.2em] text-blue-300 font-bold">
                            For Businesses &amp; Individuals
                          </span>
                          <button
                            type="button"
                            onClick={() => setActiveSection("solutions")}
                            className="font-mono text-xs font-bold uppercase tracking-wider text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
                          >
                            Explore Solutions →
                          </button>
                        </div>
                        <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                          From{" "}
                          <span className="text-white font-semibold">
                            n8n workflow automation
                          </span>{" "}
                          and{" "}
                          <span className="text-white font-semibold">
                            AI assistants
                          </span>{" "}
                          to{" "}
                          <span className="text-white font-semibold">
                            custom operational web apps &amp; PWAs
                          </span>{" "}
                          — built to save hours and streamline daily operations.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {UNIFIED_DATA.services.map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => setActiveSection("solutions")}
                              className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-blue-200 bg-black/35 border border-blue-400/25 hover:border-yellow-400/50 hover:text-yellow-300 rounded-xs transition-colors cursor-pointer"
                            >
                              {s.badge}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quick Tech Stack Preview with shortcut to full Skills Matrix */}
                      <div className="pt-4 border-t border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs uppercase tracking-[0.2em] text-yellow-400 font-bold">
                            Core Stack Snapshot
                          </span>
                          <button
                            type="button"
                            onClick={() => setActiveSection("skills")}
                            className="font-mono text-xs uppercase tracking-wider text-blue-400 hover:text-yellow-400 transition-colors cursor-pointer"
                          >
                            Full Matrix →
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {corePreviewSkills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 text-xs font-mono text-slate-200 bg-white/6 border border-white/12 rounded-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Quick Summary Counters */}
                      <div className="grid grid-cols-3 gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() => setActiveSection("solutions")}
                          className="p-4 rounded-xs bg-white/4 border border-white/10 hover:border-yellow-400/45 text-left transition-all cursor-pointer"
                        >
                          <p className="text-2xl sm:text-3xl font-black text-white leading-none">
                            {UNIFIED_DATA.services.length}
                          </p>
                          <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-1.5">
                            Core Solutions
                          </p>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveSection("projects")}
                          className="p-4 rounded-xs bg-white/4 border border-white/10 hover:border-blue-400/45 text-left transition-all cursor-pointer"
                        >
                          <p className="text-2xl sm:text-3xl font-black text-white leading-none">
                            {UNIFIED_DATA.projects.length}
                          </p>
                          <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-1.5">
                            Live Systems
                          </p>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveSection("credentials")}
                          className="p-4 rounded-xs bg-white/4 border border-white/10 hover:border-blue-400/45 text-left transition-all cursor-pointer"
                        >
                          <p className="text-2xl sm:text-3xl font-black text-white leading-none">
                            {UNIFIED_DATA.credentials.length}
                          </p>
                          <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-1.5">
                            Credentials
                          </p>
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSection === "solutions" && (
                    <SolutionsPanel onAskAi={handleAskAi} />
                  )}

                  {activeSection === "skills" && (
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h2 className="text-3xl sm:text-4xl font-black italic text-white uppercase tracking-tighter">
                          Tech Stack &amp; Skills
                        </h2>
                        <span className="font-mono text-xs uppercase tracking-widest text-yellow-400/85">
                          5 Modules Active
                        </span>
                      </div>
                      <SkillsMatrix />
                    </div>
                  )}

                  {activeSection === "projects" && (
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h2 className="text-3xl sm:text-4xl font-black italic text-white uppercase tracking-tighter">
                          Active Deployments
                        </h2>
                        <span className="font-mono text-xs uppercase tracking-widest text-blue-400/85">
                          Operational Case Studies
                        </span>
                      </div>
                      <div className="space-y-3.5">
                        {UNIFIED_DATA.projects.map((p) => (
                          <motion.a
                            key={p.name}
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 4 }}
                            className="p-5 rounded-sm border border-white/12 bg-white/5 hover:bg-blue-500/12 hover:border-blue-400/50 cursor-pointer transition-all flex flex-col gap-3 group"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex flex-wrap items-center gap-2.5">
                                <span className="font-mono text-sm sm:text-base text-yellow-400 font-bold uppercase tracking-tight">
                                  [RUN] {p.name}
                                </span>
                                <span className="text-[11px] bg-white/10 text-slate-100 px-2 py-0.5 font-mono uppercase rounded-xs">
                                  {p.category}
                                </span>
                                <span className="text-[11px] bg-blue-500/20 text-blue-200 px-2 py-0.5 font-mono rounded-xs">
                                  {p.tech}
                                </span>
                              </div>
                              <span className="text-blue-400 group-hover:translate-x-1 transition-transform font-mono text-xs sm:text-sm font-bold shrink-0">
                                Live Demo →
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm leading-relaxed">
                              <div className="p-3 rounded-xs bg-black/35 border border-white/10">
                                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
                                  Problem
                                </span>
                                <span className="text-slate-200">
                                  {p.problem}
                                </span>
                              </div>
                              <div className="p-3 rounded-xs bg-black/35 border border-white/10">
                                <span className="font-mono text-[10px] uppercase tracking-wider text-blue-400 block mb-1">
                                  Solution Built
                                </span>
                                <span className="text-slate-100">
                                  {p.solution}
                                </span>
                              </div>
                            </div>

                            <p className="text-xs sm:text-sm font-mono text-emerald-300/95">
                              IMPACT: {p.impact}
                            </p>
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSection === "experience" && (
                    <div className="space-y-4">
                      <h2 className="text-3xl sm:text-4xl font-black italic text-white uppercase tracking-tighter">
                        Experience Ledger
                      </h2>
                      <div className="space-y-5 pt-1">
                        {UNIFIED_DATA.experience.map((exp, i) => (
                          <div
                            key={i}
                            className="border-l-2 border-blue-500/45 pl-4 sm:pl-5 space-y-1.5 relative group"
                          >
                            <div className="absolute -left-[2px] top-0 h-5 w-[2px] bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex flex-wrap justify-between items-baseline gap-2">
                              <h4 className="text-white font-black text-base sm:text-lg uppercase tracking-wider group-hover:text-blue-400 transition-colors">
                                {exp.company}
                              </h4>
                              <span className="text-xs font-mono text-blue-400">
                                {exp.period}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-yellow-400 font-bold uppercase tracking-widest">
                              {exp.role}
                            </p>
                            <p className="text-slate-200 text-sm sm:text-[15px] leading-relaxed">
                              {exp.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSection === "credentials" && (
                    <div className="space-y-4">
                      <h2 className="text-3xl sm:text-4xl font-black italic text-white uppercase tracking-tighter">
                        Authentication Keys
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {UNIFIED_DATA.credentials.map((cred, i) => (
                          <motion.a
                            key={i}
                            href={cred.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 4 }}
                            className="p-5 rounded-sm bg-white/5 border border-white/12 hover:border-yellow-500/55 hover:bg-yellow-500/8 flex flex-col justify-between space-y-3 group transition-all"
                          >
                            <div className="flex justify-between items-start gap-3">
                              <span className="text-white font-bold text-sm sm:text-base uppercase group-hover:text-yellow-400 transition-colors leading-snug">
                                {cred.title}
                              </span>
                              <span className="text-[10px] font-mono text-yellow-400 border border-yellow-500/40 px-2 py-0.5 shrink-0">
                                VERIFIED
                              </span>
                            </div>
                            <div className="flex flex-wrap justify-between items-center gap-2 text-xs font-mono text-slate-300 uppercase tracking-tight">
                              <span>{cred.issuer}</span>
                              <span className="text-slate-200 group-hover:text-white transition-colors font-bold">
                                {cred.id}
                              </span>
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING POPUP CHAT MODAL */}
      <Chat ref={chatRef} />
    </main>
  );
}
