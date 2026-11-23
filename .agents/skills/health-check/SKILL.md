---
name: health-check
description: >-
  Runs a comprehensive project health audit for noaligpitan-dev26: TypeScript
  check, ESLint across app/, git status & .env.local ignore check, unused
  file/dependency scan, and context/ documentation freshness check. Use when the
  user asks for a health check, audit, pre-deploy check, or repo cleanup check.
---

# Project Health Check Workflow

Run this quick audit before major deployments or during routine maintenance.

## Steps

1. **Run static checks in one command:**
   ```powershell
   node node_modules/typescript/bin/tsc --noEmit; if ($LASTEXITCODE -eq 0) { node node_modules/eslint/bin/eslint.js app }
   ```

2. **Check Git & Secret Hygiene:**
   - Run `git status --short; git check-ignore -v .env.local` to verify working tree state and confirm `.env.local` is ignored by Git.

3. **Scan for Unused Files & Dependencies:**
   - Check `package.json` dependencies against actual imports in `app/`.
   - Flag any unimported files under `app/components/` (cross-reference `context/ROADMAP.md` P3 cleanup items).

4. **Check Context Freshness:**
   - Compare `app/` structure and features against `context/ARCHITECTURE.md`, `context/APP_CONTEXT.md`, and `context/ROADMAP.md`.
   - Report any stale entries or newly completed roadmap items.

5. **Present a Concise Health Report:**
   - Summarize Pass/Warn/Fail status for TypeScript, ESLint, Git/Secrets, Unused Code, and Context Sync, and offer to fix any findings.
