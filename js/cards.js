// ===== CARDS & GROUPS =====

function renderFilterChips() {
  const wrap = document.getElementById('cards-filter-chips');
  let html = `<div class="chip ${AppState.cardFilter === null ? 'active' : ''}" onclick="setCardFilter(null)">Все</div>`;
  AppState.groups.forEach(g => {
    html += `<div class="chip ${AppState.cardFilter === g.id ? 'active' : ''}" onclick="setCardFilter(${g.id})">${esc(g.name)}</div>`;
  });
  wrap.innerHTML = html;
}

function setCardFilter(gid) {
  AppState.cardFilter = gid;
  invalidate('cards');
}

document.getElementById('search-input').addEventListener('input', e => {
  AppState.searchQuery = e.target.value;
  invalidate('cards');
});

// ===== CARDS PAGE =====
function renderCardsPage() {
  const list = document.getElementById('cards-list');
  if (!list) return;
  let filtered = AppState.cards.filter(c => {
    if (AppState.cardFilter !== null && c.groupId !== AppState.cardFilter) return false;
    if (AppState.searchQuery) {
      const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      const q = norm(AppState.searchQuery);
      return norm(c.ro).includes(q) || norm(c.ru).includes(q);
    }
    return true;
  });

  if (filtered.length === 0) {
    list.innerHTML = emptyState('📭', 'Нет карточек', 'Нажмите «+ Добавить» чтобы создать карточку');
    return;
  }

  const byGroup = {};
  filtered.forEach(c => {
    const key = c.groupId || 0;
    if (!byGroup[key]) byGroup[key] = [];
    byGroup[key].push(c);
  });

  let html = '';
  for (const [gid, cs] of Object.entries(byGroup)) {
    const g = AppState.groups.find(x => x.id == gid);
    const gname = g ? g.name : 'Без группы';
    html += `<div class="group-section"><div class="group-label"><div class="group-dot"></div>${gname}</div>`;
    cs.forEach(c => {
      const stats    = AppState.cardStats.get(c.id) || {};
      const srsLevel = stats.srsLevel || 0;
      const cls = srsLevel === 0 ? '' : srsLevel >= 3 ? 'good' : srsLevel === 1 ? 'bad' : '';
      const barColor = srsLevel === 0 ? 'mid' : srsLevel >= 3 ? 'good' : 'mid';
      const srsTag = stats.nextReview
        ? `<div class="srs-badge ${isSrsOverdue(c) ? 'due' : 'pending'}">${formatSrsDate(stats.nextReview)}</div>` : '';
      html += `<div class="word-card" onclick="openEditCard(${c.id})">
        <div class="word-main">
          <div class="word-ro">${esc(c.ro)}</div>
          <div class="word-ru">${esc(c.ru)}${c.note ? ' · ' + esc(c.note) : ''}</div>
          <div class="card-mini-bar"><div class="card-mini-bar-fill ${barColor}" style="width:${Math.round(srsLevel / 6 * 100)}%"></div></div>
        </div>
        <div class="word-stats">
          <div class="stat-pill ${cls}">${srsLevel > 0 ? 'ур. ' + srsLevel : 'новое'}</div>
          ${srsTag}
        </div>
      </div>`;
    });
    html += '</div>';
  }
  list.innerHTML = html;
}

// ===== CARD MODAL =====
function openAddCard() {
  document.getElementById('modal-card-title').textContent = 'Новая карточка';
  document.getElementById('card-id').value = '';
  document.getElementById('card-ro').value = '';
  document.getElementById('card-ru').value = '';
  document.getElementById('card-note').value = '';
  document.getElementById('card-delete-wrap').innerHTML = '';
  document.getElementById('card-stats-block').innerHTML = '';
  populateGroupSelect();
  openModal('modal-card');
  requestAnimationFrame(() => document.getElementById('card-ro').focus());
}

