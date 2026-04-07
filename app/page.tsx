"use client";
import React from "react";
import { motion } from "framer-motion";
import Scene from "@/app/components/Scene";
import Chat from "./components/Chat"; // Your Mock Chat component
import Navbar from "./components/sections/Navbar";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white">
      {/* Background Layer */}
      <Scene />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(2,6,23,0.8)_100%)]" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Grid */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* LEFT COLUMN: Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase border rounded-full border-white/10 bg-white/5 mb-6">
              Available for Freelance
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              DESIGN <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
                BEYOND
              </span>{" "}
              <br />
              STATIC
            </h1>
            <p className="max-w-md mt-8 text-lg text-slate-400 leading-relaxed">
              A developer portfolio exploring the intersection of AI-driven
              interfaces and immersive 3D experiences.
            </p>

            <div className="flex gap-4 mt-10">
              <button className="px-8 py-4 font-bold bg-white text-black rounded-xl hover:bg-slate-200 transition-all cursor-pointer shadow-lg shadow-white/5">
                View Work
              </button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Chat Component */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md">
              {/* Mock Profile Image for Mobile View context */}
              <div className="lg:hidden mb-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-500 to-emerald-500 border border-white/20" />
                <div>
                  <h4 className="font-bold text-sm">About Me</h4>
                  <p className="text-xs text-slate-500">AI Assistant Online</p>
                </div>
              </div>

              <Chat />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-10 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:60px_60px]" />
    </main>
  );
}
