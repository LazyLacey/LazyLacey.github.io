// ===== SETTINGS ACCESS LAYER =====
const SETTINGS_DEFAULTS = {
  hardMode: false, showSummary: true, errorSessions: 3,
};

async function getSetting(key, defaultVal) {
  try {
    const rec = await dbGet('settings', key);
    if (rec !== undefined && rec !== null) return rec.value;
  } catch(e) {}
  return defaultVal !== undefined ? defaultVal : SETTINGS_DEFAULTS[key];
}

async function putSetting(key, value) {
  await dbPut('settings', { key, value });
  AppState.settings[key] = value;
}

// ===== CARD ACCESS LAYER =====
function getCard(id) {
  return AppState.cards.find(c => c.id === id) || null;
}

async function updateCard(id, patch) {
  const c = AppState.cards.find(x => x.id === id);
  if (!c) return;
  Object.assign(c, patch);
  await dbPut('cards', c);
}

async function deleteCard(id) {
  AppState.cardStats.delete(id);
  try { await dbDelete('cardStats', id); } catch(e) {}
  invalidateAggCache();
  await dbDelete('cards', id);
  AppState.cards = AppState.cards.filter(c => c.id !== id);
}

function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
  document.body.style.overflow = '';
}

document.querySelectorAll('.modal-backdrop').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) closeModal(m.id); });
});

// ===== STORAGE PERSISTENCE =====
async function requestPersistentStorage() {
  if (!navigator.storage || !navigator.storage.persist) return;
  try {
    const already = await navigator.storage.persisted();
    if (already) return;
    const warned = await dbGet('meta', 'persistenceWarned').catch(() => null);
    if (warned) return;
    showStorageWarning();
  } catch(e) {}
}

function showStorageWarning() {
  const banner = document.createElement('div');
  banner.id = 'storage-banner';
  banner.innerHTML = `
    <span>⚠️ Браузер может удалить данные при нехватке места. Включить постоянное хранилище?</span>
    <div style="display:flex;gap:8px;flex-shrink:0">
      <button onclick="grantPersistence()" style="background:var(--accent);color:#fff;border:none;border-radius:8px;padding:6px 12px;font-size:12px;cursor:pointer;font-weight:600">Включить</button>
      <button onclick="dismissStorageWarning()" style="background:transparent;color:var(--text2);border:1px solid var(--bg3);border-radius:8px;padding:6px 12px;font-size:12px;cursor:pointer">Не сейчас</button>
    </div>`;
  document.getElementById('app').prepend(banner);
}

async function grantPersistence() {
  try {
    const granted = await navigator.storage.persist();
    if (granted) {
      showToast('Хранилище защищено ✓', 'green');
    } else {
      showToast('Браузер отказал — попробуйте в настройках позже. Сделайте резервную копию!', 'red');
    }
    await dbPut('meta', { id: 'persistenceWarned', granted });
  } catch(e) {}
  dismissStorageWarning();
}

async function tryPersistFromSettings() {
  if (!navigator.storage || !navigator.storage.persist) {
    showToast('Браузер не поддерживает постоянное хранилище', 'red');
    return;
  }
  const already = await navigator.storage.persisted().catch(() => false);
  if (already) {
    showToast('Хранилище уже защищено ✓', 'green');
    updatePersistSettingsRow(true);
    return;
  }
  const granted = await navigator.storage.persist().catch(() => false);
  updatePersistSettingsRow(granted);
  if (granted) {
    showToast('Хранилище защищено ✓', 'green');
    await dbPut('meta', { id: 'persistenceWarned', granted: true }).catch(() => {});
  } else {
    showToast('Браузер не дал разрешение — попробуйте ещё раз позже', 'red');
  }
}

function updatePersistSettingsRow(granted) {
  const sub = document.getElementById('persist-settings-sub');
  if (!sub) return;
  if (granted) {
    sub.textContent = 'Хранилище защищено ✓';
    sub.style.color = 'var(--green)';
  } else {
    sub.textContent = 'Запросить постоянное хранилище у браузера';
    sub.style.color = '';
  }
}

async function initPersistSettingsRow() {
  if (!navigator.storage || !navigator.storage.persist) return;
  const granted = await navigator.storage.persisted().catch(() => false);
  updatePersistSettingsRow(granted);
}

async function dismissStorageWarning() {
  const el = document.getElementById('storage-banner');
  if (el) el.remove();
  try { await dbPut('meta', { id: 'persistenceWarned', granted: false }); } catch(e) {}
}

