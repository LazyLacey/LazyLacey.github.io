// ===== READY SCREEN =====
let _renderReadyInflight = false;
let _renderReadyPending  = false;
async function renderReadyScreen() {
  if (_renderReadyInflight) {
    _renderReadyPending = true;
    return;
  }
  _renderReadyPending = false;
  try {
  _renderReadyInflight = true;
  await getErrorCards(); // prime the cache before rendering
  const sel = document.getElementById('ready-group-select');
  if (!sel) return;
  const cur = sel.value;
  sel.innerHTML = '<option value="all">Все группы</option>' +
    AppState.groups.map(g => `<option value="${g.id}">${esc(g.name)}</option>`).join('');
  if (cur && [...sel.options].some(o => o.value === cur)) sel.value = cur;

  const gid = sel.value;
  AppState.studyFilter = gid === 'all' ? null : parseInt(gid) || null;
  const pool = AppState.studyFilter === null ? AppState.cards : AppState.cards.filter(c => String(c.groupId) === gid);
  const countEl = document.getElementById('ready-count-line');
  if (countEl) {
    if (pool.length === 0) {
      countEl.innerHTML = 'Нет карточек — добавьте слова';
    } else {
      buildStudyQueue();
      const real = AppState.studyQueue.length;
      const totalDue = pool.filter(c => isSrsOverdue(c)).length;
      const extra = totalDue > real ? ` <span style="color:var(--text3);font-weight:400">из ${totalDue}</span>` : '';
      countEl.innerHTML = real > 0
        ? `<strong>${real}</strong>${extra} ${real === 1 ? 'карточка' : real <= 4 ? 'карточки' : 'карточек'} к повторению сегодня`
        : 'На сегодня всё повторено 🎉';
    }
  }

  const rs  = document.getElementById('ready-screen');
  const ss  = document.getElementById('study-session');
  const nav = document.getElementsByTagName('nav')[0];
  if (rs) rs.classList.remove('hidden');
  if (ss) ss.style.display = 'none';
  if (nav) nav.style.display = 'flex';
  } finally {
    _renderReadyInflight = false;
    if (_renderReadyPending) renderReadyScreen();
  }
}

function toggleReadyOptions() {
  const opts = document.getElementById('ready-options');
  const isOpen = opts.dataset.open === '1';
  if (isOpen) {
    opts.style.display = 'none';
    opts.dataset.open = '0';
  } else {
    opts.style.display = 'flex';
    opts.style.flexDirection = 'column';
    opts.dataset.open = '1';
  }
}

let _updateReadyCountTimer = null;
function scheduleUpdateReadyCount() {
  clearTimeout(_updateReadyCountTimer);
  _updateReadyCountTimer = setTimeout(updateReadyCount, 50);
}

async function updateReadyCount() {
  const sel = document.getElementById('ready-group-select');
  if (!sel) return;
  const gid = sel.value;
  AppState.studyFilter = gid === 'all' ? null : parseInt(gid) || null;
  const pool = AppState.studyFilter === null ? AppState.cards : AppState.cards.filter(c => String(c.groupId) === gid);
  const el = document.getElementById('ready-count-line');
  if (!el) return;
  if (pool.length === 0) { el.innerHTML = 'Нет карточек — добавьте слова'; return; }
  if (AppState.studyMode === 'browse') {
    el.innerHTML = `<strong>${pool.length}</strong> ${pool.length === 1 ? 'карточка' : pool.length <= 4 ? 'карточки' : 'карточек'} для просмотра`;
  } else if (AppState.studyMode === 'marathon') {
    el.innerHTML = `<strong>${pool.length}</strong> ${pool.length === 1 ? 'карточка' : pool.length <= 4 ? 'карточки' : 'карточек'} — марафон без лимита`;
  } else if (AppState.studyMode === 'errors') {
    const errCards = await getErrorCards();
    el.innerHTML = errCards.length > 0 ? `<strong>${errCards.length}</strong> ${errCards.length === 1 ? 'карточка' : errCards.length <= 4 ? 'карточки' : 'карточек'} с ошибками` : 'Нет ошибок за последние ' + plural(AppState.settings.errorSessions, 'сессию', 'сессии', 'сессий') + ' 🎉';
  } else {
    buildStudyQueue();
    const real = AppState.studyQueue.length;
    const totalDue = pool.filter(c => isSrsOverdue(c)).length;
    const extra = totalDue > real ? ` <span style="color:var(--text3);font-weight:400">из ${totalDue}</span>` : '';
    el.innerHTML = real > 0 ? `<strong>${real}</strong>${extra} ${real === 1 ? 'карточка' : real <= 4 ? 'карточки' : 'карточек'} к повторению` : 'На сегодня всё повторено 🎉';
  }
}

