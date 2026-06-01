const { test, expect } = require('@playwright/test');
const { resetState, seedCards, seedGroups, waitForInit } = require('../helpers/db');
const { CARDS, GROUPS } = require('../helpers/fixtures');

test.describe('Cards CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await resetState(page);
    await page.click('#nav-cards');
  });

  // ── Empty state ──────────────────────────────────────────────────────────
  test('shows empty state when there are no cards', async ({ page }) => {
    await expect(page.locator('#cards-list')).toContainText(/нет карточек/i);
  });

  // ── Add card ─────────────────────────────────────────────────────────────
  test('opens add-card modal on button click', async ({ page }) => {
    await page.click('#btn-add-card');
    await expect(page.locator('#modal-card')).toBeVisible();
    await expect(page.locator('#modal-card-title')).toContainText(/новая/i);
  });

  test('adds a card and it appears in the list', async ({ page }) => {
    await page.click('#btn-add-card');
    await page.fill('#card-ro', 'bună ziua');
    await page.fill('#card-ru', 'добрый день');
    await page.click('#modal-card .btn-primary');

    await expect(page.locator('#modal-card')).toBeHidden();
    await expect(page.locator('#cards-list')).toContainText('bună ziua');
    await expect(page.locator('#cards-list')).toContainText('добрый день');
  });

  test('adds a card with a group and note', async ({ page }) => {
    // seedGroups updates AppState directly — no reload needed
    await seedGroups(page, [GROUPS.basics]);

    await page.click('#btn-add-card');
    await page.fill('#card-ro', 'frumos');
    await page.fill('#card-ru', 'красивый');
    await page.fill('#card-note', 'прилагательное');

    // populateGroupSelect renders one option per group (no "no group" placeholder)
    const groupOpts = page.locator('#card-group option');
    await expect(groupOpts).toHaveCount(1);
    await page.click('#modal-card .btn-primary');

    await expect(page.locator('#cards-list')).toContainText('frumos');
  });

  test('shows a toast after saving a card', async ({ page }) => {
    await page.click('#btn-add-card');
    await page.fill('#card-ro', 'casă');
    await page.fill('#card-ru', 'дом');
    await page.click('#modal-card .btn-primary');

    await expect(page.locator('#toast')).toBeVisible();
    await expect(page.locator('#toast')).toContainText(/сохранено/i);
  });

  // ── Validation ───────────────────────────────────────────────────────────
  test('does not save a card with empty Romanian field', async ({ page }) => {
    await page.click('#btn-add-card');
    await page.fill('#card-ru', 'дом');
    // leave #card-ro empty
    await page.click('#modal-card .btn-primary');

    await expect(page.locator('#modal-card')).toBeVisible(); // modal stays open
    await expect(page.locator('#toast')).toContainText(/заполните/i);
  });

  test('does not save a card with empty Russian field', async ({ page }) => {
    await page.click('#btn-add-card');
    await page.fill('#card-ro', 'casă');
    await page.click('#modal-card .btn-primary');

    await expect(page.locator('#modal-card')).toBeVisible();
  });

  test('cancel button closes modal without saving', async ({ page }) => {
    await page.click('#btn-add-card');
    await page.fill('#card-ro', 'pom');
    await page.fill('#card-ru', 'дерево');
    await page.click('#modal-card .btn-ghost');

    await expect(page.locator('#modal-card')).toBeHidden();
    await expect(page.locator('#cards-list')).not.toContainText('pom');
  });

  // ── Edit card ────────────────────────────────────────────────────────────
  test('opens edit modal with pre-filled values', async ({ page }) => {
    // seedCards updates AppState — navigating to cards renders them immediately
    await seedCards(page, [CARDS.single]);

    await page.locator('#cards-list .word-card').first().click();
    await expect(page.locator('#modal-card')).toBeVisible();
    await expect(page.locator('#card-ro')).toHaveValue('casă');
    await expect(page.locator('#card-ru')).toHaveValue('дом');
  });

  test('edit updates the card in the list', async ({ page }) => {
    await seedCards(page, [CARDS.single]);

    await page.locator('#cards-list .word-card').first().click();
    await page.fill('#card-ro', 'câine');
    await page.fill('#card-ru', 'собака');
    await page.click('#modal-card .btn-primary');

    await expect(page.locator('#cards-list')).toContainText('câine');
    await expect(page.locator('#cards-list')).not.toContainText('casă');
  });

  // ── Delete card ──────────────────────────────────────────────────────────
  test('delete button removes the card from the list', async ({ page }) => {
    await seedCards(page, [CARDS.single]);

    await page.locator('#cards-list .word-card').first().click();
    page.once('dialog', dialog => dialog.accept());
    await page.locator('#card-delete-wrap button').click();

    await expect(page.locator('#cards-list')).not.toContainText('casă');
    await expect(page.locator('#toast')).toContainText(/удалено/i);
  });

  test('deleting the last card restores the empty state', async ({ page }) => {
    await seedCards(page, [CARDS.single]);

    await page.locator('#cards-list .word-card').first().click();
    page.once('dialog', dialog => dialog.accept());
    await page.locator('#card-delete-wrap button').click();

    await expect(page.locator('#cards-list')).toContainText(/нет карточек/i);
  });

  // ── Multiple cards ───────────────────────────────────────────────────────
  test('all seeded cards appear in the list', async ({ page }) => {
    await seedCards(page, CARDS.basic);

    for (const card of CARDS.basic) {
      await expect(page.locator('#cards-list')).toContainText(card.ro);
    }
  });

  test('card count on the study ready screen updates after adding a card', async ({ page }) => {
    await page.click('#nav-study');
    const countBefore = await page.locator('#ready-count-line').textContent();

    await page.click('#nav-cards');
    await page.click('#btn-add-card');
    await page.fill('#card-ro', 'ploaie');
    await page.fill('#card-ru', 'дождь');
    await page.click('#modal-card .btn-primary');

    await page.click('#nav-study');
    const countAfter = await page.locator('#ready-count-line').textContent();
    expect(countAfter).not.toEqual(countBefore);
  });
});
