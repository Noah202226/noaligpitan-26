"use client";

import { motion } from "framer-motion";

function FeatureWork() {
  return (
    <section className="relative z-10 px-6 py-24 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map((id) => (
          <motion.div
            key={id}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-2xl font-bold italic">Project 0{id}</h3>
            <p className="mt-2 text-slate-400">
              Deep dive into immersive geometry.
            </p>
            <div className="mt-6 h-48 w-full rounded-xl bg-slate-900/50 border border-white/5" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default FeatureWork;