const MODE_LABELS = {
  type:    'написать',
  choice:  'выбор',
  browse:  'просмотр',
  marathon:'марафон',
  errors:  'только ошибки',
};

function setReadyMode(mode) {
  AppState.studyMode = mode;
  document.getElementById('ready-mode-type').classList.toggle('active', mode === 'type');
  document.getElementById('ready-mode-choice').classList.toggle('active', mode === 'choice');
  document.getElementById('ready-mode-browse').classList.toggle('active', mode === 'browse');
  document.getElementById('ready-mode-marathon').classList.toggle('active', mode === 'marathon');
  document.getElementById('ready-mode-errors').classList.toggle('active', mode === 'errors');
  const marathonOpts = document.getElementById('marathon-input-options');
  if (marathonOpts) marathonOpts.style.display = mode === 'marathon' ? 'flex' : 'none';
  try { localStorage.setItem('lastStudyMode', mode); } catch(e) {}
  const label = document.getElementById('ready-mode-label');
  if (label) label.textContent = 'режим • ' + (MODE_LABELS[mode] || '');
  scheduleUpdateReadyCount();
}

function setMarathonInputMode(inputMode) {
  AppState.marathonInputMode = inputMode;
  try { localStorage.setItem('marathonInputMode', inputMode); } catch(e) {}
  const btnType   = document.getElementById('marathon-opt-type');
  const btnChoice = document.getElementById('marathon-opt-choice');
  if (btnType) {
    btnType.style.border      = inputMode === 'type' ? '1px solid var(--accent)' : '1px solid var(--border)';
    btnType.style.background  = inputMode === 'type' ? 'var(--accent-a15)' : 'transparent';
    btnType.style.color       = inputMode === 'type' ? 'var(--accent)' : 'var(--text3)';
    btnType.style.fontWeight  = inputMode === 'type' ? '600' : 'normal';
  }
  if (btnChoice) {
    btnChoice.style.border     = inputMode === 'choice' ? '1px solid var(--accent)' : '1px solid var(--border)';
    btnChoice.style.background = inputMode === 'choice' ? 'var(--accent-a15)' : 'transparent';
    btnChoice.style.color      = inputMode === 'choice' ? 'var(--accent)' : 'var(--text3)';
    btnChoice.style.fontWeight = inputMode === 'choice' ? '600' : 'normal';
  }
}

