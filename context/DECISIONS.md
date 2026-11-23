# Architecture Decision Records (ADRs) — `noaligpitan-dev26`

> Short records capturing **why** critical technical choices were made. Read this before refactoring core files so past bug fixes are never accidentally undone.

---

## ADR-001: Preflight Stream Verification Before Returning HTTP 200
- **Date:** 2026-11-22
- **File:** `app/api/chat/route.ts` (`startVerifiedStream`)
- **Context:** Vercel AI SDK v6's `streamText()` is lazy/non-blocking—it returns a `StreamTextResult` immediately before the upstream LLM API responds. Returning `result.toUIMessageStreamResponse()` directly inside a `try/catch` fallback loop caused `/api/chat` to commit HTTP `200` on a broken model (`404 model_not_found`) and silently drop the response without trying fallback providers.
- **Decision:** Pull chunks from `result.toUIMessageStream()` via `startVerifiedStream()` until the first real output chunk (`text-delta`, `reasoning-delta`, `tool-input-*`, or `finish`) arrives, buffer those initial chunks, and only then construct the `ReadableStream` passed to `createUIMessageStreamResponse()`.
- **Consequence:** Upstream `404`, `401/403`, `429`, `503`, and timeout failures throw cleanly before headers are sent, enabling true multi-provider fallback and structured `503` JSON diagnostics.

---

## ADR-002: Strictly ASCII-Safe Custom HTTP Response Headers
- **Date:** 2026-11-22
- **File:** `app/api/chat/route.ts` (`toSafeHeaderValue`)
- **Context:** An em-dash (`—`, U+2014) inside `X-Fallback-Notice` caused `new Headers()` inside `createUIMessageStreamResponse()` to throw a `TypeError` (ISO-8859-1 ByteString violation), which triggered `catch` on every otherwise-succeeding fallback model.
- **Decision:** Pass all custom response header values (`X-Model-Used`, `X-Provider`, `X-Fallback-Notice`) through `toSafeHeaderValue()` (`value.replace(/[^\x20-\x7E]/g, "-")`).
- **Consequence:** Custom headers can never crash `Response` construction regardless of model labels or fallback strings.

---

## ADR-003: `.chat(modelId)` for OpenAI-Compatible Third-Party Providers
- **Date:** 2026-11-22
- **File:** `app/api/chat/route.ts` (`buildModel`)
- **Context:** In `@ai-sdk/openai` v3, calling `createOpenAI({ baseURL })(modelId)` defaults to OpenAI's `/v1/responses` endpoint, which third-party OpenAI-compatible gateways (OpenRouter, Cerebras, Mistral) do not universally implement.
- **Decision:** Explicitly invoke `.chat(config.modelId)` on `createOpenAI({ apiKey, baseURL })` so requests target `/v1/chat/completions`.
- **Consequence:** OpenRouter (`openrouter/free`), Cerebras, and Mistral work seamlessly with zero extra SDK packages.

---

## ADR-004: Static Single Source of Truth (`UNIFIED_DATA`) Instead of a Database
- **Date:** 2026-11-22
- **File:** `app/lib/data.js`
- **Context:** Portfolio content changes infrequently, and zero external DB keeps latency low, hosting \$0, and deployment trivial.
- **Decision:** Keep all structured portfolio data in `UNIFIED_DATA` and derive the AI chatbot's knowledge base via `getAiKnowledgeBase()`.
- **Migration Trigger:** Introduce a database (e.g., Convex, Appwrite, or Supabase) only when persistent chat logging, an admin CMS editor, or multi-instance rate limiting is explicitly needed.

---

## ADR-005: Imperative `ChatHandle` (`useImperativeHandle`) for External Chat Deep-Linking
- **Date:** 2026-11-22
- **Files:** `app/components/Chat.tsx`, `app/page.tsx`, `app/components/sections/SolutionsPanel.tsx`
- **Context:** Clicking *"Ask ARKI_AI"* on a service card needs to open the floating chat modal and submit a prompt immediately. Driving that through a prop + `useEffect` calling `setState` triggers React 19 / ESLint `react-hooks/set-state-in-effect` issues and extra render cycles.
- **Decision:** Expose `ChatHandle` (`openWithPrompt(prompt: string)`) via `useImperativeHandle` on `Chat.tsx` and invoke `chatRef.current?.openWithPrompt(prompt)` directly inside click handlers.
- **Consequence:** Deterministic, zero-effect-cascade opening and prompt submission with clean React 19 lint compliance.
