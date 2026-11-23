---
name: update-portfolio-data
description: >-
  Updates Noa Ligpitan's portfolio entries (identity, skills, experience,
  projects, or credentials) in app/lib/data.js while keeping the UI and ARKI_AI
  knowledge base synchronized. Use when the user asks to add, edit, clean up, or
  remove portfolio content.
---

# Update Portfolio Data Workflow

## Steps

1. **Read current data and consumers:**
   - Read `app/lib/data.js`.
   - If changing stack categories or identity fields, also check `app/page.tsx` and `app/components/sections/SkillsMatrix.tsx` to ensure field names match.

2. **Edit `app/lib/data.js`:**
   - Update `UNIFIED_DATA` (`identity`, `stack`, `experience`, `projects`, `credentials`).
   - Verify `getAiKnowledgeBase()` includes any newly added sections or fields so `ARKI_AI` answers accurately about them.
   - Check for typos, trailing punctuation, broken URLs, or duplicate placeholder entries.

3. **Verify & Track:**
   - Run `node node_modules/typescript/bin/tsc --noEmit` and `node node_modules/eslint/bin/eslint.js app/lib/data.js`.
   - Update `context/APP_CONTEXT.md` Change Log (and check off any resolved items in `context/ROADMAP.md`).
