---
name: explain-flow
description: >-
  Traces and explains how any feature, UI interaction, API route, or data flow
  works end-to-end in noaligpitan-dev26 with visual Mermaid diagrams and clickable
  file/line references, keeping context/FLOWS.md up to date. Use when the user
  asks how something works, wants a flow walkthrough, or asks to trace a feature.
---

# Explain Flow Workflow

Use this workflow when the user asks how a feature or subsystem works across the codebase.

## Steps

1. **Read Existing Flow Docs & Live Code (in parallel):**
   - Read `context/FLOWS.md` and `context/ARCHITECTURE.md`.
   - Read the exact live source files involved in the user's question so every line reference and behavior is verified against current code.

2. **Explain Clearly with Visuals & Line Links:**
   - Start with a concise Mermaid diagram (`flowchart` or `sequenceDiagram`) showing the exact runtime flow.
   - Provide a short step-by-step trace using clickable `file://` links with line numbers (e.g., `[Chat.tsx](file:///...#L10-L25)`).
   - Call out any key invariants or gotchas from `context/DECISIONS.md` that affect that flow.

3. **Sync Drift (if needed):**
   - If the live code has evolved beyond `context/FLOWS.md`, offer (or directly apply, if appropriate) a quick update to `context/FLOWS.md` so the documentation stays accurate.