function openEditCard(id) {
  const c = AppState.cards.find(x => x.id === id);
  if (!c) return;
  document.getElementById('modal-card-title').textContent = 'Редактировать';
  document.getElementById('card-id').value = id;
  document.getElementById('card-ro').value = c.ro;
  document.getElementById('card-ru').value = c.ru;
  document.getElementById('card-note').value = c.note || '';
  populateGroupSelect(c.groupId);
  document.getElementById('card-delete-wrap').innerHTML =
    `<button class="btn btn-danger" style="width:100%;justify-content:center;" onclick="deleteCardById(${id})">Удалить карточку</button>`;

  const s = AppState.cardStats.get(id) || {};
  const shows   = s.shows   || 0;
  const correct = s.correct || 0;
  const pct     = shows > 0 ? Math.round(correct / shows * 100) : null;
  const level   = s.srsLevel || 0;
  const nextRev = s.nextReview ? formatSrsDate(s.nextReview) : '—';
  const pctColor = pct === null ? 'var(--text3)' : pct >= 80 ? 'var(--green)' : pct >= 50 ? 'var(--accent)' : 'var(--red)';

  document.getElementById('card-stats-block').innerHTML = shows > 0 ? `
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px;margin-top:14px;padding-top:14px;border-top:1px solid var(--border)">
      <div style="text-align:center">
        <div style="font-size:10px;color:var(--text3);margin-bottom:3px">Показов</div>
        <div style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700">${shows}</div>
      </div>
      <div style="text-align:center">
        <div style="font-size:10px;color:var(--text3);margin-bottom:3px">Точность</div>
        <div style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:${pctColor}">${pct !== null ? pct + '%' : '—'}</div>
      </div>
      <div style="text-align:center">
        <div style="font-size:10px;color:var(--text3);margin-bottom:3px">Уровень</div>
        <div style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700">${level}</div>
      </div>
      <div style="text-align:center">
        <div style="font-size:10px;color:var(--text3);margin-bottom:3px">Повтор</div>
        <div style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700">${nextRev}</div>
      </div>
    </div>` : '';

  openModal('modal-card');
}

function populateGroupSelect(selectedId) {
  const sel = document.getElementById('card-group');
  sel.innerHTML = AppState.groups.map(g =>
    `<option value="${g.id}" ${g.id === selectedId ? 'selected' : ''}>${esc(g.name)}</option>`
  ).join('');
  if (!selectedId && AppState.groups.length > 0) sel.value = AppState.groups[0].id;
}

async function saveCard() {
  const ro   = document.getElementById('card-ro').value.trim();
  const ru   = document.getElementById('card-ru').value.trim();
  const gid  = parseInt(document.getElementById('card-group').value);
  const note = document.getElementById('card-note').value.trim();
  const idStr= document.getElementById('card-id').value;
  if (!ro || !ru) { showToast('Заполните оба поля', 'red'); return; }

  if (idStr) {
    const id = parseInt(idStr);
    const c = AppState.cards.find(x => x.id === id);
    if (!c) { showToast('Карточка не найдена', 'red'); return; }
    const updated = { ...c, ro, ru, groupId: gid, note };
    await dbPut('cards', updated);
    Object.assign(c, updated);
  } else {
    await dbPut('cards', {ro, ru, groupId: gid, note});
  }
  AppState.cards = await dbGetAll('cards');
  closeModal('modal-card');
  buildStudyQueue();
  invalidate('cards', 'ready');
  showToast('Сохранено ✓');
}

async function deleteCardById(id) {
  if (!confirm('Удалить карточку и всю её историю ответов?')) return;
  await deleteCard(id);
  closeModal('modal-card');
  buildStudyQueue();
  invalidate('cards', 'ready');
  showToast('Удалено');
}

document.getElementById('btn-add-card').onclick = openAddCard;

// ===== GROUPS PAGE =====
function renderGroupsPage() {
  const list = document.getElementById('groups-list');
  if (AppState.groups.length === 0) {
    list.innerHTML = emptyState('📁', 'Нет групп', 'Создайте группу, например «Фрукты» или «Цвета»');
    return;
  }
  list.innerHTML = AppState.groups.map(g => {
    const count = AppState.cards.filter(c => c.groupId === g.id).length;
    return `<div class="group-item">
      <div class="group-info">
        <div class="group-name">${esc(g.name)}</div>
        <div class="group-count">${plural(count, 'карточка', 'карточки', 'карточек')}</div>
      </div>
      <div class="group-actions">
        <button class="btn-icon" title="Экспорт группы" onclick="exportGroup(${g.id})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        </button>
        <button class="btn-icon" onclick="openEditGroup(${g.id})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
      </div>
    </div>`;
  }).join('');
}

