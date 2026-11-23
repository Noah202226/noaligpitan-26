# App Context & Feature Tracker — `noaligpitan-dev26`

> Living feature inventory and change log for Noa Ligpitan's developer portfolio. For system architecture and directory maps, see [ARCHITECTURE.md](./ARCHITECTURE.md). For AI coding rules, see [AI_INSTRUCTIONS.md](./AI_INSTRUCTIONS.md). For upcoming TODOs, see [ROADMAP.md](./ROADMAP.md).

---

## 1. Feature Inventory & Status

| Feature | Status | Key Files | Notes |
| :--- | :--- | :--- | :--- |
| **Widescreen 2-Column HUD Layout** | Active | `app/page.tsx` | Adaptive widescreen layout (`max-w-[1640px]` on Mission -> `max-w-[1760px]` Wide View on detail tabs): Identity rail smoothly compacts (`372px` -> `232px`, icon-only socials, manual toggle) so active tabs expand wider, paired with Framer Motion sliding `layoutId` tab pills and directional content transitions. |
| **Solutions & Automation Showcase** | Active | `app/components/sections/SolutionsPanel.tsx` | Filterable (`All` / `Business Ops` / `Personal`) service cards, Before -> After automation blueprints, 4-step delivery workflow (`Audit -> Architect -> Build & Automate -> Launch & Scale`), consultation CTA, and interactive `Ask ARKI_AI` deep-links. |
| **AI Workflow & Context Engineering Hub** | Active | `app/components/sections/AiWorkflowPanel.tsx` | Showcases disciplined Context Engineering vs. Vibe Coding, 4-layer agentic architecture, verified 6-step delivery loop, all 8 live workspace skills, `command-policy.mjs` guardrail matrix, 1-click copyable starter kit templates for future projects, and `Ask ARKI_AI` deep-link. |
| **Interactive 3D Background (`NeuralGrid`)** | Active | `app/components/Scene.tsx` | 2,000 additive particles, wireframe cube, lit core sphere; tracks window mouse position with lerp smoothing. |
| **Unified Data & AI Knowledge Base** | Active | `app/lib/data.js` | `UNIFIED_DATA` powers all UI tabs (identity, capabilities, services, automation blueprints, delivery process, stack, case-study projects, experience, credentials) and `getAiKnowledgeBase()` for `ARKI_AI`. |
| **Skills Matrix HUD** | Active | `app/components/sections/SkillsMatrix.tsx` | Renders 4 Core Operational Capabilities plus all 5 tech stack categories (`Frontend`, `Backend`, `Database`, `Automation & AI`, `Tools & Platforms`) in a responsive 2-column grid inside the `Tech & Skills` tab. |
| **Credentials & Certifications Panel** | Active | `app/components/sections/CredentialsPanel.tsx` | Filterable (`All Credentials` / `AI & Data` / `Programming` / `CMS & Academic`) credential cards with subject & issuer brand icons (`SiUdemy`, `SiCisco`, `SiPython`, `SiJavascript`, `SiWordpress`, `Sparkles`, `BarChart3`, `Globe`, `GraduationCap`), summaries, dates, and certificate links. |
| **`ARKI_AI` Floating Popup Chat Modal** | Active | `app/components/Chat.tsx` | Wide floating bottom-right launcher (`Ask ARKI_AI`) opening an animated popup modal (`620×660px`, expanded `860×760px`) with imperative `openWithPrompt()` deep-link handle, clean header hiding underlying AI model/provider names on normal replies, rich markdown formatting (headings, bullets, numbered lists, bold, code), persistent conversation state, and auto-expanded `SYSTEM_ALERT` error diagnostics & retry whenever a failure occurs. |
| **Multi-Provider Free-Tier AI Backend** | Active | `app/api/chat/route.ts` | Preflight stream verification (`startVerifiedStream`), ASCII-safe response headers, per-model cooldowns, per-IP rate limit (25 req/hr), and 5-provider free-tier fallback chain. |
| **AI Context Hub, Rules, Skills & Hooks** | Active | `context/`, `AGENTS.md`, `app/*/AGENTS.md`, `.agents/` | Consolidated AI instructions, architecture docs, visual `FLOWS.md`, `DECISIONS.md` (ADRs), feature tracker, roadmap, scoped API/UI rules, 8 workspace skills (with interactive `ask_question` pickers), and a `PreToolUse` `command-policy.mjs` hook. |
| **Database / Persistence** | Not Added | — | No DB installed yet; portfolio content is static and chat history resets on reload. |
| **Job-Readiness Enhancements** | Planned | `context/ROADMAP.md` | GitHub/repo links, PDF resume + email CTA, ArcTech freelance experience entry, quantified metrics, project previews, OpenGraph metadata, and unused prototype cleanup. |

