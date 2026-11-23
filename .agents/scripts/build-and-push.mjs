import { execFileSync, spawnSync } from "child_process";

const message = process.argv.slice(2).join(" ").trim();

if (!message) {
  console.error("Usage: node .agents/scripts/build-and-push.mjs \"<commit message>\"");
  process.exit(1);
}

function runStep(label, command, args, options = {}) {
  console.log(`\n==> ${label}`);
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: options.shell ?? false,
  });
  if (result.error) {
    console.error(`Failed to start "${command}":`, result.error.message);
    process.exit(1);
  }
  if (result.status !== 0) {
    console.error(`\n[CANCELED] ${label} failed with exit code ${result.status}. Commit & push aborted.`);
    process.exit(result.status ?? 1);
  }
}

// 1. Safety check: make sure no .env* file is untracked or staged
const statusOut = execFileSync("git", ["status", "--short"], {
  encoding: "utf8",
});
const envLeak = statusOut
  .split(/\r?\n/)
  .find((line) => /(^|\s)\.env(\.[a-z0-9_-]+)?$/i.test(line.trim()));

if (envLeak) {
  console.error(`[BLOCKED] Sensitive env file detected in git status: ${envLeak}`);
  process.exit(1);
}

// 2. Build gate (cancels commit & push if production build fails)
const npmBin = process.platform === "win32" ? "npm.cmd" : "npm";
runStep("Production build gate (next build)", npmBin, ["run", "build"], {
  shell: process.platform === "win32",
});

// 3. Stage, commit, and push
runStep("Staging changes (git add .)", "git", ["add", "."]);
runStep(`Committing changes`, "git", ["commit", "-m", message]);
runStep("Pushing to remote (git push)", "git", ["push"]);

console.log("\n[DONE] Build passed, changes committed and pushed.");
