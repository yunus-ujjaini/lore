import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  use: {
    baseURL: 'http://localhost:5173/lore',
  },
  webServer: {
    command: 'npx vite dev --port 5173 --strictPort',
    // Probe a static asset under the app base path to detect server readiness.
    url: 'http://localhost:5173/lore/images/placeholders/missing.png',
    reuseExistingServer: true,
    timeout: 30_000,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
