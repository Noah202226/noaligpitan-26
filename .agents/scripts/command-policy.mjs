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
  const args = input?.toolCall?.args ?? {};
  const cmd = String(
    args.CommandLine ?? args.commandLine ?? args.command ?? ""
  ).trim();

  // 1. HARD DENY — secret leaks & destructive git rewrites
  const denyRules = [
    {
      pattern:
        /\b(cat|type|more|less|head|tail|get-content|gc)\b[^\n|;&]*\.env(\.[a-z0-9_-]+)?\b/i,
      reason:
        "Blocked by command-policy: Do not dump raw .env/.env.local contents. Inspect variable names only.",
    },
    {
      pattern: /\bgit\s+diff\b[^\n|;&]*\.env(\.[a-z0-9_-]+)?\b/i,
      reason:
        "Blocked by command-policy: Do not inspect raw .env/.env.local diffs.",
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

  // 3. AUTO-ALLOW — strictly scoped to git-commit-push skill commands only
  // (Read-only git scan/diff + build-gated push script after user approves via ask_question.)
  const segments = cmd
    .split(/(?:;|&&|\|\|)/)
    .map((s) => s.trim())
    .filter(Boolean);

  function isSafeGitDiff(seg) {
    if (!/^git\s+diff(?:\s|$)/i.test(seg)) return false;
    if (/[|&;><$`\r\n(){}]/.test(seg)) return false;
    if (
      /(?:^|\s)(?:--output(?:=|\s|$)|--ext-diff\b|--no-index\b|--textconv\b|-c\b)/i.test(
        seg
      )
    ) {
      return false;
    }
    if (/\.env(\.[a-z0-9_-]+)?\b/i.test(seg)) return false;
    return true;
  }

  const safeSegmentPatterns = [
    /^git\s+status(?:\s+(?:--short|-s|-sb|--porcelain|-u(?:all|normal|no)?|--untracked-files(?:=(?:all|normal|no))?|--branch|-b))*$/i,
    /^git\s+branch\s+--show-current$/i,
    /^git\s+log(?:\s+(?:-n\s*\d+|-\d+|--oneline|--stat|--no-decorate|--decorate))*$/i,
    /^git\s+ls-files(?:\s+(?:--others|-o|--exclude-standard|--modified|-m|--cached|-c|--deleted|-d))*$/i,
    /^node\s+\.agents[\\/]scripts[\\/]build-and-push\.mjs\s+(?:"[^"`$\r\n]+"|'[^'`$\r\n]+')$/i,
  ];

  const isSafeSegment = (seg) =>
    isSafeGitDiff(seg) || safeSegmentPatterns.some((re) => re.test(seg));

  function overrideForSegment(seg) {
    if (/^git\s+diff\b/i.test(seg)) return "command(git diff)";
    if (/^git\s+status\b/i.test(seg)) return "command(git status)";
    if (/^git\s+branch\b/i.test(seg)) return "command(git branch --show-current)";
    if (/^git\s+log\b/i.test(seg)) return "command(git log)";
    if (/^git\s+ls-files\b/i.test(seg)) return "command(git ls-files)";
    if (/^node\s+\.agents[\\/]scripts[\\/]build-and-push\.mjs\b/i.test(seg)) {
      return "command(node .agents/scripts/build-and-push.mjs)";
    }
    return `command(${seg})`;
  }

  if (segments.length > 0 && segments.every(isSafeSegment)) {
    const permissionOverrides = [
      ...new Set([
        `command(${cmd})`,
        ...segments.map((seg) => `command(${seg})`),
        ...segments.map(overrideForSegment),
      ]),
    ];
    respond({
      decision: "allow",
      permissionOverrides,
    });
    process.exit(0);
  }

  // 4. DEFAULT — standard Antigravity permission prompt
  respond({ decision: "ask" });
} catch {
  respond({ decision: "ask" });
}
