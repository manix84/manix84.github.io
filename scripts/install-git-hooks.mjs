import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const hookPath = join(repoRoot, ".git", "hooks", "pre-commit");
const marker = "# manix84.github.io smart version bump";
const hook = `#!/bin/sh
${marker}
node scripts/smart-version-bump.mjs
`;

if (!existsSync(join(repoRoot, ".git"))) {
  console.error("Cannot install Git hooks: .git directory was not found.");
  process.exit(1);
}

mkdirSync(dirname(hookPath), { recursive: true });

if (existsSync(hookPath)) {
  const currentHook = readFileSync(hookPath, "utf8");

  if (!currentHook.includes(marker)) {
    console.error(
      "Cannot install Git hooks: .git/hooks/pre-commit already exists and was not created by this project."
    );
    process.exit(1);
  }
}

writeFileSync(hookPath, hook, { mode: 0o755 });
console.log("Installed .git/hooks/pre-commit smart version bump hook.");
