# App Context & Feature Tracker — `noaligpitan-dev26`

> Living source of truth for the architecture, features, structure, and AI workflows of Noa Ligpitan's developer portfolio. Keep this file updated whenever features, routes, providers, or files change (or run the `sync-app-context` skill).

---

## 1. Overview & Tech Stack

- **App Name:** `noaligpitan-dev26` — Interactive 3D & AI-powered developer portfolio for **Noa Ligpitan** (_Full-Stack Developer & Business Automation Architect_).
- **Core Stack:**
  - **Framework:** Next.js `16.2.2` (App Router) + React `19.2.4` + TypeScript `5`
  - **Styling & Motion:** Tailwind CSS `v4` (`@tailwindcss/postcss`), Framer Motion `12`, Lucide Icons, React Icons
  - **3D WebGL:** Three.js `0.183`, `@react-three/fiber` `9`, `@react-three/drei` `10`
  - **AI Streaming:** Vercel AI SDK `v6` (`ai`, `@ai-sdk/react`, `@ai-sdk/groq`, `@ai-sdk/google`, `@ai-sdk/openai`)
- **Database:** None currently. Portfolio data is static in `app/lib/data.js`; chat history is client-side React state; rate limits & model cooldowns are server in-memory maps.

---

## 2. Project Structure

```text
noaligpitan-dev26/
├── AGENTS.md                           # Always-on agent rules (Next.js 16 + project conventions)
├── CLAUDE.md                           # Imports @AGENTS.md
├── .agents/
│   └── skills/
│       ├── sync-app-context/SKILL.md      # Workflow: scan repo & update this context doc
│       ├── add-portfolio-feature/SKILL.md # Workflow: build, verify & track new features
│       ├── update-portfolio-data/SKILL.md # Workflow: update UNIFIED_DATA & AI knowledge base
│       └── git-commit-push/SKILL.md       # Workflow: scan diff, suggest commit msg, approve & push
├── docs/
│   └── APP_CONTEXT.md                  # This file (architecture + feature tracker)
├── app/
│   ├── layout.tsx                      # Root layout, Geist fonts, SEO metadata
│   ├── globals.css                     # Tailwind v4 entry + CSS theme variables
│   ├── page.tsx                        # Main 3-column HUD portfolio layout
│   ├── api/
│   │   └── chat/
│   │       └── route.ts                # Streaming AI endpoint + multi-provider fallback & IP throttle
│   ├── components/
│   │   ├── Scene.tsx                   # Full-screen 3D Three.js NeuralGrid background
│   │   ├── Chat.tsx                    # ARKI_AI terminal chat UI + error/fallback notifications
│   │   ├── streaming-text.ts           # [Unused scratch file]
│   │   └── sections/
│   │       ├── SolutionsPanel.tsx      # Business & Personal automation services, blueprints, process & CTA
│   │       ├── SkillsMatrix.tsx        # Core operational capabilities + 5 tech stack modules
│   │       ├── Navbar.tsx              # [Unused prototype]
│   │       └── FeatureWork.tsx         # [Unused prototype]
│   └── lib/
│       └── data.js                     # Single source of truth (UNIFIED_DATA + getAiKnowledgeBase)
└── public/                             # Profile photos, icons, webmanifest
```

---

## 3. Feature Inventory & Status

| Feature                                      | Status    | Key Files                                  | Notes                                                                                                                                                                                                                                                                                                                                                                             |
| :------------------------------------------- | :-------- | :----------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **2-Column HUD Portfolio Layout**            | Active    | `app/page.tsx`                             | Clean `4 / 8` desktop grid: Identity card (rotating availability ticker, compact stats, socials) + spacious HUD content panel with top tab navigation (`mission`, `solutions`, `skills`, `projects`, `experience`, `credentials`), Mission solutions highlight + stack snapshot, and operational case-study project cards.                                                     |
| **Solutions & Automation Showcase**          | Active    | `app/components/sections/SolutionsPanel.tsx` | Filterable (`All` / `Business Ops` / `Personal`) service cards, Before -> After automation blueprints, 4-step delivery workflow (`Audit -> Architect -> Build & Automate -> Launch & Scale`), consultation CTA, and interactive `Ask ARKI_AI` deep-links.                                                                                                                       |
| **Interactive 3D Background (`NeuralGrid`)** | Active    | `app/components/Scene.tsx`                 | 2,000 additive particles, wireframe cube, lit core sphere; tracks window mouse position with lerp smoothing.                                                                                                                                                                                                                                                                      |
| **Unified Data & AI Knowledge Base**         | Active    | `app/lib/data.js`                          | `UNIFIED_DATA` powers all UI tabs (identity, capabilities, services, automation blueprints, delivery process, stack, case-study projects, experience, credentials) and `getAiKnowledgeBase()` for `ARKI_AI`.                                                                                                                                                                    |
| **Skills Matrix HUD**                        | Active    | `app/components/sections/SkillsMatrix.tsx` | Renders 4 Core Operational Capabilities plus all 5 tech stack categories (`Frontend`, `Backend`, `Database`, `Automation & AI`, `Tools & Platforms`) in a responsive 2-column grid inside the `Tech & Skills` tab.                                                                                                                                                                |
| **`ARKI_AI` Floating Popup Chat Modal**      | Active    | `app/components/Chat.tsx`                  | Modern floating bottom-right launcher button (`Ask ARKI_AI`) opening an animated popup modal (with imperative `openWithPrompt()` deep-link handle, desktop expand/collapse, mobile full-view + backdrop, Escape-to-close, persistent conversation state, inline markdown formatting, quick actions, model badge, fallback notice, and `SYSTEM_ALERT` error diagnostics & retry).    |
| **Multi-Provider Free-Tier AI Backend**      | Active    | `app/api/chat/route.ts`                    | Preflight stream verification (`startVerifiedStream`), ASCII-safe response headers, per-model cooldowns, per-IP rate limit (25 req/hr). Chain: Groq (`qwen/qwen3.8-27b`, `openai/gpt-oss-20b`, `openai/gpt-oss-120b`) -> Google (`gemini-2.5-flash-lite`, `gemini-2.5-flash`) -> OpenRouter (`openrouter/free`) -> Cerebras (`gpt-oss-120b`) -> Mistral (`mistral-small-latest`). |
| **Database / Persistence**                   | Not Added | —                                          | No DB installed yet; portfolio content is static and chat history resets on reload.                                                                                                                                                                                                                                                                                               |
| **Unused File Cleanup**                      | Pending   | `app/components/`                          | Unused prototype files remain (`Navbar.tsx`, `FeatureWork.tsx`, `streaming-text.ts`). (`data.js` duplicates & typos resolved.)                                                                                                                                                                                                                                                  |