window.addEventListener('pagehide', (e) => { if (!e.persisted) saveSessionRecord(); });
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') persistSessionToStorage();
});

// ===== SETTINGS UI =====
function loadSettings() {
  document.getElementById('setting-hard-mode').checked    = AppState.settings.hardMode || false;
  document.getElementById('setting-show-summary').checked = AppState.settings.showSummary !== false;
  document.getElementById('setting-error-sessions').value = AppState.settings.errorSessions || 3;
  try {
    const t = localStorage.getItem('appTheme') || '';
    updateThemeUI(t);
  } catch(e) {}
}

async function saveSettings() {
  AppState.settings.hardMode      = document.getElementById('setting-hard-mode').checked;
  AppState.settings.showSummary   = document.getElementById('setting-show-summary').checked;
  AppState.settings.errorSessions = parseInt(document.getElementById('setting-error-sessions').value) || 3;
  for (const key of Object.keys(SETTINGS_DEFAULTS)) {
    await putSetting(key, AppState.settings[key]);
  }
  showToast('Настройки сохранены ✓');
  invalidateErrorCards();
  buildStudyQueue();
  invalidate('ready');
}

// ===== EXPORT =====
async function exportData() {
  const dailyStats = await dbGetAll('dailyStats');
  const sessions   = await dbGetAll('sessions');

  const cardsWithStats = AppState.cards.map(c => {
    const s = AppState.cardStats.get(c.id) || {};
    return {
      ...c,
      shows:       s.shows       ?? 0,
      correct:     s.correct     ?? 0,
      srsLevel:    s.srsLevel    ?? 0,
      srsEf:       s.srsEf       ?? 2.5,
      srsInterval: s.srsInterval ?? 1,
      nextReview:  s.nextReview  ?? null,
      lastSeen:    s.lastSeen    ?? null,
    };
  });

  const data = JSON.stringify({
    version: 3,
    exported: new Date().toISOString().slice(0, 10),
    groups:   AppState.groups,
    cards:    cardsWithStats,
    dailyStats,
    sessions,
    settings: AppState.settings,
  }, null, 2);
  downloadBlob(data, `${currentLang().id}-vocab.json`);
}

async function exportCardsOnly() {
  const data = JSON.stringify({
    version: 3,
    exported: new Date().toISOString().slice(0, 10),
    groups: AppState.groups,
    cards:  AppState.cards.map(({id, groupId, ro, ru, note, ex}) => ({id, groupId, ro, ru, note, ex})),
  }, null, 2);
  downloadBlob(data, `${currentLang().id}-cards.json`);
}

