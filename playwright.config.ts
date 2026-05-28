import { defineConfig, devices } from "@playwright/test";

const shouldStartWebServer = process.env.PLAYWRIGHT_SKIP_WEB_SERVER !== "1";

export default defineConfig({
  testDir: "./tests/playwright",
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:7011",
    trace: "on-first-retry",
  },
  webServer: shouldStartWebServer
    ? {
        command: "npm run dev -- --host 127.0.0.1 --port 7011",
        url: "http://127.0.0.1:7011/components/",
        reuseExistingServer: true,
        timeout: 120_000,
      }
    : undefined,
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
