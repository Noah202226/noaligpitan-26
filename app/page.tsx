"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiFacebook, SiYoutube, SiX } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Compass,
  Cpu,
  FolderGit2,
  Layers,
  PanelLeftClose,
  PanelLeftOpen,
  Workflow,
} from "lucide-react";

import Scene from "@/app/components/Scene";
import Chat, { ChatHandle } from "./components/Chat";
import SkillsMatrix from "./components/sections/SkillsMatrix";
import SolutionsPanel from "./components/sections/SolutionsPanel";
import AiWorkflowPanel from "./components/sections/AiWorkflowPanel";

import { UNIFIED_DATA } from "@/app/lib/data";

type Section =
  | "mission"
  | "solutions"
  | "workflow"
  | "skills"
  | "projects"
  | "experience"
  | "credentials";

const SECTIONS: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "mission", label: "Mission", icon: <Compass size={15} /> },
  { id: "solutions", label: "Solutions", icon: <Workflow size={15} /> },
  { id: "workflow", label: "AI Workflow", icon: <Cpu size={15} /> },
  { id: "skills", label: "Tech & Skills", icon: <Layers size={15} /> },
  { id: "projects", label: "Projects", icon: <FolderGit2 size={15} /> },
  { id: "experience", label: "Experience", icon: <Briefcase size={15} /> },
  { id: "credentials", label: "Credentials", icon: <Award size={15} /> },
];

const STATUSES = [
  { text: "Open for Work", color: "text-emerald-400" },
  { text: "Side Projects", color: "text-sky-400" },
  { text: "Full-Time Role", color: "text-sky-300" },
  { text: "Part-Time Role", color: "text-amber-300" },
];

