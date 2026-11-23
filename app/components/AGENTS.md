# UI & Component Rules (`app/components/`)

Local engineering guardrails for React components in `app/components/`:

1. **Visual Consistency & Styling:**
   - Preserve the dark cyberpunk/HUD aesthetic (glass cards, crisp borders, blue/yellow highlights, monospace metadata labels).
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
