---
name: roadmap-picker
description: >-
  Reads unchecked TODOs from context/ROADMAP.md and presents an interactive
  multiple-choice picker (ask_question) so the user can choose the next task to
  tackle with one click. Use when the user asks "what's next?", "pick a task",
  "show my roadmap", or wants to choose the next improvement to build.
---

# Roadmap Task Picker Workflow

Use this workflow to turn `context/ROADMAP.md` into an interactive task menu.

## Steps

1. **Read the Roadmap:**
   - Read `context/ROADMAP.md` and collect all unchecked (`- [ ]`) tasks across `P1`, `P2`, and `P3`.
   - If all items are checked off, congratulate the user and ask what new goal they want to add.

2. **Present an Interactive Picker (`ask_question`):**
   - Group or pick up to 4–5 highest-priority unchecked tasks (starting with `P1`, prefixing the highest-impact one with `(Recommended)`).
   - Call `ask_question` with two concise questions if helpful, or a single focused question:
     - Question: `"Which roadmap item would you like to work on next?"`
     - Options: concise task titles (e.g., `(Recommended) P1: Add GitHub & project repo links`, `P1: Add Resume PDF download & email CTA`, `P1: Add ArcTech freelance experience`, `P3: Remove unused prototype files & deps`).

3. **Start the Selected Task:**
   - Once the user selects a task, follow `add-portfolio-feature` or `update-portfolio-data` as appropriate, and check off `[x]` in `context/ROADMAP.md` once verified.