// ===== SESSION =====
let _startSessionInflight = false;
async function startSession() {
  if (_startSessionInflight) return;
  _startSessionInflight = true;
  try {
  const _uuid = (typeof crypto !== 'undefined' && crypto.randomUUID)
    ? crypto.randomUUID()
    : Date.now() + '_' + Math.random().toString(36).slice(2, 10);
  AppState.currentSessionId = _uuid;
  clearPersistedSession();
  const sel = document.getElementById('ready-group-select');
  const gid = sel.value;
  AppState.studyFilter = gid === 'all' ? null : parseInt(gid) || null;

  if (AppState.studyMode === 'browse') {
    const pool = AppState.studyFilter === null ? [...AppState.cards] : AppState.cards.filter(c => String(c.groupId) === String(AppState.studyFilter));
    if (pool.length === 0) { showToast('Нет карточек для просмотра'); return; }
    AppState.browseCards = pool.sort(() => Math.random() - 0.5);
    AppState.browseIndex = 0;
    document.getElementById('ready-screen').classList.add('hidden');
    const sess = document.getElementById('study-session');
    sess.style.display = 'flex';
    document.getElementsByTagName('nav')[0].style.display = 'none';
    renderBrowse();
    return;
  }
  if (AppState.studyMode === 'marathon') {
    const pool = AppState.studyFilter === null ? [...AppState.cards] : AppState.cards.filter(c => String(c.groupId) === String(AppState.studyFilter));
    if (pool.length === 0) { showToast('Нет карточек'); return; }
    const now = Date.now();
    const MS_PER_DAY = 86400000;
    pool.sort((a, b) => {
      const sa = AppState.cardStats.get(a.id);
      const sb = AppState.cardStats.get(b.id);
      const efA = sa?.srsEf ?? EF_DEFAULT;
      const efB = sb?.srsEf ?? EF_DEFAULT;
      const daysA = sa?.lastSeen ? (now - sa.lastSeen) / MS_PER_DAY : 999;
      const daysB = sb?.lastSeen ? (now - sb.lastSeen) / MS_PER_DAY : 999;
      const scoreA = efA / (1 + Math.min(daysA, 30) / 30);
      const scoreB = efB / (1 + Math.min(daysB, 30) / 30);
      return (scoreA - scoreB) + (Math.random() - 0.5) * 0.3;
    });
    AppState.studyQueue = pool; AppState.studyIndex = 0; AppState.sessionRetries = {}; AppState.sessionResults = [];
    document.getElementById('ready-screen').classList.add('hidden');
    document.getElementById('study-session').style.display = 'flex';
    document.getElementsByTagName('nav')[0].style.display = 'none';
    renderStudy(); return;
  }
  if (AppState.studyMode === 'errors') {
    const errCards = await getErrorCards();
    if (errCards.length === 0) { showToast('Нет ошибок за последние ' + plural(AppState.settings.errorSessions, 'сессию', 'сессии', 'сессий') + ' 🎉'); return; }
    AppState.studyQueue = errCards.sort(() => Math.random() - 0.5);
    AppState.studyIndex = 0; AppState.sessionRetries = {}; AppState.sessionResults = [];
    document.getElementById('ready-screen').classList.add('hidden');
    document.getElementById('study-session').style.display = 'flex';
    document.getElementsByTagName('nav')[0].style.display = 'none';
    renderStudy(); return;
  }

  buildStudyQueue();
  if (AppState.studyQueue.length === 0) { showToast('Нет карточек для изучения'); return; }
  document.getElementById('ready-screen').classList.add('hidden');
  const sess = document.getElementById('study-session');
  sess.style.display = 'flex';
  document.getElementsByTagName('nav')[0].style.display = 'none';
  AppState.sessionRetries = {};
  AppState.sessionResults = [];
  renderStudy();
  } finally {
    _startSessionInflight = false;
  }
}

function endSession() {
  invalidateErrorCards();
  saveSessionRecord();
  renderReadyScreen();
}

function persistSessionToStorage() {
  if (!AppState.currentSessionId || !AppState.sessionResults?.length) return;
  try {
    localStorage.setItem('pendingSession', JSON.stringify({
      sessionId: AppState.currentSessionId,
      date: localDateKey(),
      results: AppState.sessionResults.map(r => ({ id: r.card.id, correct: r.correct })),
    }));
  } catch(e) {}
}

function clearPersistedSession() {
  try { localStorage.removeItem('pendingSession'); } catch(e) {}
}

