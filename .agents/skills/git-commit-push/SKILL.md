---
name: git-commit-push
description: >-
  Scans pending Git changes in the repository, drafts a commit message based on
  the diff, waits for explicit user approval, and then runs git add .,
  git commit -m "<approved message>", and git push. Use whenever the user asks
  to commit, push, or run the git push workflow.
---

# Git Commit & Push Workflow

Follow these steps in order whenever the user asks to commit and push changes.

## Steps

1. **Scan all pending changes (in one command):**
   - Run `git status --short; git branch --show-current; git diff --stat; git diff --cached --stat` to inspect modified, staged, and untracked files.
   - If there are no changes to commit, check if local commits are ahead of upstream (`git status -sb`). Inform the user if there is nothing to commit or push.
   - Read the diff (`git diff` and any new untracked files if needed) to understand *what* actually changed.

2. **Safety Check:**
   - Before suggesting `git add .`, verify no sensitive or unintended files (such as `.env`, `.env.local`, API keys, credentials, or large build artifacts) are untracked or about to be staged.
   - If any sensitive file appears in `git status`, warn the user immediately and do **not** run `git add .` until resolved.

3. **Suggest Commit Message & Wait for Approval:**
   - Present a brief summary of the changed/new files.
   - Suggest a clear, concise Conventional Commit message based on the actual diff (e.g., `feat(ui): ...`, `fix(chat): ...`, `docs: ...`).
   - Ask the user to approve the suggested commit message (or provide a custom one).
   - **STOP and wait for the user's reply.** Do NOT stage, commit, or push before the user approves.

4. **Execute on Approval:**
   - Once the user approves (or supplies their preferred message), run the sequence in one command (PowerShell-safe):
     ```powershell
     git add .; if ($LASTEXITCODE -eq 0) { git commit -m "<approved message>" }; if ($LASTEXITCODE -eq 0) { git push }
     ```
   - Report the resulting commit hash, branch, and push status back to the user.
