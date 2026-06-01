const GTS = {
  topicId:   null,
  packDbId:  null,
  queue:     [],
  index:     0,
  correct:   0,
  answered:  false,
};

async function gtSaveProgress(packDbId, topicId, correct, total) {
  if (!testsDb) return;
  const pct = total > 0 ? Math.round(correct / total * 100) : 0;
  const key = `${packDbId}:${topicId || '__all__'}`;
  let rec = null;
  try { rec = await tdbGet('testProgress', key); } catch(e) {}
  const bestPct = Math.max(pct, rec && rec.bestPct != null ? rec.bestPct : 0);
  await tdbPut('testProgress', {
    id: key, packDbId, topicId: topicId || '__all__',
    lastScore: correct, lastTotal: total, lastPct: pct,
    lastDate: localDateKey(), bestPct,
  });
}

async function gtGetAllProgress() {
  if (!testsDb) return [];
  try { return await tdbGetAll('testProgress'); } catch(e) { return []; }
}

async function gtGetPacks() {
  if (!testsDb) return [];
  try { return await tdbGetAll('testPacks'); } catch(e) { return []; }
}

function validateTestPack(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return 'Неверный формат';
  if (data.type !== 'testPack') return 'Поле type должно быть "testPack"';
  if (!data.name || typeof data.name !== 'string') return 'Нет поля name';
  if (!Array.isArray(data.questions) || data.questions.length === 0) return 'Поле questions должно быть непустым массивом';
  for (const q of data.questions) {
    if (!q.question) return 'У вопроса нет поля question';
    if (!q.type || !['choice','fill','form'].includes(q.type)) return `Неверный тип вопроса: ${q.type}`;
    if (q.type === 'choice' && (!Array.isArray(q.options) || q.options.length < 2)) return 'У choice-вопроса нет вариантов';
    if (!q.answer) return 'У вопроса нет поля answer';
  }
  return null;
}

async function importTestPack() {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = '.json';
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    let data;
    try { data = JSON.parse(await file.text()); } catch {
      showToast('Файл повреждён или не является JSON', 'red'); return;
    }

    if (data.type === 'testBackup') {
      await importTestsBackup(data); return;
    }

    const err = validateTestPack(data);
    if (err) { showToast(err, 'red'); return; }

    let existingId = null;
    try {
      const packs = await tdbGetAll('testPacks');
      const ex = packs.find(p => p.name === data.name);
      if (ex) existingId = ex.id;
    } catch(e) {}

    const pack = {
      name: data.name,
      icon: data.icon || '📝',
      description: data.description || '',
      topics: data.topics || {},
      questions: data.questions,
      loadedAt: Date.now(),
    };
    if (existingId !== null) pack.id = existingId;

    await tdbPut('testPacks', pack);
    showToast(`Набор «${pack.name}» загружен (${plural(pack.questions.length, 'вопрос', 'вопроса', 'вопросов')}) ✓`, 'green');
    renderGrammarTestsHome();
  };
  input.click();
}

async function deleteTestPack(packDbId) {
  if (!confirm('Удалить этот набор тестов? Прогресс по нему тоже будет удалён.')) return;
  try {
    await tdbDelete('testPacks', packDbId);
    const allProgress = await tdbGetAll('testProgress');
    for (const p of allProgress) {
      if (p.packDbId === packDbId) {
        try { await tdbDelete('testProgress', p.id); } catch(e) {}
      }
    }
    showToast('Набор удалён ✓');
    renderGrammarTestsHome();
  } catch(e) { showToast('Ошибка удаления', 'red'); }
}

async function exportTestPackById(dbId) {
  try {
    const pack = await tdbGet('testPacks', dbId);
    if (!pack) { showToast('Набор не найден', 'red'); return; }
    const out = {
      type: 'testPack',
      name: pack.name,
      icon: pack.icon || '📝',
      description: pack.description || '',
      topics: pack.topics || {},
      questions: pack.questions,
    };
    downloadBlob(JSON.stringify(out, null, 2), `tests-${pack.name.replace(/\s+/g,'-').toLowerCase()}.json`);
  } catch(e) { showToast('Ошибка', 'red'); }
}

