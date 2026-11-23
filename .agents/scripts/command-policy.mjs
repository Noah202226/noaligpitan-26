import fs from "fs";

function respond(payload) {
  process.stdout.write(JSON.stringify(payload) + "\n");
}

try {
  const raw = fs.readFileSync(0, "utf8").trim();
  if (!raw) {
    respond({ decision: "allow" });
    process.exit(0);
  }

  const input = JSON.parse(raw);
  const cmd = String(input?.toolCall?.args?.CommandLine ?? "").trim();

  // 1. HARD DENY — secret leaks & destructive git rewrites
  const denyRules = [
    {
      pattern:
        /\b(cat|type|more|less|head|tail|get-content|gc)\b[^\n|;&]*\.env(\.[a-z0-9_-]+)?\b/i,
      reason:
        "Blocked by command-policy: Do not dump raw .env/.env.local contents. Inspect variable names only.",
    },
    {
      pattern: /\bgit\s+add\b[^\n|;&]*\.env(\.[a-z0-9_-]+)?\b/i,
      reason:
        "Blocked by command-policy: Never stage .env/.env.local files into Git.",
    },
    {
      pattern: /\bgit\s+push\b[^\n|;&]*(--force|-f)\b/i,
      reason:
        "Blocked by command-policy: Force-pushing is disabled to protect remote history.",
    },
    {
      pattern: /\bgit\s+reset\s+--hard\b/i,
      reason:
        "Blocked by command-policy: git reset --hard is blocked to prevent losing local work.",
    },
  ];

  for (const rule of denyRules) {
    if (rule.pattern.test(cmd)) {
      respond({ decision: "deny", reason: rule.reason });
      process.exit(0);
    }
  }

  // 2. FORCE ASK — always show confirmation prompt for dependency or deletion changes
  const forceAskRules = [
    {
      pattern:
        /\b(npm(\.cmd)?\s+(install|i|uninstall|remove)|pnpm\s+(add|remove)|yarn\s+(add|remove))\b/i,
      reason: "Confirm adding or removing project dependencies.",
    },
    {
      pattern: /\b(remove-item|rm\s+-rf|del\s+)\b/i,
      reason: "Confirm deleting files or folders from the workspace.",
    },
  ];

  for (const rule of forceAskRules) {
    if (rule.pattern.test(cmd)) {
      respond({ decision: "force_ask", reason: rule.reason });
      process.exit(0);
    }
  }

  // 3. AUTO-ALLOW — safe read-only checks, build verification, and approved git-commit-push flow
  // (Single-prompt UX: git-commit-push already asks once via ask_question before running this.)
  const segments = cmd
    .split(/(?:;|&&|\|\|)/)
    .map((s) => s.trim())
    .filter(Boolean);

  const safeSegmentPatterns = [
    /^git\s+(status|diff|log|branch|check-ignore)\b/i,
    /^git\s+add\s+\.$/i,
    /^git\s+commit\s+-m\s+["'][^"'`$\r\n]+["']$/i,
    /^git\s+push(?:\s+origin\s+[a-zA-Z0-9._/-]+)?$/i,
    /^npm(\.cmd)?\s+run\s+build$/i,
    /^node\s+node_modules\/next\/dist\/bin\/next\s+build$/i,
    /^node\s+node_modules\/typescript\/bin\/tsc\s+--noEmit\b/i,
    /^node\s+node_modules\/eslint\/bin\/eslint\.js\b/i,
    /^if\s*\(\s*\$LASTEXITCODE\s*-ne\s*0\s*\)\s*\{\s*exit\s+\$LASTEXITCODE\s*\}$/i,
    /^if\s*\(\s*\$LASTEXITCODE\s*-eq\s*0\s*\)\s*\{\s*(git\s+add\s+\.|git\s+commit\s+-m\s+["'][^"'`$\r\n]+["']|git\s+push(?:\s+origin\s+[a-zA-Z0-9._/-]+)?|node\s+node_modules\/eslint\/bin\/eslint\.js\b[^}]*)\s*\}$/i,
  ];

  if (
    segments.length > 0 &&
    segments.every((seg) => safeSegmentPatterns.some((re) => re.test(seg)))
  ) {
    respond({ decision: "allow" });
    process.exit(0);
  }

  // 4. DEFAULT — standard Antigravity permission prompt
  respond({ decision: "ask" });
} catch {
  respond({ decision: "ask" });
}
