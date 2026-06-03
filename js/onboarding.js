// onboarding.js — экраны онбординга, загрузка готовых паков

function getReadyPacks() {
  return (window.currentLang && window.currentLang().readyPacks) || [];
}

function renderSampleDrawer(el) {
  if (!el) return;
  el.style.cssText = 'display:flex;flex-direction:column;gap:10px';
  el.innerHTML = getReadyPacks().map(p => {
    const border  = p.download ? '1px dashed var(--border)' : 'none';
    const arrow   = p.download ? 'ph-arrow-down' : 'ph-arrow-right';
    const onclick = p.download ? p.fn : `${p.fn};closeDrawer()`;
    return `<button onclick="${onclick}" style="display:flex;align-items:center;gap:14px;background:var(--bg3);border:${border};border-radius:14px;padding:14px 16px;cursor:pointer;text-align:left;width:100%">
      <div style="flex-shrink:0"><i class="ph ${p.phIcon}" style="font-size:24px;color:${p.color}"></i></div>
      <div><div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:2px">${p.title}</div><div style="font-size:12px;color:var(--text3)">${p.sub}</div></div>
      <i class="ph ${arrow}" style="margin-left:auto;flex-shrink:0;color:var(--text3)"></i>
    </button>`;
  }).join('');
}

function obDownloadPrompts() {
  const a = document.createElement('a');
  a.href = 'data/prompts.txt';
  a.download = 'prompts.txt';
  a.click();
}

function obMarkAction(i) {
  const el = document.getElementById(`ob-check-${i}`);
  if (el) { el.textContent = '✓'; el.style.color = 'var(--green)'; }
  const btn = document.getElementById(`ob-action-${i}`);
  if (btn) { btn.style.borderColor = 'var(--green)'; btn.style.opacity = '0.7'; btn.disabled = true; }
}

async function loadReadyPack(path, type) {
  try {
    const resp = await fetch(path);
    if (!resp.ok) throw new Error(resp.status);
    const data = await resp.json();

    if (type === 'cards') {
      // Enrich cards with groupName so doImportWordsOnly maps groups correctly
      // (pack files use numeric groupId; doImportWordsOnly deduplicates by name)
      const groupById = {};
      for (const g of (data.groups || [])) groupById[g.id] = g.name;
      for (const c of (data.cards || [])) {
        if (!c.groupName && c.groupId != null) c.groupName = groupById[c.groupId] || null;
      }
      await doImportWordsOnly(data);
      // doImportWordsOnly shows its own toast with the added count
    } else if (type === 'tests') {
      const err = validateTestPack(data);
      if (err) { showToast(err, 'red'); return; }
      const packs = await tdbGetAll('testPacks').catch(() => []);
      const ex = packs.find(p => p.name === data.name);
      const pack = { name: data.name, icon: data.icon || '📝', description: data.description || '', topics: data.topics || {}, questions: data.questions, loadedAt: Date.now() };
      if (ex) pack.id = ex.id;
      await tdbPut('testPacks', pack);
      showToast(`«${pack.name}» загружен ✓`, 'green');
    } else if (type === 'verbs') {
      if (!Array.isArray(data.verbs) || data.verbs.length === 0) { showToast('Нет глаголов в файле', 'red'); return; }
      const existing = await vdbGetAll('verbPacks').catch(() => []);
      const dup = existing.find(p => p.name === data.name);
      if (dup) { data.id = dup.id; } else { delete data.id; }
      await vdbPut('verbPacks', data);
      showToast(`«${data.name}» загружен ✓`, 'green');
    }
  } catch(e) {
    showToast('Не удалось загрузить файл', 'red');
  }
}

