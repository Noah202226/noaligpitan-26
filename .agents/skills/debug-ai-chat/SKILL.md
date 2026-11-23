---
name: debug-ai-chat
description: >-
  Diagnoses ARKI_AI chat failures, provider 404/429/401 errors, streaming issues,
  and MODEL_CHAIN health in app/api/chat/route.ts without exposing API keys. Use
  when the user reports chat errors, missing models, slow fallbacks, or wants to
  verify which AI providers/models are currently working.
---

# Debug AI Chat Runbook

Follow these steps to safely diagnose and fix `ARKI_AI` issues.

## Steps

1. **Check configured provider keys (names ONLY — never print secret values):**
   ```powershell
   node -e "const fs = require('fs'); if (fs.existsSync('.env.local')) { console.log(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter(l => l.trim() && !l.trim().startsWith('#')).map(l => l.split('=')[0].trim()).join('\n')); } else { console.log('NO_ENV_LOCAL'); }"
   ```

2. **Check live available models on failing providers:**
   - Read `.env.local` in-process via a one-off Node script (never logging keys) and query:
     - Groq: `GET https://api.groq.com/openai/v1/models`
     - Google Gemini: `GET https://generativelanguage.googleapis.com/v1beta/models?key=...`
     - Cerebras: `GET https://api.cerebras.ai/v1/models`
   - Compare the live returned model IDs against `MODEL_CHAIN` in `app/api/chat/route.ts`.

3. **Run an AI SDK `streamText` smoke test:**
   - Verify whether the model emits `text-delta` or `reasoning-delta` first, and measure latency (ensure it completes well inside the 15s `AbortSignal.timeout`).

4. **Check common pitfalls (see `context/DECISIONS.md`):**
   - Any non-ASCII characters (like `—`) in custom response headers? Ensure `toSafeHeaderValue()` wraps them.
   - Any OpenAI-compatible third-party provider missing `.chat(modelId)`?
   - Any mid-stream error masked by `onError` or empty assistant bubble in `app/components/Chat.tsx`?

5. **Fix & Verify:**
   - Update `MODEL_CHAIN` or error classification in `app/api/chat/route.ts`.
   - Run `node node_modules/typescript/bin/tsc --noEmit` and `node node_modules/eslint/bin/eslint.js app/api/chat/route.ts app/components/Chat.tsx`.
   - Update `context/ARCHITECTURE.md` and `context/APP_CONTEXT.md` if the active model chain changed.
