"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Scene from "@/app/components/Scene";
import Chat from "./components/Chat";

type Section = "mission" | "projects" | "experience" | "credentials";

const STATUSES = [
  { text: "OPEN FOR WORK", color: "text-emerald-400" },
  { text: "SIDE PROJECTS", color: "text-blue-400" },
  { text: "FULL-TIME JOB", color: "text-cyan-400" },
  { text: "PART-TIME JOB", color: "text-indigo-400" },
];

const EXPERIENCE_DATA = [
  {
    company: "DPWH REGION 4A",
    role: "IT Officer",
    period: "May 2025 — PRESENT",
    details: "Preventive maintenance, network, and administrative IT tasks.",
  },
  {
    company: "7 ELEVEN PHILIPPINES",
    role: "Sales Area Maintenance",
    period: "2023 — 2024",
    details:
      "Daily back-office sales reporting, providing management with data-driven insights for inventory and revenue tracking.",
  },
  {
    company: "CHARMINGS SHOPIFY STORE",
    role: "Virtual Assistant / Shopify Admin",
    period: "2023 — 2024",
    details:
      "Developed interactive data visualization tools for logistics firms.",
  },
  {
    company: "CAFFEINAS BREW",
    role: "Technical Support Specialist",
    period: "2023 — 2024",
    details:
      "Provided comprehensive technical support for internal business systems, resolving software and hardware conflicts.",
  },
];

const PROJECTS_DATA = [
  {
    name: "CRM Automation",
    link: "https://yourprojectlink.com",
    impact: "Reduces lead response time by 40%",
    tech: "NEXT.JS / REDIS",
  },
  {
    name: "3D Analytics Engine",
    link: "https://yourprojectlink.com",
    impact: "Real-time spatial data visualization",
    tech: "THREE.JS / WEBGL",
  },
  {
    name: "AI Agentic Workflow",
    link: "https://yourprojectlink.com",
    impact: "Automates complex B2B logic chains",
    tech: "OPENAI / LANGCHAIN",
  },
];

