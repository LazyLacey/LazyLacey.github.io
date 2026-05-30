const { test, expect } = require('@playwright/test');
const { resetState, seedCards, seedSettings } = require('../helpers/db');
const { CARDS, MINI_DECK } = require('../helpers/fixtures');

test.describe('Study — Marathon mode', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await seedSettings(page, { showSummary: false });
    await seedCards(page, CARDS.basic);
    await page.evaluate(() => setReadyMode('marathon'));
  });

  test('marathon mode button becomes active', async ({ page }) => {
    await expect(page.locator('#ready-mode-marathon')).toHaveClass(/active/);
  });

  test('marathon session starts and shows a card', async ({ page }) => {
    await page.click('#ready-start-btn');
    await expect(page.locator('#study-session')).toBeVisible();
    await expect(page.locator('#flashcard-area')).toBeVisible();
  });

  test('marathon uses all cards regardless of SRS schedule', async ({ page }) => {
    // Set all cards as "not overdue" (far future nextReview) — marathon ignores this
    await page.evaluate(async () => {
      const future = Date.now() + 30 * 86400000;
      for (const card of AppState.cards) {
        await dbPut('cardStats', {
          cardId: card.id, shows: 5, correct: 5,
          srsLevel: 4, srsEf: 2.5, srsInterval: 10,
          nextReview: future, lastSeen: Date.now(),
        });
        AppState.cardStats.set(card.id, { cardId: card.id, nextReview: future });
      }
      buildStudyQueue(); // normal queue would be empty
    });

    await page.evaluate(() => setReadyMode('marathon'));
    await page.click('#ready-start-btn');
    // Marathon still starts despite SRS queue being empty
    await expect(page.locator('#study-session')).toBeVisible();
  });
});

test.describe('Study — Browse mode', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await seedCards(page, MINI_DECK);
    await page.evaluate(() => setReadyMode('browse'));
  });

  test('browse mode button becomes active', async ({ page }) => {
    await expect(page.locator('#ready-mode-browse')).toHaveClass(/active/);
  });

  test('browse session starts and shows a card', async ({ page }) => {
    await page.click('#ready-start-btn');
    await expect(page.locator('#study-session')).toBeVisible();
  });

  test('type input is hidden in browse mode', async ({ page }) => {
    await page.click('#ready-start-btn');
    await expect(page.locator('#persistent-type-area')).toBeHidden();
    await expect(page.locator('#persistent-choices-area')).toBeHidden();
  });

  test('browse shows empty toast when no cards exist', async ({ page }) => {
    await resetState(page);
    await page.evaluate(() => setReadyMode('browse'));
    await page.click('#ready-start-btn');
    await expect(page.locator('#toast')).toBeVisible();
  });
});

test.describe('Study — Errors mode', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await seedSettings(page, { showSummary: false, errorSessions: 3 });
    await page.evaluate(() => setReadyMode('errors'));
  });

  test('errors mode shows toast when there are no recent errors', async ({ page }) => {
    await page.click('#ready-start-btn');
    await expect(page.locator('#toast')).toContainText(/нет ошибок/i);
    await expect(page.locator('#ready-screen')).toBeVisible();
  });

  test('errors mode starts a session after completing a session with mistakes', async ({ page }) => {
    await seedSettings(page, { showSummary: false });
    await seedCards(page, MINI_DECK);
    await page.evaluate(() => setReadyMode('type'));
    await page.click('#ready-start-btn');

    // Answer wrong until session ends (retries add extra cards, so loop beyond deck size)
    for (let attempt = 0; attempt < MINI_DECK.length * 4; attempt++) {
      const readyVisible = await page.locator('#ready-screen:not(.hidden)').isVisible();
      if (readyVisible) break;
      await page.fill('#type-answer', 'хахаошибка');
      await page.click('#btn-check');
      await page.click('#btn-next');
      await page.waitForFunction(() => {
        const ready = document.getElementById('ready-screen');
        const inp   = document.getElementById('type-answer');
        return !ready.classList.contains('hidden') ||
          (inp.offsetParent !== null && inp.value === '');
      }, { timeout: 5000 }).catch(() => {});
    }

    await expect(page.locator('#ready-screen')).toBeVisible({ timeout: 5000 });

    // Now switch to errors mode
    await page.evaluate(() => {
      setReadyMode('errors');
      // Clear the errors-cards cache so it re-fetches
      window._errorCardsPromise = null;
    });
    await page.click('#ready-start-btn');
    await expect(page.locator('#study-session')).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Study — Group filter', () => {
  test('filtering by group shows only cards from that group', async ({ page }) => {
    await resetState(page);
    await seedSettings(page, { showSummary: false });
    await page.evaluate(async () => {
      await dbPut('groups', { name: 'ГруппаА' });
      await dbPut('groups', { name: 'ГруппаБ' });
      AppState.groups = await dbGetAll('groups');
    });
    const groups = await page.evaluate(() => AppState.groups);
    const gA = groups.find(g => g.name === 'ГруппаА');
    const gB = groups.find(g => g.name === 'ГруппаБ');

    await seedCards(page, [
      { ro: 'unu', ru: 'один', groupId: gA.id },
      { ro: 'roșu', ru: 'красный', groupId: gB.id },
    ]);

    // Select group B in the ready-screen filter
    await page.evaluate(() => toggleReadyOptions());
    await page.locator('#ready-group-select').selectOption({ label: 'ГруппаБ' });
    await page.evaluate(() => updateReadyCount());

    await page.click('#ready-start-btn');

    const cardText = await page.locator('#flashcard-area').textContent();
    expect(cardText).toContain('красный');
    expect(cardText).not.toContain('один');
  });
});
