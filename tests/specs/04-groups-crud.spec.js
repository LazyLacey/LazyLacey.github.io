const { test, expect } = require('@playwright/test');
const { resetState, seedCards, seedGroups } = require('../helpers/db');
const { CARDS, GROUPS } = require('../helpers/fixtures');

test.describe('Groups CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await page.evaluate(() => showPage('groups'));
    await page.waitForSelector('#groups-list', { state: 'attached' });
  });

  // ── Empty state ──────────────────────────────────────────────────────────
  test('shows empty state when there are no groups', async ({ page }) => {
    await expect(page.locator('#groups-list')).toContainText(/нет групп/i);
  });

  // ── Add group ────────────────────────────────────────────────────────────
  test('opens add-group modal on button click', async ({ page }) => {
    await page.click('[data-testid="btn-add-card"]');
    await expect(page.locator('#app-drawer')).toBeVisible();
    await expect(page.locator('#app-drawer-title')).toContainText(/новая/i);
  });

  test('adds a group and it appears in the list', async ({ page }) => {
    await page.click('[data-testid="btn-add-card"]');
    await page.fill('#group-name', 'Базовые фразы');
    await page.click('[data-testid="drawer-save"]');

    await expect(page.locator('#app-drawer')).toBeHidden();
    await expect(page.locator('#groups-list')).toContainText('Базовые фразы');
  });

  test('shows a toast after saving a group', async ({ page }) => {
    await page.click('[data-testid="btn-add-card"]');
    await page.fill('#group-name', 'Цвета');
    await page.click('[data-testid="drawer-save"]');

    await expect(page.locator('#toast')).toBeVisible();
    await expect(page.locator('#toast')).toContainText(/сохранено/i);
  });

  // ── Validation ───────────────────────────────────────────────────────────
  test('does not save group with empty name', async ({ page }) => {
    await page.click('[data-testid="btn-add-card"]');
    await page.click('[data-testid="drawer-save"]');

    await expect(page.locator('#app-drawer')).toBeVisible();
    await expect(page.locator('#toast')).toContainText(/название/i);
  });

  test('cancel closes modal without saving', async ({ page }) => {
    await page.click('[data-testid="btn-add-card"]');
    await page.fill('#group-name', 'Временная группа');
    await page.click('[data-testid="drawer-cancel"]');

    await expect(page.locator('#app-drawer')).toBeHidden();
    await expect(page.locator('#groups-list')).not.toContainText('Временная группа');
  });

  // ── Edit group ───────────────────────────────────────────────────────────
  test('opens edit modal with pre-filled name', async ({ page }) => {
    await seedGroups(page, [GROUPS.food]);

    await page.locator('#groups-list .group-more-btn').first().click();
    await page.locator('.group-menu.open .group-menu-item').first().click();
    await expect(page.locator('#app-drawer')).toBeVisible();
    await expect(page.locator('#group-name')).toHaveValue('Еда');
    await expect(page.locator('#app-drawer-title')).toContainText(/редактировать/i);
  });

  test('edit updates the group name in the list', async ({ page }) => {
    await seedGroups(page, [GROUPS.food]);

    await page.locator('#groups-list .group-more-btn').first().click();
    await page.locator('.group-menu.open .group-menu-item').first().click();
    await page.fill('#group-name', 'Напитки');
    await page.click('[data-testid="drawer-save"]');

    await expect(page.locator('#groups-list')).toContainText('Напитки');
    await expect(page.locator('#groups-list')).not.toContainText('Еда');
  });

  // ── Delete group ─────────────────────────────────────────────────────────
  test('delete button removes the group', async ({ page }) => {
    await seedGroups(page, [GROUPS.food]);

    page.once('dialog', dialog => dialog.accept());
    await page.locator('#groups-list .group-more-btn').first().click();
    await page.locator('.group-menu.open .group-menu-item.danger').click();

    await expect(page.locator('#groups-list')).not.toContainText('Еда');
    await expect(page.locator('#toast')).toContainText(/удалена/i);
  });

  test('deleting the last group restores empty state', async ({ page }) => {
    await seedGroups(page, [GROUPS.numbers]);

    page.once('dialog', dialog => dialog.accept());
    await page.locator('#groups-list .group-more-btn').first().click();
    await page.locator('.group-menu.open .group-menu-item.danger').click();

    await expect(page.locator('#groups-list')).toContainText(/нет групп/i);
  });

  // ── Card count ───────────────────────────────────────────────────────────
  test('group shows correct card count after cards are added', async ({ page }) => {
    await seedGroups(page, [GROUPS.basics]);

    const groups = await page.evaluate(() => AppState.groups);
    const gid = groups[0].id;
    await seedCards(page, [
      { ro: 'unu', ru: 'один', groupId: gid },
      { ro: 'doi', ru: 'два', groupId: gid },
    ]);

    await page.evaluate(() => renderGroupsPage());

    await expect(page.locator('#groups-list .group-count').first()).toContainText('2');
  });

  // ── Group appears in card modal select ───────────────────────────────────
  test('new group appears in add-card group select', async ({ page }) => {
    await page.click('[data-testid="btn-add-card"]');
    await page.fill('#group-name', 'Животные');
    await page.click('[data-testid="drawer-save"]');

    await page.evaluate(() => showPage('cards'));
    await page.click('[data-testid="btn-add-card"]');

    const options = page.locator('#card-group option');
    const texts = await options.allTextContents();
    expect(texts.some(t => t.includes('Животные'))).toBe(true);
  });
});
