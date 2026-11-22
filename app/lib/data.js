// app/lib/data.js

export const UNIFIED_DATA = {
  identity: {
    name: "Noa Ligpitan",
    role: "Full-Stack Developer & Business Automation Architect",
    experience_years: "4+",
    location: "GMT+8 (PHL)",
    philosophy:
      "Solving Complex Chaos. Architecting solutions that eliminate business friction and increase revenue through smart automation.",
    summary:
      "Expert in transforming manual, friction-heavy personal and business workflows into scalable, automated digital systems. Specialized in custom operational software, CMS platforms, and AI-driven efficiency.",
  },
  stack: {
    frontend: [
      "ReactJS",
      "NextJS",
      "Shadcn UI",
      "DaisyUI",
      "Zustand",
      "PWA",
      "ElectronJS",
    ],
    backend: [
      "Node.js",
      "Express",
      "FastAPI",
      "Flask",
      "REST APIs & Webhooks",
    ],
    database: ["MongoDB", "Appwrite", "Convex"],
    automation_ai: [
      "n8n (Advanced)",
      "Gemini",
      "ChatGPT",
      "Google Drive API Integration",
      "Email Automation",
    ],
    tools: [
      "GIT/GitHub",
      "Clerk",
      "Monday.com",
      "Custom CMS",
      "Shopify Admin",
    ],
  },
  capabilities: [
    {
      title: "Custom Operational Software",
      detail:
        "Bespoke web apps, PWAs, admin dashboards, and custom CMS platforms tailored to daily operations.",
    },
    {
      title: "End-to-End Workflow Automation",
      detail:
        "n8n pipelines, webhooks, Google Drive/Sheets sync, and automated email/alert notifications.",
    },
    {
      title: "AI Assistants & Smart Chatbots",
      detail:
        "Context-aware AI agents grounded in your business knowledge base to handle inquiries 24/7.",
    },
    {
      title: "Personal Productivity Systems",
      detail:
        "Automated hubs, desktop utilities, and task/document organizers built for solo operators.",
    },
  ],
  services: [
    {
      id: "business-automation",
      audience: "business",
      badge: "BUSINESS OPS",
      title: "Business Workflow Automation",
      tagline:
        "Eliminate repetitive spreadsheets, manual copy-pasting, and delayed reporting across your team.",
      deliverables: [
        "n8n multi-step automation & webhook pipelines",
        "Automated email/chat alerts for orders, leads, and approvals",
        "Google Drive, Sheets & CRM data synchronization",
      ],
      outcome: "Cuts manual admin hours and prevents human data-entry errors.",
      tools: ["n8n", "Google Drive API", "Webhooks", "Node.js"],
      chatPrompt:
        "How can you automate repetitive workflows and reporting for my business using n8n and APIs?",
    },
    {
      id: "custom-software",
      audience: "business",
      badge: "CUSTOM SOFTWARE",
      title: "Operational Web Apps & Internal Tools",
      tagline:
        "Replace messy manual trackers with fast, purpose-built software designed around how you operate.",
      deliverables: [
        "Client portals, booking/clinic systems, and ordering apps",
        "Custom CMS & real-time inventory/menu dashboards",
        "Installable offline-ready PWAs & desktop apps (Electron)",
      ],
      outcome: "Centralizes records, billing, and operations in one system.",
      tools: ["Next.js", "Appwrite", "Convex", "FastAPI", "PWA"],
      chatPrompt:
        "I need custom software for my business operations. What kinds of systems can you build and how do you structure them?",
    },
    {
      id: "ai-assistants",
      audience: "business",
      badge: "AI & AGENTS",
      title: "AI Assistants & Customer Support Bots",
      tagline:
        "Deploy 24/7 AI assistants trained on your services, pricing, SOPs, and FAQs.",
      deliverables: [
        "Embedded website AI chat assistants (like ARKI_AI)",
        "Automated lead qualification & smart inquiry routing",
        "AI document summarization & internal knowledge Q&A",
      ],
      outcome: "Instant customer responses without adding support headcount.",
      tools: ["Gemini", "ChatGPT", "Vercel AI SDK", "n8n"],
      chatPrompt:
        "How can you build an AI assistant or chatbot for my business website or internal team?",
    },
    {
      id: "personal-systems",
      audience: "personal",
      badge: "PERSONAL OPS",
      title: "Personal Productivity & Solo Systems",
      tagline:
        "Turn scattered notes, files, expenses, and recurring tasks into an automated personal operating system.",
      deliverables: [
        "Automated Google Drive file sorting & backup routines",
        "Personal task, finance, or freelance client dashboards",
        "Custom desktop tools (ElectronJS) & scheduled reminders",
      ],
      outcome: "Reclaims hours every week so you focus on high-value work.",
      tools: ["n8n", "ElectronJS", "Next.js", "Python"],
      chatPrompt:
        "How can you help automate my personal workflows, files, or freelance daily tasks?",
    },
  ],
  automation_blueprints: [
    {
      title: "Order & Client Alert Pipeline",
      audience: "Business",
      before:
        "Orders arrive across messy chat threads, manually copied into spreadsheets with delayed customer replies.",
      after:
        "Web ordering system logs every order automatically and sends instant email confirmations to both client and owner.",
      stack: "Next.js + Appwrite + Email Automation",
    },
    {
      title: "Daily Reporting & Drive Sync",
      audience: "Business",
      before:
        "Hours spent manually organizing files, compiling daily sales summaries, and updating team boards.",
      after:
        "n8n watches Google Drive & forms, summarizes updates with AI, and pushes clean reports to Monday.com or email.",
      stack: "n8n + Google Drive API + AI + Monday.com",
    },
    {
      title: "Solo Operator Command Hub",
      audience: "Personal",
      before:
        "Scattered reminders, invoices, and notes across multiple apps causing missed follow-ups.",
      after:
        "Unified dashboard with automated follow-up triggers, smart file archiving, and AI quick-capture summaries.",
      stack: "Next.js / Electron + n8n + Gemini",
    },
  ],
  process_steps: [
    {
      step: "01",
      title: "Audit",
      detail:
        "Map your current manual bottlenecks, tools, and highest-ROI automation wins.",
    },
    {
      step: "02",
      title: "Architect",
      detail:
        "Design a clean data flow, UI wireframes, and scalable tech stack with zero bloat.",
    },
    {
      step: "03",
      title: "Build & Automate",
      detail:
        "Develop the custom software and wire up n8n, APIs, webhooks, and AI workflows.",
    },
    {
      step: "04",
      title: "Launch & Scale",
      detail:
        "Deploy to production, train your team, and iterate as your operations grow.",
    },
  ],
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
      category: "Healthcare Operations",
      tech: "NEXT.JS / APPWRITE / ZUSTAND / PWA",
      problem:
        "Paper-based patient charts and manual payment ledgers slowed down front-desk operations.",
      solution:
        "Built an installable PWA with structured patient history records, treatment logs, and payment tracking.",
      impact:
        "Digitized dental patient histories and payment tracking, reducing manual bookkeeping hours.",
      link: "https://dental-clinic-v3-arctech.vercel.app/",
    },
    {
      name: "RAKAPE",
      category: "F&B E-Commerce & CMS",
      tech: "NEXT.JS / APPWRITE",
      problem:
        "Static menus and manual order coordination made price/item updates slow and error-prone.",
      solution:
        "Engineered a full-stack storefront with a custom admin CMS for instant menu and content updates.",
      impact:
        "Full-stack e-commerce and CMS platform with real-time menu management.",
      link: "https://ra-kape.vercel.app/",
    },
    {
      name: "LuckyZDelicacies",
      category: "Order Automation System",
      tech: "NEXT.JS / APPWRITE / EMAIL AUTOMATION",
      problem:
        "Manual chat-based ordering caused missed requests and time-consuming manual confirmations.",
      solution:
        "Created an online ordering system wired with automated dual-side email notifications.",
      impact:
        "Streamlined order management and automated instant email notifications for both clients and owner.",
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
    PHILOSOPHY: ${UNIFIED_DATA.identity.philosophy}
    TECH STACK: ${JSON.stringify(UNIFIED_DATA.stack)}
    SERVICES (BUSINESS & PERSONAL): ${UNIFIED_DATA.services.map((s) => `${s.title} (${s.badge}): ${s.tagline} Deliverables: ${s.deliverables.join(", ")}. Outcome: ${s.outcome}`).join(" | ")}
    AUTOMATION BLUEPRINTS: ${UNIFIED_DATA.automation_blueprints.map((b) => `${b.title} (${b.audience}) - Before: ${b.before} After: ${b.after} [${b.stack}]`).join(" | ")}
    DELIVERY PROCESS: ${UNIFIED_DATA.process_steps.map((p) => `${p.step} ${p.title}: ${p.detail}`).join(" -> ")}
    EXPERIENCE: ${UNIFIED_DATA.experience.map((e) => `${e.company} as ${e.role} (${e.period}): ${e.details}`).join("; ")}
    PROJECTS: ${UNIFIED_DATA.projects.map((p) => `${p.name} (${p.category}) using ${p.tech} - Problem: ${p.problem} Solution: ${p.solution} Impact: ${p.impact}`).join("; ")}
  `;
};