async function exportTestsBackup() {
  const packs = await gtGetPacks();
  const progress = await gtGetAllProgress();
  const date = new Date().toISOString().slice(0, 10);
  const out = { type: 'testBackup', version: 1, exported: date, packs, progress };
  downloadBlob(JSON.stringify(out, null, 2), `tests-backup-${date}.json`);
}

async function importTestsBackup(data) {
  if (!data.packs && !data.progress) { showToast('Файл бэкапа не содержит данных', 'red'); return; }
  let packsAdded = 0;
  const existing = await tdbGetAll('testPacks');
  const nameToId = {};
  for (const p of existing) nameToId[p.name] = p.id;

  for (const pack of (data.packs || [])) {
    if (!pack.name || !Array.isArray(pack.questions)) continue;
    const { id: _drop, ...p } = pack;
    if (nameToId[p.name] !== undefined) p.id = nameToId[p.name];
    await tdbPut('testPacks', p);
    packsAdded++;
  }
  let progressAdded = 0;
  for (const prog of (data.progress || [])) {
    if (!prog.id) continue;
    await tdbPut('testProgress', prog);
    progressAdded++;
  }
  showToast(`Бэкап загружен: ${plural(packsAdded, 'набор', 'набора', 'наборов')}, ${plural(progressAdded, 'запись', 'записи', 'записей')} прогресса ✓`, 'green');
  renderGrammarTestsHome();
}

let _renderGTHomeInflight = false;
let _renderGTHomePending  = false;
async function renderGrammarTestsHome() {
  if (_renderGTHomeInflight) { _renderGTHomePending = true; return; }
  _renderGTHomePending = false;
  _renderGTHomeInflight = true;
  try {
  _gtExitSession();
  const c = document.getElementById('grammar-tests-container');

  const packs = await gtGetPacks();
  const allProgress = await gtGetAllProgress();

  const progressMap = {};
  for (const p of allProgress) progressMap[p.id] = p;

  function progressBadge(packDbId, topicId) {
    const key = `${packDbId}:${topicId || '__all__'}`;
    const p = progressMap[key];
    if (!p) return '';
    const color = p.bestPct >= 80 ? 'var(--green)' : p.bestPct >= 50 ? 'var(--accent)' : 'var(--text3)';
    return `<span style="font-size:11px;color:${color};opacity:0.85;white-space:nowrap;margin-left:2px">${p.bestPct}%</span>`;
  }

  let packsHTML = '';
  for (const pack of packs) {
    const byTopic = {};
    for (const q of pack.questions) {
      const tid = q.topicId || '__default__';
      if (!byTopic[tid]) byTopic[tid] = [];
      byTopic[tid].push(q);
    }
    const topicIds = Object.keys(byTopic);
    const hasTopics = topicIds.length > 1 || (topicIds.length === 1 && topicIds[0] !== '__default__');

    let topicBtns = '';
    if (hasTopics) {
      topicBtns = topicIds.map(tid => {
        const topicMeta = (pack.topics && pack.topics[tid]) || { name: tid, icon: '📝' };
        return `<button class="gt-topic-btn" onclick="startGrammarTest('${esc(tid)}', ${pack.id})" style="padding-left:20px">
          <div class="gt-topic-icon" style="font-size:16px">${topicMeta.icon || '📝'}</div>
          <div class="gt-topic-info">
            <div class="gt-topic-name" style="font-size:14px">${esc(topicMeta.name || tid)}</div>
            <div class="gt-topic-count">${plural(byTopic[tid].length, 'вопрос', 'вопроса', 'вопросов')}</div>
          </div>
          ${progressBadge(pack.id, tid)}
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--text3)" stroke-width="2" width="14" height="14"><path d="M9 18l6-6-6-6"/></svg>
        </button>`;
      }).join('');
    }

    const allBadge = progressBadge(pack.id, null);
    packsHTML += `
      <div style="padding:12px 0 6px;display:flex;align-items:center;justify-content:space-between">
        <div style="font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--text3);font-weight:600">${esc(pack.icon || '📝')} ${esc(pack.name)}</div>
        <div style="display:flex;gap:6px;align-items:center">
          <button onclick="exportTestPackById(${pack.id})" title="Экспортировать" style="background:none;border:none;color:var(--text3);font-size:12px;cursor:pointer;padding:2px 5px;opacity:0.7">↓</button>
          <button onclick="deleteTestPack(${pack.id})" title="Удалить" style="background:none;border:none;color:var(--red);font-size:12px;cursor:pointer;padding:2px 5px;opacity:0.5">✕</button>
        </div>
      </div>
      ${!hasTopics ? `<button class="gt-topic-btn" onclick="startGrammarTest(null, ${pack.id})" style="border-color:var(--accent-a20);background:var(--accent-a08)">
        <div class="gt-topic-icon">${esc(pack.icon || '📝')}</div>
        <div class="gt-topic-info">
          <div class="gt-topic-name" style="color:var(--accent)">${esc(pack.name)}</div>
          <div class="gt-topic-count">${plural(pack.questions.length, 'вопрос', 'вопроса', 'вопросов')}${pack.description ? ' · ' + esc(pack.description) : ''}</div>
        </div>
        ${allBadge}
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" width="16" height="16"><path d="M9 18l6-6-6-6"/></svg>
      </button>` : ''}
      ${topicBtns}`;
  }

  c.innerHTML = `
      ${packs.length === 0 ?
      emptyState('📋', 'Нет тестов', '<span onclick="importTestPack()" role="button" aria-role="button" class="upload-tests-fake-link">Загрузите</span> JSON-файл с тестами чтобы начать')
      :
      `<div class="gt-wrap">
        <div class="gt-topics">
          ${packsHTML}
          <div class="gt-action-bar">
          <button class="gt-action-btn" onclick="importTestPack()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 5 17 10"/><line x1="12" y1="5" x2="12" y2="17"/></svg>
            Загрузить тесты
          </button>
        <span class="gt-action-sep"></span>
        <button class="gt-action-btn" onclick="exportTestsBackup()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Бэкап
        </button>
      </div>
    </div>
  </div>`
}`
  } finally {
    _renderGTHomeInflight = false;
    if (_renderGTHomePending) renderGrammarTestsHome();
  }
}