async function recoverPendingSession() {
  try {
    const raw = localStorage.getItem('pendingSession');
    if (!raw) return;
    const s = JSON.parse(raw);
    if (!s?.sessionId || !s?.results?.length) { clearPersistedSession(); return; }
    const total   = s.results.length;
    const correct = s.results.filter(r => r.correct).length;
    const errorIds = s.results.filter(r => !r.correct).map(r => r.id);
    await putSession({ sessionId: s.sessionId, date: s.date, total, correct, errorIds });
    clearPersistedSession();
    console.info(`Восстановлена незавершённая сессия: ${correct}/${total}`);
    setTimeout(() => showToast(`Сессия восстановлена: ${correct}/${total} ✓`), 1500);
  } catch(e) {
    clearPersistedSession();
  }
}

function saveSessionRecord() {
  if (AppState.sessionResults && AppState.sessionResults.length > 0) {
    const total    = AppState.sessionResults.length;
    const correct  = AppState.sessionResults.filter(r => r.correct).length;
    const errorIds = AppState.sessionResults.filter(r => !r.correct).map(r => r.card.id);
    putSession({
      sessionId: AppState.currentSessionId,
      date: localDateKey(),
      total, correct, errorIds,
    }).catch(e => console.warn('session write failed', e));
    AppState.sessionResults = [];
    clearPersistedSession();
  }
}

// ===== BROWSE MODE =====
function renderBrowse() {
  const area        = document.getElementById('flashcard-area');
  const counter     = document.getElementById('study-counter');
  const fill        = document.getElementById('study-progress-fill');
  const persistType = document.getElementById('persistent-type-area');
  const persistChoice = document.getElementById('persistent-choices-area');
  const btnNext     = document.getElementById('btn-next');

  persistType.style.display   = 'none';
  persistChoice.style.display = 'none';
  btnNext.style.display       = 'none';
  document.getElementById('feedback-text').textContent = '';

  const card = AppState.browseCards[AppState.browseIndex];
  const g = AppState.groups.find(x => x.id === card.groupId);
  counter.textContent = `${AppState.browseIndex + 1} / ${AppState.browseCards.length}`;
  fill.style.width = `${(AppState.browseIndex + 1) / AppState.browseCards.length * 100}%`;

  area.innerHTML = `
    <div class="flip-card-wrap" onclick="this.querySelector('.flip-card').classList.toggle('flipped')">
      <div class="flip-card">
        <div class="flip-card-front">
          ${g ? `<div class="card-group-tag">${esc(g.name)}</div>` : ''}
          <div class="flip-hint">Нажмите чтобы показать перевод</div>
          <div class="flip-word">${esc(card.ru)}</div>
          ${card.note ? `<div class="flip-sub">${esc(card.note)}</div>` : ''}
        </div>
        <div class="flip-card-back">
          <div class="flip-hint">${currentLang().targetLabel}</div>
          <div class="flip-word" style="color:var(--accent)">${esc(card.ro)}</div>
        </div>
      </div>
    </div>
    <div class="flip-nav">
      ${AppState.browseIndex > 0
        ? `<button class="flip-nav-btn" onclick="event.stopPropagation();AppState.browseIndex--;renderBrowse()">← Назад</button>`
        : `<button class="flip-nav-btn" style="opacity:0.3" disabled>← Назад</button>`}
      ${AppState.browseIndex < AppState.browseCards.length - 1
        ? `<button class="flip-nav-btn primary" onclick="event.stopPropagation();AppState.browseIndex++;renderBrowse()">Вперёд →</button>`
        : `<button class="flip-nav-btn primary" onclick="event.stopPropagation();endSession()">Готово ✓</button>`}
    </div>`;
}

// ===== TYPE/CHOICE MODE =====
function keydownEvent(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const bc = document.getElementById('btn-check');
    const bn = document.getElementById('btn-next');
    if (bc && bc.style.display !== 'none') bc.click();
    else if (bn && bn.classList.contains('visible')) bn.click();
    return;
  }
  if (AppState._typeChecked) e.preventDefault();
}

function inputEvent() {
  if (AppState._typeChecked) {
    const card = AppState.studyQueue[AppState.studyIndex];
    const inp = document.getElementById('type-answer');
    if (!inp || !card) return;
    inp.value = AppState._typeCheckedValue ?? '';
  }
}

