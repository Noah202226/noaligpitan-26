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
      title: "Coding With AI - Planning To Production",
      issuer: "Udemy (Brad Traversy)",
      id: "Jun 2026",
      category: "AI & Automation",
      filterGroup: "ai-data",
      iconKey: "ai",
      issuerKey: "udemy",
      summary:
        "16.5-hour end-to-end workflow covering AI-assisted system planning, architecture, and production deployment.",
      featured: true,
      link: "https://drive.google.com/file/d/16DbE5dP3bcGtLumknBJI8aCO4WYeq_ap/view?usp=sharing",
    },
    {
      title: "Intro to Data Science Certificate",
      issuer: "Cisco Networking Academy",
      id: "26 Feb 2026",
      category: "Data Science",
      filterGroup: "ai-data",
      iconKey: "data",
      issuerKey: "cisco",
      summary:
        "Foundations in data collection, exploratory analysis, AI/ML concepts, and data-driven business decisions.",
      link: "https://drive.google.com/open?id=1EjWsvR74U1FiWJbgNIJockHvj3lySU-V&usp=drive_copy",
    },
    {
      title: "Python Essentials Certificate",
      issuer: "Cisco Networking Academy",
      id: "Aug 2025",
      category: "Programming",
      filterGroup: "programming",
      iconKey: "python",
      issuerKey: "cisco",
      summary:
        "Core Python syntax, data structures, scripting, and automation fundamentals for backend & AI tooling.",
      link: "https://drive.google.com/open?id=1T6wCE6yQhto4xRTtjhObYU_msnGd26B0&usp=drive_copy",
    },
    {
      title: "JavaScript Essentials Certificate",
      issuer: "Cisco Networking Academy",
      id: "Aug 2025",
      category: "Programming",
      filterGroup: "programming",
      iconKey: "javascript",
      issuerKey: "cisco",
      summary:
        "Modern JavaScript programming, asynchronous workflows, and interactive web application engineering.",
      link: "https://drive.google.com/open?id=1QYzyDRc0Rp1U2mOrrafCXJ23XvywiZof&usp=drive_copy",
    },
    {
      title: "Basic WordPress & VirtualWorkPH Certificates",
      issuer: "VirtualWorkPH",
      id: "Mar 2025",
      category: "CMS & Web Ops",
      filterGroup: "cms-academic",
      iconKey: "wordpress",
      issuerKey: "virtualworkph",
      summary:
        "Multi-certificate training bundle covering WordPress site development and remote digital operations.",
      link: "https://drive.google.com/file/d/1InxMtsVeJD20kj-bPFZuI14q6XD6FKVC/view?usp=sharing",
    },
    {
      title: "Information and Communication Technology",
      issuer: "Amg Skilled Hands Technological College",
      id: "April 2016",
      category: "Academic",
      filterGroup: "cms-academic",
      iconKey: "academic",
      issuerKey: "college",
      summary:
        "Formal college credential in computer systems, networking fundamentals, and IT infrastructure support.",
      link: "https://drive.google.com/file/d/1I3GvcZoUOYuju_MYXs9dkV40dCWHoVqv/view?usp=sharing",
    },
  ],
  ai_workflow: {
    headline: "Context Engineering, Not Vibe Coding",
    tagline:
      "I treat AI coding agents like junior engineers that need architecture maps, decision records, scoped rules, repeatable runbooks, and deterministic build gates.",
    comparison: [
      {
        aspect: "Architecture & Memory",
        vibeCoding:
          "Re-explaining the codebase in every chat; AI forgets constraints and drifts across files.",
        contextEngineering:
          "Living context/ hub (ARCHITECTURE, FLOWS, DECISIONS, APP_CONTEXT, ROADMAP) keeps every session aligned.",
      },
      {
        aspect: "Regressions & Past Bugs",
        vibeCoding:
          "AI accidentally undoes previous bug fixes during later refactors.",
        contextEngineering:
          "Architecture Decision Records (ADRs) + folder-scoped AGENTS.md lock critical invariants in place.",
      },
      {
        aspect: "Repeatable Tasks",
        vibeCoding:
          "Ad-hoc prompts that skip verification, forget docs, or deploy broken builds.",
        contextEngineering:
          "Modular .agents/skills/ runbooks standardize planning, debugging, health audits, and build-gated shipping.",
      },
      {
        aspect: "Safety & Security",
        vibeCoding:
          "Risk of exposing .env secrets, force-pushing, or running unchecked commands.",
        contextEngineering:
          "PreToolUse command-policy hook hard-blocks .env leaks & force-pushes while gating pushes behind next build.",
      },
    ],
    layers: [
      {
        index: "01",
        title: "Scoped Rules",
        path: "AGENTS.md + app/*/AGENTS.md",
        summary:
          "Slim always-on root rules paired with directory-scoped guardrails (API streaming safety in app/api/, HUD & React 19 patterns in app/components/) so context stays lean and local.",
      },
      {
        index: "02",
        title: "Living Context Hub",
        path: "context/*.md",
        summary:
          "Version-controlled ARCHITECTURE.md, visual Mermaid FLOWS.md, DECISIONS.md (ADRs), APP_CONTEXT.md feature tracker, and ROADMAP.md backlog.",
      },
      {
        index: "03",
        title: "On-Demand Skills",
        path: ".agents/skills/*/SKILL.md",
        summary:
          "Progressive-disclosure workflow runbooks loaded only when needed—zero prompt bloat while enforcing consistent steps and interactive approval pickers.",
      },
      {
        index: "04",
        title: "Deterministic Guardrails",
        path: ".agents/hooks.json + command-policy.mjs",
        summary:
          "PreToolUse policy engine that blocks secret leaks/destructive git commands, requires confirmation for installs/deletions, and enforces npm run build before pushing.",
      },
    ],
    delivery_loop: [
      { step: "01", label: "Plan", detail: "Align on scope & architecture before editing" },
      { step: "02", label: "Load Context", detail: "Read FLOWS, ADRs & scoped AGENTS.md" },
      { step: "03", label: "Implement", detail: "Edit from single source of truth" },
      { step: "04", label: "Static Check", detail: "Zero errors in tsc & eslint" },
      { step: "05", label: "Build Gate", detail: "next build must pass before git commit/push" },
      { step: "06", label: "Sync Context", detail: "Update APP_CONTEXT, FLOWS & ROADMAP" },
    ],
    skills_catalog: [
      {
        name: "add-portfolio-feature",
        trigger: "Adding new sections, routes, or capabilities",
        value:
          "Loads context/, clarifies ambiguous scope via clickable pickers, implements to spec, runs tsc/eslint, and updates docs.",
      },
      {
        name: "git-commit-push",
        trigger: "Saying 'git push' or shipping changes",
        value:
          "Scans diff & secret hygiene, offers clickable Conventional Commit choices, runs next build gate, and cancels push if build fails.",
      },
      {
        name: "debug-ai-chat",
        trigger: "Chat errors, 404/429 provider failures, slow streams",
        value:
          "Checks env var names safely (never prints secrets), queries live provider /models, smoke-tests streamText, and validates headers.",
      },
      {
        name: "health-check",
        trigger: "Pre-deploy or periodic maintenance audit",
        value:
          "Runs full TypeScript + ESLint sweep, verifies .env.local gitignore, flags unused files/deps, and audits context freshness.",
      },
      {
        name: "explain-flow",
        trigger: "Asking how a feature or subsystem works",
        value:
          "Traces live code end-to-end with Mermaid diagrams + line links and syncs any drift back into context/FLOWS.md.",
      },
      {
        name: "roadmap-picker",
        trigger: "Asking 'what's next?' or picking a TODO",
        value:
          "Reads unchecked P1–P3 items from context/ROADMAP.md and renders a 1-click task menu to start immediately.",
      },
      {
        name: "sync-app-context",
        trigger: "Auditing or refreshing project docs",
        value:
          "Diffs actual repo structure, routes, and package.json against context/APP_CONTEXT.md and ARCHITECTURE.md.",
      },
      {
        name: "update-portfolio-data",
        trigger: "Updating projects, skills, or experience",
        value:
          "Updates UNIFIED_DATA in app/lib/data.js while keeping UI tabs and ARKI_AI's system knowledge base synchronized.",
      },
    ],
    guardrails: [
      {
        tier: "DENY",
        tone: "red",
        title: "Hard-Blocked Automatically",
        rules: [
          "Dumping raw .env / .env.local contents (cat, type, Get-Content)",
          "Staging .env* files into Git (git add .env.local)",
          "Destructive history rewrites (git push --force, git reset --hard)",
        ],
      },
      {
        tier: "FORCE ASK",
        tone: "amber",
        title: "Always Confirms With Developer",
        rules: [
          "Adding or removing packages (npm install / uninstall, pnpm, yarn)",
          "Deleting workspace files or folders (Remove-Item, rm -rf, del)",
        ],
      },
      {
        tier: "AUTO-ALLOW",
        tone: "emerald",
        title: "Frictionless Verified Flow",
        rules: [
          "Read-only Git checks (status, diff, log, branch, check-ignore)",
          "TypeScript & ESLint verification (tsc --noEmit, eslint)",
          "Build-gated production push after 1-click commit approval (next build -> commit -> push)",
        ],
      },
    ],
    reuse_steps: [
      "Copy the folder scaffold into any new repository root (AGENTS.md, context/, .agents/).",
      "Fill in context/ARCHITECTURE.md & context/FLOWS.md once your core routes/data model exist.",
      "Keep ADRs in context/DECISIONS.md whenever you solve a non-obvious bug so AI never regresses it.",
    ],
    templates: [
      {
        id: "scaffold",
        label: "Folder Scaffold",
        filename: "project-root/",
        description:
          "Drop-in directory layout compatible with Antigravity IDE, Claude Code, and modern coding agents.",
        code: `project-root/
├── AGENTS.md                        # Slim root rules (auto-loaded)
├── CLAUDE.md                        # Single line: @AGENTS.md
├── context/
│   ├── README.md                    # Index of context files
│   ├── AI_INSTRUCTIONS.md           # Coding & verification rules
│   ├── ARCHITECTURE.md              # Stack, file map & env vars
│   ├── FLOWS.md                     # Mermaid end-to-end flows
│   ├── DECISIONS.md                 # ADRs (why key fixes exist)
│   ├── APP_CONTEXT.md               # Feature tracker + changelog
│   └── ROADMAP.md                   # Prioritized P1-P3 TODOs
├── .agents/
│   ├── hooks.json                   # PreToolUse safety hook
│   ├── scripts/
│   │   └── command-policy.mjs       # Deny/Force-Ask/Allow policy
│   └── skills/
│       ├── add-feature/SKILL.md
│       ├── health-check/SKILL.md
│       ├── explain-flow/SKILL.md
│       └── git-commit-push/SKILL.md # Build-gated push workflow
└── src/ (or app/)
    ├── api/AGENTS.md                # Scoped backend guardrails
    └── components/AGENTS.md         # Scoped frontend guardrails`,
      },
      {
        id: "agents",
        label: "AGENTS.md",
        filename: "AGENTS.md",
        description:
          "Keep root rules concise (<24 KB) and delegate deep docs to context/ + folder-scoped AGENTS.md files.",
        code: `# Project Rules

## Central Context Hub (context/)
- Read context/ARCHITECTURE.md, context/FLOWS.md, and context/APP_CONTEXT.md before feature work.
- Read context/DECISIONS.md before refactoring core modules so past fixes are never undone.
- Check context/ROADMAP.md when planning next tasks and mark finished items [x].
- Update context/APP_CONTEXT.md after adding/changing features, routes, or env vars.

## Scoped Rules
- Folder-level rules in app/api/AGENTS.md and app/components/AGENTS.md apply automatically.

## Verification Standard
- Never claim completion until TypeScript (tsc --noEmit) and ESLint pass with 0 errors.
- Always pass a production build (npm run build) before committing and pushing.`,
      },
      {
        id: "skill",
        label: "SKILL.md (Git Push Gate)",
        filename: ".agents/skills/git-commit-push/SKILL.md",
        description:
          "Build-gated commit & push workflow with interactive commit message selection.",
        code: `---
name: git-commit-push
description: >-
  Scans pending Git changes, checks secret hygiene, offers clickable commit
  message choices, gates pushing behind a production build, then commits & pushes.
---

# Git Commit & Push Workflow

1. Scan changes:
   git status --short; git branch --show-current; git diff --stat
2. Safety check: Ensure no .env* or credential files are untracked/staged.
3. Ask for approval via ask_question with 2 commit options + Cancel.
4. On approval, run build gate FIRST and abort if build fails:
   npm.cmd run build; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; git add .; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; git commit -m "<approved message>"; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; git push`,
      },
      {
        id: "hooks",
        label: "hooks.json + Policy",
        filename: ".agents/hooks.json",
        description:
          "Deterministic PreToolUse hook that enforces secret protection and confirmation gates natively on Windows & Unix.",
        code: `// .agents/hooks.json
{
  "command-policy": {
    "PreToolUse": [
      {
        "matcher": "run_command",
        "hooks": [
          {
            "type": "command",
            "command": "node ./scripts/command-policy.mjs",
            "timeout": 10
          }
        ]
      }
    ]
  }
}

// .agents/scripts/command-policy.mjs (core pattern)
// 1. DENY:      cat/Get-Content .env*, git add .env*, git push --force, git reset --hard
// 2. FORCE_ASK: npm install/uninstall, Remove-Item / rm -rf
// 3. ALLOW:     git status/diff/log, tsc --noEmit, eslint, build-gated approved push
// 4. DEFAULT:   { "decision": "ask" }`,
      },
    ],
  },
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
    AI WORKFLOW & CONTEXT ENGINEERING: ${UNIFIED_DATA.ai_workflow.headline} - ${UNIFIED_DATA.ai_workflow.tagline} Layers: ${UNIFIED_DATA.ai_workflow.layers.map((l) => `${l.index} ${l.title} (${l.path}): ${l.summary}`).join(" | ")}. Skills: ${UNIFIED_DATA.ai_workflow.skills_catalog.map((s) => `${s.name} (${s.value})`).join("; ")}. Guardrails: ${UNIFIED_DATA.ai_workflow.guardrails.map((g) => `${g.tier}: ${g.rules.join(", ")}`).join(" | ")}
    EXPERIENCE: ${UNIFIED_DATA.experience.map((e) => `${e.company} as ${e.role} (${e.period}): ${e.details}`).join("; ")}
    PROJECTS: ${UNIFIED_DATA.projects.map((p) => `${p.name} (${p.category}) using ${p.tech} - Problem: ${p.problem} Solution: ${p.solution} Impact: ${p.impact}`).join("; ")}
    CREDENTIALS: ${UNIFIED_DATA.credentials.map((c) => `${c.title} by ${c.issuer} (${c.id})`).join("; ")}
  `;
};
