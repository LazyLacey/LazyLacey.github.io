// js/db.js — IndexedDB setup and helpers for all three databases

const MAX_SESSIONS = 100;

// ===== MAIN DB (RomanianVocab) =====

let db;
const DB_NAME    = 'RomanianVocab';
const DB_VERSION = 6;

function _migrateV5toV6(tx, d) {
  try {
    const cardStore = tx.objectStore('cards');
    const cardStatsStore = tx.objectStore('cardStats');
    cardStore.getAll().onsuccess = ev => {
      const cards = ev.target.result;
      for (const c of cards) {
        const stats = {
          cardId:      c.id,
          shows:       0,
          correct:     0,
          srsLevel:    c.srsLevel    ?? 0,
          srsEf:       c.srsEf      ?? 2.5,
          srsInterval: c.srsInterval ?? 1,
          nextReview:  c.nextReview  ?? null,
          lastSeen:    c.lastSeen    ?? null,
        };
        cardStatsStore.put(stats);
        const clean = {id:c.id, groupId:c.groupId, ro:c.ro, ru:c.ru, note:c.note||''};
        if (c.ex !== undefined) clean.ex = c.ex;
        cardStore.put(clean);
      }
    };

    const byDate = {};
    const metaStore  = tx.objectStore('meta');
    const dailyStore = tx.objectStore('dailyStats');

    metaStore.get('statsSnapshot').onsuccess = snapEv => {
      const snap = snapEv.target.result;
      if (snap && snap.byDate) {
        for (const [date, s] of Object.entries(snap.byDate)) {
          if (!byDate[date]) byDate[date] = {total:0, correct:0};
          byDate[date].total   += s.total;
          byDate[date].correct += s.correct;
        }
      }
      if (snap && snap.byCard) {
        const csStore = tx.objectStore('cardStats');
        for (const [cidStr, s] of Object.entries(snap.byCard)) {
          const cid = Number(cidStr);
          csStore.get(cid).onsuccess = csEv => {
            const rec = csEv.target.result;
            if (rec) { rec.shows += s.shows; rec.correct += s.correct; csStore.put(rec); }
          };
        }
      }

      if (d.objectStoreNames.contains('answerLog')) {
        tx.objectStore('answerLog').getAll().onsuccess = logEv => {
          const entries = logEv.target.result;
          for (const e of entries) {
            if (!e.date) continue;
            if (!byDate[e.date]) byDate[e.date] = {total:0, correct:0};
            byDate[e.date].total++;
            byDate[e.date].correct += e.correct;
          }
          const cardTotals = {};
          for (const e of entries) {
            if (!e.cardId) continue;
            if (!cardTotals[e.cardId]) cardTotals[e.cardId] = {shows:0, correct:0};
            cardTotals[e.cardId].shows++;
            cardTotals[e.cardId].correct += e.correct;
          }
          const csStore2 = tx.objectStore('cardStats');
          for (const [cidStr, t] of Object.entries(cardTotals)) {
            const cid = Number(cidStr);
            csStore2.get(cid).onsuccess = csEv2 => {
              const rec = csEv2.target.result;
              if (rec) { rec.shows += t.shows; rec.correct += t.correct; csStore2.put(rec); }
            };
          }
          const bySession = {};
          for (const e of entries) {
            if (!e.sessionId) continue;
            if (!bySession[e.sessionId]) bySession[e.sessionId] = {sessionId:e.sessionId, date:e.date, total:0, correct:0, errorIds:[]};
            bySession[e.sessionId].total++;
            bySession[e.sessionId].correct += e.correct;
            if (!e.correct && e.cardId) bySession[e.sessionId].errorIds.push(e.cardId);
          }
          const sessStore = tx.objectStore('sessions');
          const sessionList = Object.values(bySession).sort((a,b) => a.date < b.date ? -1 : 1);
          for (const s of sessionList.slice(-MAX_SESSIONS)) sessStore.put(s);
          for (const [date, s] of Object.entries(byDate)) dailyStore.put({date, total:s.total, correct:s.correct});
        };
      } else {
        for (const [date, s] of Object.entries(byDate)) dailyStore.put({date, total:s.total, correct:s.correct});
      }
    };
  } catch(err) {
    console.warn('_migrateV5toV6 error (non-fatal):', err);
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = e => {
      const d = e.target.result;
      const tx = e.target.transaction;
      if (!d.objectStoreNames.contains('groups')) {
        const gs = d.createObjectStore('groups', {keyPath:'id', autoIncrement:true});
        gs.createIndex('name','name',{unique:true});
      }
      if (!d.objectStoreNames.contains('cards')) {
        const cs = d.createObjectStore('cards', {keyPath:'id', autoIncrement:true});
        cs.createIndex('groupId','groupId',{unique:false});
      }
      if (!d.objectStoreNames.contains('settings')) d.createObjectStore('settings', {keyPath:'key'});
      if (!d.objectStoreNames.contains('meta'))     d.createObjectStore('meta', {keyPath:'id'});
      if (!d.objectStoreNames.contains('cardStats')) d.createObjectStore('cardStats', {keyPath:'cardId'});
      if (!d.objectStoreNames.contains('dailyStats')) d.createObjectStore('dailyStats', {keyPath:'date'});
      if (!d.objectStoreNames.contains('sessions'))  d.createObjectStore('sessions', {keyPath:'sessionId'});
      if (e.oldVersion > 0 && e.oldVersion < 6) _migrateV5toV6(tx, d);
    };
    req.onsuccess = e => { db = e.target.result; window.db = db; resolve(db); };
    req.onerror = () => reject(req.error);
  });
}

