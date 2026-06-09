import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const indexPath = join("dist", "index.html");
const fallbackPath = join("dist", "404.html");

if (!existsSync(indexPath)) {
  throw new Error("dist/index.html does not exist. Run vite build first.");
}

copyFileSync(indexPath, fallbackPath);
console.log("Wrote dist/404.html SPA fallback");
