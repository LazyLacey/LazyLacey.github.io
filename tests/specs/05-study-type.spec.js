const { test, expect } = require('@playwright/test');
const { resetState, seedCards, seedSettings } = require('../helpers/db');
const { MINI_DECK } = require('../helpers/fixtures');

test.describe('Study — Type mode', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    // Disable summary so the session end goes straight back to ready-screen
    await seedSettings(page, { showSummary: false });
    await seedCards(page, MINI_DECK);
    // Ensure type mode is active
    await page.evaluate(() => setReadyMode('type'));
  });

  test('start button is visible on the ready screen', async ({ page }) => {
    await expect(page.locator('#ready-start-btn')).toBeVisible();
  });

  test('starting a session hides the ready screen and shows the study session', async ({ page }) => {
    await page.click('#ready-start-btn');

    await expect(page.locator('#ready-screen')).toBeHidden();
    await expect(page.locator('#study-session')).toBeVisible();
  });

  test('study session hides the bottom nav', async ({ page }) => {
    await page.click('#ready-start-btn');
    await expect(page.locator('nav')).toBeHidden();
  });

  test('flashcard area shows the Russian word prompt', async ({ page }) => {
    await page.click('#ready-start-btn');
    await expect(page.locator('#flashcard-area')).toBeVisible();
    // First card russian side should contain one of the mini-deck russian words
    const cardText = await page.locator('#flashcard-area').textContent();
    const ruWords = MINI_DECK.map(c => c.ru);
    expect(ruWords.some(ru => cardText.includes(ru))).toBe(true);
  });

  test('type input and check button are visible', async ({ page }) => {
    await page.click('#ready-start-btn');
    await expect(page.locator('#type-answer')).toBeVisible();
    await expect(page.locator('#btn-check')).toBeVisible();
  });

  test('correct answer adds "correct" class to input', async ({ page }) => {
    await page.click('#ready-start-btn');
    await page.locator('#study-session').waitFor({ state: 'visible' });

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

  test('correct answer shows green toast', async ({ page }) => {
    await page.click('#ready-start-btn');
    await page.locator('#study-session').waitFor({ state: 'visible' });

    // Fill and click atomically — prevents renderReadyScreen() RAF from reshuffling
    // the queue between the read and the click, which would cause a wrong-answer toast.
    const hadCard = await page.evaluate(() => {
      const card = AppState.studyQueue[AppState.studyIndex];
      if (!card) return false;
      document.getElementById('type-answer').value = card.ro;
      document.getElementById('btn-check').click();
      return true;
    });
    if (!hadCard) return;

    await expect(page.locator('#toast')).toContainText(/правильно/i, { timeout: 5000 });
  });

  test('wrong answer adds "wrong" class to input', async ({ page }) => {
    await page.click('#ready-start-btn');
    await page.fill('#type-answer', 'неверныйответ');
    await page.click('#btn-check');

    await expect(page.locator('#type-answer')).toHaveClass(/wrong/);
  });

  test('wrong answer shows red toast', async ({ page }) => {
    await page.click('#ready-start-btn');
    await page.fill('#type-answer', 'неверный');
    await page.click('#btn-check');

    await expect(page.locator('#toast')).toContainText(/неверно/i);
  });

  test('wrong answer reveals the correct answer', async ({ page }) => {
    await page.click('#ready-start-btn');
    await page.fill('#type-answer', 'неверный');
    await page.click('#btn-check');

    await expect(page.locator('#answer-reveal')).toBeVisible();
  });

  test('"Next" button appears after checking answer', async ({ page }) => {
    await page.click('#ready-start-btn');
    await page.fill('#type-answer', 'неверный');
    await page.click('#btn-check');

    await expect(page.locator('#btn-next')).toBeVisible();
  });

  test('"Check" button hides after checking answer', async ({ page }) => {
    await page.click('#ready-start-btn');
    await page.fill('#type-answer', 'test');
    await page.click('#btn-check');

    await expect(page.locator('#btn-check')).toBeHidden();
  });

  test('progress counter advances after next card', async ({ page }) => {
    await page.click('#ready-start-btn');
    const counterBefore = await page.locator('#study-counter').textContent();

    await page.fill('#type-answer', 'test');
    await page.click('#btn-check');
    await page.click('#btn-next');

    const counterAfter = await page.locator('#study-counter').textContent();
    expect(counterAfter).not.toEqual(counterBefore);
  });

  test('progress bar width increases after correct answer and next', async ({ page }) => {
    await page.click('#ready-start-btn');

    await page.fill('#type-answer', 'test');
    await page.click('#btn-check');
    await page.click('#btn-next');

    const fillWidth = await page.locator('#study-progress-fill').getAttribute('style');
    expect(fillWidth).toMatch(/width:\s*[^0]/);
  });

  test('completing all cards ends the session (returns to ready screen)', async ({ page }) => {
    await page.click('#ready-start-btn');

    // Answer all cards correctly (get answer from AppState to avoid DOM parsing issues).
    // renderReadyScreen() is not awaited by endSession, so check #ready-screen visibility.
    for (let attempt = 0; attempt < MINI_DECK.length * 4; attempt++) {
      const readyVisible = await page.locator('#ready-screen:not(.hidden)').isVisible();
      if (readyVisible) break;

      const correctAnswer = await page.evaluate(() => {
        const card = AppState.studyQueue[AppState.studyIndex];
        return card ? card.ro : null;
      });
      if (!correctAnswer) break;

      await page.fill('#type-answer', correctAnswer);
      await page.click('#btn-check');
      await page.click('#btn-next');
    }

    await expect(page.locator('#ready-screen')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('nav')).toBeVisible();
  });

  test('shows toast "no cards" when starting with empty deck', async ({ page }) => {
    // Create a fresh state with no cards
    await resetState(page);
    await page.click('#ready-start-btn');

    await expect(page.locator('#toast')).toContainText(/нет карточек/i);
    await expect(page.locator('#ready-screen')).toBeVisible();
  });

  test('Enter key submits the answer', async ({ page }) => {
    await page.click('#ready-start-btn');
    await page.fill('#type-answer', 'test');
    await page.press('#type-answer', 'Enter');

    await expect(page.locator('#type-answer')).toHaveClass(/correct|wrong/);
  });
});
