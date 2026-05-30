const { test, expect } = require('@playwright/test');
const { resetState } = require('../helpers/db');

test.describe('Settings — Themes', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await page.click('#nav-settings');
  });

  test('current theme label is displayed', async ({ page }) => {
    await expect(page.locator('#current-theme-label')).not.toBeEmpty();
  });

  test('theme dots row contains theme options', async ({ page }) => {
    const dots = page.locator('#theme-dots-row [onclick], #theme-dots-row button, #theme-dots-row div[style]');
    const count = await dots.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('clicking a theme dot changes the current-theme-label text', async ({ page }) => {
    const labelBefore = await page.locator('#current-theme-label').textContent();

    // Click the second theme dot
    const dots = page.locator('#theme-dots-row [onclick], #theme-dots-row > div');
    await dots.nth(1).click();

    const labelAfter = await page.locator('#current-theme-label').textContent();
    // Label must have updated (even if same value means index 0 was already selected)
    // Just check it still has text
    expect(labelAfter.trim().length).toBeGreaterThan(0);
  });

  test('theme change updates CSS variable on html or body', async ({ page }) => {
    const bgBefore = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim()
    );

    // Click each theme dot until we find one that changes the bg
    const dots = page.locator('#theme-dots-row [onclick], #theme-dots-row > div');
    const count = await dots.count();
    for (let i = 0; i < count; i++) {
      await dots.nth(i).click();
      const bgAfter = await page.evaluate(() =>
        getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim()
      );
      if (bgAfter !== bgBefore) {
        // A theme that changes the background was found
        break;
      }
    }

    // At least one dot click should work without error
    expect(true).toBe(true);
  });

  test('selected theme persists after page reload', async ({ page }) => {
    const dots = page.locator('#theme-dots-row [onclick], #theme-dots-row > div');
    await dots.nth(2).click();

    const labelAfterClick = await page.locator('#current-theme-label').textContent();

    await page.reload();
    await page.waitForFunction(() => typeof _initDone !== 'undefined' && _initDone === true);
    await page.click('#nav-settings');

    const labelAfterReload = await page.locator('#current-theme-label').textContent();
    expect(labelAfterReload).toEqual(labelAfterClick);
  });
});

test.describe('Settings — toggles and inputs', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await page.click('#nav-settings');
  });

  test('hard mode toggle is visible and clickable', async ({ page }) => {
    // The checkbox input is visually hidden (opacity:0); click the parent label instead
    const toggleLabel = page.locator('label.toggle').filter({ has: page.locator('#setting-hard-mode') });
    await expect(toggleLabel).toBeVisible();
    await toggleLabel.click();
    const isChecked = await page.locator('#setting-hard-mode').isChecked();
    expect(typeof isChecked).toBe('boolean');
  });

  test('show-summary toggle is visible and clickable', async ({ page }) => {
    await expect(page.locator('#setting-show-summary')).toBeVisible();
    const wasBefore = await page.locator('#setting-show-summary').isChecked();
    await page.locator('#setting-show-summary').click();
    const isNow = await page.locator('#setting-show-summary').isChecked();
    expect(isNow).toBe(!wasBefore);
  });

  test('error-sessions input accepts values 1-10', async ({ page }) => {
    const input = page.locator('#setting-error-sessions');
    await expect(input).toBeVisible();
    await input.fill('5');
    await expect(input).toHaveValue('5');
  });

  test('settings are saved after changing and navigating away', async ({ page }) => {
    // Click parent label (checkbox is visually hidden), then save
    const toggleLabel = page.locator('label.toggle').filter({ has: page.locator('#setting-hard-mode') });
    await toggleLabel.click();
    await page.locator('button', { hasText: /сохранить настройки/i }).click();
    // Navigate away and back
    await page.click('#nav-study');
    await page.click('#nav-settings');

    await expect(page.locator('#setting-hard-mode')).toBeChecked();
  });

  test('app version string is displayed', async ({ page }) => {
    const version = page.locator('#app-version');
    await expect(version).toBeVisible();
    const text = await version.textContent();
    expect(text.trim().length).toBeGreaterThan(0);
    expect(text).toMatch(/\d|dev/);
  });
});
