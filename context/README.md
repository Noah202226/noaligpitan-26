# `context/` — AI Knowledge Base & Project Hub (`noaligpitan-dev26`)

This folder is the central source of truth for **AI instructions, architecture, feature tracking, and roadmap planning** for Noa Ligpitan's developer portfolio (`noaligpitan-dev26`).

## Contents

| File | Purpose |
| :--- | :--- |
| [AI_INSTRUCTIONS.md](./AI_INSTRUCTIONS.md) | Coding rules, design conventions, verification commands, and workflow triggers for AI assistants. |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System architecture, data flow (`UNIFIED_DATA` -> UI & `ARKI_AI`), directory map, AI chat pipeline, and env vars. |
| [APP_CONTEXT.md](./APP_CONTEXT.md) | Living feature inventory, current status table, and dated change log. |
| [ROADMAP.md](./ROADMAP.md) | Prioritized job-readiness & portfolio improvement TODOs (`P1`–`P3`). |

## How Auto-Discovery Works
- Root [AGENTS.md](../AGENTS.md) (imported by [CLAUDE.md](../CLAUDE.md)) is automatically loaded by AI coding agents and points here.
- Reusable multi-step AI workflows live in [`.agents/skills/`](../.agents/skills/):
  - `sync-app-context` — scans the repo and updates `context/APP_CONTEXT.md` and `context/ARCHITECTURE.md`.
  - `add-portfolio-feature` — plans, builds, verifies, and documents new features.
  - `update-portfolio-data` — updates `app/lib/data.js` while keeping UI and `ARKI_AI` in sync.
  - `git-commit-push` — scans git diffs, drafts a commit message, waits for approval, and commits/pushes.