function switchGrammarTab(tab) {
  const rulesContainer = document.getElementById('grammar-container');
  const testsContainer = document.getElementById('grammar-tests-container');
  const verbsContainer = document.getElementById('grammar-verbs-container');
  const tabRules = document.getElementById('gr-tab-rules');
  const tabTests = document.getElementById('gr-tab-tests');
  const tabVerbs = document.getElementById('gr-tab-verbs');
  rulesContainer.style.display = tab === 'rules' ? 'flex' : 'none';
  testsContainer.style.display = tab === 'tests' ? 'flex' : 'none';
  verbsContainer.style.display = tab === 'verbs' ? 'flex' : 'none';
  tabRules.classList.toggle('active', tab === 'rules');
  tabTests.classList.toggle('active', tab === 'tests');
  tabVerbs.classList.toggle('active', tab === 'verbs');
  if (tab === 'tests') renderGrammarTestsHome();
  if (tab === 'verbs') renderVerbsHome();
}

function _gtEnterSession() {
  document.getElementsByTagName('nav')[0].style.display = 'none';
  const tabs = document.getElementById('gr-tabs');
  if (tabs) tabs.style.display = 'none';
  const hdr = document.querySelector('#page-grammar .page-header');
  if (hdr) hdr.style.display = 'none';
}

function _gtExitSession() {
  document.getElementsByTagName('nav')[0].style.display = 'flex';
  const tabs = document.getElementById('gr-tabs');
  if (tabs) tabs.style.display = '';
  const hdr = document.querySelector('#page-grammar .page-header');
  if (hdr) hdr.style.display = '';
}

async function startGrammarTest(topicId, packDbId) {
  if (!packDbId) { showToast('Набор не найден', 'red'); return; }
  const pack = await tdbGet('testPacks', packDbId);
  if (!pack) { showToast('Набор не найден', 'red'); return; }

  const pool = topicId
    ? pack.questions.filter(q => q.topicId === topicId)
    : [...pack.questions];

  if (pool.length === 0) { showToast('Нет вопросов для этой темы', 'red'); return; }

  GTS.topicId  = topicId;
  GTS.packDbId = packDbId;
  GTS.queue    = pool.sort(() => Math.random() - 0.5);
  GTS.index    = 0;
  GTS.correct  = 0;
  GTS.answered = false;

  _gtEnterSession();
  renderGrammarTestQuestion();
}