const CREDENTIALS_DATA = [
  {
    title: "Python Essentials Certificate",
    issuer: "Cisco Networking Academy",
    id: "Aug 2025",
    link: "https://drive.google.com/open?id=1T6wCE6yQhto4xRTtjhObYU_msnGd26B0&usp=drive_copy",
  },
  {
    title: "JavaScript Essentials Certificate",
    issuer: "Cisco Networking Academy",
    id: "Aug 2025",
    link: "https://drive.google.com/open?id=1QYzyDRc0Rp1U2mOrrafCXJ23XvywiZof&usp=drive_copy",
  },
  {
    title: "Intro to Data Science Certificate",
    issuer: "Cisco Networking Academy",
    id: "26 Feb 2026",
    link: "https://drive.google.com/open?id=1EjWsvR74U1FiWJbgNIJockHvj3lySU-V&usp=drive_copy",
  },
  {
    title: "Information and Communication Technology",
    issuer: "Amg Skilled Hands Technological College",
    id: "2016",
    link: "https://drive.google.com/file/d/1I3GvcZoUOYuju_MYXs9dkV40dCWHoVqv/view?usp=sharing",
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

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden lg:h-screen lg:overflow-hidden">
      <Scene />

      {/* TECHNICAL OVERLAYS */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(2,6,23,0.9)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[40px_40px]" />

      {/* Corner HUD Brackets */}
      <div className="pointer-events-none fixed inset-10 z-50 border-t border-l border-white/20 w-20 h-20" />
      <div className="pointer-events-none fixed top-10 right-10 z-50 border-t border-r border-white/20 w-20 h-20" />
      <div className="pointer-events-none fixed bottom-10 left-10 z-50 border-b border-l border-white/20 w-20 h-20" />
      <div className="pointer-events-none fixed bottom-10 right-10 z-50 border-b border-r border-white/20 w-20 h-20" />

      <section className="relative z-10 mx-auto max-w-400 px-8 min-h-screen flex items-start lg:items-center justify-center py-20 lg:py-10 lg:overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch w-full pt-10 lg:pt-0">
          {/* LEFT: IDENTITY & CORE INFO */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-sm relative overflow-hidden group min-h-125 cursor-pointer shadow-2xl shadow-blue-500/10"
            >
              <div className="absolute inset-0 z-0 overflow-hidden ">
                <div className="absolute -inset-12 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-500/40 transition-all duration-700 " />
                <img
                  src="/noa-profile.png"
                  alt="Noa"
                  className="relative w-full h-full object-cover grayscale-50 group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
              </div>

              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-blue-400 to-transparent z-20 shadow-[0_0_15px_rgba(96,165,250,0.8)]" />

              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 text-center bg-linear-to-b from-transparent via-black/20 to-black/95">
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-4xl font-black tracking-tighter uppercase italic text-white drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                      Noa Ligpitan
                    </h3>
                    <p className="text-[11px] font-mono text-yellow-400 font-bold uppercase tracking-[0.4em] mt-3 drop-shadow-md">
                      Full Stack Developer{" "}
                      <span className="text-white/30">
                        // <br />
                      </span>{" "}
                      AI Integration
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
                        GMT+8 (PHL)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-3">
              {["7+ YRS EXP", "API INTEGRATION", "B2B SOLUTIONS"].map(
                (stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10 }}
                    className="px-6 py-5 border-l-4 border-blue-500 bg-white/3 border-y border-r flex justify-between items-center backdrop-blur-sm group"
                  >
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-blue-500/80 font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sm font-black italic uppercase tracking-[0.2em] text-white group-hover:text-blue-400 transition-colors">
                        {stat}
                      </span>
                    </div>
                    <div className="h-2 w-2 bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  </motion.div>
                ),
              )}
            </div>
          </div>

          {/* CENTER: DYNAMIC CONTENT AREA */}
          <div className="lg:col-span-4 flex flex-col justify-center border-x border-white/10 px-0 lg:px-10 py-10 lg:py-0">
            <div className="min-h-112.5 flex flex-col justify-center">
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
                    <>
                      <h1 className="text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-white">
                        Solving <br />{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400 drop-shadow-sm">
                          Complex
                        </span>{" "}
                        <br /> Chaos.
                      </h1>
                      <p className="text-slate-300 text-base leading-relaxed font-medium max-w-sm">
                        I architect business software and Integrate AI workflows
                        that eliminate business friction. High-performance 3D
                        interfaces for the next generation of web.
                      </p>
                    </>
                  )}

                  {activeSection === "projects" && (
                    <div className="space-y-4">
                      <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">
                        Active Deployments
                      </h2>
                      <div className="space-y-3 pt-4">
                        {PROJECTS_DATA.map((p) => (
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
                                <span className="font-mono text-[10px] text-blue-400 font-bold uppercase tracking-tight">
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
                      <div className="space-y-6 pt-4 max-h-100 overflow-y-auto custom-scrollbar">
                        {EXPERIENCE_DATA.map((exp, i) => (
                          <div
                            key={i}
                            className="border-l border-blue-500/30 pl-4 space-y-1"
                          >
                            <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-1 lg:gap-0">
                              <h4 className="text-white font-black text-sm uppercase tracking-wider">
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
                      <div className="grid gap-3 pt-4">
                        {CREDENTIALS_DATA.map((cred, i) => (
                          <motion.a
                            key={i}
                            href={cred.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 5 }}
                            className="p-4 bg-white/3 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 flex flex-col space-y-2 group transition-all"
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-white font-bold text-xs uppercase group-hover:text-emerald-400 transition-colors">
                                {cred.title}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-[7px] font-mono text-emerald-400 border border-emerald-500/30 px-1 py-0.5">
                                  SECURE
                                </span>
                                <span className="text-emerald-500 text-xs opacity-0 group-hover:opacity-100 transition-all">
                                  ⎘
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-1 lg:gap-0 text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
                              <span className="truncate max-w-37.5">
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

            {/* Navigation Buttons */}
            <div className="flex flex-col gap-4 mt-12">
              {["mission", "projects", "experience", "credentials"].map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSection(s as any)}
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

          {/* RIGHT: CHAT INTERFACE */}
          <div className="lg:col-span-4 h-full min-h-[500px] lg:min-h-0 flex items-center pb-20 lg:pb-0">
            <Chat />
          </div>
        </div>
      </section>
    </main>
  );
}
