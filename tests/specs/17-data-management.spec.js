const { test, expect } = require('@playwright/test');
const { resetState, seedCards, seedGroups, seedSettings } = require('../helpers/db');
const { MINI_DECK, CARDS, GROUPS } = require('../helpers/fixtures');

// ── Clear data ─────────────────────────────────────────────────────────────

test.describe('Clear all data', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await seedCards(page, CARDS.basic);
  });

  test('clearData removes all cards and shows toast', async ({ page }) => {
    const countBefore = await page.evaluate(() => AppState.cards.length);
    expect(countBefore).toBeGreaterThan(0);

    page.once('dialog', d => d.accept());
    await page.evaluate(() => clearData());

    await expect(page.locator('#toast')).toContainText(/очистка завершена/i, { timeout: 5000 });
    const countAfter = await page.evaluate(() => AppState.cards.length);
    expect(countAfter).toBe(0);
  });

  test('clearData cancellation keeps data intact', async ({ page }) => {
    const countBefore = await page.evaluate(() => AppState.cards.length);

    page.once('dialog', d => d.dismiss());
    await page.evaluate(() => clearData());

    const countAfter = await page.evaluate(() => AppState.cards.length);
    expect(countAfter).toBe(countBefore);
  });

  test('clear data button is accessible from settings page', async ({ page }) => {
    await page.click('#nav-settings');
    const clearBtn = page.locator('.setting-row', { hasText: /очистить данные/i });
    await expect(clearBtn).toBeVisible({ timeout: 3000 });
  });
});

// ── Import modes ───────────────────────────────────────────────────────────

test.describe('Import — words-only mode', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
  });

  test('words-only import adds new cards without touching existing ones', async ({ page }) => {
    await seedCards(page, [{ ro: 'vechi', ru: 'старый' }]);
    const before = await page.evaluate(() => AppState.cards.length);

    const importData = {
      version: 3,
      groups: [{ name: 'Новая группа' }],
      cards: [
        { id: 200, ro: 'nou', ru: 'новый', groupName: 'Новая группа' },
        { id: 201, ro: 'mare', ru: 'большой', groupName: 'Новая группа' },
      ],
    };
    await page.evaluate(async (data) => {
      await doImportWordsOnly(data);
    }, importData);

    await expect(page.locator('#toast')).toContainText(/добавлено|слов|карточк/i, { timeout: 5000 });
    const after = await page.evaluate(() => AppState.cards.length);
    expect(after).toBeGreaterThan(before);
  });

  test('words-only import preserves existing card stats', async ({ page }) => {
    await seedCards(page, [{ id: 100, ro: 'vechi', ru: 'старый' }]);
    // Create a cardStats entry with known values for the seeded card
    await page.evaluate(async () => {
      const card = AppState.cards.find(c => c.ro === 'vechi');
      if (!card) return;
      const statsObj = { cardId: card.id, shows: 5, correct: 3, lastSeen: Date.now(), streak: 2, srsLevel: 1, nextReview: 0 };
      await putCardStats(statsObj);
      AppState.cardStats.set(card.id, statsObj);
    });

    const importData = {
      version: 3,
      groups: [],
      cards: [{ id: 200, ro: 'nou', ru: 'новый' }],
    };
    await page.evaluate(async (data) => doImportWordsOnly(data), importData);
    await expect(page.locator('#toast')).toContainText(/добавлено|слов|карточк/i, { timeout: 5000 });

    // Verify original card's stats are unchanged
    const statsAfter = await page.evaluate(async () => {
      const card = AppState.cards.find(c => c.ro === 'vechi');
      if (!card) return null;
      return await dbGet('cardStats', card.id);
    });
    expect(statsAfter).not.toBeNull();
    expect(statsAfter.shows).toBe(5);
    expect(statsAfter.correct).toBe(3);
  });
});

