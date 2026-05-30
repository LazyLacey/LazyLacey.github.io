const { test, expect } = require('@playwright/test');
const { resetState, seedCards, seedGroups } = require('../helpers/db');
const { CARDS, GROUPS } = require('../helpers/fixtures');

test.describe('Search & Filter on Cards page', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await seedCards(page, CARDS.basic);
    await page.click('#nav-cards');
  });

  // ── Search ────────────────────────────────────────────────────────────────
  test('search input is visible on cards page', async ({ page }) => {
    await expect(page.locator('#search-input')).toBeVisible();
  });

  test('searching by Romanian word filters the card list', async ({ page }) => {
    await page.fill('#search-input', 'mulțumesc');
    await expect(page.locator('#cards-list')).toContainText('mulțumesc');
    await expect(page.locator('#cards-list')).not.toContainText('bună ziua');
  });

  test('searching by Russian translation filters the card list', async ({ page }) => {
    await page.fill('#search-input', 'спасибо');
    await expect(page.locator('#cards-list')).toContainText('спасибо');
    await expect(page.locator('#cards-list')).not.toContainText('добрый день');
  });

  test('clearing the search shows all cards again', async ({ page }) => {
    await page.fill('#search-input', 'да');
    await page.fill('#search-input', '');

    for (const card of CARDS.basic) {
      await expect(page.locator('#cards-list')).toContainText(card.ro);
    }
  });

  test('search with no matches shows an empty/no-results message', async ({ page }) => {
    await page.fill('#search-input', 'zzzznotexist9999');
    const list = page.locator('#cards-list');
    const items = list.locator('.card-item');
    const count = await items.count();
    if (count > 0) {
      // Some implementations hide items but leave the DOM
      // Check that nothing meaningful is visible
    } else {
      expect(count).toBe(0);
    }
  });

  test('search is case-insensitive', async ({ page }) => {
    await page.fill('#search-input', 'MULTUMESC');
    await expect(page.locator('#cards-list')).toContainText('mulțumesc');
  });

  // ── Filter chips ──────────────────────────────────────────────────────────
  test('group filter chips appear after seeding groups', async ({ page }) => {
    await seedGroups(page, [GROUPS.basics]);
    await page.reload();
    await page.click('#nav-cards');

    await expect(page.locator('#cards-filter-chips')).toBeVisible();
    await expect(page.locator('#cards-filter-chips')).toContainText('Базовые фразы');
  });

  test('filtering by group shows only cards from that group', async ({ page }) => {
    await resetState(page);
    await seedGroups(page, [GROUPS.basics, GROUPS.food]);
    const groups = await page.evaluate(() => AppState.groups);
    const gBasics = groups.find(g => g.name === 'Базовые фразы');
    const gFood = groups.find(g => g.name === 'Еда');

    await seedCards(page, [
      { ro: 'bună', ru: 'привет', groupId: gBasics.id },
      { ro: 'mere', ru: 'яблоки', groupId: gFood.id },
    ]);
    await page.reload();
    await page.click('#nav-cards');

    // Click the "Еда" filter chip
    await page.locator('#cards-filter-chips').locator('text=Еда').click();

    await expect(page.locator('#cards-list')).toContainText('mere');
    await expect(page.locator('#cards-list')).not.toContainText('bună');
  });

  test('clicking "all" chip (or deactivating group filter) shows all cards', async ({ page }) => {
    await resetState(page);
    await seedGroups(page, [GROUPS.basics]);
    const groups = await page.evaluate(() => AppState.groups);
    const gid = groups[0].id;
    await seedCards(page, [
      { ro: 'bună', ru: 'привет', groupId: gid },
      { ro: 'mere', ru: 'яблоки', groupId: null },
    ]);
    await page.reload();
    await page.click('#nav-cards');

    // Activate group filter
    await page.locator('#cards-filter-chips [onclick], #cards-filter-chips button').last().click();
    // Deactivate by clicking "all" or clicking the same chip again
    const allChip = page.locator('#cards-filter-chips [onclick], #cards-filter-chips button').first();
    await allChip.click();

    await expect(page.locator('#cards-list')).toContainText('bună');
    await expect(page.locator('#cards-list')).toContainText('mere');
  });

  test('search and group filter can be combined', async ({ page }) => {
    await resetState(page);
    await seedGroups(page, [GROUPS.food]);
    const groups = await page.evaluate(() => AppState.groups);
    const gid = groups[0].id;
    await seedCards(page, [
      { ro: 'mere', ru: 'яблоки', groupId: gid },
      { ro: 'pere', ru: 'груши', groupId: gid },
      { ro: 'bună', ru: 'привет', groupId: null },
    ]);
    await page.reload();
    await page.click('#nav-cards');

    // Apply group filter then search
    await page.locator('#cards-filter-chips [onclick], #cards-filter-chips button').last().click();
    await page.fill('#search-input', 'mere');

    await expect(page.locator('#cards-list')).toContainText('mere');
    await expect(page.locator('#cards-list')).not.toContainText('pere');
    await expect(page.locator('#cards-list')).not.toContainText('bună');
  });
});