function dbGet(store, key) {
  return new Promise((res, rej) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).get(key);
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}
function dbGetAll(store) {
  return new Promise((res, rej) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).getAll();
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}
function dbPut(store, obj) {
  return new Promise((res, rej) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).put(obj);
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}
function dbDelete(store, key) {
  return new Promise((res, rej) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).delete(key);
    req.onsuccess = () => res();
    req.onerror = () => rej(req.error);
  });
}
function dbPutBatch(store, items) {
  return new Promise((res, rej) => {
    if (!items || items.length === 0) { res([]); return; }
    const tx = db.transaction(store, 'readwrite');
    const os = tx.objectStore(store);
    const ids = [];
    tx.oncomplete = () => res(ids);
    tx.onerror = () => rej(tx.error);
    for (const item of items) {
      const req = os.put(item);
      req.onsuccess = () => { ids.push(req.result); };
    }
  });
}
function dbClear(store) {
  return new Promise((res, rej) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).clear();
    req.onsuccess = () => res();
    req.onerror = () => rej(req.error);
  });
}
function dbDeleteBatch(store, keys) {
  return new Promise((res, rej) => {
    if (!keys || keys.length === 0) { res(); return; }
    const tx = db.transaction(store, 'readwrite');
    const os = tx.objectStore(store);
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
    for (const key of keys) os.delete(key);
  });
}
function dbGetAllByIndex(store, indexName, value) {
  return new Promise((res, rej) => {
    const tx  = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).index(indexName).getAll(value);
    req.onsuccess = () => res(req.result);
    req.onerror   = () => rej(req.error);
  });
}

// ===== TESTS DB =====

let testsDb;
const TESTS_DB_NAME    = 'RomanianTests';
const TESTS_DB_VERSION = 1;

function openTestsDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(TESTS_DB_NAME, TESTS_DB_VERSION);
    req.onupgradeneeded = e => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains('testPacks')) {
        const ps = d.createObjectStore('testPacks', {keyPath:'id', autoIncrement:true});
        ps.createIndex('name','name',{unique:true});
      }
      if (!d.objectStoreNames.contains('testProgress')) d.createObjectStore('testProgress', {keyPath:'id'});
    };
    req.onsuccess = e => { testsDb = e.target.result; window.testsDb = testsDb; resolve(testsDb); };
    req.onerror = () => reject(req.error);
  });
}
function tdbGet(store, key) {
  return new Promise((res, rej) => {
    const tx = testsDb.transaction(store, 'readonly');
    const req = tx.objectStore(store).get(key);
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}
function tdbGetAll(store) {
  return new Promise((res, rej) => {
    const tx = testsDb.transaction(store, 'readonly');
    const req = tx.objectStore(store).getAll();
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}
function tdbPut(store, obj) {
  return new Promise((res, rej) => {
    const tx = testsDb.transaction(store, 'readwrite');
    const req = tx.objectStore(store).put(obj);
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}
function tdbDelete(store, key) {
  return new Promise((res, rej) => {
    const tx = testsDb.transaction(store, 'readwrite');
    const req = tx.objectStore(store).delete(key);
    req.onsuccess = () => res();
    req.onerror = () => rej(req.error);
  });
}
function tdbClear(store) {
  return new Promise((res, rej) => {
    const tx = testsDb.transaction(store, 'readwrite');
    const req = tx.objectStore(store).clear();
    req.onsuccess = () => res();
    req.onerror = () => rej(req.error);
  });
}
function tdbPutBatch(store, items) {
  return new Promise((res, rej) => {
    if (!items || items.length === 0) { res([]); return; }
    const tx = testsDb.transaction(store, 'readwrite');
    const os = tx.objectStore(store);
    const ids = [];
    tx.oncomplete = () => res(ids);
    tx.onerror = () => rej(tx.error);
    for (const item of items) {
      const req = os.put(item);
      req.onsuccess = () => ids.push(req.result);
    }
  });
}

// ===== VERBS DB =====

let verbsDb;
const VERBS_DB_NAME    = 'RomanianVerbs';
const VERBS_DB_VERSION = 1;

function openVerbsDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(VERBS_DB_NAME, VERBS_DB_VERSION);
    req.onupgradeneeded = e => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains('verbPacks')) {
        const ps = d.createObjectStore('verbPacks', {keyPath:'id', autoIncrement:true});
        ps.createIndex('name','name',{unique:true});
      }
      if (!d.objectStoreNames.contains('verbProgress')) d.createObjectStore('verbProgress', {keyPath:'id'});
    };
    req.onsuccess = e => { verbsDb = e.target.result; window.verbsDb = verbsDb; resolve(verbsDb); };
    req.onerror = () => reject(req.error);
  });
}
function vdbGet(store, key) {
  return new Promise((res, rej) => {
    const tx = verbsDb.transaction(store, 'readonly');
    const req = tx.objectStore(store).get(key);
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}
function vdbGetAll(store) {
  return new Promise((res, rej) => {
    const tx = verbsDb.transaction(store, 'readonly');
    const req = tx.objectStore(store).getAll();
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}
function vdbPut(store, obj) {
  return new Promise((res, rej) => {
    const tx = verbsDb.transaction(store, 'readwrite');
    const req = tx.objectStore(store).put(obj);
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}
function vdbDelete(store, key) {
  return new Promise((res, rej) => {
    const tx = verbsDb.transaction(store, 'readwrite');
    const req = tx.objectStore(store).delete(key);
    req.onsuccess = () => res();
    req.onerror = () => rej(req.error);
  });
}

// Expose all to global scope for main classic script
Object.assign(window, {
  MAX_SESSIONS,
  openDB, dbGet, dbGetAll, dbPut, dbDelete, dbPutBatch, dbClear, dbDeleteBatch, dbGetAllByIndex,
  openTestsDB, tdbGet, tdbGetAll, tdbPut, tdbDelete, tdbClear, tdbPutBatch,
  openVerbsDB, vdbGet, vdbGetAll, vdbPut, vdbDelete,
});
