# UI & Component Rules (`app/components/`)

Local engineering guardrails for React components in `app/components/`:

1. **Visual Consistency & Design System (ADR-006):**
   - Use the **Executive Slate & Electric Cyan** palette: `#090D16` canvas, high-opacity frosted panels (`bg-[#0d1424]/90`), elevated slate cards (`bg-slate-800/55 border-slate-700/65`), **Sky Cyan** (`sky-400`/`sky-300`) for primary navigation/accents, **Warm Amber** (`amber-400`/`amber-300`) for primary CTAs, and **Emerald/Rose** strictly for semantic outcomes/alerts.
   - Typography hierarchy: `font-display` (`Plus Jakarta Sans`, Title Case) for headings, `font-sans` (`Inter`) for body/UI/chat prose, and `font-mono` (`JetBrains Mono`) strictly for code blocks, paths, dates, and tech badges. Avoid ALL-CAPS italic body/navigation labels.
   - Use **Tailwind CSS v4** utilities (`bg-linear-to-r`, `bg-size-[...]`).
   - Use global `.custom-scrollbar` for scrollable panels and `.no-scrollbar` for mobile horizontal swipe strips (`app/globals.css`).
2. **Responsive Ergonomics:**
   - Keep desktop views widescreen-readable (avoid micro `text-[8px]`/`text-[9px]` for primary body copy).
   - Keep mobile button/tab/filter strips single-row horizontally scrollable (`flex-nowrap overflow-x-auto no-scrollbar` + `shrink-0 whitespace-nowrap`).
3. **React 19 & ESLint Discipline:**
   - Avoid calling `setState` synchronously inside `useEffect`; prefer imperative handles (`useImperativeHandle`, e.g., `ChatHandle`) or direct event handlers.
   - Escape literal `//` inside JSX children as `{"//"}` (to satisfy `react/jsx-no-comment-textnodes`).
   - Handle reasoning-model chunks (`part.type === "reasoning"`) gracefully in `Chat.tsx` so assistant bubbles never render empty while thinking.
4. **Single Source of Truth:**
   - Read portfolio data from `UNIFIED_DATA` (`app/lib/data.js`) rather than duplicating copy inside components.