function renderStudy() {
  const area         = document.getElementById('flashcard-area');
  const empty        = document.getElementById('study-empty');
  const counter      = document.getElementById('study-counter');
  const fill         = document.getElementById('study-progress-fill');
  const persistType  = document.getElementById('persistent-type-area');
  const persistChoice= document.getElementById('persistent-choices-area');
  const btnNext      = document.getElementById('btn-next');
  const feedbackText = document.getElementById('feedback-text');

  if (AppState.studyQueue.length === 0) {
    area.innerHTML = '';
    area.appendChild(empty);
    empty.style.display = 'flex';
    counter.textContent = '0 / 0';
    fill.style.width = '0%';
    persistType.style.display   = 'none';
    persistChoice.style.display = 'none';
    btnNext.style.display       = 'none';
    feedbackText.textContent    = '';
    if (AppState.cards.length > 0) {
      empty.innerHTML = `<div style="font-size:48px;opacity:0.4">🎉</div>
        <div style="font-family:'Syne',sans-serif;font-size:20px;font-weight:700;color:var(--text2)">На сегодня всё!</div>
        <div style="font-size:14px;color:var(--text3);max-width:260px;line-height:1.6">Все карточки повторены. Возвращайтесь завтра.</div>`;
    }
    return;
  }

  const card = AppState.studyQueue[AppState.studyIndex];
  const g = AppState.groups.find(x => x.id === card.groupId);
  counter.textContent = `${AppState.studyIndex + 1} / ${AppState.studyQueue.length}`;
  fill.style.width = `${AppState.studyIndex / AppState.studyQueue.length * 100}%`;

  area.innerHTML = `<div class="flashcard">
    ${g ? `<div class="card-group-tag">${esc(g.name)}</div>` : ''}
    <div class="card-question-label">Как по-${currentLang().targetLabel.toLowerCase()}?</div>
    <div class="card-question">${esc(card.ru)}</div>
    ${card.note ? `<div class="card-hint">${esc(card.note)}</div>` : ''}
    ${AppState.settings.hardMode && AppState.studyMode === 'type' ? `<div class="card-hint" style="margin-top:10px;color:var(--red);opacity:0.7;font-size:12px"><i class="ph ph-fire"></i> Hard mode: диакритика обязательна</div>` : ''}
  </div>`;

  btnNext.classList.remove('visible');
  btnNext.style.display = '';
  feedbackText.textContent = '';

  if (AppState.studyMode === 'type' || (AppState.studyMode === 'marathon' && AppState.marathonInputMode === 'type')) {
    persistChoice.style.display = 'none';
    persistType.style.display   = 'block';
    const inp     = document.getElementById('type-answer');
    const btnCheck= document.getElementById('btn-check');
    const reveal  = document.getElementById('answer-reveal');
    inp.value     = '';
    inp.className = 'type-input';
    inp.readOnly  = false;
    AppState._typeChecked      = false;
    AppState._typeCheckedValue = '';
    btnCheck.style.display = '';
    reveal.style.display   = 'none';
    reveal.innerHTML       = '';
    inp.focus();
  } else {
    persistType.style.display   = 'none';
    persistChoice.style.display = 'grid';
    persistChoice.className     = 'choices-grid';
    const choices = buildChoices(card);
    persistChoice.innerHTML = choices.map((ch, i) =>
      `<button class="choice-btn" id="choice-${i}">${esc(ch)}</button>`
    ).join('');
    choices.forEach((ch, i) => {
      document.getElementById('choice-' + i).addEventListener('click', () => checkChoice(i, ch));
    });
  }
}

function buildChoices(card) {
  const pool = AppState.cards.filter(c => c.id !== card.id && c.ro !== card.ro);
  const distractors = [...pool].sort(() => Math.random() - 0.5).slice(0, 3).map(c => c.ro);
  return [...distractors, card.ro].sort(() => Math.random() - 0.5);
}

