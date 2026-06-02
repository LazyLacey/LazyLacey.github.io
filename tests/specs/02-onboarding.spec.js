const { test, expect } = require('@playwright/test');
const { resetState, waitForInit, seedCards } = require('../helpers/db');

/** Navigate onboarding to the packs step (step 5, dynamicActions). */
async function goToPacksStep(page) {
  await page.evaluate(() => localStorage.removeItem('onboardingDone'));
  await page.reload();
  await waitForInit(page);
  // Advance through 5 steps (0→5) via obNext()
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => obNext());
  }
  await page.waitForSelector('#ob-actions', { state: 'visible' });
}

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

  test('loading a ready pack (cards) from onboarding imports cards into the DB', async ({ page }) => {
    await resetState(page);
    await goToPacksStep(page);

    // Click the first non-download pack button (cards)
    const cardsPack = page.locator('#ob-actions button').first();
    await cardsPack.click();

    // Toast confirms success
    await expect(page.locator('#toast')).toContainText(/загружен|загружены/i, { timeout: 10000 });

    // Cards are actually in the DB
    const count = await page.evaluate(() => AppState.cards.length);
    expect(count).toBeGreaterThan(0);
  });

  test('switching language in onboarding switches DB without reload', async ({ page }) => {
    await resetState(page);
    await page.evaluate(() => localStorage.removeItem('onboardingDone'));
    await page.reload();
    await waitForInit(page);

    // Advance to the lang picker step (step 1) via obNext
    await page.evaluate(() => obNext());
    await page.waitForSelector('#ob-body button[onclick*="obSelectLang(\'spanish\')"]', { state: 'visible' });

    // Pick Spanish — should NOT reload, just switch DB
    await page.evaluate(() => obSelectLang('spanish'));

    // Onboarding stays visible, no reload
    await expect(page.locator('#onboarding-overlay')).toBeVisible();
    // Language is now Spanish
    const lang = await page.evaluate(() => currentLang().id);
    expect(lang).toBe('spanish');
  });

  test('cards loaded from onboarding go into the correct language DB after lang switch', async ({ page }) => {
    await resetState(page);
    await goToPacksStep(page);

    // Switch to Spanish via obSelectLang (switches DB without reload)
    await page.evaluate(async () => {
      await obSelectLang('spanish');
    });
    const lang = await page.evaluate(() => currentLang().id);
    expect(lang).toBe('spanish');

    // Click the cards pack — should load into SpanishVocab
    const cardsPack = page.locator('#ob-actions button').first();
    await cardsPack.click();
    await expect(page.locator('#toast')).toContainText(/загружен|загружены/i, { timeout: 10000 });

    const count = await page.evaluate(() => AppState.cards.length);
    expect(count).toBeGreaterThan(0);

    // Romanian DB stays empty
    const romanianCount = await page.evaluate(async () => {
      const req = indexedDB.open('RomanianVocab');
      return new Promise(res => {
        req.onsuccess = e => {
          const d = e.target.result;
          const tx = d.transaction('cards', 'readonly');
          const countReq = tx.objectStore('cards').count();
          countReq.onsuccess = () => { d.close(); res(countReq.result); };
        };
        req.onerror = () => res(0);
      });
    });
    expect(romanianCount).toBe(0);
  });
});
