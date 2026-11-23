# API Route Rules (`app/api/`)

Local engineering guardrails for Next.js Route Handlers in `app/api/`:

1. **AI Streaming Fallback (`app/api/chat/route.ts`):**
   - Never return `streamText().toUIMessageStreamResponse()` directly inside a fallback loop; always preflight chunks with `startVerifiedStream()` (see `context/DECISIONS.md` ADR-001).
   - Sanitize all custom HTTP headers (`X-Model-Used`, `X-Provider`, `X-Fallback-Notice`) through `toSafeHeaderValue()` so only printable ASCII characters enter `Headers` (ADR-002).
   - Use `createOpenAI({ apiKey, baseURL }).chat(modelId)` for OpenAI-compatible third-party providers (ADR-003).
2. **Structured Errors:**
   - Return JSON `{ code, error, details? }` with safe, user-readable messages so frontend error cards can parse and display diagnostics cleanly.
   - Never expose raw API keys, stack traces, or internal secrets in error responses or server logs.
3. **Environment & Rate Limiting:**
   - Skip providers whose API keys are unset rather than treating optional unconfigured keys as runtime failures.
   - Preserve per-IP throttling and per-model cooldown maps (keyed by `${provider}:${modelId}`).
4. **Verification:**
   - Run `node node_modules/typescript/bin/tsc --noEmit` and `node node_modules/eslint/bin/eslint.js app/api/chat/route.ts` after edits.
