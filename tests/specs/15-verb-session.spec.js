const { test, expect } = require('@playwright/test');
const { resetState, seedVerbPack } = require('../helpers/db');
const { VERB_PACK } = require('../helpers/fixtures');

test.describe('Verb conjugation session', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await seedVerbPack(page, VERB_PACK);
    await page.evaluate(() => showPage('grammar'));
    // Activate verbs tab so #grammar-verbs-container becomes visible
    await page.click('#gr-tab-verbs');
    await expect(page.locator('#grammar-verbs-container')).toBeVisible({ timeout: 3000 });
    // Start verb session atomically to avoid renderVerbsHome() race
    await page.evaluate(async () => {
      const packs = await vdbGetAll('verbPacks');
      if (packs[0]) await startVerbSession(packs[0].id, packs[0].verbs[0].id);
    });
    await expect(page.locator('#vb-answer')).toBeVisible({ timeout: 5000 });
  });

  test('verb session shows pronoun question and answer input', async ({ page }) => {
    await expect(page.locator('#vb-card-area .card-question')).toBeVisible();
    await expect(page.locator('#vb-answer')).toBeVisible();
    await expect(page.locator('#vb-check-btn')).toBeVisible();
  });

  test('correct verb form gets correct class on input', async ({ page }) => {
    await page.evaluate(() => {
      const q = VTS.queue[VTS.index];
      document.getElementById('vb-answer').value = q.answer;
      document.getElementById('vb-check-btn').click();
    });
    await expect(page.locator('#vb-answer')).toHaveClass(/correct/);
  });

  test('wrong verb form gets wrong class and shows reveal', async ({ page }) => {
    await page.evaluate(() => {
      document.getElementById('vb-answer').value = 'xxxxxxx';
      document.getElementById('vb-check-btn').click();
    });
    await expect(page.locator('#vb-answer')).toHaveClass(/wrong/);
    await expect(page.locator('#vb-reveal')).toBeVisible();
  });

  test('correct answer shows green toast', async ({ page }) => {
    await page.evaluate(() => {
      const q = VTS.queue[VTS.index];
      document.getElementById('vb-answer').value = q.answer;
      document.getElementById('vb-check-btn').click();
    });
    await expect(page.locator('#toast')).toContainText(/правильно/i, { timeout: 3000 });
  });

  test('next button appears after answering and advances to next pronoun', async ({ page }) => {
    await page.evaluate(() => {
      document.getElementById('vb-answer').value = 'xxxxxxx';
      document.getElementById('vb-check-btn').click();
    });
    const nextBtn = page.locator('#vb-next-btn');
    await expect(nextBtn).toBeVisible({ timeout: 6000 });

    const indexBefore = await page.evaluate(() => VTS.index);
    await nextBtn.click();
    const indexAfter = await page.evaluate(() => VTS.index);
    expect(indexAfter).toBe(indexBefore + 1);
  });

  test('tense tabs allow switching to a different tense', async ({ page }) => {
    const tenseBtns = page.locator('.vb-tense-btn');
    await expect(tenseBtns.first()).toBeVisible();

    // Click the second tense tab (trecut)
    await tenseBtns.nth(1).click();
    const newTense = await page.evaluate(() => VTS.tense);
    expect(newTense).not.toBe('prezent');
  });

  test('completing all pronoun forms shows results screen', async ({ page }) => {
    // Answer all 6 forms correctly
    for (let i = 0; i < 6; i++) {
      await page.evaluate(() => {
        const q = VTS.queue[VTS.index];
        document.getElementById('vb-answer').value = q.answer;
        document.getElementById('vb-check-btn').click();
      });
      const nextBtn = page.locator('#vb-next-btn');
      await expect(nextBtn).toBeVisible({ timeout: 6000 });
      await nextBtn.click();
      // Wait for either next question or results
      await page.waitForFunction(() => {
        const ans = document.getElementById('vb-answer');
        const results = document.querySelector('.gt-results');
        return (ans && ans.value === '') || !!results;
      }, { timeout: 3000 }).catch(() => {});
      const done = await page.evaluate(() => !!document.querySelector('.gt-results'));
      if (done) break;
    }
    await expect(page.locator('.gt-results')).toBeVisible({ timeout: 5000 });
  });

  test('results screen shows score and grade', async ({ page }) => {
    // Answer all correctly
    for (let i = 0; i < 6; i++) {
      await page.evaluate(() => {
        const q = VTS.queue[VTS.index];
        document.getElementById('vb-answer').value = q.answer;
        document.getElementById('vb-check-btn').click();
      });
      await page.waitForSelector('#vb-next-btn', { state: 'visible' });
      await page.click('#vb-next-btn');
      await page.waitForSelector('#vb-answer, .gt-results', { state: 'visible' });
      if (await page.evaluate(() => !!document.querySelector('.gt-results'))) break;
    }
    const results = page.locator('.gt-results');
    await expect(results).toBeVisible({ timeout: 5000 });
    await expect(results).toContainText(/A|B|C|D/); // grade
    await expect(results).toContainText(/6/);        // total forms
  });
});