async function doImportReplace(data) {
  await dbClear('groups');
  await dbClear('cards');
  await dbClear('cardStats');
  await dbClear('dailyStats');
  await dbClear('sessions');

  if (data.settings && typeof data.settings === 'object') {
    for (const [k, v] of Object.entries(data.settings)) {
      if (k in SETTINGS_DEFAULTS) {
        AppState.settings[k] = v;
        await dbPut('settings', { key: k, value: v });
      }
    }
  }

  await dbPutBatch('groups', data.groups || []);

  if (data.version >= 3) {
    const cleanCards  = [];
    const cardStatsList = [];
    for (const c of (data.cards || [])) {
      const card = {groupId:c.groupId, ro:c.ro, ru:c.ru||'', note:c.note||'', ...(c.ex !== undefined ? {ex:c.ex} : {})};
      if (c.id !== undefined) card.id = c.id;
      cleanCards.push(card);
      if (c.id !== undefined) {
        cardStatsList.push({
          cardId:      c.id,
          shows:       c.shows       ?? 0,
          correct:     c.correct     ?? 0,
          srsLevel:    c.srsLevel    ?? 0,
          srsEf:       c.srsEf      ?? 2.5,
          srsInterval: c.srsInterval ?? 1,
          nextReview:  c.nextReview  ?? null,
          lastSeen:    c.lastSeen    ?? null,
        });
      }
    }
    await dbPutBatch('cards', cleanCards);
    await dbPutBatch('cardStats', cardStatsList);
    await dbPutBatch('dailyStats', data.dailyStats || []);
    const sessions = (data.sessions || []).sort((a,b) => a.date < b.date ? -1 : 1).slice(-MAX_SESSIONS);
    await dbPutBatch('sessions', sessions);
  } else {
    const cleanCards = (data.cards || []).map(c => {
      const clean = {id:c.id, groupId:c.groupId, ro:c.ro, ru:c.ru||'', note:c.note||''};
      if (c.ex !== undefined) clean.ex = c.ex;
      return clean;
    });
    await dbPutBatch('cards', cleanCards);

    const cardStatsMap = {};
    for (const c of (data.cards || [])) {
      cardStatsMap[c.id] = {cardId:c.id, shows:0, correct:0,
        srsLevel:c.srsLevel??0, srsEf:c.srsEf??2.5, srsInterval:c.srsInterval??1,
        nextReview:c.nextReview??null, lastSeen:c.lastSeen??null};
    }
    const byDate = {};
    if (data.statsSnapshot && data.statsSnapshot.byDate) {
      for (const [d, s] of Object.entries(data.statsSnapshot.byDate)) byDate[d] = {total:s.total||0, correct:s.correct||0};
    }
    if (data.statsSnapshot && data.statsSnapshot.byCard) {
      for (const [cidStr, s] of Object.entries(data.statsSnapshot.byCard)) {
        const cid = Number(cidStr);
        if (cardStatsMap[cid]) { cardStatsMap[cid].shows += s.shows||0; cardStatsMap[cid].correct += s.correct||0; }
      }
    }
    const bySession = {};
    for (const e of (data.answerLog || [])) {
      if (!e.date) continue;
      if (!byDate[e.date]) byDate[e.date] = {total:0, correct:0};
      byDate[e.date].total++; byDate[e.date].correct += e.correct||0;
      if (e.cardId && cardStatsMap[e.cardId]) { cardStatsMap[e.cardId].shows++; cardStatsMap[e.cardId].correct += e.correct||0; }
      if (e.sessionId) {
        if (!bySession[e.sessionId]) bySession[e.sessionId] = {sessionId:e.sessionId, date:e.date, total:0, correct:0, errorIds:[]};
        bySession[e.sessionId].total++; bySession[e.sessionId].correct += e.correct||0;
        if (!e.correct && e.cardId) bySession[e.sessionId].errorIds.push(e.cardId);
      }
    }
    await dbPutBatch('cardStats', Object.values(cardStatsMap));
    await dbPutBatch('dailyStats', Object.entries(byDate).map(([date,s]) => ({date, ...s})));
    const sessions = Object.values(bySession).sort((a,b) => a.date < b.date ? -1 : 1).slice(-MAX_SESSIONS);
    await dbPutBatch('sessions', sessions);
  }

  invalidateAggCache();
  invalidateErrorCards();
  AppState.groups = await dbGetAll('groups');
  AppState.cards  = await dbGetAll('cards');
  const allStats  = await dbGetAll('cardStats');
  AppState.cardStats = new Map(allStats.map(s => [s.cardId, s]));
  for (const key of Object.keys(SETTINGS_DEFAULTS)) {
    AppState.settings[key] = await getSetting(key, SETTINGS_DEFAULTS[key]);
  }
  loadSettings();
  renderAll();
  buildStudyQueue();
  showToast('Импортировано ✓');
}

function exportGroup(groupId) {
  const g = AppState.groups.find(x => x.id === groupId);
  if (!g) return;
  const payload = {
    groups: [{name: g.name}],
    cards:  AppState.cards.filter(c => c.groupId === groupId).map(c => ({
      ro: c.ro, ru: c.ru, groupName: g.name, note: c.note || '',
    })),
  };
  downloadBlob(JSON.stringify(payload, null, 2), `${currentLang().id}-group-${g.name}.json`);
}

