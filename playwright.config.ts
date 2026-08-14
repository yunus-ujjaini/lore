import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  use: {
    baseURL: 'http://localhost:5173',
  },
  webServer: {
    command: 'npx vite dev --port 5173 --strictPort',
    // The project has no index.html yet (UI deferred); probe a static asset
    // that returns 200 to detect server readiness.
    url: 'http://localhost:5173/images/placeholders/missing.png',
    reuseExistingServer: true,
    timeout: 30_000,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
