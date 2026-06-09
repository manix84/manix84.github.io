import {
  chmodSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";

const hookPath = join(".git", "hooks", "pre-commit");
const hookMarker = "# Installed by manix84.github.io";
const hookContents = `#!/bin/sh
${hookMarker}
set -e

npm run precommit
`;

if (!existsSync(".git")) {
  process.exit(0);
}

mkdirSync(dirname(hookPath), { recursive: true });

if (existsSync(hookPath)) {
  const existingHook = readFileSync(hookPath, "utf8");

  if (!existingHook.includes(hookMarker)) {
    console.log("Existing .git/hooks/pre-commit found; leaving it unchanged.");
    process.exit(0);
  }
}

writeFileSync(hookPath, hookContents);
chmodSync(hookPath, 0o755);
console.log("Installed .git/hooks/pre-commit");
