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
   - Read `docs/APP_CONTEXT.md` to review existing features, conventions, and file layout.
   - If the feature touches Next.js App Router APIs, consult the relevant guide in `node_modules/next/dist/docs/`.

2. **Plan & Confirm Scope (if ambiguous):**
   - Identify which files will be created or modified (`app/page.tsx`, `app/components/`, `app/api/`, `app/lib/data.js`).
   - If the feature introduces a database or external service, confirm the provider and env variable names before installing packages.

3. **Implement Following Project Standards:**
   - Match the dark cyberpunk/HUD visual design (Tailwind v4 utilities, Framer Motion transitions, monospace HUD labels).
   - If adding portfolio content, update `UNIFIED_DATA` in `app/lib/data.js` so `ARKI_AI` automatically knows about it via `getAiKnowledgeBase()`.
   - If modifying `app/api/chat/route.ts`, preserve `startVerifiedStream()`, `toSafeHeaderValue()`, and structured `{ code, error, details }` error responses.

4. **Verify:**
   - Run TypeScript check: `node node_modules/typescript/bin/tsc --noEmit`
   - Run ESLint on modified files: `node node_modules/eslint/bin/eslint.js <files>`
   - Fix all reported errors before finishing.

5. **Update Living Context:**
   - Update `docs/APP_CONTEXT.md` (Project Structure, Feature Inventory, Env Vars if applicable, and Change Log).