// ===== ANSWER CHECKING =====
async function checkTypeAnswer() {
  const btn    = document.getElementById('btn-check');
  if (!btn || btn.disabled) return;
  btn.disabled = true;
  const inp    = document.getElementById('type-answer');
  const reveal = document.getElementById('answer-reveal');
  const next   = document.getElementById('btn-next');
  const card   = AppState.studyQueue[AppState.studyIndex];
  const answer = inp.value.trim().toLowerCase();
  const correct= card.ro.toLowerCase();

  const normalize = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  const isCorrect = AppState.settings.hardMode
    ? answer === correct
    : answer === correct || normalize(answer) === normalize(correct);

  let similarity = null;
  if (!isCorrect) {
    const normA = normalize(answer);
    const normC = normalize(correct);
    const maxLen = Math.max(normA.length, normC.length);
    if (maxLen > 0) {
      let matches = 0;
      for (let i = 0; i < Math.min(normA.length, normC.length); i++) {
        if (normA[i] === normC[i]) matches++;
      }
      similarity = matches / maxLen;
    }
  }

  const isRetry = !!AppState.sessionRetries[card.id];
  if (!isRetry) await updateCardStats(card.id, isCorrect, similarity);
  if (!isRetry) AppState.sessionResults.push({card: {...card}, correct: isCorrect});
  persistSessionToStorage();
  if (document.getElementById('page-stats').classList.contains('active')) renderStats();

  if (isCorrect) {
    inp.classList.add('correct');
    inp.value = card.ro;
    reveal.style.display = 'none';
    showToast('Правильно! ✓', 'green');
  } else {
    inp.classList.add('wrong');
    reveal.style.display = 'block';
    reveal.innerHTML = diffHighlightInline(inp.value.trim(), card.ro, AppState.settings.hardMode);
    showToast('Неверно', 'red');
    scheduleRetry(card);
  }

  btn.style.display = 'none';
  btn.disabled = false;
  next.classList.add('visible');
  AppState._typeCheckedValue = inp.value;
  AppState._typeChecked = true;
  inp.focus();
}

async function checkChoice(idx, chosen) {
  document.querySelectorAll('.choice-btn').forEach(b => { b.disabled = true; b.onclick = null; });
  const card = AppState.studyQueue[AppState.studyIndex];
  const isCorrect = chosen === card.ro;
  const isRetry2 = !!AppState.sessionRetries[card.id];
  if (!isRetry2) await updateCardStats(card.id, isCorrect);
  if (!isRetry2) AppState.sessionResults.push({card: {...card}, correct: isCorrect});
  persistSessionToStorage();
  if (document.getElementById('page-stats').classList.contains('active')) renderStats();

  const next = document.getElementById('btn-next');
  document.querySelectorAll('.choice-btn').forEach(b => {
    if (b.textContent === card.ro) b.classList.add('reveal-correct');
  });
  const clicked = document.getElementById('choice-' + idx);
  if (isCorrect) {
    clicked.classList.add('selected-correct');
    showToast('Правильно! ✓', 'green');
  } else {
    clicked.classList.add('selected-wrong');
    showToast('Неверно', 'red');
    scheduleRetry(card);
  }
  next.classList.add('visible');
}

async function updateCardStats(id, correct, similarity = null) {
  const date = localDateKey();
  const stats = getCardStats(id);

  const srs = srsNextReview(stats, correct, similarity);
  stats.shows++;
  stats.correct += correct ? 1 : 0;
  stats.srsLevel    = srs.srsLevel;
  stats.srsEf       = srs.srsEf;
  stats.srsInterval = srs.srsInterval;
  stats.nextReview  = srs.nextReview;
  stats.lastSeen    = Date.now();

  await putCardStats(stats);
  putDailyStats(date, 1, correct ? 1 : 0).catch(e => console.warn('dailyStats write failed', e));
}

