const { test, expect } = require('@playwright/test');
const { resetState } = require('../helpers/db');

test.describe('diffHighlightInline (LCS)', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
  });

  function diff(page, input, correct, hardMode = false) {
    return page.evaluate(
      ([i, c, h]) => diffHighlightInline(i, c, h),
      [input, correct, hardMode]
    );
  }

  function greenCount(html) {
    return (html.match(/var\(--green\)/g) || []).length;
  }

  function redCount(html) {
    return (html.match(/var\(--red\)/g) || []).length;
  }

  test('exact match — all chars green', async ({ page }) => {
    const html = await diff(page, 'sunt', 'sunt');
    expect(greenCount(html)).toBe(4);
    expect(redCount(html)).toBe(0);
  });

  test('completely wrong — all chars red', async ({ page }) => {
    const html = await diff(page, 'xxxx', 'sunt');
    expect(greenCount(html)).toBe(0);
    expect(redCount(html)).toBe(4);
  });

  test('missing letter in middle — subsequent correct chars stay green', async ({ page }) => {
    // User typed "snt" (missing 'u') — LCS matches s, n, t → all 3 green, u red
    const html = await diff(page, 'snt', 'sunt');
    expect(greenCount(html)).toBe(3);
    expect(redCount(html)).toBe(1);
  });

  test('wrong letter in middle — only that char red', async ({ page }) => {
    // User typed "sxnt" instead of "sunt" — x doesn't match u
    const html = await diff(page, 'sxnt', 'sunt');
    expect(greenCount(html)).toBe(3);
    expect(redCount(html)).toBe(1);
  });

  test('extra letters in input — output length still matches correct word', async ({ page }) => {
    const html = await diff(page, 'suuunt', 'sunt');
    // Output is always over correct word — 4 chars
    const spans = html.match(/<span/g) || [];
    expect(spans.length).toBe(4);
  });

  test('soft mode — diacritics ignored in matching', async ({ page }) => {
    // User typed without diacritics, correct has them — should match
    const html = await diff(page, 'sunt', 'sûnt', false);
    expect(greenCount(html)).toBe(4);
    expect(redCount(html)).toBe(0);
  });

  test('hard mode — diacritics matter', async ({ page }) => {
    // Same input but hardMode=true — û ≠ u
    const html = await diff(page, 'sunt', 'sûnt', true);
    expect(redCount(html)).toBeGreaterThan(0);
  });

  test('Korean characters — LCS works with multi-byte glyphs', async ({ page }) => {
    // User typed 먹어 (missing 요) — 먹 and 어 should match, 요 red
    const html = await diff(page, '먹어', '먹어요');
    expect(greenCount(html)).toBe(2);
    expect(redCount(html)).toBe(1);
  });

  test('Korean exact match — all green', async ({ page }) => {
    const html = await diff(page, '먹었어요', '먹었어요');
    expect(greenCount(html)).toBe(4);
    expect(redCount(html)).toBe(0);
  });

  test('output always contains "Правильно:" prefix', async ({ page }) => {
    const html = await diff(page, 'abc', 'def');
    expect(html).toContain('Правильно:');
  });
});
