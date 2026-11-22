---
name: sync-app-context
description: >-
  Scans the noaligpitan-dev26 repository (structure, package.json, routes,
  components, env var names, and app/lib/data.js) and updates docs/APP_CONTEXT.md
  so features, file maps, and changelog stay accurate. Use when the user asks to
  sync, refresh, audit, or update the app context or feature tracker.
---

# Sync App Context Workflow

Use this workflow to keep `docs/APP_CONTEXT.md` synchronized with the actual codebase.

## Steps

1. **Inspect current project state (in parallel):**
   - List project files (excluding `node_modules`, `.next`, `.git`).
   - Read `package.json`, `docs/APP_CONTEXT.md`, and any newly added or modified files under `app/`.
   - Check configured env variable *names* in `.env.local` (never print or record secret values).

2. **Diff reality against `docs/APP_CONTEXT.md`:**
   - **Project Structure:** Add new files/folders and remove deleted ones; flag unused prototypes accurately.
   - **Feature Inventory & Status:** Update statuses (`Active`, `In Progress`, `Pending`, `Removed`), affected files, and notes.
   - **Tech Stack & Env Vars:** Reflect any dependency or environment variable additions/removals.
   - **Architecture Conventions & Gotchas:** Record any newly discovered runtime/framework constraints.

3. **Update `docs/APP_CONTEXT.md`:**
   - Apply targeted edits to keep the document concise and scannable.
   - Append a dated bullet entry to Section 6 (`Change Log`).

4. **Verify:**
   - Re-read modified sections of `docs/APP_CONTEXT.md` to confirm all referenced file paths exist and no secrets were included.
