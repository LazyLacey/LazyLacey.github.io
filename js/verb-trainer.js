const VTS = {
  packId: null, verbId: null, tense: null,
  queue: [], index: 0, correct: 0, answered: false,
};

const TENSE_LABELS = { prezent: 'Prezent', trecut: 'Trecut', viitor: 'Viitor' };
const TENSE_HINTS = { '현재': 'настоящее', '과거': 'прошедшее', '미래': 'будущее' };
const PRONOUN_HINTS = { '합쇼체': 'официальный', '해요체': 'вежливый', '해체': 'неформальный' };

async function vbSaveProgress(packId, verbId, tense, correct, total) {
  if (!verbsDb) return;
  const key = `${packId}:${verbId}:${tense}`;
  const pct = total > 0 ? Math.round(correct / total * 100) : 0;
  let rec = null;
  try { rec = await vdbGet('verbProgress', key); } catch(e) {}
  const bestPct = Math.max(pct, rec && rec.bestPct != null ? rec.bestPct : 0);
  await vdbPut('verbProgress', { id: key, packId, verbId, tense, lastPct: pct, bestPct, lastDate: localDateKey() });
}

async function vbGetProgress(packId) {
  if (!verbsDb) return {};
  const all = await vdbGetAll('verbProgress');
  const map = {};
  for (const p of all) if (p.packId === packId) map[p.id] = p;
  return map;
}

async function exportVerbPackById(packId) {
  try {
    const pack = await vdbGet('verbPacks', packId);
    if (!pack) { showToast('Набор не найден', 'red'); return; }
    const { id: _drop, ...out } = pack;
    downloadBlob(JSON.stringify(out, null, 2), `verbs-${(pack.name||'pack').replace(/\s+/g,'-').toLowerCase()}.json`);
  } catch(e) { showToast('Ошибка экспорта', 'red'); }
}

async function exportVerbsBackup() {
  const packs = await vdbGetAll('verbPacks').catch(()=>[]);
  const progress = await vdbGetAll('verbProgress').catch(()=>[]);
  const date = new Date().toISOString().slice(0, 10);
  const out = { type: 'verbBackup', version: 1, exported: date, packs, progress };
  downloadBlob(JSON.stringify(out, null, 2), `verbs-backup-${date}.json`);
}