---

## 2. Change Log

- **2026-11-23:**
  - Upgraded the Credentials tab into a modern `app/components/sections/CredentialsPanel.tsx` component with category filters (`All Credentials`, `AI & Data`, `Programming`, `CMS & Academic`), framed subject & issuer brand icons (`SiUdemy`, `SiCisco`, `SiPython`, `SiJavascript`, `SiWordpress`, `Sparkles`, `BarChart3`, `Globe`, `GraduationCap`), 1-line summaries, verified badges, and hover CTAs; fixed Next.js 16 Turbopack variable font loading and `@theme inline` variable naming in `app/layout.tsx` & `app/globals.css`.
  - Added **Coding With AI - Planning To Production** (Udemy / Brad Traversy, Jun 2026) and **Basic WordPress & VirtualWorkPH Certificates** (VirtualWorkPH, Mar 2025) to `UNIFIED_DATA.credentials` in `app/lib/data.js`, sorted credentials newest-first, and synced `CREDENTIALS` into `getAiKnowledgeBase()` so `ARKI_AI` answers accurately about certifications.
  - Applied **Option A: Executive Slate & Electric Cyan** typography & theme overhaul (ADR-006): fixed `Arial` override in `app/globals.css`, switched to `Plus Jakarta Sans` + `Inter` + `JetBrains Mono` in `app/layout.tsx`, added icon-assisted Title Case navigation tabs, raised panel surface contrast (`bg-[#0d1424]/90`) and softened `Scene.tsx` center glow, unified Sky Cyan + Warm Amber accents across all tabs and `Chat.tsx`.
  - Added interactive **`AI Workflow` (`workflow`)** section (`app/components/sections/AiWorkflowPanel.tsx`) and `UNIFIED_DATA.ai_workflow` (synced with `getAiKnowledgeBase()`) showcasing Context Engineering vs. Vibe Coding, the 4-layer agentic setup, all 8 skills, command-policy guardrails, and 1-click copyable starter kit blueprints for future projects.
  - Added interactive IDE prompts & command policies: upgraded `git-commit-push` (single-prompt `ask_question` picker + `npm.cmd run build` gate canceling push on build failure) and `add-portfolio-feature` to use clickable pickers, created `roadmap-picker` skill, and added `command-policy.mjs` (`deny` .env leaks/force-push, `force_ask` install/delete, `allow` safe git/build/tsc/eslint).
  - Upgraded agentic coding setup: added `context/FLOWS.md` (visual Mermaid flows), `context/DECISIONS.md` (ADRs), scoped directory rules (`app/api/AGENTS.md`, `app/components/AGENTS.md`), 3 new skills (`debug-ai-chat`, `health-check`, `explain-flow`), and `.agents/hooks.json` + `.agents/scripts/guard-secrets.mjs` (`PreToolUse` `.env` secret-leak guard).
  - Created centralized `context/` folder (`README.md`, `AI_INSTRUCTIONS.md`, `ARCHITECTURE.md`, `APP_CONTEXT.md`, `ROADMAP.md`), migrated context/roadmap docs out of `docs/`, and updated `AGENTS.md` and `.agents/skills/` references.
  - Added prioritized job-readiness and portfolio improvement backlog in `context/ROADMAP.md`.
- **2026-11-22:**
  - Fixed lazy `streamText` fallback bug in `app/api/chat/route.ts` via `startVerifiedStream()`, added structured error classification, per-model cooldowns, ASCII-safe `X-Fallback-Notice` header, and a 5-provider free-tier `MODEL_CHAIN`.
  - Added dynamic status header, fallback notice banner, reasoning indicator, and inline `SYSTEM_ALERT` error card (with provider diagnostics & retry) in `app/components/Chat.tsx`.
  - Moved `SkillsMatrix` out of `Chat.tsx` into a dedicated `Tech & Skills` tab (adding `Tools & Platforms` + Core Operational Capabilities) and converted `ARKI_AI` into a modern floating popup chat modal with `ChatHandle.openWithPrompt()` deep-linking.
  - Added `SolutionsPanel.tsx` (Business & Personal automation services, Before->After blueprints, 4-step delivery workflow, consultation CTA), cleaned duplicate placeholder projects and typos in `app/lib/data.js`, upgraded Projects into Problem/Solution/Impact case studies, widened desktop layout (`max-w-[1640px]`) with larger typography, and converted mobile button/tab rows into clean horizontal swipe lists.
  - Added workspace skills under `.agents/skills/` (`sync-app-context`, `add-portfolio-feature`, `update-portfolio-data`, `git-commit-push`).
