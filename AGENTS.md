<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Rules — `noaligpitan-dev26`

## Context & Feature Tracking
- Read `docs/APP_CONTEXT.md` at the start of feature or architecture work to understand the current structure, active features, and known gotchas.
- Whenever you add, remove, or significantly change a feature, route, component, provider, or environment variable, update `docs/APP_CONTEXT.md` (Feature Inventory, Project Structure if changed, and Change Log).

## Codebase Conventions
- **Single Source of Truth:** Store portfolio profile, tech stack, experience, projects, and credentials in `app/lib/data.js` (`UNIFIED_DATA`) so both the UI and `ARKI_AI` (`getAiKnowledgeBase()`) stay in sync.
- **Styling:** Preserve the dark cyberpunk/HUD aesthetic and use Tailwind CSS v4 utilities (`bg-linear-to-r`, `bg-size-[...]`).
- **AI Chat Route (`app/api/chat/route.ts`):**
  - Never return `streamText().toUIMessageStreamResponse()` directly inside a fallback loop — always preflight via `startVerifiedStream()` so provider failures trigger fallback before HTTP 200 is committed.
  - Keep custom HTTP headers strictly ASCII-safe (`toSafeHeaderValue()`).
  - Use `.chat(modelId)` when calling OpenAI-compatible third-party providers via `createOpenAI({ baseURL })`.
- **Verification:** After code changes, run typechecking and linting (`node node_modules/typescript/bin/tsc --noEmit` and `node node_modules/eslint/bin/eslint.js <changed-files>`).