function scheduleRetry(card) {
  if (AppState.studyMode === 'marathon') return;
  const retries = AppState.sessionRetries[card.id] || 0;
  if (retries >= 2) return;
  AppState.sessionRetries[card.id] = retries + 1;
  const remaining = AppState.studyQueue.length - AppState.studyIndex - 1;
  const minOffset = remaining >= 2 ? 2 : Math.max(remaining, 1);
  const spread    = Math.max(remaining - minOffset + 1, 1);
  const insertAt  = AppState.studyIndex + minOffset + Math.floor(Math.random() * spread);
  AppState.studyQueue.splice(Math.min(insertAt, AppState.studyQueue.length), 0, card);
}

async function nextCard() {
  AppState.studyIndex++;
  if (AppState.studyIndex >= AppState.studyQueue.length) {
    document.getElementById('study-session').style.display = 'none';
    if (AppState.settings.showSummary && AppState.sessionResults.length > 0) {
      let prevBest = 0;
      try { prevBest = await getBestAccuracy(); } catch(e) {}
      await showSessionSummary(AppState.sessionResults, prevBest);
    } else {
      endSession();
      showToast('Сессия завершена! 🎉');
    }
    return;
  }
  renderStudy();
}

// ===== SESSION SUMMARY =====
async function showSessionSummary(results, prevBest = 0) {
  const overlay = document.getElementById('session-summary');
  overlay.style.display = 'flex';

  const total   = results.length;
  const correct = results.filter(r => r.correct).length;
  const wrong   = results.filter(r => !r.correct);
  const pct     = total > 0 ? Math.round(correct / total * 100) : 0;

  let emoji = '🎉', title = 'Отлично!',         sub = 'Так держать!';
  if (pct < 50) { emoji = '💪'; title = 'Есть куда расти'; sub = 'Повторите сложные слова'; }
  else if (pct < 80) { emoji = '👍'; title = 'Неплохо!'; sub = 'Продолжайте практиковаться'; }

  const mistakesHtml = wrong.length === 0
    ? `<div style="padding:0 20px 28px;text-align:center;color:var(--green);font-size:14px">Все слова без ошибок! ✓</div>`
    : `<div class="summary-section-label">Допущены ошибки</div>
       <div class="summary-mistakes">${wrong.map(r =>
         `<div class="summary-mistake-row">
           <div>
             <div class="summary-mistake-ro">${esc(r.card.ro)}</div>
             <div class="summary-mistake-ru">${esc(r.card.ru)}</div>
           </div>
           <div class="summary-mistake-badge">повторить</div>
         </div>`).join('')}
       </div>`;

  overlay.innerHTML = `
    <div class="summary-hero">
      <div class="summary-emoji">${emoji}</div>
      <div class="summary-title">${title}</div>
      <div class="summary-sub">${sub}</div>
    </div>
    <div class="summary-stats">
      <div class="summary-stat"><div class="summary-stat-val">${total}</div><div class="summary-stat-label">карточек</div></div>
      <div class="summary-stat"><div class="summary-stat-val green">${correct}</div><div class="summary-stat-label">правильно</div></div>
      <div class="summary-stat"><div class="summary-stat-val ${wrong.length > 0 ? 'red' : 'green'}">${wrong.length}</div><div class="summary-stat-label">ошибок</div></div>
    </div>
    ${mistakesHtml}
    <button class="summary-done-btn" onclick="dismissSummary()">Готово →</button>`;
  if (pct >= 80 && total >= 5 && pct > prevBest) {
    overlay.querySelector('.summary-sub').insertAdjacentHTML('afterend','<div class="record-badge new" style="margin:12px auto 0">🏆 Новый рекорд точности!</div>');
  }
}

function dismissSummary() {
  document.getElementById('session-summary').style.display = 'none';
  endSession();
}

Object.assign(window, {
  renderReadyScreen,
  toggleReadyOptions,
  updateReadyCount,
  setReadyMode,
  setMarathonInputMode,
  startSession,
  endSession,
  recoverPendingSession,
  renderBrowse,
  keydownEvent,
  inputEvent,
  checkTypeAnswer,
  nextCard,
  dismissSummary,
});