async function renderVerbsHome() {
  _vbExitSession();
  const c = document.getElementById('grammar-verbs-container');

  const packs = await vdbGetAll('verbPacks').catch(() => []);

  if (packs.length === 0) {
    c.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔤</div>
        <div class="empty-title">Нет наборов глаголов</div>
        <div class="empty-sub"><span onclick="importVerbPack()" role="button" class="upload-tests-fake-link">Загрузите</span> JSON-файл с глаголами чтобы начать</div>
      </div>
      <input type="file" id="vb-import-file" accept=".json" style="display:none" onchange="importVerbPackFile(event)">`;
    return;
  }

  let packsHTML = '';
  for (const pack of packs) {
    const progress = await vbGetProgress(pack.id);
    packsHTML += `<div style="padding:12px 0 6px;display:flex;align-items:center;justify-content:space-between">
      <div style="font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--text3);font-weight:600">${esc(pack.icon||'🔤')} ${esc(pack.name)}</div>
      <div style="display:flex;gap:6px;align-items:center">
        <button onclick="exportVerbPackById(${pack.id})" title="Экспортировать" style="background:none;border:none;color:var(--text3);font-size:12px;cursor:pointer;padding:2px 5px;opacity:0.7">↓</button>
        <button onclick="deleteVerbPack(${pack.id})" title="Удалить" style="background:none;border:none;color:var(--red);font-size:12px;cursor:pointer;padding:2px 5px;opacity:0.5">✕</button>
      </div>
    </div>`;
    for (const verb of pack.verbs) {
      const tenses = Object.keys(verb.forms);
      const bests = tenses.map(t => {
        const p = progress[`${pack.id}:${verb.id}:${t}`];
        return p ? p.bestPct : 0;
      });
      const hasSome = bests.some((_, i) => progress[`${pack.id}:${verb.id}:${tenses[i]}`]);
      const avgBest = hasSome ? Math.round(bests.reduce((a,b)=>a+b,0)/bests.length) : null;
      const badgeColor = avgBest === null ? 'var(--text3)' : avgBest >= 80 ? 'var(--green)' : avgBest >= 50 ? 'var(--accent)' : 'var(--text3)';
      const badge = avgBest !== null ? `<span style="font-size:11px;color:${badgeColor};opacity:0.85;white-space:nowrap;margin-left:2px">${avgBest}%</span>` : '';
      packsHTML += `<button class="gt-topic-btn" onclick="startVerbSession(${pack.id},'${esc(verb.id)}')">
        <div class="gt-topic-icon" style="font-size:18px">${esc(verb.icon||'🔤')}</div>
        <div class="gt-topic-info">
          <div class="gt-topic-name">${esc(verb.infinitive)}</div>
          <div class="gt-topic-count">${esc(verb.translation)}</div>
        </div>
        ${badge}
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--text3)" stroke-width="2" width="14" height="14"><path d="M9 18l6-6-6-6"/></svg>
      </button>`;
    }
  }

  c.innerHTML = `
    <div class="gt-wrap">
      <div class="gt-topics">
        ${packsHTML}
        <div class="gt-action-bar">
          <button class="gt-action-btn" onclick="importVerbPack()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 5 17 10"/><line x1="12" y1="5" x2="12" y2="17"/></svg>
            Загрузить набор
          </button>
          <span class="gt-action-sep"></span>
          <button class="gt-action-btn" onclick="exportVerbsBackup()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Бэкап
          </button>
        </div>
      </div>
    </div>
    <input type="file" id="vb-import-file" accept=".json" style="display:none" onchange="importVerbPackFile(event)">`;
}

async function importVerbPack() {
  const f = document.getElementById('vb-import-file');
  if (f) { f.value = ''; f.click(); }
}

async function importVerbPackFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!data || data.type !== 'verbPack') { showToast('Неверный формат файла', 'red'); return; }
    if (!Array.isArray(data.verbs) || data.verbs.length === 0) { showToast('Нет глаголов в файле', 'red'); return; }
    const existing = await vdbGetAll('verbPacks').catch(()=>[]);
    const dup = existing.find(p => p.name === data.name);
    if (dup) {
      data.id = dup.id;
      await vdbPut('verbPacks', data);
      showToast(`Набор «${data.name}» обновлён`);
    } else {
      delete data.id;
      await vdbPut('verbPacks', data);
      showToast(`Загружено: ${data.verbs.length} глаголов`);
    }
    renderVerbsHome();
  } catch(e) { showToast('Ошибка чтения файла', 'red'); }
}

async function deleteVerbPack(packId) {
  if (!confirm('Удалить набор глаголов и весь прогресс?')) return;
  await vdbDelete('verbPacks', packId);
  const all = await vdbGetAll('verbProgress').catch(()=>[]);
  for (const p of all) {
    if (p.packId === packId) { try { await vdbDelete('verbProgress', p.id); } catch(e){} }
  }
  renderVerbsHome();
}

async function startVerbSession(packId, verbId) {
  const pack = await vdbGet('verbPacks', packId);
  if (!pack) { showToast('Набор не найден', 'red'); return; }
  const verb = pack.verbs.find(v => v.id === verbId);
  if (!verb) { showToast('Глагол не найден', 'red'); return; }

  VTS.packId = packId;
  VTS.verbId = verbId;
  VTS.verb   = verb;
  VTS.tense  = Object.keys(verb.forms)[0];
  _vbBuildQueue();
  _vbEnterSession();
  renderVerbQuestion();
}

function _vbBuildQueue() {
  const forms = VTS.verb.forms[VTS.tense];
  VTS.queue = currentLang().verbPronouns.map((pr, i) => ({ pronoun: pr, answer: forms[i], index: i }));
  VTS.index = 0; VTS.correct = 0; VTS.answered = false;
}

function _vbEnterSession() {
  document.getElementsByTagName('nav')[0].style.display = 'none';
  const tabs = document.getElementById('gr-tabs');
  if (tabs) tabs.style.display = 'none';
  const hdr = document.querySelector('#page-grammar .page-header');
  if (hdr) hdr.style.display = 'none';
}

function _vbExitSession() {
  document.getElementsByTagName('nav')[0].style.display = 'flex';
  const tabs = document.getElementById('gr-tabs');
  if (tabs) tabs.style.display = '';
  const hdr = document.querySelector('#page-grammar .page-header');
  if (hdr) hdr.style.display = '';
}

async function renderVerbQuestion() {
  const c = document.getElementById('grammar-verbs-container');
  const q = VTS.queue[VTS.index];
  const tot = VTS.queue.length;
  const pct = (VTS.index / tot * 100).toFixed(1);

  const progress = await vbGetProgress(VTS.packId);

  const tenseTabs = Object.keys(VTS.verb.forms).map(t => {
    const isDone = !!progress[`${VTS.packId}:${VTS.verbId}:${t}`];
    const cls = `vb-tense-btn${t === VTS.tense ? ' active' : ''}${isDone ? ' done' : ''}`;
    return `<button class="${cls}" onclick="vbSwitchTense('${t}')">${TENSE_LABELS[t]||t}</button>`;
  }).join('');

  c.innerHTML = `<div style="display:flex;flex-direction:column;flex:1;overflow:hidden">
    <div class="study-header">
      <div class="study-counter">${VTS.index + 1} / ${tot}</div>
      <div class="study-progress"><div class="study-progress-fill" style="width:${pct}%"></div></div>
      <button class="btn-icon" onclick="renderVerbsHome()" title="Завершить">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="vb-tense-tabs">${tenseTabs}</div>
    <div class="flashcard-area" id="vb-card-area">
      <div class="flashcard">
        <div class="card-group-tag">${esc(VTS.verb.infinitive)} — ${esc(VTS.verb.translation)}</div>
        <div class="card-question-label">Спрягите глагол:</div>
        <div class="card-question" style="font-size:28px">${esc(q.pronoun)}</div>
      </div>
    </div>
    <div class="vb-card-strip">
      <div class="vb-card-strip-verb" id="vb-strip-verb">${esc(VTS.verb.infinitive)}</div>
      <div class="vb-card-strip-sep">→</div>
      <div class="vb-card-strip-pronoun" id="vb-strip-pronoun">${esc(q.pronoun)}</div>
    </div>
    <div class="type-area" id="vb-type-area">
      <div class="type-input-wrap">
        <input class="type-input" type="text" id="vb-answer"
          placeholder="Введите форму..."
          autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
          onkeydown="vbKeyDown(event)">
      </div>
      <button class="btn btn-primary type-submit" id="vb-check-btn"
        onpointerdown="event.preventDefault()" onclick="checkVerbAnswer()">Проверить</button>
      <div class="answer-reveal" id="vb-reveal" style="display:none"></div>
    </div>
    <div class="next-btn-wrapper">
      <button class="next-btn btn btn-ghost" id="vb-next-btn" onclick="nextVerbQuestion()" style="display:none;opacity:0">Следующее →</button>
    </div>
  </div>`;

  const inp = document.getElementById('vb-answer');
  if (inp) inp.focus();
}

function vbKeyDown(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const check = document.getElementById('vb-check-btn');
    const next  = document.getElementById('vb-next-btn');
    if (check && check.style.display !== 'none' && !check.disabled) check.click();
    else if (next && next.classList.contains('visible')) next.click();
  }
}

async function vbSwitchTense(tense) {
  if (tense === VTS.tense) return;
  if (VTS.index > 0) {
    await vbSaveProgress(VTS.packId, VTS.verbId, VTS.tense, VTS.correct, VTS.index);
  }
  VTS.tense = tense;
  _vbBuildQueue();
  renderVerbQuestion();
}

async function checkVerbAnswer() {
  const btn = document.getElementById('vb-check-btn');
  if (!btn || btn.disabled) return;
  btn.disabled = true;
  const inp    = document.getElementById('vb-answer');
  const reveal = document.getElementById('vb-reveal');
  const next   = document.getElementById('vb-next-btn');
  const q      = VTS.queue[VTS.index];

  const userVal = inp.value.trim().toLowerCase();
  const correct = q.answer.toLowerCase();
  const normalize = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  const isCorrect = userVal === correct || normalize(userVal) === normalize(correct);

  if (isCorrect) {
    VTS.correct++;
    inp.classList.add('correct');
    inp.value = q.answer;
    reveal.style.display = 'none';
    showToast('Правильно! ✓', 'green');
  } else {
    inp.classList.add('wrong');
    reveal.style.display = 'block';
    reveal.innerHTML = diffHighlightInline(inp.value.trim(), q.answer, false);
    showToast('Неверно', 'red');
  }

  btn.style.display = 'none';
  btn.disabled = false;
  next.style.display = '';
  next.style.opacity = '1';
  next.classList.add('visible');
  inp.focus();
}

async function nextVerbQuestion() {
  VTS.index++;
  VTS.answered = false;
  if (VTS.index >= VTS.queue.length) {
    await vbSaveProgress(VTS.packId, VTS.verbId, VTS.tense, VTS.correct, VTS.queue.length);
    renderVerbResults();
  } else {
    const inp = document.getElementById('vb-answer');
    const reveal = document.getElementById('vb-reveal');
    const check = document.getElementById('vb-check-btn');
    const next = document.getElementById('vb-next-btn');
    const q = VTS.queue[VTS.index];
    const tot = VTS.queue.length;
    const pct = (VTS.index / tot * 100).toFixed(1);

    const counter = document.querySelector('.study-counter');
    const fill = document.querySelector('.study-progress-fill');
    if (counter) counter.textContent = `${VTS.index + 1} / ${tot}`;
    if (fill) fill.style.width = `${pct}%`;

    const cardQ = document.querySelector('#vb-card-area .card-question');
    if (cardQ) cardQ.textContent = q.pronoun;
    const stripP = document.getElementById('vb-strip-pronoun');
    if (stripP) stripP.textContent = q.pronoun;

    if (inp) {
      inp.value = '';
      inp.className = 'type-input';
      inp.focus();
    }
    if (reveal) { reveal.style.display = 'none'; reveal.innerHTML = ''; }
    if (check) { check.style.display = ''; }
    if (next) { next.classList.remove('visible'); next.style.display = 'none'; next.style.opacity = '0'; }
  }
}

function renderVerbResults() {
  const c = document.getElementById('grammar-verbs-container');
  const tot = VTS.queue.length;
  const pct = Math.round(VTS.correct / tot * 100);
  const grade = pct >= 90 ? 'A' : pct >= 75 ? 'B+' : pct >= 60 ? 'B' : pct >= 45 ? 'C' : 'D';

  const tenses = Object.keys(VTS.verb.forms);
  const currentIdx = tenses.indexOf(VTS.tense);
  const nextTense = currentIdx >= 0 && currentIdx < tenses.length - 1 ? tenses[currentIdx + 1] : null;
  const nextTenseLabel = nextTense ? (TENSE_LABELS[nextTense] || nextTense) : null;

  const primaryBtn = nextTense
    ? `<button class="gt-results-btn-primary" onclick="vbStartTense('${nextTense}')">Следующее: ${esc(nextTenseLabel)} →</button>`
    : `<button class="gt-results-btn-primary" onclick="startVerbSession(${VTS.packId},'${VTS.verbId}')">Ещё раз</button>`;

  c.innerHTML = `<div style="display:flex;flex-direction:column;flex:1;overflow:hidden">
    <div class="study-header">
      <div class="study-counter">${VTS.correct} / ${tot}</div>
      <div class="study-progress"><div class="study-progress-fill" style="width:100%"></div></div>
      <button class="btn-icon" onclick="renderVerbsHome()" title="Закрыть">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="gt-results">
      <div class="gt-results-eyebrow">Результат</div>
      <div class="gt-results-main-row">
        <div class="gt-results-score-big">${VTS.correct}<span>/${tot}</span></div>
        <div class="gt-results-grade">${grade}</div>
      </div>
      <div class="gt-results-sub">${esc(VTS.verb.infinitive)} — ${TENSE_LABELS[VTS.tense]||VTS.tense}</div>
      <table class="gt-results-table">
        <tr><td>Верных</td><td style="color:var(--green)">${VTS.correct}</td></tr>
        <tr><td>Ошибок</td><td style="color:var(--red)">${tot - VTS.correct}</td></tr>
        <tr><td>Точность</td><td style="color:var(--accent)">${pct}%</td></tr>
      </table>
      <div class="gt-results-btns">
        ${primaryBtn}
        <div class="gt-results-btns-secondary">
          ${nextTense ? `<button class="gt-results-btn-secondary" onclick="startVerbSession(${VTS.packId},'${VTS.verbId}')">Ещё раз</button>` : ''}
          <button class="gt-results-btn-secondary" onclick="renderVerbsHome()">К глаголам</button>
        </div>
      </div>
    </div>
  </div>`;
}

function vbStartTense(tense) {
  VTS.tense = tense;
  _vbBuildQueue();
  renderVerbQuestion();
}

Object.assign(window, {
  VTS,
  exportVerbPackById, exportVerbsBackup,
  renderVerbsHome, importVerbPack, importVerbPackFile, deleteVerbPack,
  startVerbSession, checkVerbAnswer, nextVerbQuestion,
  vbSwitchTense, vbKeyDown, vbStartTense,
});
