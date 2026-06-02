const { test, expect } = require('@playwright/test');
const { resetState } = require('../helpers/db');

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
  });

  const tabs = [
    { id: 'nav-study',    page: 'page-study',    label: 'Study' },
    { id: 'nav-cards',    page: 'page-cards',    label: 'Cards' },
    { id: 'nav-grammar',  page: 'page-grammar',  label: 'Grammar' },
    { id: 'nav-stats',    page: 'page-stats',    label: 'Stats' },
    { id: 'nav-settings', page: 'page-settings', label: 'Settings' },
  ];

  test('study tab is active on initial load', async ({ page }) => {
    await expect(page.locator('#nav-study')).toHaveClass(/active/);
    await expect(page.locator('#page-study')).toHaveClass(/active/);
  });

  for (const tab of tabs) {
    test(`clicking ${tab.label} tab activates the correct page`, async ({ page }) => {
      await page.click(`#${tab.id}`);
      await expect(page.locator(`#${tab.page}`)).toHaveClass(/active/);
      await expect(page.locator(`#${tab.id}`)).toHaveClass(/active/);
    });
  }

  test('only one page is active at a time', async ({ page }) => {
    await page.click('#nav-cards');
    const activePages = await page.locator('.page.active').count();
    expect(activePages).toBe(1);
  });

  test('switching tabs updates the active nav button', async ({ page }) => {
    await page.click('#nav-cards');
    await expect(page.locator('#nav-study')).not.toHaveClass(/active/);
    await expect(page.locator('#nav-cards')).toHaveClass(/active/);

    await page.click('#nav-stats');
    await expect(page.locator('#nav-cards')).not.toHaveClass(/active/);
    await expect(page.locator('#nav-stats')).toHaveClass(/active/);
  });

  test('clicking the same tab twice stays on the same page', async ({ page }) => {
    await page.click('#nav-grammar');
    await page.click('#nav-grammar');
    await expect(page.locator('#page-grammar')).toHaveClass(/active/);
  });
});
