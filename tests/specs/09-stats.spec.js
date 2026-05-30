const { test, expect } = require('@playwright/test');
const { resetState, seedCards, seedSettings, getSessions } = require('../helpers/db');
const { MINI_DECK } = require('../helpers/fixtures');

test.describe('Stats page', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
  });

  test('stats grid renders on the stats tab', async ({ page }) => {
    await page.click('#nav-stats');
    await expect(page.locator('#stats-grid')).toBeVisible();
  });

  test('empty stats show zeros', async ({ page }) => {
    await page.click('#nav-stats');
    // Stats grid renders asynchronously — wait for content to appear
    await expect(page.locator('#stats-grid')).toContainText('0', { timeout: 5000 });
  });

  test('heatmap grid is rendered', async ({ page }) => {
    await page.click('#nav-stats');
    await expect(page.locator('#heatmap-grid')).toBeVisible();
  });

  test('progress chart canvas is visible', async ({ page }) => {
    await page.click('#nav-stats');
    await expect(page.locator('#progress-chart')).toBeVisible();
  });

  test('chart period buttons switch between 7d and 30d', async ({ page }) => {
    await page.click('#nav-stats');
    await expect(page.locator('#chart-btn-7')).toHaveClass(/active/);

    await page.click('#chart-btn-30');
    await expect(page.locator('#chart-btn-30')).toHaveClass(/active/);
    await expect(page.locator('#chart-btn-7')).not.toHaveClass(/active/);

    await page.click('#chart-btn-7');
    await expect(page.locator('#chart-btn-7')).toHaveClass(/active/);
  });

  test('total words count reflects number of seeded cards', async ({ page }) => {
    await seedCards(page, MINI_DECK);
    await page.click('#nav-stats');

    await expect(page.locator('#stats-grid')).toContainText(String(MINI_DECK.length));
  });

  test('stats update after completing a study session', async ({ page }) => {
    await seedSettings(page, { showSummary: false });
    await seedCards(page, MINI_DECK);

    await page.evaluate(() => setReadyMode('type'));
    await page.click('#ready-start-btn');

    // Answer until session ends — use AppState to always answer correctly
    for (let attempt = 0; attempt < MINI_DECK.length * 4; attempt++) {
      const readyVisible = await page.locator('#ready-screen:not(.hidden)').isVisible();
      if (readyVisible) break;
      await page.evaluate(() => {
        const card = AppState.studyQueue[AppState.studyIndex];
        if (card) document.getElementById('type-answer').value = card.ro;
      });
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

    // Verify session was persisted to DB
    const sessions = await getSessions(page);
    expect(sessions.length).toBeGreaterThan(0);

    // Verify stats grid shows non-zero "Всего показов"
    // renderStats() is async (awaits heatmap + record before updating grid.innerHTML),
    // so we poll until the value appears rather than reading immediately.
    await page.click('#nav-stats');
    await page.waitForFunction(() => {
      const cells = document.querySelectorAll('#stats-grid .stat-card');
      for (const cell of cells) {
        if (cell.textContent.includes('показов')) {
          return parseInt(cell.querySelector('.stat-card-value')?.textContent || '0') > 0;
        }
      }
      return false;
    }, { timeout: 5000 });
  });

  test('worst cards section is empty with no data', async ({ page }) => {
    await page.click('#nav-stats');
    // Either empty or not shown
    const worstEl = page.locator('#stats-worst-cards');
    const text = await worstEl.textContent();
    expect(text.trim()).toBe('');
  });

  test('reset stats clears session history', async ({ page }) => {
    await seedSettings(page, { showSummary: false });
    await seedCards(page, MINI_DECK);
    await page.evaluate(() => setReadyMode('type'));
    await page.click('#ready-start-btn');

    // Answer until session ends
    for (let attempt = 0; attempt < MINI_DECK.length * 4; attempt++) {
      const readyVisible = await page.locator('#ready-screen:not(.hidden)').isVisible();
      if (readyVisible) break;
      await page.fill('#type-answer', 'ошибка');
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

    await page.click('#nav-settings');
    const resetBtn = page.locator('.setting-row', { hasText: /сбросить статистику/i });
    page.once('dialog', d => d.accept());
    await resetBtn.click();
    // resetStats() is async — wait for toast to confirm it finished
    await expect(page.locator('#toast')).toContainText(/сброшена/i, { timeout: 5000 });

    const sessions = await getSessions(page);
    expect(sessions.length).toBe(0);
  });
});
