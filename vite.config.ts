import react from "@vitejs/plugin-react";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    outDir: "out",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        components: resolve(__dirname, "components/index.html"),
      },
    },
  },
  plugins: [react()],
  test: {
    exclude: ["**/node_modules/**", "**/dist/**", "**/out/**", "tests/playwright/**"],
  },
});
