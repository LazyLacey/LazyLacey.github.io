const { test, expect } = require('@playwright/test');
const { resetState, seedCards, seedSettings } = require('../helpers/db');

// Card with explicit diacritics — hard mode requires exact match
const DIACRITIC_CARDS = [
  { ro: 'învăța', ru: 'учиться' },  // ă, ț
  { ro: 'câine', ru: 'собака' },    // â
  { ro: 'șosea', ru: 'дорога' },    // ș
];

test.describe('Hard Mode', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await seedCards(page, DIACRITIC_CARDS);
    await page.evaluate(() => setReadyMode('type'));
  });

  test('hard mode indicator is shown on card when enabled', async ({ page }) => {
    await seedSettings(page, { showSummary: false, hardMode: true });
    await page.click('#ready-start-btn');

    // The app renders "🔥 Hard mode: диакритика обязательна" hint on the card
    await expect(page.locator('#flashcard-area')).toContainText(/hard mode|диакритика/i);
  });

  test('hard mode OFF — answer without diacritics is accepted as correct', async ({ page }) => {
    await seedSettings(page, { showSummary: false, hardMode: false });
    await page.click('#ready-start-btn');
    await page.locator('#study-session').waitFor({ state: 'visible' });

    // Atomic: strip diacritics from current card and fill+check in one evaluate
    const hadCard = await page.evaluate(() => {
      const card = AppState.studyQueue[AppState.studyIndex];
      if (!card) return false;
      const stripped = card.ro.normalize('NFD').replace(/[̀-ͯ]/g, '');
      document.getElementById('type-answer').value = stripped;
      document.getElementById('btn-check').click();
      return true;
    });
    if (!hadCard) return;

    await expect(page.locator('#type-answer')).toHaveClass(/correct/);
  });

  test('hard mode ON — answer without diacritics is marked wrong', async ({ page }) => {
    await seedSettings(page, { showSummary: false, hardMode: true });
    await page.click('#ready-start-btn');

    // Atomic: strip diacritics from current card and fill+check in one evaluate
    const hadCard = await page.evaluate(() => {
      const card = AppState.studyQueue[AppState.studyIndex];
      if (!card) return false;
      const stripped = card.ro.normalize('NFD').replace(/[̀-ͯ]/g, '');
      document.getElementById('type-answer').value = stripped;
      document.getElementById('btn-check').click();
      return true;
    });
    if (!hadCard) return;

    await expect(page.locator('#type-answer')).toHaveClass(/wrong/);
  });

  test('hard mode ON — exact answer with diacritics is correct', async ({ page }) => {
    await seedSettings(page, { showSummary: false, hardMode: true });
    await page.click('#ready-start-btn');

    // Atomic: read correct answer and fill+check in one evaluate
    const hadCard = await page.evaluate(() => {
      const card = AppState.studyQueue[AppState.studyIndex];
      if (!card) return false;
      document.getElementById('type-answer').value = card.ro;
      document.getElementById('btn-check').click();
      return true;
    });
    if (!hadCard) return;

    await expect(page.locator('#type-answer')).toHaveClass(/correct/);
  });

  test('toggling hard mode in settings takes effect immediately', async ({ page }) => {
    await seedSettings(page, { showSummary: false, hardMode: false });

    // Turn on hard mode via settings UI (checkbox is visually hidden; click parent label)
    await page.click('#nav-settings');
    const toggleLabel = page.locator('label.toggle').filter({ has: page.locator('#setting-hard-mode') });
    await toggleLabel.click();
    await page.locator('button', { hasText: /сохранить настройки/i }).click();
    // Navigate back
    await page.click('#nav-study');
    await page.click('#ready-start-btn');

    await expect(page.locator('#flashcard-area')).toContainText(/hard mode|диакритика/i);
  });
});
