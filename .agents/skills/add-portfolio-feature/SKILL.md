---
name: add-portfolio-feature
description: >-
  End-to-end workflow for planning, building, verifying, and documenting a new
  feature or enhancement in noaligpitan-dev26. Use when the user asks to add a
  new section, component, API route, database integration, or UI capability to
  this portfolio app.
---

# Add Portfolio Feature Workflow

Follow this structured sequence when implementing a new feature in `noaligpitan-dev26`.

## Steps

1. **Load Context:**
   - Read `context/ARCHITECTURE.md`, `context/APP_CONTEXT.md`, and `context/AI_INSTRUCTIONS.md` to review existing features, conventions, and file layout.
   - Check `context/ROADMAP.md` if the feature corresponds to a planned item.
   - If the feature touches Next.js App Router APIs, consult the relevant guide in `node_modules/next/dist/docs/`.

2. **Plan & Confirm Scope (if ambiguous):**
   - Identify which files will be created or modified (`app/page.tsx`, `app/components/`, `app/api/`, `app/lib/data.js`).
   - If placement, UX style, or service provider choices are ambiguous, use the `ask_question` tool to present 2–4 clickable options (recommended option first) before editing.
   - If the feature introduces a database or external service, confirm the provider and env variable names before installing packages.

3. **Implement Following Project Standards:**
   - Match the **Executive Slate & Electric Cyan** design system (ADR-006: `Plus Jakarta Sans` + `Inter` + `JetBrains Mono`, Tailwind v4 utilities, Framer Motion transitions).
   - **Keep UI copy clean and authentic:** Never add AI-slop filler badges (e.g., `"Verified"`, `"Official"`) or internal layout/mode indicator pills (e.g., `"Wide View"`, `"Overview"`, `"Focus Mode"`) to the UI.
   - If adding portfolio content, update `UNIFIED_DATA` in `app/lib/data.js` so `ARKI_AI` automatically knows about it via `getAiKnowledgeBase()`.
   - If modifying `app/api/chat/route.ts`, preserve `startVerifiedStream()`, `toSafeHeaderValue()`, and structured `{ code, error, details }` error responses.

4. **Verify:**
   - Run TypeScript check: `node node_modules/typescript/bin/tsc --noEmit`
   - Run ESLint on modified files: `node node_modules/eslint/bin/eslint.js <files>`
   - Fix all reported errors before finishing.

5. **Update Living Context:**
   - Update `context/APP_CONTEXT.md` (Feature Inventory and Change Log), `context/ARCHITECTURE.md` (if structure/env vars changed), and check off completed items in `context/ROADMAP.md`.
