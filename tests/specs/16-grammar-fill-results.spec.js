const { test, expect } = require('@playwright/test');
const { resetState, seedTestPack } = require('../helpers/db');

// Pack with a single fill-in question — one question avoids shuffle ambiguity
const FILL_PACK = {
  type: 'tests',
  name: 'Тест заполни',
  icon: '✏️',
  topics: { t1: 'Артикли' },
  questions: [
    {
      id: 'f1',
      topic: 't1',
      type: 'fill',
      q: 'Неопределённый артикль ж.р.: ___ carte',
      answer: 'o',
      explain: 'Неопределённый артикль ж.р. — o',
    },
  ],
};

test.describe('Grammar — Fill-in questions', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await page.evaluate(() => showPage('grammar'));
    // Wait for renderGrammarTestsHome() to finish BEFORE seeding — same pattern as 08-grammar.
    // The container is CSS-visible immediately on tab click, but the async render
    // (gtGetPacks + gtGetAllProgress + innerHTML) can overwrite startGrammarTest output
    // if we let it race. Waiting for empty-state text confirms the render completed.
    await page.click('#gr-tab-tests');
    await expect(page.locator('#grammar-tests-container')).toContainText(
      /нет|импортируйте|загрузите/i, { timeout: 5000 }
    );
    // Now seed and start atomically — no stale render pending
    await seedTestPack(page, FILL_PACK);
    await page.evaluate(async () => {
      const packs = await gtGetPacks();
      if (packs[0]) await startGrammarTest(null, packs[0].id);
    });
    await expect(page.locator('#gt-fill-input')).toBeVisible({ timeout: 5000 });
  });

  test('fill-in question shows text input and check button', async ({ page }) => {
    await expect(page.locator('#gt-fill-input')).toBeVisible();
    await expect(page.locator('#gt-check-btn')).toBeVisible();
  });

  test('correct fill answer marks input as correct', async ({ page }) => {
    await page.evaluate(() => {
      document.getElementById('gt-fill-input').value = 'o';
      checkGTFill();
    });
    await expect(page.locator('#gt-fill-input')).toHaveClass(/correct/);
  });

  test('wrong fill answer marks input as wrong', async ({ page }) => {
    await page.evaluate(() => {
      document.getElementById('gt-fill-input').value = 'un';
      checkGTFill();
    });
    await expect(page.locator('#gt-fill-input')).toHaveClass(/wrong/);
  });

  test('fill input becomes readonly after answering', async ({ page }) => {
    await page.evaluate(() => {
      document.getElementById('gt-fill-input').value = 'o';
      checkGTFill();
    });
    await expect(page.locator('#gt-fill-input')).toHaveAttribute('readonly', '');
  });

  test('explanation text appears after answering', async ({ page }) => {
    await page.evaluate(() => {
      document.getElementById('gt-fill-input').value = 'o';
      checkGTFill();
    });
    await expect(page.locator('#gt-explain')).toContainText(/.+/, { timeout: 3000 });
  });

  test('next question button appears after answering', async ({ page }) => {
    await page.evaluate(() => {
      document.getElementById('gt-fill-input').value = 'o';
      checkGTFill();
    });
    await expect(page.locator('#gt-next-btn')).toBeVisible({ timeout: 3000 });
  });

  test('answering via Enter key works same as clicking check', async ({ page }) => {
    await page.fill('#gt-fill-input', 'o');
    await page.press('#gt-fill-input', 'Enter');
    await expect(page.locator('#gt-fill-input')).toHaveClass(/correct|wrong/);
  });
});

test.describe('Grammar — Test results screen', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await page.evaluate(() => showPage('grammar'));
    await page.click('#gr-tab-tests');
    await expect(page.locator('#grammar-tests-container')).toContainText(
      /нет|импортируйте|загрузите/i, { timeout: 5000 }
    );
    await seedTestPack(page, FILL_PACK);
    await page.evaluate(async () => {
      const packs = await gtGetPacks();
      if (packs[0]) await startGrammarTest(null, packs[0].id);
    });
    await expect(page.locator('#gt-fill-input')).toBeVisible({ timeout: 5000 });
  });

  async function completeAllFillQuestions(page, answer = 'o') {
    for (let i = 0; i < 10; i++) {
      // Check if results already shown
      if (await page.evaluate(() => !!document.querySelector('.gt-results'))) break;

      // Only act if there's an unanswered fill input
      const ready = await page.evaluate(() => {
        const inp = document.getElementById('gt-fill-input');
        return inp && !inp.readOnly && GTS.index < GTS.queue.length;
      });
      if (!ready) {
        // Wait for results or a fresh input
        await page.waitForFunction(() =>
          !!document.querySelector('.gt-results') ||
          (document.getElementById('gt-fill-input') && !document.getElementById('gt-fill-input').readOnly),
          { timeout: 5000 }
        ).catch(() => {});
        continue;
      }

      // Fill and check atomically
      await page.evaluate((ans) => {
        const inp = document.getElementById('gt-fill-input');
        if (inp && !inp.readOnly) { inp.value = ans; checkGTFill(); }
      }, answer);

      // Wait for next button to become visible (showGTResult adds .visible)
      await page.waitForFunction(() => {
        const btn = document.getElementById('gt-next-btn');
        return btn && btn.classList.contains('visible');
      }, { timeout: 5000 });

      // Click next atomically
      await page.evaluate(() => {
        const btn = document.getElementById('gt-next-btn');
        if (btn) btn.click();
      });

      // Wait for results or fresh question
      await page.waitForFunction(() =>
        !!document.querySelector('.gt-results') ||
        (document.getElementById('gt-fill-input') && !document.getElementById('gt-fill-input').readOnly),
        { timeout: 8000 }
      ).catch(() => {});
    }
  }

  test('completing all questions shows results screen', async ({ page }) => {
    await completeAllFillQuestions(page, 'o');
    await expect(page.locator('.gt-results')).toBeVisible({ timeout: 5000 });
  });

  test('results screen shows correct count and total', async ({ page }) => {
    await completeAllFillQuestions(page, 'o'); // both answers are 'o' for q1, wrong for q2
    await expect(page.locator('.gt-results-score-big')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('.gt-results-score-big')).toContainText(/\d/);
  });

  test('results screen shows a grade (A/B/C/D)', async ({ page }) => {
    await completeAllFillQuestions(page, 'o');
    await expect(page.locator('.gt-results-grade')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('.gt-results-grade')).toContainText(/A|B\+?|C|D/);
  });

  test('results screen has "retry" and "choose topic" buttons', async ({ page }) => {
    await completeAllFillQuestions(page, 'o');
    await expect(page.locator('.gt-results-btn-primary')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('.gt-results-btn-secondary').first()).toBeVisible({ timeout: 5000 });
  });

  test('"choose topic" button returns to test home', async ({ page }) => {
    await completeAllFillQuestions(page, 'o');
    await page.locator('.gt-results-btn-secondary', { hasText: /Выбрать тему/i }).click();
    await expect(page.locator('#grammar-tests-container')).toContainText(/Тест заполни/, { timeout: 5000 });
  });
});
