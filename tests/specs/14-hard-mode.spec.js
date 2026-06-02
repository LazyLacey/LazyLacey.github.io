const { test, expect } = require('@playwright/test');
const { resetState, seedCards, seedSettings, waitForInit } = require('../helpers/db');

async function switchToSpanish(page) {
  await resetState(page);
  await page.evaluate(() => localStorage.setItem('lang', 'spanish'));
  await page.reload();
  await waitForInit(page);
  // Clear any leftover Spanish cards from previous runs
  await page.evaluate(async () => {
    const all = await dbGetAll('cards');
    for (const c of all) await dbDelete('cards', c.id);
    localStorage.setItem('onboardingDone', '1');
    AppState.cards = [];
    buildStudyQueue();
  });
}

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

// ── Hard Mode — Spanish diacritics ────────────────────────────────────────

const SPANISH_DIACRITIC_CARDS = [
  { ro: 'árbol', ru: 'дерево' },   // á
  { ro: 'niño',  ru: 'мальчик' }, // ñ
  { ro: 'café',  ru: 'кофе' },    // é
];

test.describe('Hard Mode — Spanish', () => {
  test.beforeEach(async ({ page }) => {
    await switchToSpanish(page);
    await seedCards(page, SPANISH_DIACRITIC_CARDS);
    await page.evaluate(() => setReadyMode('type'));
  });

  test('hard mode ON — Spanish answer without diacritics is marked wrong', async ({ page }) => {
    await seedSettings(page, { showSummary: false, hardMode: true });
    await page.click('#ready-start-btn');

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

  test('hard mode ON — exact Spanish answer with diacritics is correct', async ({ page }) => {
    await seedSettings(page, { showSummary: false, hardMode: true });
    await page.click('#ready-start-btn');

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

  test('hard mode OFF — Spanish answer without diacritics is accepted', async ({ page }) => {
    await seedSettings(page, { showSummary: false, hardMode: false });
    await page.click('#ready-start-btn');
    await page.locator('#study-session').waitFor({ state: 'visible' });

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

  test('hard mode indicator shows Spanish diacritic hints', async ({ page }) => {
    await seedSettings(page, { showSummary: false, hardMode: true });
    await page.click('#ready-start-btn');

    await expect(page.locator('#flashcard-area')).toContainText(/hard mode|диакритика/i);
    // Settings sub-label should show Spanish diacritics
    const hints = await page.evaluate(() => currentLang().diacriticHints);
    expect(hints).toContain('ñ');
    expect(hints).toContain('á');
  });
});
