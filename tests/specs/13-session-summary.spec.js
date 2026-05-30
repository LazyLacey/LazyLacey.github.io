const { test, expect } = require('@playwright/test');
const { resetState, seedCards, seedSettings } = require('../helpers/db');
const { MINI_DECK } = require('../helpers/fixtures');

async function runSessionAllWrong(page) {
  await page.evaluate(() => setReadyMode('type'));
  await page.click('#ready-start-btn');
  // Loop until session ends — wrong answers add retries, so queue grows beyond MINI_DECK.length
  for (let attempt = 0; attempt < MINI_DECK.length * 4; attempt++) {
    const done = await page.evaluate(() =>
      document.getElementById('session-summary').style.display === 'flex' ||
      !document.getElementById('ready-screen').classList.contains('hidden')
    );
    if (done) break;
    await page.fill('#type-answer', 'хахаошибка');
    await page.click('#btn-check');
    await page.click('#btn-next');
    // Wait for async session-end chain or next card to settle before re-checking done
    await page.waitForFunction(() => {
      const summary = document.getElementById('session-summary');
      const ready   = document.getElementById('ready-screen');
      const inp     = document.getElementById('type-answer');
      return (summary && summary.style.display === 'flex') ||
        (ready && !ready.classList.contains('hidden')) ||
        (inp && inp.offsetParent !== null && inp.className === 'type-input');
    }, { timeout: 5000 }).catch(() => {});
  }
}

async function runSessionAllCorrect(page) {
  await page.evaluate(() => setReadyMode('type'));
  await page.click('#ready-start-btn');
  // Answer atomically from AppState to avoid queue-order mismatch
  for (let attempt = 0; attempt < MINI_DECK.length * 4; attempt++) {
    const done = await page.evaluate(() =>
      document.getElementById('session-summary').style.display === 'flex' ||
      !document.getElementById('ready-screen').classList.contains('hidden')
    );
    if (done) break;
    await page.evaluate(() => {
      const card = AppState.studyQueue[AppState.studyIndex];
      if (card) document.getElementById('type-answer').value = card.ro;
    });
    await page.click('#btn-check');
    await page.click('#btn-next');
    // Wait for async session-end chain or next card to settle before re-checking done
    await page.waitForFunction(() => {
      const summary = document.getElementById('session-summary');
      const ready   = document.getElementById('ready-screen');
      const inp     = document.getElementById('type-answer');
      return (summary && summary.style.display === 'flex') ||
        (ready && !ready.classList.contains('hidden')) ||
        (inp && inp.offsetParent !== null && inp.className === 'type-input');
    }, { timeout: 5000 }).catch(() => {});
  }
}

test.describe('Session summary', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await seedCards(page, MINI_DECK);
  });

  test('summary overlay is shown after session when showSummary is enabled', async ({ page }) => {
    await seedSettings(page, { showSummary: true });
    await runSessionAllWrong(page);

    await expect(page.locator('#session-summary')).toBeVisible({ timeout: 5000 });
  });

  test('summary is NOT shown when showSummary is disabled', async ({ page }) => {
    await seedSettings(page, { showSummary: false });
    await runSessionAllWrong(page);

    // Should go back to ready screen instead
    await expect(page.locator('#ready-screen')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('#session-summary')).toBeHidden();
  });

  test('summary shows total card count', async ({ page }) => {
    await seedSettings(page, { showSummary: true });
    await runSessionAllWrong(page);

    await expect(page.locator('#session-summary')).toContainText(String(MINI_DECK.length));
  });

  test('summary shows number of correct answers', async ({ page }) => {
    await seedSettings(page, { showSummary: true });
    await runSessionAllWrong(page);

    await expect(page.locator('#session-summary')).toBeVisible({ timeout: 5000 });
    // Summary must show the stats block with counts
    await expect(page.locator('.summary-stats')).toBeVisible();
  });

  test('summary lists wrong cards in a mistakes section', async ({ page }) => {
    await seedSettings(page, { showSummary: true });
    await runSessionAllWrong(page);

    await expect(page.locator('#session-summary')).toBeVisible({ timeout: 5000 });
    // Mistakes section should show the Romanian words we got wrong
    const summaryText = await page.locator('#session-summary').textContent();
    const hasAnyCardRo = MINI_DECK.some(c => summaryText.includes(c.ro));
    expect(hasAnyCardRo).toBe(true);
  });

  test('all-correct session shows celebratory message in summary', async ({ page }) => {
    await seedSettings(page, { showSummary: true });
    await runSessionAllCorrect(page);

    await expect(page.locator('#session-summary')).toBeVisible({ timeout: 5000 });
    const text = await page.locator('#session-summary').textContent();
    expect(text).toMatch(/все слова без ошибок|отлично|🎉/i);
  });

  test('"Done" button on summary returns to ready screen', async ({ page }) => {
    await seedSettings(page, { showSummary: true });
    await runSessionAllWrong(page);

    await expect(page.locator('#session-summary')).toBeVisible({ timeout: 5000 });
    await page.locator('#session-summary button').click();

    await expect(page.locator('#session-summary')).toBeHidden({ timeout: 5000 });
    await expect(page.locator('#ready-screen')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
  });
});