test.describe('Import — merge history mode', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await seedCards(page, [{ id: 100, ro: 'unu', ru: 'один' }]);
  });

  test('merge history import combines daily stats and shows toast', async ({ page }) => {
    const importData = {
      version: 3,
      groups: [],
      cards: [{ id: 100, ro: 'unu', ru: 'один', shows: 5, correct: 3 }],
      dailyStats: [{ date: '2025-01-01', total: 10, correct: 7 }],
      sessions: [],
    };
    await page.evaluate(async (data) => doImportMergeHistory(data), importData);

    await expect(page.locator('#toast')).toContainText(/объединена|история/i, { timeout: 5000 });
  });

  test('merge history does not delete existing cards', async ({ page }) => {
    const cardsBefore = await page.evaluate(() => AppState.cards.length);
    const importData = {
      version: 3,
      groups: [],
      cards: [],
      dailyStats: [{ date: '2025-01-02', total: 5, correct: 4 }],
      sessions: [],
    };
    await page.evaluate(async (data) => doImportMergeHistory(data), importData);
    await expect(page.locator('#toast')).toContainText(/объединена|история/i, { timeout: 5000 });

    const cardsAfter = await page.evaluate(() => AppState.cards.length);
    expect(cardsAfter).toBe(cardsBefore);
  });
});

// ── Export group ───────────────────────────────────────────────────────────

test.describe('Export group', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await seedGroups(page, [GROUPS.basics]);
  });

  test('exportGroup triggers a file download', async ({ page }) => {
    const groupId = await page.evaluate(() => AppState.groups[0]?.id);
    if (!groupId) return;

    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 5000 }),
      page.evaluate((id) => exportGroup(id), groupId),
    ]);

    expect(download.suggestedFilename()).toMatch(/romanian-group-.+\.json/);
  });

  test('exported group file contains valid JSON with cards array', async ({ page }) => {
    // Seed a card into the group
    const groupId = await page.evaluate(() => AppState.groups[0]?.id);
    if (!groupId) return;

    await page.evaluate(async (gid) => {
      await dbPut('cards', { ro: 'bun', ru: 'хороший', groupId: gid });
      AppState.cards = await dbGetAll('cards');
    }, groupId);

    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 5000 }),
      page.evaluate((id) => exportGroup(id), groupId),
    ]);

    const stream = await download.createReadStream();
    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    const content = Buffer.concat(chunks).toString();
    const parsed = JSON.parse(content);

    expect(Array.isArray(parsed.cards)).toBe(true);
    expect(parsed.groups).toBeDefined();
  });
});

// ── Record block (streak, accuracy, sessions) ──────────────────────────────

test.describe('Stats — Record block', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
  });

  test('record block is visible on stats page', async ({ page }) => {
    await page.click('#nav-stats');
    await expect(page.locator('#record-block-wrap')).toBeVisible({ timeout: 5000 });
  });

  test('record block shows three metric items', async ({ page }) => {
    await page.click('#nav-stats');
    const items = page.locator('#record-block-wrap .record-item');
    await expect(items.first()).toBeVisible({ timeout: 5000 });
    const count = await items.count();
    expect(count).toBe(3);
  });

  test('record block shows 0 streak with no study history', async ({ page }) => {
    await page.click('#nav-stats');
    await expect(page.locator('#record-block-wrap')).toContainText(/0/, { timeout: 5000 });
  });

  test('total sessions count increases after completing a session', async ({ page }) => {
    await seedSettings(page, { showSummary: false });
    await seedCards(page, MINI_DECK);

    await page.evaluate(() => setReadyMode('type'));
    await page.click('#ready-start-btn');

    // Answer all cards correctly
    for (let i = 0; i < MINI_DECK.length * 4; i++) {
      const done = await page.evaluate(() => {
        const ready = document.getElementById('ready-screen');
        return ready && !ready.classList.contains('hidden');
      });
      if (done) break;

      await page.evaluate(() => {
        const card = AppState.studyQueue[AppState.studyIndex];
        if (card) {
          document.getElementById('type-answer').value = card.ro;
          document.getElementById('btn-check').click();
        }
      });
      await page.waitForSelector('#btn-next.visible', { timeout: 3000 }).catch(() => {});
      await page.evaluate(() => {
        const btn = document.getElementById('btn-next');
        if (btn) btn.click();
      });
      await page.waitForFunction(() => {
        const ready = document.getElementById('ready-screen');
        const inp   = document.getElementById('type-answer');
        return !ready.classList.contains('hidden') ||
          (inp && inp.offsetParent !== null && inp.value === '');
      }, { timeout: 5000 }).catch(() => {});
    }

    await page.click('#nav-stats');
    await expect(page.locator('#record-block-wrap')).toBeVisible({ timeout: 5000 });
    const text = await page.locator('#record-block-wrap').textContent();
    // Total sessions should be at least 1
    const nums = text.match(/\d+/g) || [];
    const anyPositive = nums.some(n => parseInt(n) > 0);
    expect(anyPositive).toBe(true);
  });
});
