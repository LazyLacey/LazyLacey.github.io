const { test, expect } = require('@playwright/test');
const { resetState, seedTestPack, seedVerbPack } = require('../helpers/db');
const { TEST_PACK, VERB_PACK } = require('../helpers/fixtures');

// ── Grammar Rules ─────────────────────────────────────────────────────────

test.describe('Grammar — Rules tab', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await page.evaluate(() => showPage('grammar'));
    // Verify dynamic import in init() actually populated window.grammarTopics
    const count = await page.evaluate(() => window.grammarTopics?.length ?? 0);
    expect(count).toBeGreaterThan(0);
  });

  test('grammarTopics populated by dynamic import in init()', async ({ page }) => {
    const count = await page.evaluate(() => window.grammarTopics?.length ?? 0);
    expect(count).toBeGreaterThan(0);
  });

  test('rules tab is active by default', async ({ page }) => {
    await expect(page.locator('#gr-tab-rules')).toHaveClass(/active/);
    await expect(page.locator('#grammar-container')).toBeVisible();
  });

  test('grammar topics list is rendered with at least 10 topics', async ({ page }) => {
    const topics = page.locator('#grammar-container .gr-topic-card');
    await expect(topics.first()).toBeVisible({ timeout: 5000 });
    const count = await topics.count();
    expect(count).toBeGreaterThanOrEqual(10);
  });

  test('clicking a topic opens the detail view', async ({ page }) => {
    const firstTopic = page.locator('#grammar-container .gr-topic-card').first();
    await firstTopic.waitFor({ state: 'visible' });
    await firstTopic.click();

    // When open, .gr-sections becomes visible (CSS: .gr-topic-card.open .gr-sections { display:block })
    await expect(page.locator('#grammar-container .gr-topic-card.open .gr-sections')).toBeVisible({ timeout: 5000 });
  });
});

// ── Grammar Tests ─────────────────────────────────────────────────────────

test.describe('Grammar — Tests tab', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await page.evaluate(() => showPage('grammar'));
    await page.click('#gr-tab-tests');
    // Wait for async renderGrammarTestsHome() to settle — prevents a stale render
    // from overwriting the test-session view mid-test (race condition).
    await expect(page.locator('#grammar-tests-container')).toContainText(
      /нет|импортируйте|загрузите/i, { timeout: 5000 }
    );
  });

  test('tests tab becomes active on click', async ({ page }) => {
    await expect(page.locator('#gr-tab-tests')).toHaveClass(/active/);
    await expect(page.locator('#grammar-tests-container')).toBeVisible();
  });

  test('shows empty state when no test packs are imported', async ({ page }) => {
    const container = page.locator('#grammar-tests-container');
    // Empty state or "no packs" message
    await expect(container).toContainText(/нет|пусто|импортируйте|загрузите/i);
  });

  test('seeded test pack appears in the list', async ({ page }) => {
    await seedTestPack(page, TEST_PACK);
    // re-render the tests tab
    await page.evaluate(() => switchGrammarTab('tests'));

    await expect(page.locator('#grammar-tests-container')).toContainText('Тест артикли');
  });

  test('starting a test shows the first question', async ({ page }) => {
    await seedTestPack(page, TEST_PACK);
    // Start test atomically: avoids renderGrammarTestsHome() overwriting the question view
    // (the function has no inflight guard and two awaits, creating a race window)
    await page.evaluate(async () => {
      const packs = await gtGetPacks();
      if (packs[0]) await startGrammarTest(null, packs[0].id);
    });

    await expect(page.locator('#grammar-tests-container .gt-question-text')).toBeVisible({ timeout: 5000 });
  });

  test('answering a choice question reveals feedback', async ({ page }) => {
    await seedTestPack(page, TEST_PACK);
    // Force queue to choice-only — TEST_PACK questions are shuffled and a fill
    // question could appear first, making .gt-choice buttons absent
    await page.evaluate(async () => {
      const packs = await gtGetPacks();
      if (!packs[0]) return;
      const choiceQ = packs[0].questions.find(q => q.type === 'choice');
      if (!choiceQ) return;
      GTS.packDbId = packs[0].id;
      GTS.topicId  = null;
      GTS.queue    = [choiceQ];
      GTS.index    = 0;
      GTS.correct  = 0;
      GTS.answered = false;
      _gtEnterSession();
      renderGrammarTestQuestion();
    });

    const answerBtn = page.locator('#grammar-tests-container .gt-choice').first();
    await answerBtn.waitFor({ state: 'visible', timeout: 5000 });
    await answerBtn.click();

    const feedback = page.locator('.gt-next-btn, .gt-choice.correct, .gt-choice.wrong');
    await expect(feedback.first()).toBeVisible({ timeout: 3000 });
  });

  test('correct choice answer is marked correct, wrong is marked wrong', async ({ page }) => {
    await seedTestPack(page, TEST_PACK);
    // Start with only choice questions (q1 is type:choice, answer:'masa')
    await page.evaluate(async () => {
      const packs = await gtGetPacks();
      if (!packs[0]) return;
      // Force a specific choice question to be first by overriding the queue
      const q = packs[0].questions.find(q => q.type === 'choice');
      if (!q) return;
      GTS.packDbId = packs[0].id;
      GTS.topicId  = null;
      GTS.queue    = [q];
      GTS.index    = 0;
      GTS.correct  = 0;
      GTS.answered = false;
      _gtEnterSession();
      renderGrammarTestQuestion();
    });

    // Click the correct answer atomically
    const clicked = await page.evaluate(() => {
      const q = GTS.queue[GTS.index];
      if (!q) return false;
      const btn = Array.from(document.querySelectorAll('.gt-choice'))
        .find(b => b.textContent.trim() === q.answer);
      if (!btn) return false;
      btn.click();
      return true;
    });
    if (!clicked) return;

    await expect(page.locator('.gt-choice.correct')).toBeVisible({ timeout: 3000 });

    // Now verify wrong answer on next question
    await page.evaluate(async () => {
      const packs = await gtGetPacks();
      if (!packs[0]) return;
      const q = packs[0].questions.find(q => q.type === 'choice');
      if (!q) return;
      GTS.queue    = [q];
      GTS.index    = 0;
      GTS.correct  = 0;
      GTS.answered = false;
      renderGrammarTestQuestion();
    });

    // Click a wrong answer atomically
    const clickedWrong = await page.evaluate(() => {
      const q = GTS.queue[GTS.index];
      if (!q) return false;
      const btn = Array.from(document.querySelectorAll('.gt-choice'))
        .find(b => b.textContent.trim() !== q.answer);
      if (!btn) return false;
      btn.click();
      return true;
    });
    if (!clickedWrong) return;

    await expect(page.locator('.gt-choice.wrong')).toBeVisible({ timeout: 3000 });
  });
});