const SOCIAL_LINKS = [
  {
    icon: <SiFacebook size={16} />,
    href: "https://web.facebook.com/ArcTechSolutions25",
    label: "ArcTech FB",
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

const TAB_CONTENT_VARIANTS = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 28 : -28,
    scale: 0.992,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -24 : 24,
    scale: 0.992,
  }),
};

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("mission");
  const [tabDirection, setTabDirection] = useState(1);
  const [sidebarOverride, setSidebarOverride] = useState<boolean | null>(null);
  const [statusIndex, setStatusIndex] = useState(0);
  const chatRef = useRef<ChatHandle>(null);

  // Auto-compact the left identity rail on detail tabs so the active tab gets maximum widescreen space
  const isCompactSidebar =
    sidebarOverride !== null ? sidebarOverride : activeSection !== "mission";

  const selectSection = (next: Section) => {
    if (next === activeSection) return;
    const prevIdx = SECTIONS.findIndex((s) => s.id === activeSection);
    const nextIdx = SECTIONS.findIndex((s) => s.id === next);
    setTabDirection(nextIdx >= prevIdx ? 1 : -1);
    setSidebarOverride(null);
    setActiveSection(next);
  };

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

      {/* SUBTLE DEPTH VIGNETTE & GRID */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(9,13,22,0.1)_0%,rgba(9,13,22,0.88)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] bg-size-[48px_48px]" />

      <section
        className={`relative z-10 mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 min-h-screen lg:h-screen flex items-start lg:items-center justify-center py-5 pb-24 lg:py-6 transition-[max-width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isCompactSidebar ? "max-w-[1760px]" : "max-w-[1640px]"
        }`}
      >
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-stretch w-full lg:h-[calc(100vh-3rem)] lg:max-h-[940px]">
          {/* LEFT: ADAPTIVE IDENTITY COLUMN (Full on Mission, Compact Rail on Detail Tabs) */}
          <aside
            className={`w-full flex flex-col gap-3 min-h-0 shrink-0 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isCompactSidebar
                ? "lg:w-[216px] xl:w-[232px]"
                : "lg:w-[340px] xl:w-[372px]"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              className={`bg-slate-900/90 backdrop-blur-xl border border-slate-700/70 rounded-xl relative overflow-hidden group shadow-2xl shadow-black/50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isCompactSidebar
                  ? "h-80 sm:h-96 lg:h-[268px] lg:flex-none"
                  : "h-80 sm:h-96 lg:flex-1 lg:min-h-[300px]"
              }`}
            >
              {/* Desktop Sidebar Expand / Compact Toggle */}
              <button
                type="button"
                onClick={() => setSidebarOverride(!isCompactSidebar)}
                title={
                  isCompactSidebar
                    ? "Expand profile panel"
                    : "Compact profile for wider view"
                }
                aria-label={
                  isCompactSidebar
                    ? "Expand profile panel"
                    : "Compact profile panel"
                }
                className="hidden lg:inline-flex items-center justify-center absolute top-2.5 right-2.5 z-30 p-1.5 rounded-lg bg-slate-950/75 border border-slate-700/75 text-slate-300 hover:text-sky-300 hover:border-sky-400/60 backdrop-blur-md transition-all cursor-pointer"
              >
                {isCompactSidebar ? (
                  <PanelLeftOpen size={14} />
                ) : (
                  <PanelLeftClose size={14} />
                )}
              </button>

              <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute -inset-12 bg-sky-500/15 rounded-full blur-3xl group-hover:bg-sky-400/25 transition-all duration-700" />
                <img
                  src="/noa-full-body.jpg"
                  alt={UNIFIED_DATA.identity.name}
                  className="relative w-full h-full object-cover object-top grayscale-30 group-hover:grayscale-0 transition-all duration-700 scale-103 group-hover:scale-100"
                />
              </div>

              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-sky-400 to-transparent z-20" />

              <div
                className={`absolute inset-0 z-10 flex flex-col justify-end text-center bg-linear-to-b from-transparent via-slate-950/35 to-[#090d16]/96 transition-all duration-500 ${
                  isCompactSidebar ? "p-5 lg:p-3.5" : "p-5"
                }`}
              >
                <div
                  className={
                    isCompactSidebar ? "space-y-3.5 lg:space-y-2" : "space-y-3.5"
                  }
                >
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 }}
                  >
                    <h1
                      className={`font-display font-extrabold tracking-tight text-slate-50 drop-shadow-md transition-all duration-300 ${
                        isCompactSidebar
                          ? "text-3xl lg:text-xl"
                          : "text-3xl xl:text-[34px]"
                      }`}
                    >
                      {UNIFIED_DATA.identity.name}
                    </h1>
                    <p
                      className={`font-medium text-sky-300 leading-snug transition-all duration-300 ${
                        isCompactSidebar
                          ? "text-xs mt-1.5 lg:text-[10.5px] lg:mt-1"
                          : "text-xs mt-1.5"
                      }`}
                    >
                      {primaryRole}
                      <span className={isCompactSidebar ? "lg:hidden" : ""}>
                        {" "}
                        <span className="text-slate-500 px-1">&middot;</span>{" "}
                        {secondaryRole}
                      </span>
                    </p>
                  </motion.div>

                  {/* Compact single-pill status on desktop when shrunk; full 2-box grid on mobile & expanded */}
                  <div
                    className={
                      isCompactSidebar
                        ? "grid grid-cols-2 gap-2.5 w-full lg:hidden"
                        : "grid grid-cols-2 gap-2.5 w-full"
                    }
                  >
                    <div className="px-3 py-2 bg-slate-900/85 border border-slate-700/70 text-center backdrop-blur-md relative overflow-hidden h-14 flex flex-col justify-center rounded-lg">
                      <p className="text-[10px] text-slate-400 font-medium mb-0.5">
                        Availability
                      </p>
                      <div className="relative h-4 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={statusIndex}
                            initial={{ y: 8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -8, opacity: 0 }}
                            transition={{ duration: 0.16 }}
                            className={`text-xs font-semibold ${STATUSES[statusIndex].color}`}
                          >
                            {STATUSES[statusIndex].text}
                          </motion.p>
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="px-3 py-2 bg-slate-900/85 border border-slate-700/70 text-center backdrop-blur-md h-14 flex flex-col justify-center rounded-lg">
                      <p className="text-[10px] text-slate-400 font-medium mb-0.5">
                        Time Zone
                      </p>
                      <p className="font-mono text-xs font-semibold text-slate-100">
                        {UNIFIED_DATA.identity.location}
                      </p>
                    </div>
                  </div>

                  {isCompactSidebar && (
                    <div className="hidden lg:flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/75 text-[10px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span className={STATUSES[statusIndex].color}>
                        {STATUSES[statusIndex].text}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Experience Highlights & Socials (Shrink gracefully when sidebar is compact on desktop) */}
            <div className="flex flex-col gap-2.5 shrink-0">
              <div
                className={`flex gap-2 overflow-x-auto no-scrollbar pb-0.5 lg:pb-0 ${
                  isCompactSidebar
                    ? "lg:flex-col lg:gap-1.5"
                    : "lg:grid lg:grid-cols-1"
                }`}
              >
                {[
                  {
                    full: `${UNIFIED_DATA.identity.experience_years} Years Experience`,
                    short: `${UNIFIED_DATA.identity.experience_years} Yrs Exp`,
                  },
                  {
                    full: "API & Workflow Integration",
                    short: "API & Workflows",
                  },
                  {
                    full: "B2B & Personal Automation",
                    short: "B2B Automation",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 3 }}
                    className={`shrink-0 whitespace-nowrap border-l-2 border-l-sky-400 bg-slate-900/85 border border-slate-700/65 flex justify-between items-center gap-2 backdrop-blur-md group rounded-lg transition-all duration-300 ${
                      isCompactSidebar ? "px-4 py-2.5 lg:px-3 lg:py-1.5" : "px-4 py-2.5"
                    }`}
                  >
                    <span
                      className={`font-semibold text-slate-100 group-hover:text-sky-300 transition-colors ${
                        isCompactSidebar
                          ? "text-xs sm:text-[13px] lg:text-[11px]"
                          : "text-xs sm:text-[13px]"
                      }`}
                    >
                      <span className={isCompactSidebar ? "lg:hidden" : ""}>
                        {stat.full}
                      </span>
                      {isCompactSidebar && (
                        <span className="hidden lg:inline">{stat.short}</span>
                      )}
                    </span>
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/90 shrink-0" />
                  </motion.div>
                ))}
              </div>

              {/* SOCIAL ACCOUNTS: horizontal swipe on mobile, compact 4-icon strip when shrunk on desktop, 2x2 labeled grid on Mission */}
              <div
                className={`flex gap-2 overflow-x-auto no-scrollbar pb-0.5 lg:pb-0 ${
                  isCompactSidebar
                    ? "lg:grid lg:grid-cols-4 lg:gap-1.5"
                    : "lg:grid lg:grid-cols-2"
                }`}
              >
                {SOCIAL_LINKS.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    aria-label={social.label}
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className={`shrink-0 whitespace-nowrap border border-slate-700/65 bg-slate-900/85 hover:bg-slate-800/90 hover:border-sky-400/55 backdrop-blur-md flex items-center group transition-all rounded-lg ${
                      isCompactSidebar
                        ? "px-3.5 py-2.5 gap-2.5 lg:px-0 lg:py-2.5 lg:justify-center"
                        : "px-3.5 lg:px-3 py-2.5 gap-2.5"
                    }`}
                  >
                    <div className="text-sky-400 group-hover:text-amber-400 transition-colors shrink-0">
                      {social.icon}
                    </div>
                    <span
                      className={`text-xs font-semibold text-slate-200 group-hover:text-white transition-colors ${
                        isCompactSidebar ? "lg:hidden" : ""
                      }`}
                    >
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Compact Timezone Footer Chip (Desktop Compact Mode Only) */}
              {isCompactSidebar && (
                <div className="hidden lg:flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-900/75 border border-slate-800 font-mono text-[10px] text-slate-400">
                  <span>TZ</span>
                  <span className="text-slate-200 font-semibold">
                    {UNIFIED_DATA.identity.location}
                  </span>
                </div>
              )}
            </div>
          </aside>

          {/* RIGHT: EXPANDING HIGH-CONTRAST DYNAMIC CONTENT PANEL */}
          <div className="flex-1 min-w-0 flex flex-col bg-[#0d1424]/90 backdrop-blur-xl border border-slate-700/65 rounded-xl overflow-hidden min-h-0 shadow-2xl shadow-black/50 transition-all duration-500">
            {/* TOP ANIMATED ICON-ASSISTED NAVIGATION TABS */}
            <div className="px-4 sm:px-6 py-3 border-b border-slate-800/90 bg-slate-950/65 shrink-0 flex items-center justify-between gap-3">
              <div className="flex flex-nowrap lg:flex-wrap items-center gap-1.5 overflow-x-auto no-scrollbar">
                {SECTIONS.map((s) => {
                  const isActive = activeSection === s.id;
                  return (
                    <motion.button
                      key={s.id}
                      type="button"
                      onClick={() => selectSection(s.id)}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative shrink-0 whitespace-nowrap inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-[13px] font-semibold transition-colors cursor-pointer ${
                        isActive
                          ? "text-sky-100"
                          : "text-slate-400 hover:text-slate-100"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeTabPill"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 32,
                          }}
                          className="absolute inset-0 rounded-lg bg-sky-500/16 border border-sky-400/50 shadow-[0_0_18px_rgba(56,189,248,0.18)]"
                        />
                      )}
                      {isActive && (
                        <motion.span
                          layoutId="activeTabUnderline"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 32,
                          }}
                          className="absolute left-3 right-3 -bottom-px h-0.5 rounded-full bg-linear-to-r from-sky-400 via-cyan-300 to-sky-400"
                        />
                      )}
                      <span
                        className={`relative z-10 transition-colors ${
                          isActive ? "text-sky-400" : "text-slate-500"
                        }`}
                      >
                        {s.icon}
                      </span>
                      <span className="relative z-10">{s.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Subtle Focus Mode Indicator on Desktop */}
              <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 font-mono text-[10px] text-slate-400 shrink-0">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isCompactSidebar ? "bg-sky-400" : "bg-emerald-400"
                  }`}
                />
                {isCompactSidebar ? "Wide View" : "Overview"}
              </span>
            </div>

            {/* SCROLLABLE DETAIL CONTENT WITH DIRECTIONAL SPRING SLIDE */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 custom-scrollbar">
              <AnimatePresence mode="wait" custom={tabDirection}>
                <motion.div
                  key={activeSection}
                  custom={tabDirection}
                  variants={TAB_CONTENT_VARIANTS}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.24,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="space-y-6"
                >
                  {activeSection === "mission" && (
                    <div className="space-y-6">
                      <div className="space-y-3 max-w-3xl">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/25 text-xs font-medium text-sky-300">
                          Full-Stack &amp; Automation Engineering
                        </span>
                        <h2 className="font-display text-4xl sm:text-5xl xl:text-[54px] font-extrabold tracking-tight leading-[1.05] text-slate-50">
                          {philosophyHeading}.
                        </h2>
                        <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
                          {philosophySubtext}
                        </p>
                        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                          {UNIFIED_DATA.identity.summary}
                        </p>
                      </div>

                      {/* What I Build & Automate CTA Card */}
                      <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/65 space-y-3.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-display text-sm font-bold text-slate-100">
                            For Businesses &amp; Individuals
                          </span>
                          <div className="flex flex-wrap items-center gap-3">
                            <button
                              type="button"
                              onClick={() => selectSection("workflow")}
                              className="text-xs font-semibold text-sky-300 hover:text-sky-200 transition-colors cursor-pointer"
                            >
                              AI Workflow →
                            </button>
                            <button
                              type="button"
                              onClick={() => selectSection("solutions")}
                              className="px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-400/45 text-xs font-semibold text-amber-300 hover:bg-amber-500/25 transition-colors cursor-pointer"
                            >
                              Explore Solutions →
                            </button>
                          </div>
                        </div>
                        <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed">
                          From{" "}
                          <span className="text-slate-50 font-semibold">
                            n8n workflow automation
                          </span>{" "}
                          and{" "}
                          <span className="text-slate-50 font-semibold">
                            AI assistants
                          </span>{" "}
                          to{" "}
                          <span className="text-slate-50 font-semibold">
                            custom operational web apps &amp; PWAs
                          </span>{" "}
                          — built to save hours and streamline daily operations.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {UNIFIED_DATA.services.map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => selectSection("solutions")}
                              className="px-2.5 py-1 font-mono text-[11px] font-medium text-sky-200 bg-slate-900/80 border border-slate-700/70 hover:border-sky-400/50 hover:text-white rounded-md transition-colors cursor-pointer"
                            >
                              {s.badge}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quick Tech Stack Preview */}
                      <div className="pt-4 border-t border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-display text-sm font-bold text-slate-200">
                            Core Stack Snapshot
                          </span>
                          <button
                            type="button"
                            onClick={() => selectSection("skills")}
                            className="text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
                          >
                            View Full Tech Matrix →
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {corePreviewSkills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 font-mono text-xs text-slate-200 bg-slate-800/75 border border-slate-700/70 rounded-md"
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
                          onClick={() => selectSection("solutions")}
                          className="p-4 rounded-xl bg-slate-800/55 border border-slate-700/60 hover:border-sky-400/50 hover:bg-slate-800/80 text-left transition-all cursor-pointer"
                        >
                          <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-50 leading-none">
                            {UNIFIED_DATA.services.length}
                          </p>
                          <p className="text-xs font-medium text-slate-400 mt-1.5">
                            Core Solutions
                          </p>
                        </button>
                        <button
                          type="button"
                          onClick={() => selectSection("projects")}
                          className="p-4 rounded-xl bg-slate-800/55 border border-slate-700/60 hover:border-sky-400/50 hover:bg-slate-800/80 text-left transition-all cursor-pointer"
                        >
                          <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-50 leading-none">
                            {UNIFIED_DATA.projects.length}
                          </p>
                          <p className="text-xs font-medium text-slate-400 mt-1.5">
                            Live Systems
                          </p>
                        </button>
                        <button
                          type="button"
                          onClick={() => selectSection("credentials")}
                          className="p-4 rounded-xl bg-slate-800/55 border border-slate-700/60 hover:border-sky-400/50 hover:bg-slate-800/80 text-left transition-all cursor-pointer"
                        >
                          <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-50 leading-none">
                            {UNIFIED_DATA.credentials.length}
                          </p>
                          <p className="text-xs font-medium text-slate-400 mt-1.5">
                            Credentials
                          </p>
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSection === "solutions" && (
                    <SolutionsPanel onAskAi={handleAskAi} />
                  )}

                  {activeSection === "workflow" && (
                    <AiWorkflowPanel onAskAi={handleAskAi} />
                  )}

                  {activeSection === "skills" && (
                    <div className="space-y-5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div>
                          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-50 tracking-tight">
                            Tech Stack &amp; Skills
                          </h2>
                          <p className="text-sm text-slate-400 mt-1">
                            Core operational strengths paired with production
                            technologies.
                          </p>
                        </div>
                        <span className="font-mono text-xs font-medium text-sky-300 bg-sky-500/10 border border-sky-400/25 px-2.5 py-1 rounded-md">
                          5 Stack Modules
                        </span>
                      </div>
                      <SkillsMatrix />
                    </div>
                  )}

                  {activeSection === "projects" && (
                    <div className="space-y-5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div>
                          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-50 tracking-tight">
                            Active Deployments
                          </h2>
                          <p className="text-sm text-slate-400 mt-1">
                            Real operational software shipped to replace manual
                            workflows.
                          </p>
                        </div>
                        <span className="font-mono text-xs font-medium text-sky-300 bg-sky-500/10 border border-sky-400/25 px-2.5 py-1 rounded-md">
                          Case Studies
                        </span>
                      </div>
                      <div className="space-y-4">
                        {UNIFIED_DATA.projects.map((p) => (
                          <motion.a
                            key={p.name}
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -2 }}
                            className="p-5 rounded-xl border border-slate-700/65 bg-slate-800/55 hover:bg-slate-800/80 hover:border-sky-400/50 cursor-pointer transition-all flex flex-col gap-3.5 group"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex flex-wrap items-center gap-2.5">
                                <span className="font-display text-lg font-bold text-slate-50 group-hover:text-sky-300 transition-colors">
                                  {p.name}
                                </span>
                                <span className="text-xs font-medium bg-slate-700/70 text-slate-200 px-2.5 py-0.5 rounded-md">
                                  {p.category}
                                </span>
                                <span className="font-mono text-[11px] bg-sky-500/12 border border-sky-400/25 text-sky-300 px-2 py-0.5 rounded-md">
                                  {p.tech}
                                </span>
                              </div>
                              <span className="inline-flex items-center gap-1 text-amber-300 group-hover:text-amber-200 font-semibold text-xs sm:text-sm shrink-0">
                                Live Demo
                                <ArrowUpRight size={15} />
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm leading-relaxed">
                              <div className="p-3.5 rounded-lg bg-slate-900/70 border border-slate-700/55">
                                <span className="text-xs font-semibold text-slate-400 block mb-1">
                                  Problem
                                </span>
                                <span className="text-slate-300">
                                  {p.problem}
                                </span>
                              </div>
                              <div className="p-3.5 rounded-lg bg-slate-900/70 border border-slate-700/55">
                                <span className="text-xs font-semibold text-sky-400 block mb-1">
                                  Solution Built
                                </span>
                                <span className="text-slate-200">
                                  {p.solution}
                                </span>
                              </div>
                            </div>

                            <p className="text-xs sm:text-sm font-medium text-emerald-300 bg-emerald-500/8 border border-emerald-400/20 px-3.5 py-2 rounded-lg">
                              <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-emerald-400 mr-2">
                                Impact:
                              </span>
                              {p.impact}
                            </p>
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSection === "experience" && (
                    <div className="space-y-5">
                      <div>
                        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-50 tracking-tight">
                          Experience Ledger
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">
                          Hands-on IT infrastructure, operations, e-commerce,
                          and technical support history.
                        </p>
                      </div>
                      <div className="space-y-4">
                        {UNIFIED_DATA.experience.map((exp, i) => (
                          <div
                            key={i}
                            className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:border-sky-400/45 transition-all space-y-1.5 group"
                          >
                            <div className="flex flex-wrap justify-between items-baseline gap-2">
                              <h4 className="font-display text-base sm:text-lg font-bold text-slate-50 group-hover:text-sky-300 transition-colors">
                                {exp.company}
                              </h4>
                              <span className="font-mono text-xs font-medium text-sky-300 bg-sky-500/10 border border-sky-400/20 px-2.5 py-0.5 rounded-md">
                                {exp.period}
                              </span>
                            </div>
                            <p className="text-sm font-semibold text-amber-300">
                              {exp.role}
                            </p>
                            <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed pt-0.5">
                              {exp.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSection === "credentials" && (
                    <div className="space-y-5">
                      <div>
                        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-50 tracking-tight">
                          Credentials &amp; Certifications
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">
                          Verified training and academic credentials — click any
                          card to view the certificate.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {UNIFIED_DATA.credentials.map((cred, i) => (
                          <motion.a
                            key={i}
                            href={cred.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -2 }}
                            className="p-5 rounded-xl bg-slate-800/55 border border-slate-700/65 hover:border-sky-400/50 hover:bg-slate-800/80 flex flex-col justify-between space-y-3 group transition-all"
                          >
                            <div className="flex justify-between items-start gap-3">
                              <span className="font-display text-base font-bold text-slate-50 group-hover:text-sky-300 transition-colors leading-snug">
                                {cred.title}
                              </span>
                              <span className="font-mono text-[10px] font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-400/30 px-2 py-0.5 rounded-md shrink-0">
                                Verified
                              </span>
                            </div>
                            <div className="flex flex-wrap justify-between items-center gap-2 text-xs text-slate-300 pt-1 border-t border-slate-700/50">
                              <span className="font-medium">{cred.issuer}</span>
                              <span className="font-mono text-slate-400 group-hover:text-sky-300 transition-colors">
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
