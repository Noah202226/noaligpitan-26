---
name: sync-app-context
description: >-
  Scans the noaligpitan-dev26 repository (structure, package.json, routes,
  components, env var names, and app/lib/data.js) and updates context/APP_CONTEXT.md
  and context/ARCHITECTURE.md so features, file maps, and changelog stay accurate.
  Use when the user asks to sync, refresh, audit, or update the app context or feature tracker.
---

# Sync App Context Workflow

Use this workflow to keep `context/APP_CONTEXT.md` and `context/ARCHITECTURE.md` synchronized with the actual codebase.

## Steps

1. **Inspect current project state (in parallel):**
   - List project files (excluding `node_modules`, `.next`, `.git`).
   - Read `package.json`, `context/APP_CONTEXT.md`, `context/ARCHITECTURE.md`, and any newly added or modified files under `app/`.
   - Check configured env variable *names* in `.env.local` (never print or record secret values).

2. **Diff reality against `context/` docs:**
   - **Project Structure (`context/ARCHITECTURE.md`):** Add new files/folders and remove deleted ones; flag unused prototypes accurately.
   - **Feature Inventory & Status (`context/APP_CONTEXT.md`):** Update statuses (`Active`, `In Progress`, `Planned`, `Removed`), affected files, and notes.
   - **Tech Stack & Env Vars (`context/ARCHITECTURE.md`):** Reflect any dependency or environment variable additions/removals.
   - **Rules & Gotchas (`context/AI_INSTRUCTIONS.md`):** Record any newly discovered runtime/framework constraints.

3. **Update `context/` files:**
   - Apply targeted edits to keep the documents concise and scannable.
   - Append a dated bullet entry to `context/APP_CONTEXT.md` (`Change Log`).

4. **Verify:**
   - Re-read modified sections to confirm all referenced file paths exist and no secrets were included.