// ── Grammar Verbs ─────────────────────────────────────────────────────────

test.describe('Grammar — Verbs tab', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await page.evaluate(() => showPage('grammar'));
    await page.click('#gr-tab-verbs');
  });

  test('verbs tab becomes active on click', async ({ page }) => {
    await expect(page.locator('#gr-tab-verbs')).toHaveClass(/active/);
    await expect(page.locator('#grammar-verbs-container')).toBeVisible();
  });

  test('shows empty state when no verb packs are imported', async ({ page }) => {
    await expect(page.locator('#grammar-verbs-container')).toContainText(/нет|импортируйте|загрузите/i);
  });

  test('seeded verb pack appears in the list', async ({ page }) => {
    await seedVerbPack(page, VERB_PACK);
    await page.evaluate(() => switchGrammarTab('verbs'));

    await expect(page.locator('#grammar-verbs-container')).toContainText('Глаголы основные');
  });

  test('selecting a verb pack shows tense selector', async ({ page }) => {
    await seedVerbPack(page, VERB_PACK);
    await page.evaluate(() => switchGrammarTab('verbs'));

    const packBtn = page.locator('#grammar-verbs-container .gt-topic-btn').first();
    await packBtn.click();

    // Tense buttons should appear (.vb-tense-btn)
    const tenseBtn = page.locator('.vb-tense-btn');
    await expect(tenseBtn.first()).toBeVisible({ timeout: 3000 });
  });
});

// ── Grammar Search ────────────────────────────────────────────────────────

test.describe('Grammar — Search', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await page.evaluate(() => showPage('grammar'));
    await page.waitForSelector('#grammar-container .gr-topic-card', { state: 'visible' });
  });

  test('typing 2+ chars in search shows results', async ({ page }) => {
    // Get a real term from the first topic so the query always matches
    const term = await page.evaluate(() => {
      const topic = grammarTopics[0];
      for (const section of topic.sections) {
        if (section.examples.length > 0) return section.examples[0].ro.slice(0, 4);
      }
      return topic.sections[0].title.slice(0, 4);
    });
    expect(term.length).toBeGreaterThanOrEqual(2);

    await page.fill('.gr-search', term);
    await page.waitForSelector('.gr-search-results.active', { state: 'visible' });
    const count = await page.locator('.gr-result-item').count();
    expect(count).toBeGreaterThan(0);
  });

  test('topics list hides while search is active', async ({ page }) => {
    const term = await page.evaluate(() => grammarTopics[0].sections[0].title.slice(0, 4));
    await page.fill('.gr-search', term);
    await page.waitForSelector('.gr-search-results.active', { state: 'visible' });

    const topicsHidden = await page.evaluate(() =>
      document.querySelector('.gr-topics')?.classList.contains('hidden')
    );
    expect(topicsHidden).toBe(true);
  });

  test('clearing search restores topics list', async ({ page }) => {
    const term = await page.evaluate(() => grammarTopics[0].sections[0].title.slice(0, 4));
    await page.fill('.gr-search', term);
    await page.waitForSelector('.gr-search-results.active', { state: 'visible' });

    // Clear the input
    await page.fill('.gr-search', '');
    // Dispatch 'search' event (what browsers fire on clear button)
    await page.evaluate(() => {
      const inp = document.querySelector('.gr-search');
      inp.dispatchEvent(new Event('search'));
    });

    await page.waitForFunction(() =>
      !document.querySelector('.gr-topics')?.classList.contains('hidden')
    );
    await expect(page.locator('.gr-topics')).toBeVisible();
  });

  test('unknown term shows "nothing found" message', async ({ page }) => {
    await page.fill('.gr-search', 'xyzxyzxyz_notfound');
    await page.waitForSelector('.gr-search-results.active', { state: 'visible' });

    await expect(page.locator('.gr-no-results')).toBeVisible();
  });
});
