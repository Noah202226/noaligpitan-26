// lib/data.ts

export const UNIFIED_DATA = {
  identity: {
    name: "Noa Ligpitan",
    role: "Full-Stack Developer & Business Automation Architect",
    experience_years: "4+",
    location: "GMT+8 (PHL)",
    philosophy:
      "Solving Complex Chaos. Architecting solutions that eliminate business friction and increase revenue through smart automation.",
    summary:
      "Expert in transforming manual, friction-heavy business workflows into scalable, automated digital systems. Specialized in custom CMS development and AI-driven efficiency.",
  },
  stack: {
    frontend: ["ReactJS", "NextJS", "DaisyUI", "Schadcn", "ElectronJS"],
    backend: ["Node.js", "Express", "FastAPI", "Flask"],
    database: ["MongoDB", "Appwrite", "Convex"],
    automation_ai: [
      "n8n (Advanced)",
      "Gemini",
      "ChatGPT",
      "Google Drive API Integration",
    ],
    tools: ["GIT/GitHub", "Clerk", "Monday.com"],
  },
  experience: [
    {
      company: "DPWH REGION 4A",
      role: "IT Officer",
      period: "May 2025 — PRESENT",
      details:
        "Preventive maintenance, network, and administrative IT tasks. Ensuring 100% operational uptime for regional infrastructure.",
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
        "Managed end-to-end product lifecycles and optimized customer shopping experiences.",
    },
    {
      company: "CAFFEINAS BREW",
      role: "Technical Support Specialist",
      period: "2023 — 2024",
      details:
        "Comprehensive technical support for internal business systems, resolving software and hardware conflicts.",
    },
  ],
  projects: [
    {
      name: "Dental Clinic",
      tech: "NEXT.JS / APPWRITE / ZUSTAND / PWA",
      impact:
        "Digitized dental patient histories and payment tracking, reducing manual bookkeeping hours.",
      link: "https://dental-clinic-v3-arctech.vercel.app/",
    },
    {
      name: "RAKAPE & ",
      tech: "NEXT.JS / APPWRITE",
      impact:
        "Full-stack e-commerce and CMS platforms with real-time menu management.",
      link: "https://ra-kape.vercel.app/",
    },
    {
      name: "LuckyZDelicacies",
      tech: "NEXT.JS / APPWRITE",
      impact:
        "Manage ordering system, and notified both clients and owner using email",
      link: "https://luckyz-delicacies.vercel.app/",
    },
    {
      name: "LuckyZDelicacies2",
      tech: "NEXT.JS / APPWRITE",
      impact:
        "Manage ordering system, and notified both clients and owner using email",
      link: "https://luckyz-delicacies.vercel.app/",
    },
    {
      name: "LuckyZDelicacies23",
      tech: "NEXT.JS / APPWRITE",
      impact:
        "Manage ordering system, and notified both clients and owner using email",
      link: "https://luckyz-delicacies.vercel.app/",
    },
  ],
  credentials: [
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
      id: "April 2016",
      link: "https://drive.google.com/file/d/1I3GvcZoUOYuju_MYXs9dkV40dCWHoVqv/view?usp=sharing",
    },
  ],
};

// Helper to turn the object into a text block for the AI
export const getAiKnowledgeBase = () => {
  return `
    NAME: ${UNIFIED_DATA.identity.name}
    ROLE: ${UNIFIED_DATA.identity.role}
    SUMMARY: ${UNIFIED_DATA.identity.summary}
    TECH STACK: ${JSON.stringify(UNIFIED_DATA.stack)}
    EXPERIENCE: ${UNIFIED_DATA.experience.map((e) => `${e.company} as ${e.role} (${e.period}): ${e.details}`).join("; ")}
    PROJECTS: ${UNIFIED_DATA.projects.map((p) => `${p.name} using ${p.tech}: ${p.impact}`).join("; ")}
    PHILOSOPHY: ${UNIFIED_DATA.identity.philosophy}
  `;
};
