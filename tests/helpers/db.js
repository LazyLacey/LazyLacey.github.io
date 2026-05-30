/**
 * Helpers for seeding and clearing IndexedDB state in Playwright tests.
 *
 * All functions take a Playwright `page` object and run code in the page context.
 * Call `resetState(page)` in beforeEach — it clears all three databases,
 * wipes localStorage/sessionStorage, and sets onboardingDone so the overlay
 * doesn't block tests.
 */

const DB_NAMES = ['RomanianVocab', 'RomanianTests', 'RomanianVerbs'];

/**
 * Navigate to the app, wait for init, close all DB connections, delete all
 * databases, reset localStorage, then reload to start completely fresh.
 *
 * We must navigate to the app first (not about:blank) because IndexedDB
 * operations require the app's origin context.
 */
async function resetState(page) {
  await page.goto('/');
  // Wait for init so all three DB connections are open and closeable
  await page.waitForFunction(
    () => typeof _initDone !== 'undefined' && _initDone === true,
    { timeout: 10000 }
  );

  await page.evaluate(async (dbNames) => {
    // Close all open DB connections so deleteDatabase won't be blocked
    try { if (typeof db !== 'undefined' && db) db.close(); } catch(e) {}
    try { if (typeof testsDb !== 'undefined' && testsDb) testsDb.close(); } catch(e) {}
    try { if (typeof verbsDb !== 'undefined' && verbsDb) verbsDb.close(); } catch(e) {}

    await Promise.all(dbNames.map(name =>
      new Promise(res => {
        const req = indexedDB.deleteDatabase(name);
        req.onsuccess = res;
        req.onerror = res;
        req.onblocked = () => setTimeout(res, 200);
      })
    ));
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('onboardingDone', '1');
  }, DB_NAMES);

  await page.reload();
  await waitForInit(page);
}

/** Wait until the app's init() has fully completed. */
async function waitForInit(page) {
  await page.waitForFunction(() => typeof _initDone !== 'undefined' && _initDone === true, { timeout: 10000 });
}

/**
 * Seed cards directly into IndexedDB via the app's own dbPut,
 * then reload AppState so the UI reflects the new data.
 *
 * @param {import('@playwright/test').Page} page
 * @param {Array<{ro: string, ru: string, groupId?: number, note?: string}>} cards
 */
async function seedCards(page, cards) {
  await page.evaluate(async (cardsData) => {
    for (const card of cardsData) {
      await dbPut('cards', card);
    }
    AppState.cards = await dbGetAll('cards');
    buildStudyQueue();
    invalidate('ready', 'cards');
  }, cards);
}

/**
 * Seed groups and return them (with auto-assigned IDs) from the DB.
 *
 * @param {import('@playwright/test').Page} page
 * @param {Array<{name: string}>} groups
 */
async function seedGroups(page, groups) {
  await page.evaluate(async (groupsData) => {
    for (const g of groupsData) {
      await dbPut('groups', g);
    }
    AppState.groups = await dbGetAll('groups');
    invalidate('ready', 'cards', 'groups');
  }, groups);
}

/**
 * Seed a grammar test pack into the RomanianTests DB.
 *
 * @param {import('@playwright/test').Page} page
 * @param {object} pack  — full test pack object (type, name, icon, questions, topics)
 */
async function seedTestPack(page, pack) {
  await page.evaluate(async (packData) => {
    await tdbPut('testPacks', packData);
  }, pack);
}

/**
 * Seed a verb pack into the RomanianVerbs DB.
 *
 * @param {import('@playwright/test').Page} page
 * @param {object} pack  — full verb pack object
 */
async function seedVerbPack(page, pack) {
  await page.evaluate(async (packData) => {
    await vdbPut('verbPacks', packData);
  }, pack);
}

/**
 * Persist arbitrary settings key/values (e.g. { hardMode: true, showSummary: false }).
 */
async function seedSettings(page, settings) {
  await page.evaluate(async (settingsMap) => {
    for (const [key, value] of Object.entries(settingsMap)) {
      await putSetting(key, value);
    }
    loadSettings();
  }, settings);
}

/**
 * Read all cards from AppState (already in memory after init).
 */
async function getCards(page) {
  return page.evaluate(() => AppState.cards);
}

/**
 * Read a single card by ID from the DB.
 */
async function getCardById(page, id) {
  return page.evaluate(async (id) => dbGet('cards', id), id);
}

/**
 * Read all sessions from DB.
 */
async function getSessions(page) {
  return page.evaluate(() => dbGetAll('sessions'));
}

module.exports = { resetState, waitForInit, seedCards, seedGroups, seedTestPack, seedVerbPack, seedSettings, getCards, getCardById, getSessions };