function renderGrammarTestQuestion() {
  const c   = document.getElementById('grammar-tests-container');
  const q   = GTS.queue[GTS.index];
  const tot = GTS.queue.length;
  const pct = (GTS.index / tot * 100).toFixed(1);

  const typeLabel = q.type === 'choice' ? 'Выбор ответа' : 'Впишите ответ';

  let answerHTML = '';
  if (q.type === 'choice') {
    answerHTML = `<div class="gt-choices">${
      q.options.map((opt, i) =>
        `<button class="gt-choice" id="gt-choice-${i}" onclick="checkGTChoice(${i})">${esc(opt)}</button>`
      ).join('')
    }</div>`;
  } else {
    answerHTML = `<div class="gt-fill-wrap">
      <input class="gt-fill-input" id="gt-fill-input" type="text"
        placeholder="Введите ответ..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
        onkeydown="if(event.key==='Enter')checkGTFill()">
      <button class="gt-check-btn" id="gt-check-btn" onclick="checkGTFill()">Проверить</button>
    </div>`;
  }

  c.innerHTML = `<div class="gt-wrap">
    <div class="study-header">
      <div class="study-counter">${GTS.index + 1} / ${tot}</div>
      <div class="study-progress"><div class="study-progress-fill" style="width:${pct}%"></div></div>
      <button class="btn-icon" onclick="renderGrammarTestsHome()" title="Завершить">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="gt-quiz" id="gt-quiz">
      <div class="gt-quiz-counter" style="color:var(--text3);font-size:12px;padding:10px 16px 0">
        ✓ <span style="color:var(--green)">${GTS.correct}</span> правильно · ${GTS.index - GTS.correct} ошибок
      </div>
      <div class="gt-question-card">
        <div class="gt-question-type">${typeLabel}</div>
        <div class="gt-question-text">${esc(q.question)}</div>
        ${q.prompt ? `<div class="gt-question-prompt">${esc(q.prompt)}</div>` : ''}
      </div>
      <div class="gt-answer-area">
        ${answerHTML}
        <div class="gt-explain" id="gt-explain"></div>
      </div>
    </div>
    <button class="gt-next-btn" id="gt-next-btn" onclick="nextGTQuestion()">
      ${GTS.index + 1 < tot ? 'Следующий вопрос →' : 'Завершить тест ✓'}
    </button>
  </div>`;

  if (q.type !== 'choice') {
    setTimeout(() => { const inp = document.getElementById('gt-fill-input'); if (inp) inp.focus(); }, 80);
  }
}

function showGTResult(isCorrect) {
  const q = GTS.queue[GTS.index];
  const explainEl = document.getElementById('gt-explain');
  const nextBtn   = document.getElementById('gt-next-btn');
  GTS.answered = true;

  const correctStr = Array.isArray(q.answer) ? q.answer[0] : q.answer;

  if (explainEl) {
    explainEl.innerHTML = `<strong>${isCorrect ? '✓ Верно!' : '✗ Неверно. Правильно: ' + esc(correctStr)}</strong>${q.explain ? '<br>' + esc(q.explain) : ''}`;
    explainEl.style.borderLeft = `3px solid ${isCorrect ? 'var(--green)' : 'var(--red)'}`;
    explainEl.classList.add('visible');
  }
  if (nextBtn) nextBtn.classList.add('visible');
}

function checkGTChoice(idx) {
  if (GTS.answered) return;
  const q = GTS.queue[GTS.index];
  const selected = q.options[idx];
  const isCorrect = selected === q.answer;
  if (isCorrect) GTS.correct++;

  q.options.forEach((_, i) => {
    const btn = document.getElementById('gt-choice-' + i);
    if (!btn) return;
    btn.disabled = true;
    if (q.options[i] === q.answer) btn.classList.add('reveal');
  });
  const selBtn = document.getElementById('gt-choice-' + idx);
  if (selBtn) {
    selBtn.classList.remove('reveal');
    selBtn.classList.add(isCorrect ? 'correct' : 'wrong');
  }

  showGTResult(isCorrect);
}