const OB_SCREENS = [
  {
    icon: '<img src="assets/icon-source.png" width="80" height="80">',
    title: 'Добро пожаловать в <span>Fișki</span>',
    desc: 'Карточки с умным повторением, грамматика и тесты для изучения иностранных языков.',
    nextBtn: 'Далее →',
  },
  {
    icon: '<i class="ph ph-globe"></i>',
    title: 'Язык',
    desc: 'Выберите язык — начнём с него.',
    langPicker: true,
    nextBtn: 'Далее →',
  },
  {
    icon: '<i class="ph ph-cards-three"></i>',
    title: 'Карт<span>очки</span>',
    desc: 'Основа приложения. Добавляйте слова вручную или загрузите готовый набор.',
    features: [
      { icon: '<i class="ph ph-pencil-simple"></i>', title: 'Вручную', sub: '«+ Добавить» в разделе Карточки' },
      { icon: '<i class="ph ph-download-simple"></i>', title: 'Импорт', sub: 'Настройки → Импорт данных' },
    ],
    note: '<strong>Совет:</strong> карточки можно нагенерировать нейросетью — ChatGPT, Claude и другие справляются отлично. Промпты с форматами ждут в конце онбординга.',
    nextBtn: 'Далее →',
  },
  {
    icon: '<i class="ph ph-brain"></i>',
    title: 'Умное <span>повторение</span>',
    desc: 'SRS-алгоритм запоминает, как хорошо вы знаете каждое слово, и показывает карточку ровно в тот момент, когда вы вот-вот забудете.',
    features: [
      { icon: '<i class="ph ph-pencil-simple"></i>', title: 'Написать', sub: 'Вводите перевод вручную — самый эффективный режим' },
      { icon: '<i class="ph ph-check-square"></i>', title: 'Выбрать', sub: 'Выберите из вариантов — хорошо для старта' },
      { icon: '<i class="ph ph-person-simple-run"></i>', title: 'Марафон и ошибки', sub: 'Все карточки подряд или только те, где вы ошиблись' },
    ],
    nextBtn: 'Далее →',
  },
  {
    icon: '<i class="ph ph-books"></i>',
    title: 'Грам<span>матика</span>',
    desc: 'Отдельный раздел для изучения языка в глубину — три вкладки.',
    features: [
      { icon: '<i class="ph ph-book-open"></i>', title: 'Правила', sub: 'Артикли, падежи, времена — с таблицами и примерами прямо в приложении' },
      { icon: '<i class="ph ph-note-pencil"></i>', title: 'Тесты', sub: 'Выбор из вариантов и заполнение пропусков — по темам' },
      { icon: '<i class="ph ph-text-aa"></i>', title: 'Глаголы', sub: 'Тренажёр спряжений: вводите форму глагола для каждого лица' },
    ],
    nextBtn: 'Далее →',
  },
  {
    icon: '<i class="ph ph-package"></i>',
    title: 'Готовые <span>паки</span>',
    desc: 'Загрузите прямо сейчас — и сразу есть с чем работать.',
    dynamicActions: true,
    nextBtn: 'Далее →',
  },
  {
    icon: '<i class="ph ph-shield-check"></i>',
    title: 'Защита <span>данных</span>',
    desc: 'Данные хранятся в браузере — он может их удалить при нехватке места. Два способа защититься:',
    features: [
      { icon: '<i class="ph ph-lock-simple"></i>', title: 'Постоянное хранилище', sub: 'Запретить браузеру удалять данные — Настройки → Защитить хранилище' },
      { icon: '<i class="ph ph-floppy-disk"></i>', title: 'Резервная копия', sub: 'Экспортируйте данные в файл периодически — Настройки → Экспорт данных' },
    ],
    note: '<strong>Совет:</strong> делайте бэкап раз в неделю — приложение напомнит.',
    nextBtn: 'Далее →',
  },
  {
    icon: '<i class="ph ph-rocket-launch"></i>',
    title: 'Всё <span>готово!</span>',
    desc: 'Загрузите карточки на предыдущем шаге — или добавьте первое слово вручную в разделе Карточки. Первая сессия займёт пару минут.',
    finalScreen: true,
  },
];

let _obStep = 0;

function showOnboarding(step) {
  const overlay = document.getElementById('onboarding-overlay');
  if (!overlay) return;
  overlay.style.display = 'flex';
  _obStep = step ?? 0;
  renderObScreen();
}

