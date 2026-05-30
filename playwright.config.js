const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/specs',
  fullyParallel: false,
  workers: 1,
  retries: 1,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
  ],
  webServer: {
    command: 'npx serve . --listen 8080 --no-clipboard',
    url: 'http://localhost:8080',
    reuseExistingServer: true,
    stdout: 'ignore',
    stderr: 'ignore',
  },
});