function downloadBlob(text, filename) {
  const blob = new Blob([text], {type: 'application/json'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ===== IMPORT =====
function validateImportData(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return 'Неверный формат файла';
  if (!Array.isArray(data.groups) && !Array.isArray(data.cards)) return 'Файл не содержит групп или карточек';
  if (data.cards    && !Array.isArray(data.cards))    return 'Поле cards должно быть массивом';
  if (data.groups   && !Array.isArray(data.groups))   return 'Поле groups должно быть массивом';
  if (data.dailyStats && !Array.isArray(data.dailyStats)) return 'Поле dailyStats должно быть массивом';
  if (data.sessions && !Array.isArray(data.sessions)) return 'Поле sessions должно быть массивом';
  return null;
}

async function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  e.target.value = '';
  let data;
  try {
    data = JSON.parse(await file.text());
  } catch {
    showToast('Файл повреждён или не является JSON', 'red');
    return;
  }
  const validationError = validateImportData(data);
  if (validationError) {
    showToast(validationError, 'red');
    return;
  }
  try {
    const mode = await showImportModePicker(data);
    if (!mode) return;
    if (mode === 'replace') {
      await doImportReplace(data);
    } else if (mode === 'words') {
      await doImportWordsOnly(data);
    } else if (mode === 'merge') {
      await doImportMergeHistory(data);
    }
  } catch(err) {
    console.error(err);
    showToast('Ошибка импорта', 'red');
  }
}

function importHasHistory(data) {
  if (data.answerLog?.length > 0) return true;
  if (data.dailyStats?.some(d => d.total > 0)) return true;
  if (data.version >= 3 && data.cards?.some(c => c.shows > 0)) return true;
  return false;
}

function openExportDrawer() {
  showDrawer('Экспорт данных', {
    subtitle: 'Выберите что сохранить',
    render(body) {
      body.style.cssText = 'display:flex;flex-direction:column;gap:10px';
      body.innerHTML = `
        <button class="btn btn-primary" style="justify-content:center;padding:14px" data-action="full">Полный бэкап — карточки, прогресс и статистика</button>
        <button class="btn btn-ghost" style="justify-content:center;padding:14px" data-action="cards">Только карточки — без истории, удобно для переноса</button>
        <button class="btn btn-ghost" style="justify-content:center;padding:14px;color:var(--text3)" data-action="cancel">Отмена</button>`;
      body.addEventListener('click', ev => {
        const btn = ev.target.closest('[data-action]');
        if (!btn) return;
        closeDrawer();
        if (btn.dataset.action === 'full') exportData();
        else if (btn.dataset.action === 'cards') exportCardsOnly();
      });
    },
  });
}

function showImportModePicker(data) {
  return new Promise(resolve => {
    const subtitle = data.version >= 3 ? `Резервная копия v${data.version}`
                   : data.version === 2 ? 'Резервная копия v2'
                   : 'Файл v1 (без истории)';
    showDrawer('Режим импорта', {
      subtitle,
      onClose: () => resolve(null),
      render(body) {
        body.style.cssText = 'display:flex;flex-direction:column;gap:10px';
        body.innerHTML = `
          <button class="btn btn-primary" style="justify-content:center;padding:14px" data-mode="replace">Заменить всё — полный сброс и загрузка</button>
          <button class="btn btn-ghost" style="justify-content:center;padding:14px" data-mode="words">Добавить слова — только новые карточки, история не трогается</button>
          ${importHasHistory(data) ? `<button class="btn btn-ghost" style="justify-content:center;padding:14px" data-mode="merge">Слить историю — объединить без потерь</button>` : ''}
          <button class="btn btn-ghost" style="justify-content:center;padding:14px;color:var(--text3)" data-mode="cancel">Отмена</button>`;
        body.addEventListener('click', ev => {
          const btn = ev.target.closest('[data-mode]');
          if (!btn) return;
          closeDrawer();
          const m = btn.dataset.mode;
          resolve(m === 'cancel' ? null : m);
        });
      },
    });
  });
}

async function doImportMergeHistory(data) {
  let addedDays = 0, updatedCards = 0;

  if (data.version >= 3) {
    for (const d of (data.dailyStats || [])) {
      let rec = null;
      try { rec = await dbGet('dailyStats', d.date); } catch(e) {}
      if (!rec) { await dbPut('dailyStats', d); addedDays++; }
      else {
        rec.total   += d.total;
        rec.correct += d.correct;
        await dbPut('dailyStats', rec);
        addedDays++;
      }
    }
    for (const s of (data.cards || [])) {
      if (!s.shows && !s.correct) continue;
      const local = AppState.cardStats.get(s.id);
      if (!local) continue;
      local.shows   += s.shows   || 0;
      local.correct += s.correct || 0;
      await putCardStats(local);
      updatedCards++;
    }
  } else {
    if (data.statsSnapshot && data.statsSnapshot.byDate) {
      for (const [date, s] of Object.entries(data.statsSnapshot.byDate)) {
        let rec = null;
        try { rec = await dbGet('dailyStats', date); } catch(e) {}
        if (!rec) rec = {date, total:0, correct:0};
        rec.total   += s.total   || 0;
        rec.correct += s.correct || 0;
        await dbPut('dailyStats', rec);
        addedDays++;
      }
    }
    if (data.statsSnapshot && data.statsSnapshot.byCard) {
      for (const [cidStr, s] of Object.entries(data.statsSnapshot.byCard)) {
        const cid = Number(cidStr);
        const local = AppState.cardStats.get(cid);
        if (!local) continue;
        local.shows   += s.shows   || 0;
        local.correct += s.correct || 0;
        await putCardStats(local);
        updatedCards++;
      }
    }
    for (const e of (data.answerLog || [])) {
      if (!e.date) continue;
      let rec = null;
      try { rec = await dbGet('dailyStats', e.date); } catch(e2) {}
      if (!rec) rec = {date:e.date, total:0, correct:0};
      rec.total++;
      rec.correct += e.correct || 0;
      await dbPut('dailyStats', rec);
      addedDays++;
      if (e.cardId) {
        const local = AppState.cardStats.get(e.cardId);
        if (local) { local.shows++; local.correct += e.correct||0; await putCardStats(local); updatedCards++; }
      }
    }
  }

  invalidateAggCache();
  invalidateErrorCards();
  renderAll();
  buildStudyQueue();
  showToast(`История объединена: ${plural(addedDays, 'день', 'дня', 'дней')}, ${plural(updatedCards, 'карточка', 'карточки', 'карточек')} ✓`);
}

async function doImportWordsOnly(data) {
  let addedGroups = 0, addedCards = 0;
  const groupNameToId = {};

  // Always read from DB — AppState may be stale (language switch, concurrent writes)
  AppState.groups = await dbGetAll('groups');
  AppState.groups.forEach(g => { groupNameToId[g.name.toLowerCase()] = g.id; });

  for (const g of (data.groups || [])) {
    const key = (g.name || '').toLowerCase();
    if (!key || groupNameToId[key] !== undefined) continue;
    try {
      const newId = await dbPut('groups', {name: g.name});
      groupNameToId[key] = newId;
      addedGroups++;
    } catch(e) {
      // Group with this name already exists in DB (unique constraint) — re-sync and continue
      AppState.groups = await dbGetAll('groups');
      AppState.groups.forEach(g2 => { groupNameToId[g2.name.toLowerCase()] = g2.id; });
    }
  }
  AppState.groups = await dbGetAll('groups');
  AppState.groups.forEach(g => { groupNameToId[g.name.toLowerCase()] = g.id; });

  AppState.cards = await dbGetAll('cards');
  const existingKeys = new Set(AppState.cards.map(c => `${c.ro.toLowerCase()}__${(c.ru || '').toLowerCase()}`));
  for (const c of (data.cards || [])) {
    if (!c.ro) continue;
    const key = `${c.ro.toLowerCase()}__${(c.ru || '').toLowerCase()}`;
    if (existingKeys.has(key)) continue;
    let gid = null;
    if (c.groupName) gid = groupNameToId[c.groupName.toLowerCase()] ?? null;
    else if (c.groupId) gid = AppState.groups.find(g => g.id === c.groupId)?.id ?? null;
    if (!gid && AppState.groups.length > 0) gid = AppState.groups[0].id;
    await dbPut('cards', {ro: c.ro, ru: c.ru || '', groupId: gid, note: c.note || ''});
    existingKeys.add(key);
    addedCards++;
  }
  AppState.groups = await dbGetAll('groups');
  AppState.cards  = await dbGetAll('cards');
  renderAll();
  buildStudyQueue();
  showToast(`Добавлено: ${plural(addedGroups, 'группа', 'группы', 'групп')}, ${plural(addedCards, 'слово', 'слова', 'слов')} ✓`);
}

async function clearData() {
  try {
    if (!confirm('Это удалит все текущие данные. Продолжить?')) return;
    await dbClear('groups');
    await dbClear('cards');
    await dbClear('cardStats');
    await dbClear('dailyStats');
    await dbClear('sessions');
    AppState.cardStats = new Map();
    invalidateAggCache();
    invalidateErrorCards();
    AppState.groups = await dbGetAll('groups');
    AppState.cards  = await dbGetAll('cards');
    renderAll();
    buildStudyQueue();
    showToast('Очистка завершена ✓');
  } catch {
    showToast('Ошибка очистки', 'red');
  }
}

async function resetStats() {
  if (!confirm('Сбросить всю статистику? Карточки и группы останутся.')) return;
  await dbClear('cardStats');
  await dbClear('dailyStats');
  await dbClear('sessions');
  AppState.cardStats = new Map();
  invalidateAggCache();
  invalidateErrorCards();
  renderAll();
  buildStudyQueue();
  showToast('Статистика сброшена ✓');
}

// ===== STORAGE SAFETY =====
async function checkStorageWarning() {
  try {
    const seen = await dbGet('meta', 'storageWarningSeen');
    if (seen) return;
    if (AppState.cards.length < 3) return;
    await dbPut('meta', { id: 'storageWarningSeen', ts: Date.now() });
    showStorageBanner();
  } catch(e) {}
}

function showStorageBanner() {
  const banner = document.createElement('div');
  banner.style.cssText = `
    position:fixed;bottom:80px;left:12px;right:12px;z-index:300;
    background:var(--bg3);border:1px solid var(--accent);border-radius:14px;
    padding:14px 16px;display:flex;align-items:flex-start;gap:12px;
    box-shadow:0 4px 24px rgba(0,0,0,0.4);animation:slideUp 0.3s ease`;
  banner.innerHTML = `
    <i class="ph ph-floppy-disk" style="font-size:20px;flex-shrink:0"></i>
    <div style="flex:1;min-width:0">
      <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:4px">Сохраните резервную копию</div>
      <div style="font-size:12px;color:var(--text3);line-height:1.5">Браузер может очистить хранилище. Экспортируйте данные в Настройках чтобы не потерять прогресс.</div>
    </div>
    <button id="_sb_close" style="background:none;border:none;color:var(--text3);font-size:18px;cursor:pointer;flex-shrink:0;padding:0 0 0 4px;line-height:1">×</button>`;
  document.body.appendChild(banner);
  const t = setTimeout(() => banner.remove(), 12000);
  banner.querySelector('#_sb_close').addEventListener('click', () => { clearTimeout(t); banner.remove(); }, { once: true });
}

async function scheduleAutoBackupReminder() {
  try {
    const rec = await dbGet('meta', 'lastBackupReminder');
    const now = Date.now();
    const WEEK_MS = 7 * 24 * 3600 * 1000;
    if (rec && now - rec.ts < WEEK_MS) return;
    if (AppState.cards.length < 5) return;
    const firstRun = await dbGet('meta', 'firstRun');
    if (!firstRun) {
      await dbPut('meta', { id: 'firstRun', ts: now });
      return;
    }
    if (now - firstRun.ts < WEEK_MS) return;
    await dbPut('meta', { id: 'lastBackupReminder', ts: now });
    setTimeout(() => showBackupReminder(), 3000);
  } catch(e) {}
}

function showBackupReminder() {
  const banner = document.createElement('div');
  banner.style.cssText = `
    position:fixed;bottom:80px;left:12px;right:12px;z-index:300;
    background:var(--bg2);border:1px solid var(--accent-a30);border-radius:14px;
    padding:14px 16px;display:flex;align-items:flex-start;gap:12px;
    box-shadow:0 4px 24px rgba(0,0,0,0.4);animation:slideUp 0.3s ease`;
  banner.innerHTML = `
    <div style="font-size:20px;flex-shrink:0">🗂️</div>
    <div style="flex:1;min-width:0">
      <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:4px">Время сделать бэкап</div>
      <div style="font-size:12px;color:var(--text3);line-height:1.5">Прошла неделя — сохраните прогресс через Настройки → Экспорт данных.</div>
      <button id="_br_settings" style="margin-top:8px;background:var(--accent);color:var(--btn-primary-text);border:none;border-radius:8px;padding:6px 14px;font-size:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif">Перейти в настройки</button>
    </div>
    <button id="_br_close" style="background:none;border:none;color:var(--text3);font-size:18px;cursor:pointer;flex-shrink:0;padding:0 0 0 4px;line-height:1">×</button>`;
  document.body.appendChild(banner);
  const t = setTimeout(() => { if (banner.parentNode) banner.remove(); }, 20000);
  const close = () => { clearTimeout(t); banner.remove(); };
  banner.querySelector('#_br_close').addEventListener('click', close);
  banner.querySelector('#_br_settings').addEventListener('click', () => { showPage('settings'); close(); });
}

Object.assign(window, {
  SETTINGS_DEFAULTS, getSetting, putSetting,
  getCard, updateCard, deleteCard,
  openModal, closeModal,
  requestPersistentStorage, grantPersistence, dismissStorageWarning,
  tryPersistFromSettings, initPersistSettingsRow,
  checkStorageWarning, scheduleAutoBackupReminder,
  loadSettings, saveSettings,
  exportData, exportCardsOnly, exportGroup, openExportDrawer,
  importData, doImportReplace, doImportWordsOnly, doImportMergeHistory, clearData, resetStats,
  downloadBlob,
});
