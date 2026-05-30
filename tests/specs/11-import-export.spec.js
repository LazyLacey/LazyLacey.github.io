const { test, expect } = require('@playwright/test');
const { resetState, seedCards, seedGroups, getCards } = require('../helpers/db');
const { CARDS, GROUPS } = require('../helpers/fixtures');
const path = require('path');
const fs = require('fs');
const os = require('os');

// ── Export ────────────────────────────────────────────────────────────────

test.describe('Data Export', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
  });

  test('opening export drawer shows backup options', async ({ page }) => {
    await page.click('#nav-settings');
    await page.locator('.setting-row', { hasText: 'Экспорт данных' }).click();

    // A dynamically-created overlay appears
    await expect(page.locator('[data-action="full"]')).toBeVisible();
    await expect(page.locator('[data-action="cards"]')).toBeVisible();
  });

  test('full backup export triggers a file download', async ({ page }) => {
    await seedCards(page, CARDS.basic);
    await page.click('#nav-settings');
    await page.locator('.setting-row', { hasText: 'Экспорт данных' }).click();

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('[data-action="full"]').click(),
    ]);

    expect(download).toBeTruthy();
    expect(download.suggestedFilename()).toMatch(/\.json$/);
  });

  test('exported file is valid JSON containing cards array', async ({ page }) => {
    await seedCards(page, CARDS.basic);
    await page.click('#nav-settings');
    await page.locator('.setting-row', { hasText: 'Экспорт данных' }).click();

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('[data-action="full"]').click(),
    ]);

    const filePath = await download.path();
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    expect(Array.isArray(data.cards)).toBe(true);
    expect(data.cards.length).toBe(CARDS.basic.length);
  });

  test('cards-only export contains only cards (no stats)', async ({ page }) => {
    await seedCards(page, CARDS.basic);
    await page.click('#nav-settings');
    await page.locator('.setting-row', { hasText: 'Экспорт данных' }).click();

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('[data-action="cards"]').click(),
    ]);

    const filePath = await download.path();
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    expect(Array.isArray(data.cards)).toBe(true);
  });
});

// ── Import ────────────────────────────────────────────────────────────────

test.describe('Data Import', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
  });

  test('import replaces existing data (replace mode)', async ({ page }) => {
    await seedCards(page, [{ ro: 'vechi', ru: 'старый' }]);

    const importData = {
      type: 'full',
      version: 3,
      cards: [
        { id: 100, ro: 'nou', ru: 'новый' },
        { id: 101, ro: 'proaspăt', ru: 'свежий' },
      ],
      groups: [],
      cardStats: [],
      dailyStats: [],
      sessions: [],
      settings: [],
    };
    const tmpFile = path.join(os.tmpdir(), `test-import-${Date.now()}.json`);
    fs.writeFileSync(tmpFile, JSON.stringify(importData));

    await page.click('#nav-settings');

    // Click the "Импорт данных" setting row — it triggers a file chooser
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('.setting-row', { hasText: 'Импорт данных' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(tmpFile);

    // Mode picker appears — click "replace"
    await page.locator('[data-mode="replace"]').click();

    await expect(page.locator('#toast')).toContainText(/импортировано|загружено|готово/i, { timeout: 8000 });

    const cards = await getCards(page);
    expect(cards.some(c => c.ro === 'nou')).toBe(true);
    expect(cards.some(c => c.ro === 'vechi')).toBe(false);

    fs.unlinkSync(tmpFile);
  });

  test('importing invalid JSON shows an error toast', async ({ page }) => {
    const tmpFile = path.join(os.tmpdir(), `bad-import-${Date.now()}.json`);
    fs.writeFileSync(tmpFile, 'this is not valid json {{{');

    await page.click('#nav-settings');

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('.setting-row', { hasText: 'Импорт данных' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(tmpFile);

    await expect(page.locator('#toast')).toContainText(/ошибка|повреждён|неверн/i, { timeout: 5000 });

    fs.unlinkSync(tmpFile);
  });

  test('cancelling import mode picker does nothing', async ({ page }) => {
    await seedCards(page, [{ ro: 'vechi', ru: 'старый' }]);

    const importData = {
      type: 'full', version: 3,
      cards: [{ id: 200, ro: 'nou', ru: 'новый' }],
      groups: [], cardStats: [], dailyStats: [], sessions: [], settings: [],
    };
    const tmpFile = path.join(os.tmpdir(), `cancel-import-${Date.now()}.json`);
    fs.writeFileSync(tmpFile, JSON.stringify(importData));

    await page.click('#nav-settings');
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('.setting-row', { hasText: 'Импорт данных' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(tmpFile);

    // Cancel the mode picker — original data must remain intact
    await page.locator('[data-mode="cancel"]').click();

    const cards = await getCards(page);
    expect(cards.some(c => c.ro === 'vechi')).toBe(true);
    expect(cards.some(c => c.ro === 'nou')).toBe(false);

    fs.unlinkSync(tmpFile);
  });
});
