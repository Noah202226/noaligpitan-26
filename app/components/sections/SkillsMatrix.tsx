import React from "react";

const SkillsMatrix = () => {
  const skillGroups = [
    {
      category: "CORE_SYSTEM_FRONTEND",
      skills: ["ReactJS", "NextJS", "DaisyUI", "ElectronJS"],
      level: 85,
    },
    {
      category: "SERVER_LOGIC_BACKEND",
      skills: ["Node.js", "Express", "Flask (Advanced)"],
      level: 95,
    },
    {
      category: "DATA_ARCHIVE_BaaS",
      skills: ["MongoDB", "Appwrite"],
      level: 90,
    },
    {
      category: "AUTOMATION_VIRTUAL_NEURAL",
      skills: ["n8n (Advanced)", "Gemini", "Google Drive API"],
      level: 98,
    },
  ];

  return (
    <div className="p-6 bg-slate-950 border border-blue-500/20 rounded-sm font-mono relative overflow-hidden">
      {/* Decorative HUD Corner */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500"></div>

      <h2 className="text-blue-400 text-xs mb-6 flex items-center gap-2">
        <span className="w-2 h-2 bg-blue-500 animate-pulse"></span>
        SYSTEM_SKILLS_DIAGNOSTIC_V4.0
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillGroups.map((group, idx) => (
          <div key={idx} className="space-y-2 group">
            <div className="flex justify-between text-[10px] text-slate-500 group-hover:text-emerald-400 transition-colors">
              <span>{group.category}</span>
              <span>{group.level}% OPTIMIZED</span>
            </div>

            {/* V4 Linear Gradient usage */}
            <div className="h-1 w-full bg-slate-900 border border-slate-800 p-[1px]">
              <div
                className="h-full bg-linear-to-r from-blue-600 to-emerald-500 transition-all duration-1000"
                style={{ width: `${group.level}%` }}
              ></div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {group.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 text-[10px] text-blue-300 rounded-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Status */}
      <div className="mt-8 pt-4 border-t border-slate-900 flex justify-between items-center text-[9px] text-slate-600">
        <span>LOG: ALL_SYSTEMS_OPERATIONAL</span>
        <span className="text-emerald-500/50">ENC_TYPE: AES-256</span>
      </div>
    </div>
  );
};

export default SkillsMatrix;
