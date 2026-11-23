# `context/` — AI Knowledge Base & Project Hub (`noaligpitan-dev26`)

This folder is the central source of truth for **AI instructions, architecture, feature tracking, and roadmap planning** for Noa Ligpitan's developer portfolio (`noaligpitan-dev26`).

## Contents

| File | Purpose |
| :--- | :--- |
| [AI_INSTRUCTIONS.md](./AI_INSTRUCTIONS.md) | Coding rules, design conventions, verification commands, and workflow triggers for AI assistants. |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System architecture, data flow (`UNIFIED_DATA` -> UI & `ARKI_AI`), directory map, AI chat pipeline, and env vars. |
| [FLOWS.md](./FLOWS.md) | Visual Mermaid flow maps & step-by-step traces for UI navigation, `ARKI_AI` streaming/fallback, 3D scene, and data propagation. |
| [DECISIONS.md](./DECISIONS.md) | Architecture Decision Records (ADRs) documenting why key technical patterns exist. |
| [APP_CONTEXT.md](./APP_CONTEXT.md) | Living feature inventory, current status table, and dated change log. |
| [ROADMAP.md](./ROADMAP.md) | Prioritized job-readiness & portfolio improvement TODOs (`P1`–`P3`). |

## How Auto-Discovery Works
- Root [AGENTS.md](../AGENTS.md) (imported by [CLAUDE.md](../CLAUDE.md)) is automatically loaded by AI coding agents and points here.
- Scoped local rules live in [app/api/AGENTS.md](../app/api/AGENTS.md) and [app/components/AGENTS.md](../app/components/AGENTS.md).
- Automated command-policy & secret-guard hook lives in [`.agents/hooks.json`](../.agents/hooks.json) (`PreToolUse` on `run_command` via `command-policy.mjs`).
- Reusable multi-step AI workflows live in [`.agents/skills/`](../.agents/skills/):
  - `sync-app-context` — scans the repo and updates `context/APP_CONTEXT.md` and `context/ARCHITECTURE.md`.
  - `add-portfolio-feature` — plans, builds, verifies, and documents new features (with interactive choice prompts when scope is ambiguous).
  - `update-portfolio-data` — updates `app/lib/data.js` while keeping UI and `ARKI_AI` in sync.
  - `roadmap-picker` — reads `context/ROADMAP.md` and shows a clickable numbered picker to choose the next task.
  - `debug-ai-chat` — diagnoses AI provider/model/streaming issues safely without printing keys.
  - `health-check` — runs `tsc`, `eslint`, `.env.local` ignore check, unused code scan, and context freshness audit.
  - `explain-flow` — traces and explains any feature end-to-end with Mermaid diagrams and line links.
  - `git-commit-push` — scans git diffs, presents clickable commit message options (`ask_question`), and commits/pushes on approval.