---

## 4. Environment Variables (`.env.local`)

Only configure the providers you want active — unconfigured providers are skipped automatically:

| Variable                       | Provider                          | Required?                                      |
| :----------------------------- | :-------------------------------- | :--------------------------------------------- |
| `GROQ_API_KEY`                 | Groq (Primary)                    | At least one provider key required             |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google AI Studio / Gemini         | Optional (recommended fallback)                |
| `OPENROUTER_API_KEY`           | OpenRouter (`openrouter/free`)    | Optional                                       |
| `CEREBRAS_API_KEY`             | Cerebras                          | Optional                                       |
| `MISTRAL_API_KEY`              | Mistral                           | Optional                                       |
| `NEXT_PUBLIC_SITE_URL`         | Used as OpenRouter `HTTP-Referer` | Optional (defaults to `http://localhost:3000`) |

---

## 5. Architecture Conventions & Gotchas

- **Next.js 16:** Always check `node_modules/next/dist/docs/` before relying on older Next.js conventions.
- **Tailwind CSS v4:** Use v4 gradient/utility syntax (`bg-linear-to-r`, `bg-size-[...]`).
- **AI SDK v6 Streaming:** `streamText()` is lazy and does not reject on provider errors until chunks are read. Keep `startVerifiedStream()` in `app/api/chat/route.ts` so fallback happens before committing HTTP 200.
- **OpenAI-Compatible Third-Party Providers:** Use `createOpenAI({ baseURL, apiKey }).chat(modelId)` (Chat Completions API) instead of the default Responses API.
- **HTTP Headers:** Always keep custom headers (`X-Model-Used`, `X-Fallback-Notice`) ASCII-only (`toSafeHeaderValue()`) — Unicode characters like em-dashes (`—`) crash `new Headers()`.
- **Local Verification (Windows PowerShell):** If `npx` is blocked by execution policy, invoke TypeScript and ESLint directly via Node:
  - `node node_modules/typescript/bin/tsc --noEmit`
  - `node node_modules/eslint/bin/eslint.js <files>`

---

## 6. Change Log

- **2026-11-22:**
  - Fixed lazy `streamText` fallback bug in `app/api/chat/route.ts` via `startVerifiedStream()`.
  - Added structured error classification, per-model cooldowns, ASCII-safe `X-Fallback-Notice` header, and a 5-provider free-tier `MODEL_CHAIN` verified against active Groq (`qwen/qwen3.8-27b`, `openai/gpt-oss-20b`, `openai/gpt-oss-120b`) and Gemini (`gemini-2.5-flash-lite`, `gemini-2.5-flash`) models.
  - Added dynamic status header, fallback notice banner, reasoning indicator, and inline `SYSTEM_ALERT` error card (with provider diagnostics & retry) in `app/components/Chat.tsx`.
  - Created AI project context (`docs/APP_CONTEXT.md`), updated `AGENTS.md`, and added workspace workflow skills under `.agents/skills/` (including `git-commit-push`).
  - Compacted overall layout (`3 / 5 / 4` desktop grid, slimmer Identity card, top HUD tab bar), moved `SkillsMatrix` out of `Chat.tsx` into a dedicated `Tech & Skills` tab in `app/page.tsx` (now including `Tools & Platforms`), added Mission stack snapshot & summary counters, and moved `.custom-scrollbar` to `app/globals.css`.
  - Converted `ARKI_AI` (`app/components/Chat.tsx`) into a modern floating bottom-right popup modal with launcher button, desktop expand/collapse toggle, Escape-to-close, persistent chat state, and lightweight markdown formatting; expanded main layout in `app/page.tsx` to a spacious `4 / 8` 2-column grid with 2-column `SkillsMatrix` and `Credentials` grids.
  - Expanded portfolio content for business & personal automation clients: added `SolutionsPanel.tsx` (filterable Business/Personal services, Before->After automation blueprints, 4-step delivery workflow, consultation CTA, and `Ask ARKI_AI` deep-linking via `ChatHandle`), enriched `UNIFIED_DATA` & `getAiKnowledgeBase()` in `app/lib/data.js`, cleaned up duplicate placeholder projects and typos, upgraded Projects into Problem/Solution/Impact case studies, and added Core Operational Capabilities to `SkillsMatrix.tsx`.
