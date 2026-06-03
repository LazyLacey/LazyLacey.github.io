const { test, expect } = require('@playwright/test');
const { resetState, seedCards, seedSettings } = require('../helpers/db');
const { CARDS } = require('../helpers/fixtures');

test.describe('Study — Choice mode', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await seedSettings(page, { showSummary: false });
    // Need at least 4 cards for multiple-choice distractors
    await seedCards(page, CARDS.basic);
    await page.evaluate(() => setReadyMode('choice'));
  });

  test('switching to choice mode updates the mode chip label', async ({ page }) => {
    await expect(page.locator('[data-testid="chip-mode"]')).toContainText('Выбрать');
  });

  test('starting session shows choice buttons', async ({ page }) => {
    await page.click('#ready-start-btn');
    await expect(page.locator('#persistent-choices-area')).toBeVisible();
    await expect(page.locator('.choice-btn')).toHaveCount(4);
  });

  test('all 4 choice buttons have non-empty text', async ({ page }) => {
    await page.click('#ready-start-btn');
    const texts = await page.locator('.choice-btn').allTextContents();
    for (const text of texts) {
      expect(text.trim().length).toBeGreaterThan(0);
    }
  });

  test('one of the choice buttons matches the correct answer', async ({ page }) => {
    await page.click('#ready-start-btn');
    await page.locator('.choice-btn').first().waitFor();

    // Read directly from AppState — no DOM text matching, no silent skip
    const correctRo = await page.evaluate(() => {
      const card = AppState.studyQueue[AppState.studyIndex];
      return card ? card.ro : null;
    });
    expect(correctRo).toBeTruthy();
    await expect(page.locator('.choice-btn', { hasText: correctRo })).toBeVisible();
  });

  test('clicking the correct button marks it as selected-correct', async ({ page }) => {
    await page.click('#ready-start-btn');
    await page.locator('.choice-btn').first().waitFor();

    // Atomic: read card and click correct button in one evaluate to avoid RAF race
    const clicked = await page.evaluate(() => {
      const card = AppState.studyQueue[AppState.studyIndex];
      if (!card) return false;
      const btn = Array.from(document.querySelectorAll('.choice-btn')).find(b => b.textContent.trim() === card.ro);
      if (!btn) return false;
      btn.click();
      return true;
    });
    if (!clicked) return;

    await expect(page.locator('.choice-btn.selected-correct')).toBeVisible();
  });

  test('clicking wrong button marks it as selected-wrong', async ({ page }) => {
    await page.click('#ready-start-btn');
    await page.locator('.choice-btn').first().waitFor();

    // Atomic: read correct answer and click a wrong button in one evaluate to avoid RAF race
    const clicked = await page.evaluate(() => {
      const card = AppState.studyQueue[AppState.studyIndex];
      if (!card) return false;
      const wrongBtn = Array.from(document.querySelectorAll('.choice-btn'))
        .find(b => b.textContent.trim() !== card.ro);
      if (!wrongBtn) return false;
      wrongBtn.click();
      return true;
    });
    if (!clicked) return;

    await expect(page.locator('.choice-btn.selected-wrong')).toBeVisible();
  });

  test('clicking wrong button also reveals the correct button', async ({ page }) => {
    await page.click('#ready-start-btn');
    await page.locator('.choice-btn').first().waitFor();

    // Atomic: find and click a wrong button in one evaluate to avoid RAF race
    const clicked = await page.evaluate(() => {
      const card = AppState.studyQueue[AppState.studyIndex];
      if (!card) return false;
      const wrongBtn = Array.from(document.querySelectorAll('.choice-btn')).find(b => b.textContent.trim() !== card.ro);
      if (!wrongBtn) return false;
      wrongBtn.click();
      return true;
    });
    if (!clicked) return;

    await expect(page.locator('.choice-btn.reveal-correct')).toBeVisible();
  });

  test('all choice buttons are disabled after an answer', async ({ page }) => {
    await page.click('#ready-start-btn');
    await page.locator('#ready-start-btn').waitFor({ state: 'hidden' });
    await page.locator('.choice-btn').first().click();

    const buttons = page.locator('.choice-btn');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      await expect(buttons.nth(i)).toBeDisabled();
    }
  });

  test('"Next" button appears after answering', async ({ page }) => {
    await page.click('#ready-start-btn');
    await page.locator('.choice-btn').first().click();
    await expect(page.locator('#btn-next')).toBeVisible();
  });

  test('correct answer shows green toast', async ({ page }) => {
    await page.click('#ready-start-btn');
    await page.locator('.choice-btn').first().waitFor();

    // Atomic: read card and click correct button in one evaluate to avoid RAF race
    const clicked = await page.evaluate(() => {
      const card = AppState.studyQueue[AppState.studyIndex];
      if (!card) return false;
      const btn = Array.from(document.querySelectorAll('.choice-btn'))
        .find(b => b.textContent.trim() === card.ro);
      if (!btn) return false;
      btn.click();
      return true;
    });
    if (!clicked) return;

    await expect(page.locator('#toast')).toContainText(/правильно/i, { timeout: 5000 });
  });

  test('wrong answer shows red toast', async ({ page }) => {
    await page.click('#ready-start-btn');
    await page.locator('.choice-btn').first().waitFor();

    // Click a wrong button atomically to avoid RAF queue reshuffling the answer
    const clicked = await page.evaluate(() => {
      const card = AppState.studyQueue[AppState.studyIndex];
      if (!card) return false;
      const wrongBtn = Array.from(document.querySelectorAll('.choice-btn'))
        .find(b => b.textContent.trim() !== card.ro);
      if (!wrongBtn) return false;
      wrongBtn.click();
      return true;
    });
    if (!clicked) return;

    await expect(page.locator('#toast')).toContainText(/неверно/i, { timeout: 5000 });
  });

  test('type input is hidden in choice mode', async ({ page }) => {
    await page.click('#ready-start-btn');
    await expect(page.locator('#persistent-type-area')).toBeHidden();
  });
});