function renderObScreen() {
  const s = OB_SCREENS[_obStep];

  const dotsEl = document.getElementById('ob-dots');
  if (dotsEl) {
    dotsEl.innerHTML = OB_SCREENS.map((_, i) =>
      `<div class="ob-dot ${i === _obStep ? 'active' : ''}"></div>`
    ).join('');
  }

  const body = document.getElementById('ob-body');
  if (body) {
    let html = `<div class="ob-icon">${s.icon}</div>`;
    html += `<div class="ob-title">${s.title}</div>`;
    html += `<div class="ob-desc">${s.desc}</div>`;

    if (s.langPicker) {
      const curLangId = localStorage.getItem('lang') || 'romanian';
      html += `<div style="display:flex;flex-direction:column;gap:10px;margin-top:8px">`;
      html += Object.values(window.LANGUAGES || {}).map(lang => {
        const active = lang.id === curLangId;
        return `<button onclick="obSelectLang('${lang.id}')" style="display:flex;align-items:center;gap:14px;background:${active ? 'var(--accent-a15)' : 'var(--bg3)'};border:2px solid ${active ? 'var(--accent)' : 'transparent'};border-radius:14px;padding:14px 16px;cursor:pointer;text-align:left;width:100%">
          <span style="font-size:28px">${lang.flag}</span>
          <div style="flex:1;min-width:0">
            <div style="font-size:15px;font-weight:600;color:${active ? 'var(--accent)' : 'var(--text)'}">${lang.name}</div>
          </div>
          ${active ? '<i class="ph-fill ph-check-circle" style="font-size:22px;color:var(--accent)"></i>' : '<i class="ph ph-circle" style="font-size:22px;color:var(--border)"></i>'}
        </button>`;
      }).join('');
      html += `</div>`;
    }

    if (s.features) {
      html += `<div class="ob-feature-list">`;
      for (const f of s.features) {
        html += `<div class="ob-feature">
          <div class="ob-feature-icon">${f.icon}</div>
          <div class="ob-feature-text">
            <div class="ob-feature-title">${f.title}</div>
            <div class="ob-feature-sub">${f.sub}</div>
          </div>
        </div>`;
      }
      html += `</div>`;
    }

    if (s.dynamicActions) {
      const packs = getReadyPacks();
      html += `<div style="display:flex;flex-direction:column;gap:8px" id="ob-actions">`;
      for (let i = 0; i < packs.length; i++) {
        const a = packs[i];
        const isDownload = !!a.download;
        const border = isDownload ? '1px dashed var(--border)' : '1px solid var(--border)';
        const arrow = isDownload ? '↓' : '→';
        const clickFn = (isDownload ? a.fn : `${a.fn};obMarkAction(${i})`).replace(/'/g, '&apos;');
        html += `<button id="ob-action-${i}" onclick="${clickFn}" style="display:flex;align-items:center;gap:12px;background:var(--bg2);border:${border};border-radius:var(--radius);padding:12px 14px;cursor:pointer;text-align:left;width:100%">
          <div style="font-size:22px;flex-shrink:0"><i class="ph ${a.phIcon}" style="color:${a.color}"></i></div>
          <div style="flex:1;min-width:0">
            <div style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:2px">${a.title}</div>
            <div style="font-size:12px;color:var(--text3)">${a.sub}</div>
          </div>
          <span id="ob-check-${i}" style="color:var(--text3);font-size:18px">${arrow}</span>
        </button>`;
      }
      html += `</div>`;
    }

    if (s.note) {
      html += `<div class="ob-note">${s.note}</div>`;
    }

    body.innerHTML = html;
  }

  const footer = document.getElementById('ob-footer');
  if (footer) {
    if (s.finalScreen) {
      footer.innerHTML = `
        <div class="ob-btn-start-pair">
          <button class="ob-btn-secondary" onclick="obBack()">← Назад</button>
          <button class="ob-btn-primary" onclick="finishOnboarding()">Начать →</button>
        </div>`;
    } else {
      footer.innerHTML = `<button class="ob-btn-primary" onclick="obNext()">${s.nextBtn}</button>`;
    }
  }
}

async function obSelectLang(id) {
  if (!window.LANGUAGES || !window.LANGUAGES[id]) return;
  const prev = localStorage.getItem('lang') || 'romanian';
  localStorage.setItem('lang', id);
  if (id !== prev) {
    await window.onLangChange?.(id);
  }
  renderObScreen();
}

function obNext() {
  if (_obStep < OB_SCREENS.length - 1) {
    _obStep++;
    renderObScreen();
  }
}

function obBack() {
  if (_obStep > 0) { _obStep--; renderObScreen(); }
}

function skipOnboarding() { finishOnboarding(); }

function finishOnboarding() {
  document.getElementById('onboarding-overlay').style.display = 'none';
  try { localStorage.setItem('onboardingDone', '1'); } catch(e) {}
}

function checkOnboarding() {
  try {
    if (!localStorage.getItem('onboardingDone')) showOnboarding();
  } catch(e) {}
}

function openSampleDrawer() {
  showDrawer('Готовые паки', {
    subtitle: 'Загрузите прямо сейчас — и сразу есть с чем работать',
    render: (body) => renderSampleDrawer(body),
  });
}

// Expose to global scope for onclick handlers and main script
Object.assign(window, {
  showOnboarding,
  checkOnboarding,
  obNext,
  obBack,
  obSelectLang,
  skipOnboarding,
  finishOnboarding,
  loadReadyPack,
  obDownloadPrompts,
  obMarkAction,
  renderSampleDrawer,
  openSampleDrawer,
});
