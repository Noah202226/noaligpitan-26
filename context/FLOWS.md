# End-to-End Application Flows — `noaligpitan-dev26`

> Visual and step-by-step traces showing how data, events, UI interactions, and AI streaming move across the app.

---

## 1. Portfolio Render & Tab Navigation Flow

```mermaid
flowchart TD
    Layout["app/layout.tsx (Geist Fonts + Metadata)"] --> Page["app/page.tsx (2-Column HUD Shell)"]
    Data["app/lib/data.js (UNIFIED_DATA)"] --> Page
    Data --> Solutions["SolutionsPanel.tsx"]
    Data --> Skills["SkillsMatrix.tsx"]

    Page --> Scene["Scene.tsx (Fixed 3D Canvas -z-10)"]
    Page --> Left["Left Col: Identity Card + Rotating Status + Stats + Socials"]
    Page --> Right["Right Col: 6-Tab HUD Panel"]
    Page --> Chat["Chat.tsx (Fixed Floating Modal z-50)"]

    Right --> T1["Mission (Hero + Solutions CTA + Core Stack + Counters)"]
    Right --> T2["Solutions (SolutionsPanel: Filter + Services + Blueprints + Process)"]
    Right --> T3["Tech & Skills (SkillsMatrix: Capabilities + 5 Stack Modules)"]
    Right --> T4["Projects (Problem / Solution / Impact Case Studies)"]
    Right --> T5["Experience (Experience Ledger Timeline)"]
    Right --> T6["Credentials (2-Col Verified Certificate Cards)"]
```

**Key Touchpoints:**
- `app/page.tsx`: Holds `activeSection` (`mission | solutions | skills | projects | experience | credentials`), `statusIndex` (rotates availability badge every 3s), and `chatRef` (`ChatHandle`).
- Responsive behavior:
  - **Desktop (`lg+`):** Fixed-viewport 2-column grid (`4/8`, `xl: 3/9`, `max-w-[1640px]`), independent vertical scrolling inside the content panel (`.custom-scrollbar`).
  - **Mobile (`< lg`):** Stacked vertical layout with single-row horizontal swipe strips (`.no-scrollbar`) for stats, social links, section tabs, and Solutions audience filters.

---

## 2. `ARKI_AI` Chat, Deep-Link & Multi-Provider Fallback Flow

```mermaid
sequenceDiagram
    actor User
    participant UI as SolutionsPanel / Floating Launcher
    participant Chat as Chat.tsx (useChat)
    participant API as POST /api/chat (route.ts)
    participant P1 as Primary Model (Groq)
    participant P2 as Fallback Model (Gemini / OpenRouter / ...)

    alt Clicked "Ask ARKI_AI" on a Service Card
        User->>UI: Click "Ask ARKI_AI"
        UI->>Chat: chatRef.current.openWithPrompt(prompt)
        Chat->>Chat: setIsOpen(true) & sendMessage(prompt)
    else Clicked Floating "Ask ARKI_AI" Button
        User->>Chat: Open modal & submit message
    end

    Chat->>API: POST /api/chat { messages }
    API->>API: checkIp(ip) (25 req/hr)
    API->>API: Filter MODEL_CHAIN to keys present in .env.local
    API->>P1: startVerifiedStream() — pull until first output chunk

    alt Primary Model Fails (404 / 429 / 401 / 503 / timeout)
        P1-->>API: Error
        API->>API: classifyProviderError() + blockModel(cooldown)
        API->>P2: startVerifiedStream() — pull until first output chunk
        P2-->>API: First output chunk (text-delta / reasoning-delta)
        API-->>Chat: HTTP 200 SSE Stream + X-Model-Used + ASCII X-Fallback-Notice
        Chat-->>User: Show amber fallback banner + stream formatted reply
    else Primary Model Succeeds
        P1-->>API: First output chunk
        API-->>Chat: HTTP 200 SSE Stream + X-Model-Used
        Chat-->>User: Stream formatted reply (bold, code, bullets)
    else All Configured Providers Fail
        API-->>Chat: HTTP 503 { code, error, details[] }
        Chat-->>User: Render SYSTEM_ALERT card with expandable diagnostics + Retry
    end
```

**Key Touchpoints:**
- `app/components/Chat.tsx`: Imperative `ChatHandle.openWithPrompt()`, `DefaultChatTransport` custom `fetch` wrapper reading `X-Model-Used` / `X-Fallback-Notice` and parsing JSON errors, lightweight markdown renderer (`renderFormattedLine`), and `SYSTEM_ALERT` card.
- `app/api/chat/route.ts`: `checkIp()`, `getProviderApiKey()`, `startVerifiedStream()`, `classifyProviderError()`, `toSafeHeaderValue()`, and `createUIMessageStreamResponse()`.

---

## 3. 3D Background Interaction Flow (`Scene.tsx`)

```mermaid
flowchart LR
    Mouse["window mousemove"] --> Norm["Normalize clientX/clientY to -1..+1 (mouse.current)"]
    Norm --> Frame["useFrame() on every animation tick"]
    Frame --> Lerp["THREE.MathUtils.lerp(rotation & position, 0.05)"]
    Frame --> Spin["Continuous idle spin (points + wireframe box)"]
    Lerp --> Canvas["Three.js WebGL Canvas (fixed inset-0 -z-10)"]
    Spin --> Canvas
```

**Key Touchpoints:**
- `app/components/Scene.tsx`: Listens on `window` (not the canvas) so cursor tracking continues smoothly even when hovering over foreground UI panels.

---

## 4. Single Source of Truth Update Flow (`app/lib/data.js`)

```mermaid
flowchart LR
    Edit["Edit UNIFIED_DATA in app/lib/data.js"] --> UI["UI Components (page.tsx, SolutionsPanel, SkillsMatrix)"]
    Edit --> KB["getAiKnowledgeBase()"]
    KB --> Prompt["System Prompt in app/api/chat/route.ts"]
    Prompt --> AI["ARKI_AI immediately reflects updated services, projects & stack"]
```

**Rule of Thumb:** Whenever you add a new field or section to `UNIFIED_DATA`, check `getAiKnowledgeBase()` at the bottom of `app/lib/data.js` so `ARKI_AI` learns about it automatically.
