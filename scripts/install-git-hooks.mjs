import { chmodSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const hookPath = join(".git", "hooks", "pre-commit");

if (!existsSync(".git")) {
  process.exit(0);
}

mkdirSync(dirname(hookPath), { recursive: true });

writeFileSync(
  hookPath,
  `#!/bin/sh
set -e

npm run precommit
`,
);

chmodSync(hookPath, 0o755);
console.log("Installed .git/hooks/pre-commit");
