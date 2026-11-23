# Portfolio Roadmap & TODOs — `noaligpitan-dev26`

> Persistent backlog of planned improvements to strengthen Noa Ligpitan's portfolio for job applications and client acquisition. Check off items (`[x]`) as they are completed and log major updates in [APP_CONTEXT.md](./APP_CONTEXT.md).

---

## P1 — Critical for Recruiters & Job Applications

- [ ] **Add GitHub Profile & Project Source Code Links**
  - Add GitHub to `SOCIAL_LINKS` in `app/page.tsx` (URL needed from Noa).
  - Add optional `repo` links to each project in `app/lib/data.js` and render a `Code` / `GitHub` button alongside `Live Demo` on project cards.
- [ ] **Add 1-Click Resume (PDF) Download + Direct Email Contact**
  - Place PDF resume in `public/` (e.g., `public/Noa-Ligpitan-Resume.pdf`) and add a `Download CV` button in the Identity column (`app/page.tsx`) and `SolutionsPanel.tsx`.
  - Add a direct `mailto:` email link + 1-click Copy Email button (and optionally a lightweight Contact / Hire Me form via Resend or Formspree).
- [ ] **Close the "Experience vs. Title" Gap**
  - Add **ArcTech Solutions / Freelance Full-Stack Developer & Automation Architect** directly into `UNIFIED_DATA.experience` in `app/lib/data.js` with dates and delivered systems.
  - Highlight technical, scripting, reporting, and automation contributions inside DPWH Region 4A, 7-Eleven Philippines, and Charmings Shopify Store entries.

---

## P2 — Stronger Proof of Skill & Social Proof

- [ ] **Add Quantified Impact Metrics**
  - Add concrete numbers to `UNIFIED_DATA.experience` and `UNIFIED_DATA.projects` (e.g., hours saved/week on Dental Clinic bookkeeping, workstations/users supported at DPWH Region 4A, faster menu/order turnaround on RAKAPE & LuckyZDelicacies).
- [ ] **Diversify & Visually Showcase Projects**
  - Add screenshot thumbnails (in `public/projects/`) to project cards in `app/page.tsx`.
  - Feature at least 1 **Python / FastAPI / n8n / AI** project — plus consider adding **`ARKI_AI` (this portfolio's multi-provider LLM chat engine)** as a technical case study.
  - Include demo login credentials or read-only preview notes for any live demo behind authentication.
- [ ] **Replace Arbitrary Skill Percentages (`92%`, `95%`, `98%`)**
  - Update `app/components/sections/SkillsMatrix.tsx` to use senior-friendly proficiency badges (e.g., `Primary Stack`, `Production`, `Daily Driver`) instead of self-rated percentages.
- [ ] **Add Client or Supervisor Testimonials**
  - Add a compact testimonials block in `UNIFIED_DATA` (`app/lib/data.js`) featuring 1–2 short quotes from Dental Clinic, RAKAPE, LuckyZDelicacies owners, or a DPWH supervisor.

---

## P3 — Technical & Repository Polish

- [ ] **Remove Unused Prototype Files & Unused Packages**
  - Delete unused files: `app/components/sections/Navbar.tsx`, `app/components/sections/FeatureWork.tsx`, `app/components/streaming-text.ts`.
  - Remove unused dependencies from `package.json`: `@ai-sdk/anthropic`, `@google/generative-ai`.
- [ ] **Add OpenGraph & Twitter Preview Metadata**
  - Add `openGraph`, `twitter`, and a branded preview image (`public/og-image.png`) in `app/layout.tsx` so shared links on LinkedIn, Messenger, and resumes render cleanly.
- [ ] **Optimize Portrait Image & Replace Default README**
  - Replace `<img>` with `next/image` (`<Image />`) in `app/page.tsx` to improve LCP and eliminate the remaining ESLint warning.
  - Rewrite `README.md` with project overview, 3D + multi-provider AI architecture summary, setup steps, and live URL.

---

## Completed

- [x] Preflight stream verification (`startVerifiedStream`), ASCII-safe headers, multi-provider free-tier fallback chain, and inline `SYSTEM_ALERT` diagnostics (`app/api/chat/route.ts`, `app/components/Chat.tsx`).
- [x] Centralized `context/` hub (`AI_INSTRUCTIONS.md`, `ARCHITECTURE.md`, `APP_CONTEXT.md`, `ROADMAP.md`), root `AGENTS.md`, and reusable workspace skills (`.agents/skills/`).
- [x] Widescreen 2-column HUD layout, floating `ARKI_AI` popup chat modal, `Solutions` tab (Business & Personal services, Before→After blueprints, 4-step delivery workflow), operational case-study project cards, and mobile horizontal swipe lists.
