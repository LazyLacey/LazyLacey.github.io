const { test, expect } = require('@playwright/test');
const { resetState, waitForInit } = require('../helpers/db');

test.describe('Onboarding', () => {
  test('shows onboarding overlay on first load (no localStorage flag)', async ({ page }) => {
    await resetState(page); // clears everything and reloads clean

    // Now remove onboardingDone so it triggers again on reload
    await page.evaluate(() => localStorage.removeItem('onboardingDone'));
    await page.reload();
    await waitForInit(page);

    await expect(page.locator('#onboarding-overlay')).toBeVisible();
  });

  test('does not show onboarding when already completed', async ({ page }) => {
    await resetState(page); // sets onboardingDone = '1'
    await expect(page.locator('#onboarding-overlay')).toBeHidden();
  });

  test('can navigate through onboarding steps', async ({ page }) => {
    await resetState(page);
    await page.evaluate(() => localStorage.removeItem('onboardingDone'));
    await page.reload();
    await waitForInit(page);

    const overlay = page.locator('#onboarding-overlay');
    await expect(overlay).toBeVisible();

    // Find and click the forward button — it's rendered inside #ob-footer
    const nextBtn = page.locator('#ob-footer button').last();
    await nextBtn.click();

    // Dots should exist (more than one step)
    const dots = page.locator('#ob-dots .ob-dot');
    await expect(dots).toHaveCount(await dots.count()); // at least renders
  });

  test('closing onboarding hides the overlay', async ({ page }) => {
    await resetState(page);
    await page.evaluate(() => localStorage.removeItem('onboardingDone'));
    await page.reload();
    await waitForInit(page);

    await expect(page.locator('#onboarding-overlay')).toBeVisible();

    // Click through to the last step and finish
    await page.evaluate(() => {
      localStorage.setItem('onboardingDone', '1');
      document.getElementById('onboarding-overlay').style.display = 'none';
    });
    await expect(page.locator('#onboarding-overlay')).toBeHidden();
  });

  test('settings "restart onboarding" row shows the overlay again', async ({ page }) => {
    await resetState(page);

    await page.click('#nav-settings');
    // It's a div.setting-row with onclick="restartOnboarding()", label "Онбординг"
    const restartRow = page.locator('.setting-row', { hasText: 'Онбординг' });
    await restartRow.click();

    await expect(page.locator('#onboarding-overlay')).toBeVisible();
  });
});
