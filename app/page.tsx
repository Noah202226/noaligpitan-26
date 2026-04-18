"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { Facebook, Linkedin, Youtube, X } from "lucide-react"; // Added for social icons
import { SiFacebook, SiYoutube, SiX } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

import Scene from "@/app/components/Scene";
import Chat from "./components/Chat";

import { UNIFIED_DATA } from "@/app/lib/data";

type Section = "mission" | "projects" | "experience" | "credentials";

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

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden lg:h-screen lg:overflow-hidden">
      <Scene />

      {/* CUSTOM SCROLLBAR STYLES */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #facc15;
        }
      `}</style>

      {/* TECHNICAL OVERLAYS */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(2,6,23,0.9)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[length:40px_40px]" />

      <section className="relative z-10 mx-auto max-w-[1600px] px-8 min-h-screen flex items-start lg:items-center justify-center py-20 lg:py-10 lg:overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch w-full pt-10 lg:pt-0">
          {/* LEFT: IDENTITY */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-sm relative overflow-hidden group min-h-[480px] cursor-pointer shadow-2xl shadow-blue-500/10"
            >
              <div className="absolute inset-0 z-0 overflow-hidden ">
                <div className="absolute -inset-12 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-500/40 transition-all duration-700 " />
                <img
                  src="/noa-profile.png"
                  alt={UNIFIED_DATA.identity.name}
                  className="relative w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
              </div>

              {/* Gradient using Tailwind v4 syntax */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-blue-400 to-transparent z-20 shadow-[0_0_15px_rgba(96,165,250,0.8)]" />

              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 text-center bg-linear-to-b from-transparent via-black/20 to-black/95">
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-4xl font-black tracking-tighter uppercase italic text-white drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                      {UNIFIED_DATA.identity.name}
                    </h3>
                    <p className="text-[11px] font-mono text-yellow-400 font-bold uppercase tracking-[0.4em] mt-3 drop-shadow-md">
                      {primaryRole} <span className="text-white/30">//</span>{" "}
                      {secondaryRole}
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-3 w-full pt-4">
                    <div className="p-4 bg-white/10 border border-white/20 text-center backdrop-blur-md relative overflow-hidden h-16 flex flex-col justify-center">
                      <p className="text-[8px] text-slate-300 font-mono mb-1 tracking-widest uppercase">
                        OPEN FOR
                      </p>
                      <div className="relative h-4">
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={statusIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className={`text-[10px] font-black tracking-tighter ${STATUSES[statusIndex].color} uppercase`}
                          >
                            {STATUSES[statusIndex].text}
                          </motion.p>
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="p-4 bg-white/10 border border-white/20 text-center backdrop-blur-md h-16 flex flex-col justify-center">
                      <p className="text-[8px] text-slate-300 font-mono mb-1 tracking-widest uppercase">
                        LOC_TIME
                      </p>
                      <p className="text-[10px] font-black text-white">
                        {UNIFIED_DATA.identity.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Experience Stats & Socials Container */}
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 gap-3">
                {[
                  `${UNIFIED_DATA.identity.experience_years} YRS EXP`,
                  "API INTEGRATION",
                  "B2B SOLUTIONS",
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10 }}
                    className="px-6 py-4 border-l-4 border-blue-500 bg-white/5 border-y border-r border-y-white/10 border-r-white/10 flex justify-between items-center backdrop-blur-sm group"
                  >
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-blue-500/80 font-bold">
                        0{i + 1}
                      </span>
                      <span className="text-sm font-black italic uppercase tracking-[0.2em] text-white group-hover:text-blue-400 transition-colors">
                        {stat}
                      </span>
                    </div>
                    <div className="h-2 w-2 bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  </motion.div>
                ))}
              </div>

              {/* SOCIAL ACCOUNTS GRID */}
              <div className="grid grid-cols-2 gap-3">
                {SOCIAL_LINKS.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                    }}
                    className="p-3 border border-white/10 bg-white/5 backdrop-blur-sm flex items-center gap-3 group transition-all"
                  >
                    <div className="text-blue-400 group-hover:text-yellow-400 transition-colors">
                      {social.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-mono text-slate-500 uppercase leading-none mb-1">
                        Link_{i + 1}
                      </span>
                      <span className="text-[9px] font-black text-white uppercase tracking-tighter group-hover:text-blue-400 transition-colors">
                        {social.label}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER: DYNAMIC CONTENT AREA */}
          <div className="lg:col-span-4 flex flex-col justify-center border-x border-white/10 px-0 lg:px-10 py-10 lg:py-0">
            <div className="min-h-[500px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] tracking-widest uppercase">
                    {`--> ${activeSection}`}
                  </div>

                  {activeSection === "mission" && (
                    <div className="space-y-6">
                      <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.85] text-white">
                        {philosophyHeading}.
                      </h1>
                      <div className="space-y-4">
                        <p className="text-slate-300 text-base leading-relaxed font-medium max-w-sm">
                          {philosophySubtext}
                        </p>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                          {UNIFIED_DATA.identity.summary}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeSection === "projects" && (
                    <div className="space-y-4">
                      <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">
                        Active Deployments
                      </h2>
                      <div className="space-y-3 pt-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                        {UNIFIED_DATA.projects.map((p) => (
                          <motion.a
                            key={p.name}
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02, x: 5 }}
                            className="p-4 border border-white/10 bg-white/5 hover:bg-blue-500/20 hover:border-blue-500/50 cursor-pointer transition-all flex justify-between items-center group"
                          >
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-[10px] text-yellow-400 font-bold uppercase tracking-tight">
                                  [RUN] {p.name}
                                </span>
                                <span className="text-[8px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 font-mono">
                                  {p.tech}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400 font-medium">
                                {p.impact}
                              </p>
                            </div>
                            <span className="text-blue-500 group-hover:translate-x-1 transition-transform pl-2">
                              →
                            </span>
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSection === "experience" && (
                    <div className="space-y-4">
                      <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">
                        Experience Ledger
                      </h2>
                      <div className="space-y-6 pt-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-4">
                        {UNIFIED_DATA.experience.map((exp, i) => (
                          <div
                            key={i}
                            className="border-l border-blue-500/30 pl-4 space-y-1 relative group"
                          >
                            <div className="absolute -left-[1.5px] top-0 h-4 w-[3px] bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-1 lg:gap-0">
                              <h4 className="text-white font-black text-sm uppercase tracking-wider group-hover:text-blue-400 transition-colors">
                                {exp.company}
                              </h4>
                              <span className="text-[10px] font-mono text-blue-400">
                                {exp.period}
                              </span>
                            </div>
                            <p className="text-xs text-yellow-400 font-bold uppercase tracking-widest">
                              {exp.role}
                            </p>
                            <p className="text-slate-400 text-xs leading-relaxed mt-1">
                              {exp.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSection === "credentials" && (
                    <div className="space-y-4">
                      <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">
                        Authentication Keys
                      </h2>
                      <div className="grid gap-3 pt-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                        {UNIFIED_DATA.credentials.map((cred, i) => (
                          <motion.a
                            key={i}
                            href={cred.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 5 }}
                            className="p-4 bg-white/5 border border-white/10 hover:border-yellow-500/50 hover:bg-yellow-500/5 flex flex-col space-y-2 group transition-all"
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-white font-bold text-xs uppercase group-hover:text-yellow-400 transition-colors">
                                {cred.title}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-[7px] font-mono text-yellow-400 border border-yellow-500/30 px-1 py-0.5">
                                  SECURE
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-1 lg:gap-0 text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
                              <span className="truncate max-w-[150px]">
                                {cred.issuer}
                              </span>
                              <span className="group-hover:text-white transition-colors">
                                ID: {cred.id}
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

            {/* Navigation */}
            <div className="flex flex-col gap-4 mt-12">
              {(
                ["mission", "projects", "experience", "credentials"] as const
              ).map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSection(s)}
                  className={`text-left font-mono text-[11px] font-bold tracking-[0.4em] uppercase transition-all flex items-center gap-4 group ${
                    activeSection === s
                      ? "text-blue-400"
                      : "text-slate-500 hover:text-white"
                  }`}
                >
                  <div
                    className={`h-0.5 transition-all duration-500 ${
                      activeSection === s
                        ? "w-16 bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,1)]"
                        : "w-4 bg-slate-800 group-hover:w-10 group-hover:bg-white"
                    }`}
                  />
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: CHAT */}
          <div className="lg:col-span-4 h-full min-h-[500px] lg:min-h-0 flex items-center pb-20 lg:pb-0">
            <Chat />
          </div>
        </div>
      </section>
    </main>
  );
}