function checkGTFill() {
  if (GTS.answered) return;
  const inp = document.getElementById('gt-fill-input');
  const checkBtn = document.getElementById('gt-check-btn');
  if (!inp) return;

  const q = GTS.queue[GTS.index];
  const userVal = inp.value.trim().toLowerCase();
  const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
  const normalize = s => s.toLowerCase().trim().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const isCorrect = answers.some(a => normalize(userVal) === normalize(a));

  if (isCorrect) GTS.correct++;
  inp.classList.add(isCorrect ? 'correct' : 'wrong');
  inp.readOnly = true;
  if (checkBtn) checkBtn.disabled = true;

  showGTResult(isCorrect);
}

async function nextGTQuestion() {
  GTS.index++;
  GTS.answered = false;
  if (GTS.index >= GTS.queue.length) {
    renderGrammarTestResults();
  } else {
    renderGrammarTestQuestion();
  }
}

async function renderGrammarTestResults() {
  const c   = document.getElementById('grammar-tests-container');
  const tot = GTS.queue.length;
  const pct = Math.round(GTS.correct / tot * 100);
  await gtSaveProgress(GTS.packDbId, GTS.topicId, GTS.correct, tot);

  let topicLabel = 'Все темы';
  if (GTS.topicId && GTS.packDbId) {
    try {
      const pack = await tdbGet('testPacks', GTS.packDbId);
      const meta = pack && pack.topics && pack.topics[GTS.topicId];
      topicLabel = meta ? `${meta.icon || ''} ${meta.name}`.trim() : GTS.topicId;
    } catch(e) {}
  } else if (GTS.packDbId) {
    try {
      const pack = await tdbGet('testPacks', GTS.packDbId);
      if (pack) topicLabel = `${pack.icon || ''} ${pack.name} — всё`.trim();
    } catch(e) {}
  }

  const grade = pct >= 90 ? 'A' : pct >= 75 ? 'B+' : pct >= 60 ? 'B' : pct >= 45 ? 'C' : 'D';
  c.innerHTML = `<div class="gt-wrap">
    <div class="study-header">
      <div class="study-counter">${GTS.correct} / ${tot}</div>
      <div class="study-progress"><div class="study-progress-fill" style="width:100%"></div></div>
      <button class="btn-icon" onclick="renderGrammarTestsHome()" title="Закрыть">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="gt-results">
      <div class="gt-results-eyebrow">Результат теста</div>
      <div class="gt-results-main-row">
        <div class="gt-results-score-big">${GTS.correct}<span>/${tot}</span></div>
        <div class="gt-results-grade">${grade}</div>
      </div>
      <div class="gt-results-sub">${esc(topicLabel)}</div>
      <table class="gt-results-table">
        <tr><td>Верных ответов</td><td style="color:var(--green)">${GTS.correct}</td></tr>
        <tr><td>Ошибок</td><td style="color:var(--red)">${tot - GTS.correct}</td></tr>
        <tr><td>Точность</td><td style="color:var(--accent)">${pct}%</td></tr>
      </table>
      <div class="gt-results-btns">
        <button class="gt-results-btn-primary" onclick="startGrammarTest(GTS.topicId, GTS.packDbId)">Пройти ещё раз</button>
        <div class="gt-results-btns-secondary">
          <button class="gt-results-btn-secondary" onclick="renderGrammarTestsHome()">Выбрать тему</button>
          <button class="gt-results-btn-secondary" onclick="renderGrammarTestsHome();switchGrammarTab('rules')">← Правила</button>
        </div>
      </div>
    </div>
  </div>`;
}

Object.assign(window, {
  GTS,
  importTestPack, deleteTestPack,
  exportTestPackById, exportTestsBackup,
  renderGrammarTestsHome, switchGrammarTab,
  startGrammarTest,
  checkGTChoice, checkGTFill, nextGTQuestion,
});
