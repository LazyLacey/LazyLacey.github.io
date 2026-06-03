// Tests for no-reload language switching via onLangChange()
// Covers bugs fixed: grammar not re-rendering, AppState stale after switch,
// doImportWordsOnly dedup against stale data

const { test, expect } = require('@playwright/test');
const { resetState, waitForInit } = require('../helpers/db');

async function switchLangNoReload(page, langId) {
  await page.evaluate(async (id) => {
    localStorage.setItem('lang', id);
    await window.onLangChange(id);
  }, langId);
  await page.waitForFunction(
    (id) => window.currentLang?.().id === id,
    langId,
    { timeout: 5000 }
  );
}

test.describe('Language — no-reload switch (onLangChange)', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
  });

  test('currentLang() returns new language immediately after onLangChange', async ({ page }) => {
    await switchLangNoReload(page, 'spanish');
    const langId = await page.evaluate(() => currentLang().id);
    expect(langId).toBe('spanish');
  });

  test('AppState.cards is cleared after switching to empty Spanish DB', async ({ page }) => {
    // Load Romanian cards first
    await page.evaluate(async () => loadReadyPack('data/romanian-cards.json', 'cards'));
    await page.waitForFunction(() => AppState.cards.length > 0, { timeout: 10000 });

    await switchLangNoReload(page, 'spanish');

    const count = await page.evaluate(() => AppState.cards.length);
    expect(count).toBe(0);
  });

  test('AppState.groups is cleared after switching to empty Spanish DB', async ({ page }) => {
    await page.evaluate(async () => loadReadyPack('data/romanian-cards.json', 'cards'));
    await page.waitForFunction(() => AppState.groups.length > 0, { timeout: 10000 });

    await switchLangNoReload(page, 'spanish');

    const count = await page.evaluate(() => AppState.groups.length);
    expect(count).toBe(0);
  });

  test('loading Spanish pack after switch populates Spanish DB only', async ({ page }) => {
    // Switch to Spanish on empty DB, load Spanish pack
    await switchLangNoReload(page, 'spanish');
    await page.evaluate(async () => loadReadyPack('data/spanish-cards.json', 'cards'));
    await page.waitForFunction(() => AppState.cards.length > 0, { timeout: 10000 });

    const esCount = await page.evaluate(() => AppState.cards.length);
    expect(esCount).toBeGreaterThan(0);

    // Switch back to Romanian — should be empty (never loaded anything there)
    await switchLangNoReload(page, 'romanian');
    const roCount = await page.evaluate(() => AppState.cards.length);
    expect(roCount).toBe(0);
  });

  test('grammar topics update after switching language', async ({ page }) => {
    const roTopicCount = await page.evaluate(() => window.grammarTopics?.length ?? 0);
    expect(roTopicCount).toBeGreaterThan(0);

    await switchLangNoReload(page, 'spanish');

    const esTopicCount = await page.evaluate(() => window.grammarTopics?.length ?? 0);
    expect(esTopicCount).toBeGreaterThan(0);

    // Spanish grammar has different topic IDs than Romanian
    const hasSerEstar = await page.evaluate(() =>
      window.grammarTopics?.some(t => t.id === 'ser-estar') ?? false
    );
    expect(hasSerEstar).toBe(true);
  });

  test('grammar re-renders with Spanish content after switch', async ({ page }) => {
    await switchLangNoReload(page, 'spanish');
    await page.evaluate(() => showPage('grammar'));
    await page.waitForSelector('#grammar-container .gr-topic-card', { timeout: 5000 });

    const topicTitles = await page.evaluate(() =>
      Array.from(document.querySelectorAll('#grammar-container .gr-topic-title'))
        .map(el => el.textContent)
    );
    expect(topicTitles.length).toBeGreaterThan(0);
    // Spanish grammar has Ser/Estar — Romanian does not
    const hasSerEstarTitle = topicTitles.some(t => /ser.*estar/i.test(t));
    expect(hasSerEstarTitle).toBe(true);
  });
});

test.describe('Language — onboarding switch (obSelectLang)', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
  });

  test('obSelectLang switches DB and updates currentLang without reload', async ({ page }) => {
    await page.evaluate(() => showOnboarding(1)); // lang picker step
    await page.waitForTimeout(300);

    await page.evaluate(async () => obSelectLang('spanish'));
    await page.waitForFunction(() => currentLang().id === 'spanish', { timeout: 5000 });

    const langId = await page.evaluate(() => currentLang().id);
    expect(langId).toBe('spanish');
  });

  test('loading pack in onboarding after lang switch imports into correct DB', async ({ page }) => {
    await page.evaluate(() => showOnboarding(1));
    await page.waitForTimeout(300);
    await page.evaluate(async () => obSelectLang('spanish'));
    await page.waitForFunction(() => currentLang().id === 'spanish', { timeout: 5000 });

    await page.evaluate(async () => loadReadyPack('data/spanish-cards.json', 'cards'));
    await page.waitForFunction(() => AppState.cards.length > 0, { timeout: 10000 });

    // Switch to Romanian — should have no cards
    await page.evaluate(async (id) => {
      localStorage.setItem('lang', id);
      await window.onLangChange(id);
    }, 'romanian');
    await page.waitForFunction(() => currentLang().id === 'romanian', { timeout: 5000 });

    const roCount = await page.evaluate(() => AppState.cards.length);
    expect(roCount).toBe(0);
  });
});
