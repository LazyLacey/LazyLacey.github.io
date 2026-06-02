const { test, expect } = require('@playwright/test');
const { resetState } = require('../helpers/db');

// ── srsNextReview ─────────────────────────────────────────────────────────

test.describe('SRS — srsNextReview', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
  });

  test('new card + correct → level 1, interval 1, EF 2.6', async ({ page }) => {
    const r = await page.evaluate(() => srsNextReview({}, true));
    expect(r.srsLevel).toBe(1);
    expect(r.srsInterval).toBe(1);
    expect(r.srsEf).toBe(2.6);
    expect(r.nextReview).toBeGreaterThan(Date.now());
  });

  test('level 1 + correct → level 2, interval 6', async ({ page }) => {
    const r = await page.evaluate(() =>
      srsNextReview({ srsLevel: 1, srsEf: 2.5, srsInterval: 1 }, true)
    );
    expect(r.srsLevel).toBe(2);
    expect(r.srsInterval).toBe(6);
    expect(r.srsEf).toBe(2.6);
  });

  test('level 2 + correct → level 3, interval = round(prev * newEf)', async ({ page }) => {
    const r = await page.evaluate(() =>
      srsNextReview({ srsLevel: 2, srsEf: 2.5, srsInterval: 6 }, true)
    );
    expect(r.srsLevel).toBe(3);
    expect(r.srsInterval).toBe(16); // Math.round(6 * 2.6)
    expect(r.srsEf).toBe(2.6);
  });

  test('interval grows with each correct answer at higher levels', async ({ page }) => {
    const r = await page.evaluate(() =>
      srsNextReview({ srsLevel: 5, srsEf: 2.5, srsInterval: 60 }, true)
    );
    expect(r.srsInterval).toBeGreaterThan(60);
  });

  test('wrong answer (no similarity) → level 0, interval 1, EF drops 0.2', async ({ page }) => {
    const r = await page.evaluate(() =>
      srsNextReview({ srsLevel: 3, srsEf: 2.5, srsInterval: 16 }, false)
    );
    expect(r.srsLevel).toBe(0);
    expect(r.srsInterval).toBe(1);
    expect(r.srsEf).toBe(2.3);
  });

  test('wrong with similarity ≥ 0.8 → level -1, interval × 0.6, EF drops 0.05', async ({ page }) => {
    const r = await page.evaluate(() =>
      srsNextReview({ srsLevel: 3, srsEf: 2.5, srsInterval: 16 }, false, 0.85)
    );
    expect(r.srsLevel).toBe(2);
    expect(r.srsInterval).toBe(10); // Math.round(16 * 0.6)
    expect(r.srsEf).toBe(2.45);
  });

  test('wrong with similarity ≥ 0.5 → level -2, interval × 0.3, EF drops 0.15', async ({ page }) => {
    const r = await page.evaluate(() =>
      srsNextReview({ srsLevel: 3, srsEf: 2.5, srsInterval: 16 }, false, 0.6)
    );
    expect(r.srsLevel).toBe(1);
    expect(r.srsInterval).toBe(5); // Math.round(16 * 0.3)
    expect(r.srsEf).toBe(2.35);
  });

  test('EF floor: never drops below 1.3', async ({ page }) => {
    const r = await page.evaluate(() =>
      srsNextReview({ srsLevel: 0, srsEf: 1.3, srsInterval: 1 }, false)
    );
    expect(r.srsEf).toBe(1.3);
  });

  test('EF ceiling: never exceeds 3.5', async ({ page }) => {
    const r = await page.evaluate(() =>
      srsNextReview({ srsLevel: 2, srsEf: 3.49, srsInterval: 6 }, true)
    );
    expect(r.srsEf).toBe(3.5);
  });

  test('nextReview is at least interval days in the future', async ({ page }) => {
    const r = await page.evaluate(() =>
      srsNextReview({ srsLevel: 2, srsEf: 2.5, srsInterval: 6 }, true)
    );
    const expectedMin = Date.now() + 6 * 86400000; // 6 days
    expect(r.nextReview).toBeGreaterThanOrEqual(expectedMin - 1000);
  });
});

// ── isSrsOverdue ──────────────────────────────────────────────────────────

test.describe('SRS — isSrsOverdue', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
  });

  test('card with no cardStats entry is overdue (new card)', async ({ page }) => {
    const result = await page.evaluate(() => {
      AppState.cardStats = new Map();
      return isSrsOverdue({ id: 999 });
    });
    expect(result).toBe(true);
  });

  test('card with cardStats but no nextReview is overdue', async ({ page }) => {
    const result = await page.evaluate(() => {
      AppState.cardStats = new Map([[999, { srsLevel: 0 }]]);
      return isSrsOverdue({ id: 999 });
    });
    expect(result).toBe(true);
  });

  test('card with future nextReview is NOT overdue', async ({ page }) => {
    const result = await page.evaluate(() => {
      AppState.cardStats = new Map([[999, { nextReview: Date.now() + 86400000 * 30 }]]);
      return isSrsOverdue({ id: 999 });
    });
    expect(result).toBe(false);
  });

  test('card with past nextReview is overdue', async ({ page }) => {
    const result = await page.evaluate(() => {
      AppState.cardStats = new Map([[999, { nextReview: Date.now() - 1000 }]]);
      return isSrsOverdue({ id: 999 });
    });
    expect(result).toBe(true);
  });

  test('card with nextReview = now is overdue', async ({ page }) => {
    const result = await page.evaluate(() => {
      AppState.cardStats = new Map([[999, { nextReview: Date.now() }]]);
      return isSrsOverdue({ id: 999 });
    });
    expect(result).toBe(true);
  });
});
