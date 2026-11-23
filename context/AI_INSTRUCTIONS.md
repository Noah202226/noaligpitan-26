# AI Instructions & Engineering Rules — `noaligpitan-dev26`

> Canonical instructions for any AI agent working on this repository. Root `AGENTS.md` (and `CLAUDE.md`) stays lightweight and delegates detailed rules here.

---

## 1. Context-First Workflow
1. Read `context/ARCHITECTURE.md` and `context/APP_CONTEXT.md` before starting feature or architectural work.
2. Check `context/ROADMAP.md` when planning upcoming enhancements or answering "what should we work on next?"; check off completed items (`[x]`) as they are finished.
3. After any significant code, route, component, provider, or env var change, update `context/APP_CONTEXT.md` (and `context/ARCHITECTURE.md` if structure/architecture changed).

---

## 2. Core Engineering Guardrails

### Next.js 16 (App Router)
- This repo runs **Next.js `16.2.2`** + **React `19.2.4`**.
- Read the relevant guide in `node_modules/next/dist/docs/` before relying on older Next.js conventions or writing App Router APIs.

### Single Source of Truth (`app/lib/data.js`)
- All portfolio content (`identity`, `stack`, `capabilities`, `services`, `automation_blueprints`, `process_steps`, `experience`, `projects`, `credentials`) MUST live in `UNIFIED_DATA` inside `app/lib/data.js`.
- Whenever new fields or sections are added to `UNIFIED_DATA`, ensure `getAiKnowledgeBase()` serializes them so `ARKI_AI` stays synchronized with the UI.

### Styling & UI Conventions
- Preserve the dark cyberpunk / HUD visual aesthetic (glass panels, subtle blue/yellow accents, monospace metadata labels, crisp contrast).
- Use **Tailwind CSS v4** utilities (`bg-linear-to-r`, `bg-size-[...]`).
- Use global `.custom-scrollbar` for scrollable panels and `.no-scrollbar` for mobile horizontal swipe bars (`app/globals.css`).
- Keep desktop views widescreen-friendly (`max-w-[1640px]`, readable typography) and mobile button/tab groups as single-row horizontal swipe strips.
- **No AI slop or layout-meta labels:** Avoid filler buzzword badges (like `"Verified"`, `"Official"`) and never display internal layout/viewport state pills (like `"Wide View"`, `"Overview"`, `"Focus Mode"`) in the UI. Every visible badge or label must carry real user value.

### AI Chat Backend (`app/api/chat/route.ts`) & Frontend (`app/components/Chat.tsx`)
- **Preflight streaming:** Never return `streamText().toUIMessageStreamResponse()` directly inside a provider fallback loop — `streamText()` is lazy and commits HTTP 200 before provider errors fire. Always verify the stream through `startVerifiedStream()`.
- **ASCII-safe headers:** Every custom HTTP header (`X-Model-Used`, `X-Provider`, `X-Fallback-Notice`) MUST pass through `toSafeHeaderValue()` — non-ASCII characters (like em-dashes `—`) throw `TypeError` in `new Headers()`.
- **OpenAI-compatible providers:** Always call `.chat(modelId)` on `createOpenAI({ baseURL, apiKey })` so third-party providers (OpenRouter, Cerebras, Mistral) hit `/v1/chat/completions` instead of OpenAI's `/v1/responses`.
- **Structured errors:** Return `{ code, error, details }` JSON on error responses so `Chat.tsx` renders actionable `SYSTEM_ALERT` diagnostics instead of failing silently.
- **Never commit or print secrets:** Never read/echo secret values from `.env.local`; only inspect variable names when auditing configuration.

---

## 3. Verification Commands (Windows PowerShell)
PowerShell script execution policy may block `npx.ps1`. Run TypeScript and ESLint directly through Node:

```powershell
node node_modules/typescript/bin/tsc --noEmit
node node_modules/eslint/bin/eslint.js <changed-files>
```

Fix all TypeScript and ESLint errors before reporting completion.

---

## 4. Workspace Skills Reference (`.agents/skills/`)
- `sync-app-context` — Refresh `context/APP_CONTEXT.md` and `context/ARCHITECTURE.md` from the live codebase.
- `add-portfolio-feature` — Plan, build, verify, and document new features end-to-end.
- `update-portfolio-data` — Edit `app/lib/data.js` and sync both UI and `ARKI_AI`.
- `git-commit-push` — Scan git diffs, check for accidental secrets, draft a commit message, wait for explicit user approval, then run `git add .`, `git commit`, and `git push`.
