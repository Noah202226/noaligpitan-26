# App Context & Feature Tracker — `noaligpitan-dev26`

> Living feature inventory and change log for Noa Ligpitan's developer portfolio. For system architecture and directory maps, see [ARCHITECTURE.md](./ARCHITECTURE.md). For AI coding rules, see [AI_INSTRUCTIONS.md](./AI_INSTRUCTIONS.md). For upcoming TODOs, see [ROADMAP.md](./ROADMAP.md).

---

## 1. Feature Inventory & Status

| Feature | Status | Key Files | Notes |
| :--- | :--- | :--- | :--- |
| **Widescreen 2-Column HUD Layout** | Active | `app/page.tsx` | Responsive `4/8` (`xl: 3/9`) grid up to `max-w-[1640px]`: Identity column (rotating availability ticker, stats, socials) + spacious 6-tab HUD panel (`mission`, `solutions`, `skills`, `projects`, `experience`, `credentials`), Mission solutions highlight, case-study project cards, and single-row mobile horizontal swipe lists. |
| **Solutions & Automation Showcase** | Active | `app/components/sections/SolutionsPanel.tsx` | Filterable (`All` / `Business Ops` / `Personal`) service cards, Before -> After automation blueprints, 4-step delivery workflow (`Audit -> Architect -> Build & Automate -> Launch & Scale`), consultation CTA, and interactive `Ask ARKI_AI` deep-links. |
| **Interactive 3D Background (`NeuralGrid`)** | Active | `app/components/Scene.tsx` | 2,000 additive particles, wireframe cube, lit core sphere; tracks window mouse position with lerp smoothing. |
| **Unified Data & AI Knowledge Base** | Active | `app/lib/data.js` | `UNIFIED_DATA` powers all UI tabs (identity, capabilities, services, automation blueprints, delivery process, stack, case-study projects, experience, credentials) and `getAiKnowledgeBase()` for `ARKI_AI`. |
| **Skills Matrix HUD** | Active | `app/components/sections/SkillsMatrix.tsx` | Renders 4 Core Operational Capabilities plus all 5 tech stack categories (`Frontend`, `Backend`, `Database`, `Automation & AI`, `Tools & Platforms`) in a responsive 2-column grid inside the `Tech & Skills` tab. |
| **`ARKI_AI` Floating Popup Chat Modal** | Active | `app/components/Chat.tsx` | Modern floating bottom-right launcher (`Ask ARKI_AI`) opening an animated popup modal with imperative `openWithPrompt()` deep-link handle, desktop expand/collapse, mobile full-view + backdrop, Escape-to-close, persistent conversation state, inline markdown formatting, quick actions, model badge, fallback notice, and `SYSTEM_ALERT` error diagnostics & retry. |
| **Multi-Provider Free-Tier AI Backend** | Active | `app/api/chat/route.ts` | Preflight stream verification (`startVerifiedStream`), ASCII-safe response headers, per-model cooldowns, per-IP rate limit (25 req/hr), and 5-provider free-tier fallback chain. |
| **AI Context Hub & Skills** | Active | `context/`, `AGENTS.md`, `.agents/skills/` | Consolidated AI instructions, architecture docs, feature tracker, roadmap, and 4 workspace skills. |
| **Database / Persistence** | Not Added | — | No DB installed yet; portfolio content is static and chat history resets on reload. |
| **Job-Readiness Enhancements** | Planned | `context/ROADMAP.md` | GitHub/repo links, PDF resume + email CTA, ArcTech freelance experience entry, quantified metrics, project previews, OpenGraph metadata, and unused prototype cleanup. |

---

## 2. Change Log

- **2026-11-23:**
  - Created centralized `context/` folder (`README.md`, `AI_INSTRUCTIONS.md`, `ARCHITECTURE.md`, `APP_CONTEXT.md`, `ROADMAP.md`), migrated context/roadmap docs out of `docs/`, and updated `AGENTS.md` and `.agents/skills/` references.
  - Added prioritized job-readiness and portfolio improvement backlog in `context/ROADMAP.md`.
- **2026-11-22:**
  - Fixed lazy `streamText` fallback bug in `app/api/chat/route.ts` via `startVerifiedStream()`, added structured error classification, per-model cooldowns, ASCII-safe `X-Fallback-Notice` header, and a 5-provider free-tier `MODEL_CHAIN`.
  - Added dynamic status header, fallback notice banner, reasoning indicator, and inline `SYSTEM_ALERT` error card (with provider diagnostics & retry) in `app/components/Chat.tsx`.
  - Moved `SkillsMatrix` out of `Chat.tsx` into a dedicated `Tech & Skills` tab (adding `Tools & Platforms` + Core Operational Capabilities) and converted `ARKI_AI` into a modern floating popup chat modal with `ChatHandle.openWithPrompt()` deep-linking.
  - Added `SolutionsPanel.tsx` (Business & Personal automation services, Before->After blueprints, 4-step delivery workflow, consultation CTA), cleaned duplicate placeholder projects and typos in `app/lib/data.js`, upgraded Projects into Problem/Solution/Impact case studies, widened desktop layout (`max-w-[1640px]`) with larger typography, and converted mobile button/tab rows into clean horizontal swipe lists.
  - Added workspace skills under `.agents/skills/` (`sync-app-context`, `add-portfolio-feature`, `update-portfolio-data`, `git-commit-push`).
