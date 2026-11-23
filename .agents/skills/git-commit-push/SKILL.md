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

3. **Suggest Commit Message via Interactive Picker & Wait for Approval:**
   - First output a concise summary of the changed/new files (plus the safety check status).
   - Call the `ask_question` tool to present a clickable numbered prompt with 3 options:
     1. `(Recommended) <drafted Conventional Commit message based on the diff>`
     2. `<shorter or alternative commit message>`
     3. `Cancel — do not commit or push yet`
     *(The UI automatically includes an "Other" option so the user can enter a custom commit message.)*
   - **STOP and wait for the user's selection.** Do NOT stage, commit, or push before the user approves.

4. **Build Gate & Execute on Approval (Single Prompt):**
   - If the user picks `Cancel`, stop without running build or git commands.
   - Strip any leading `(Recommended) ` prefix from the selected message.
   - Run `npm.cmd run build` FIRST, and **cancel committing and pushing if the build fails** (PowerShell-safe in one command, auto-allowed by `command-policy.mjs` so no second confirmation popup appears):
     ```powershell
     npm.cmd run build; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; git add .; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; git commit -m "<approved message>"; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; git push
     ```
   - If `npm.cmd run build` fails, report clearly that **commit & push were canceled due to build failure** and summarize the build errors so they can be fixed first.
   - If everything succeeds, report the build pass, commit hash, branch, and push status back to the user.