function openAddGroup() {
  document.getElementById('modal-group-title').textContent = 'Новая группа';
  document.getElementById('group-id').value = '';
  document.getElementById('group-name').value = '';
  document.getElementById('group-delete-wrap').innerHTML = '';
  openModal('modal-group');
  requestAnimationFrame(() => document.getElementById('group-name').focus());
}

function openEditGroup(id) {
  const g = AppState.groups.find(x => x.id === id);
  if (!g) return;
  document.getElementById('modal-group-title').textContent = 'Редактировать группу';
  document.getElementById('group-id').value = id;
  document.getElementById('group-name').value = g.name;
  document.getElementById('group-delete-wrap').innerHTML =
    `<button class="btn btn-danger" style="width:100%;justify-content:center;" onclick="deleteGroup(${id})">Удалить группу</button>`;
  openModal('modal-group');
}

async function saveGroup() {
  const name = document.getElementById('group-name').value.trim();
  if (!name) { showToast('Введите название', 'red'); return; }
  const idStr = document.getElementById('group-id').value;
  if (idStr) {
    const id = parseInt(idStr);
    const g = AppState.groups.find(x => x.id === id);
    g.name = name;
    await dbPut('groups', g);
  } else {
    await dbPut('groups', {name});
  }
  AppState.groups = await dbGetAll('groups');
  closeModal('modal-group');
  invalidate('groups', 'cards', 'ready');
  showToast('Сохранено ✓');
}

async function deleteGroup(id) {
  const count = AppState.cards.filter(c => c.groupId === id).length;

  if (count > 0) {
    const choice = await new Promise(resolve => {
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:500;display:flex;align-items:flex-end';
      const g = AppState.groups.find(x => x.id === id);
      overlay.innerHTML = `
        <div style="background:var(--bg2);border-radius:24px 24px 0 0;border-top:1px solid var(--border);width:100%;padding:20px 20px 40px">
          <div style="width:36px;height:4px;background:var(--border);border-radius:2px;margin:0 auto 20px"></div>
          <div style="font-family:'Syne',sans-serif;font-size:18px;font-weight:700;margin-bottom:6px">Удалить группу?</div>
          <div style="font-size:13px;color:var(--text3);margin-bottom:20px">В группе «${esc(g?.name || '')}» ${plural(count, 'карточка', 'карточки', 'карточек')}. Что сделать со словами?</div>
          <div style="display:flex;flex-direction:column;gap:10px">
            <button class="btn btn-ghost" style="justify-content:center;padding:14px" data-choice="keep">Оставить слова без группы</button>
            <button class="btn btn-danger" style="justify-content:center;padding:14px" data-choice="delete">Удалить слова вместе с группой</button>
            <button class="btn btn-ghost" style="justify-content:center;padding:14px;color:var(--text3)" data-choice="cancel">Отмена</button>
          </div>
        </div>`;
      document.body.appendChild(overlay);
      overlay.addEventListener('click', ev => {
        const btn = ev.target.closest('[data-choice]');
        if (btn) { document.body.removeChild(overlay); resolve(btn.dataset.choice); }
        else if (!overlay.firstElementChild.contains(ev.target)) { document.body.removeChild(overlay); resolve('cancel'); }
      });
    });
    if (choice === 'cancel') return;

    await dbDelete('groups', id);
    if (choice === 'delete') {
      const toDelete = AppState.cards.filter(c => c.groupId === id);
      for (const c of toDelete) {
        await dbDelete('cards', c.id);
      }
    } else {
      const orphaned = AppState.cards.filter(c => c.groupId === id);
      orphaned.forEach(c => { c.groupId = null; });
      if (orphaned.length > 0) await dbPutBatch('cards', orphaned);
    }
  } else {
    if (!confirm('Удалить пустую группу?')) return;
    await dbDelete('groups', id);
  }

  AppState.groups = AppState.groups.filter(g => g.id !== id);
  AppState.cards = await dbGetAll('cards');
  closeModal('modal-group');
  invalidate('groups', 'cards', 'ready', 'stats');
  showToast('Группа удалена');
}

document.getElementById('btn-add-group').onclick = openAddGroup;

Object.assign(window, {
  renderFilterChips,
  setCardFilter,
  renderCardsPage,
  openAddCard,
  openEditCard,
  saveCard,
  deleteCardById,
  renderGroupsPage,
  openAddGroup,
  openEditGroup,
  saveGroup,
  deleteGroup,
});
