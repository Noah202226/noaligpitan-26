<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Rules — `noaligpitan-dev26`

## Central Context Hub (`context/`)
- All detailed AI instructions, architecture docs, flow maps, decision records, feature tracking, and planned TODOs live in `context/`:
  - `context/AI_INSTRUCTIONS.md` — full engineering rules, styling conventions, and verification commands.
  - `context/ARCHITECTURE.md` — tech stack, data flow diagrams, file map, AI chat pipeline, and env vars.
  - `context/FLOWS.md` — visual end-to-end flow diagrams & file traces across UI, 3D scene, and `ARKI_AI`.
  - `context/DECISIONS.md` — Architecture Decision Records (ADRs) explaining non-obvious invariants.
  - `context/APP_CONTEXT.md` — living feature inventory and change log.
  - `context/ROADMAP.md` — prioritized job-readiness and portfolio improvement TODOs.
- Scoped local rules also live in `app/api/AGENTS.md` and `app/components/AGENTS.md` and apply automatically when editing those folders.
- Read `context/ARCHITECTURE.md`, `context/FLOWS.md`, and `context/APP_CONTEXT.md` at the start of feature or architecture work, and check `context/ROADMAP.md` when planning upcoming improvements.
- Whenever you add, remove, or significantly change a feature, route, component, provider, or env var, update `context/APP_CONTEXT.md` (and `context/ARCHITECTURE.md` / `context/FLOWS.md` / `context/ROADMAP.md` as applicable).

## Critical Invariants
- **Single Source of Truth:** Keep portfolio profile, stack, services, blueprints, experience, projects, and credentials in `app/lib/data.js` (`UNIFIED_DATA`) synced with `getAiKnowledgeBase()`.
- **Styling:** Preserve the dark cyberpunk/HUD aesthetic using Tailwind CSS v4 utilities (`bg-linear-to-r`, `bg-size-[...]`).
- **AI Chat Route (`app/api/chat/route.ts`):** Always preflight streams via `startVerifiedStream()`, sanitize custom HTTP headers with `toSafeHeaderValue()`, and use `.chat(modelId)` for OpenAI-compatible third-party providers.
- **Verification:** Run `node node_modules/typescript/bin/tsc --noEmit` and `node node_modules/eslint/bin/eslint.js <changed-files>` after code changes.

