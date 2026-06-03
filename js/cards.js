import VirtualScroller from 'virtual-scroller/dom';

// ===== CARDS & GROUPS =====

function updateFilterBtn() {
  const btn = document.getElementById('cards-filter-btn');
  const label = document.getElementById('cards-filter-label');
  if (!btn || !label) return;
  if (AppState.cardFilter === null) {
    btn.classList.remove('active');
    label.textContent = 'Все группы';
  } else {
    const g = AppState.groups.find(x => x.id === AppState.cardFilter);
    btn.classList.add('active');
    label.textContent = g ? g.name : '?';
  }
}

function openGroupFilter() {
  showDrawer('Группа', {
    render(body) {
      const makeItem = (id, name) => {
        const isActive = AppState.cardFilter === id;
        const el = drawerItem(name, isActive);
        el.onclick = () => { setCardFilter(id); closeDrawer(); };
        return el;
      };
      body.appendChild(makeItem(null, 'Все группы'));
      AppState.groups.forEach(g => body.appendChild(makeItem(g.id, g.name)));
    }
  });
}

function setCardFilter(gid) {
  AppState.cardFilter = gid;
  updateFilterBtn();
  invalidate('cards');
}

document.getElementById('search-input').addEventListener('input', e => {
  AppState.searchQuery = e.target.value;
  invalidate('cards');
});

// ===== CARDS PAGE =====
let _vs = null;

function _buildFlatList(filtered) {
  const byGroup = {};
  filtered.forEach(c => {
    const key = c.groupId || 0;
    if (!byGroup[key]) byGroup[key] = [];
    byGroup[key].push(c);
  });
  const items = [];
  for (const [gid, cs] of Object.entries(byGroup)) {
    const g = AppState.groups.find(x => x.id == gid);
    items.push({ type: 'header', name: g ? g.name : 'Без группы' });
    cs.forEach(c => items.push({ type: 'card', card: c }));
  }
  return items;
}

function _renderCardItem(item) {
  if (item.type === 'header') {
    const el = document.createElement('div');
    el.className = 'group-label';
    el.innerHTML = `<div class="group-dot"></div>${esc(item.name)}`;
    return el;
  }
  const c = item.card;
  const stats = AppState.cardStats.get(c.id) || {};
  const srsLevel = stats.srsLevel || 0;
  const cls = srsLevel === 0 ? '' : srsLevel >= 3 ? 'good' : srsLevel === 1 ? 'bad' : '';
  const barColor = srsLevel === 0 ? 'mid' : srsLevel >= 3 ? 'good' : 'mid';
  const srsTag = stats.nextReview
    ? `<div class="srs-badge ${isSrsOverdue(c) ? 'due' : 'pending'}">${formatSrsDate(stats.nextReview)}</div>` : '';
  const el = document.createElement('div');
  el.className = 'word-card';
  el.dataset.testid = 'word-card';
  el.onclick = () => openEditCard(c.id);
  el.innerHTML = `
    <div class="word-main">
      <div class="word-ro">${esc(c.ro)}</div>
      <div class="word-ru">${esc(c.ru)}${c.note ? ' · ' + esc(c.note) : ''}</div>
      <div class="card-mini-bar"><div class="card-mini-bar-fill ${barColor}" style="width:${Math.round(srsLevel / 6 * 100)}%"></div></div>
    </div>
    <div class="word-stats">
      <div class="stat-pill ${cls}">${srsLevel > 0 ? 'ур. ' + srsLevel : 'новое'}</div>
      ${srsTag}
    </div>`;
  return el;
}

function cleanupCardsVirtualScroller() {
  _vs?.stop();
  _vs = null;
}

function renderCardsPage() {
  const container = document.getElementById('cards-items');
  if (!container) return;

  const filtered = AppState.cards.filter(c => {
    if (AppState.cardFilter !== null && c.groupId !== AppState.cardFilter) return false;
    if (AppState.searchQuery) {
      const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      const q = norm(AppState.searchQuery);
      return norm(c.ro).includes(q) || norm(c.ru).includes(q);
    }
    return true;
  });

  if (filtered.length === 0) {
    cleanupCardsVirtualScroller();
    container.style.paddingTop = '';
    container.style.paddingBottom = '';
    container.innerHTML = emptyState('📭', 'Нет карточек', 'Нажмите «+ Добавить» чтобы создать карточку');
    return;
  }

  const items = _buildFlatList(filtered);

  if (_vs) {
    _vs.setItems(items);
  } else {
    container.innerHTML = '';
    _vs = new VirtualScroller(
      container,
      items,
      _renderCardItem,
      { getScrollableContainer: () => document.getElementById('cards-list') }
    );
  }
}

// ===== CARD MODAL =====
function openAddCard() {
  const lang = currentLang();
  showDrawer('Новая карточка', {
    render(body) {
      body.innerHTML = `
        <input type="hidden" id="card-id">
        <div class="form-row">
          <div class="form-group"><label>${esc(lang.targetLabel)}</label><input type="text" id="card-ro" placeholder="cuvânt" autocomplete="off" autocorrect="off"></div>
          <div class="form-group"><label>${esc(lang.nativeLabel)}</label><input type="text" id="card-ru" placeholder="слово" autocomplete="off"></div>
        </div>
        <div class="form-group"><label>Группа</label><select id="card-group"></select></div>
        <div class="form-group"><label>Заметка (необязательно)</label><input type="text" id="card-note" placeholder="подсказка или пример" autocomplete="off"></div>
        <div class="modal-actions">
          <button class="btn btn-ghost" data-testid="drawer-cancel" onclick="closeDrawer()">Отмена</button>
          <button class="btn btn-primary" data-testid="drawer-save" onclick="saveCard()">Сохранить</button>
        </div>
        <div style="margin-top:10px" id="card-delete-wrap"></div>
        <div id="card-stats-block"></div>`;
      populateGroupSelect();
      requestAnimationFrame(() => document.getElementById('card-ro')?.focus());
    }
  });
}

function openEditCard(id) {
  const c = AppState.cards.find(x => x.id === id);
  if (!c) return;
  const lang = currentLang();
  showDrawer('Редактировать', {
    render(body) {
      const s = AppState.cardStats.get(id) || {};
      const shows    = s.shows   || 0;
      const correct  = s.correct || 0;
      const pct      = shows > 0 ? Math.round(correct / shows * 100) : null;
      const level    = s.srsLevel || 0;
      const nextRev  = s.nextReview ? formatSrsDate(s.nextReview) : '—';
      const pctColor = pct === null ? 'var(--text3)' : pct >= 80 ? 'var(--green)' : pct >= 50 ? 'var(--accent)' : 'var(--red)';
      body.innerHTML = `
        <input type="hidden" id="card-id" value="${id}">
        <div class="form-row">
          <div class="form-group"><label>${esc(lang.targetLabel)}</label><input type="text" id="card-ro" value="${esc(c.ro)}" autocomplete="off" autocorrect="off"></div>
          <div class="form-group"><label>${esc(lang.nativeLabel)}</label><input type="text" id="card-ru" value="${esc(c.ru)}" autocomplete="off"></div>
        </div>
        <div class="form-group"><label>Группа</label><select id="card-group"></select></div>
        <div class="form-group"><label>Заметка (необязательно)</label><input type="text" id="card-note" value="${esc(c.note || '')}" placeholder="подсказка или пример" autocomplete="off"></div>
        <div class="modal-actions">
          <button class="btn btn-ghost" data-testid="drawer-cancel" onclick="closeDrawer()">Отмена</button>
          <button class="btn btn-primary" data-testid="drawer-save" onclick="saveCard()">Сохранить</button>
        </div>
        <div style="margin-top:10px" id="card-delete-wrap">
          <button class="btn btn-danger" data-testid="drawer-delete-card" style="width:100%;justify-content:center;" onclick="deleteCardById(${id})">Удалить карточку</button>
        </div>
        ${shows > 0 ? `<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px;margin-top:14px;padding-top:14px;border-top:1px solid var(--border)">
          <div style="text-align:center"><div style="font-size:10px;color:var(--text3);margin-bottom:3px">Показов</div><div style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700">${shows}</div></div>
          <div style="text-align:center"><div style="font-size:10px;color:var(--text3);margin-bottom:3px">Точность</div><div style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:${pctColor}">${pct !== null ? pct + '%' : '—'}</div></div>
          <div style="text-align:center"><div style="font-size:10px;color:var(--text3);margin-bottom:3px">Уровень</div><div style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700">${level}</div></div>
          <div style="text-align:center"><div style="font-size:10px;color:var(--text3);margin-bottom:3px">Повтор</div><div style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700">${nextRev}</div></div>
        </div>` : ''}`;
      populateGroupSelect(c.groupId);
    }
  });
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
  closeDrawer();
  buildStudyQueue();
  invalidate('cards', 'ready');
  showToast('Сохранено ✓');
}

async function deleteCardById(id) {
  if (!confirm('Удалить карточку и всю её историю ответов?')) return;
  await deleteCard(id);
  closeDrawer();
  buildStudyQueue();
  invalidate('cards', 'ready');
  showToast('Удалено');
}


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
      <div class="group-more">
        <button class="group-more-btn" onclick="toggleGroupMenu(this)">···</button>
        <div class="group-menu">
          <div class="group-menu-item" onclick="closeGroupMenus();openEditGroup(${g.id})"><i class="ph ph-pencil-simple"></i>Редактировать</div>
          <div class="group-menu-item" onclick="closeGroupMenus();exportGroup(${g.id})"><i class="ph ph-download-simple"></i>Экспорт</div>
          <div class="group-menu-item danger" onclick="closeGroupMenus();deleteGroup(${g.id})"><i class="ph ph-trash"></i>Удалить</div>
        </div>
      </div>
    </div>`;
  }).join('');

  document.getElementById('groups-list').addEventListener('click', e => {
    if (!e.target.closest('.group-more')) closeGroupMenus();
  }, { once: true });
}

function openAddGroup() {
  showDrawer('Новая группа', {
    render(body) {
      body.innerHTML = `
        <input type="hidden" id="group-id">
        <div class="form-group"><label>Название группы</label><input type="text" id="group-name" placeholder="Фрукты, Цвета..." autocomplete="off"></div>
        <div class="modal-actions">
          <button class="btn btn-ghost" data-testid="drawer-cancel" onclick="closeDrawer()">Отмена</button>
          <button class="btn btn-primary" data-testid="drawer-save" onclick="saveGroup()">Сохранить</button>
        </div>
        <div style="margin-top:10px" id="group-delete-wrap"></div>`;
      requestAnimationFrame(() => document.getElementById('group-name')?.focus());
    }
  });
}

function openEditGroup(id) {
  const g = AppState.groups.find(x => x.id === id);
  if (!g) return;
  showDrawer('Редактировать группу', {
    render(body) {
      body.innerHTML = `
        <input type="hidden" id="group-id" value="${id}">
        <div class="form-group"><label>Название группы</label><input type="text" id="group-name" value="${esc(g.name)}" autocomplete="off"></div>
        <div class="modal-actions">
          <button class="btn btn-ghost" data-testid="drawer-cancel" onclick="closeDrawer()">Отмена</button>
          <button class="btn btn-primary" data-testid="drawer-save" onclick="saveGroup()">Сохранить</button>
        </div>
        <div style="margin-top:10px" id="group-delete-wrap">
          <button class="btn btn-danger" data-testid="drawer-delete-group" style="width:100%;justify-content:center;" onclick="deleteGroup(${id})">Удалить группу</button>
        </div>`;
    }
  });
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
  closeDrawer();
  invalidate('groups', 'cards', 'ready');
  showToast('Сохранено ✓');
}

async function deleteGroup(id) {
  const count = AppState.cards.filter(c => c.groupId === id).length;
  if (count > 0) {
    const g = AppState.groups.find(x => x.id === id);
    showDrawer('Удалить группу?', {
      render(body) {
        body.innerHTML = `
          <div style="font-size:13px;color:var(--text3);margin-bottom:20px">В группе «${esc(g?.name || '')}» ${plural(count, 'карточка', 'карточки', 'карточек')}. Что сделать со словами?</div>
          <div style="display:flex;flex-direction:column;gap:10px">
            <button class="btn btn-ghost" style="justify-content:center;padding:14px" data-choice="keep">Оставить слова без группы</button>
            <button class="btn btn-danger" style="justify-content:center;padding:14px" data-choice="delete">Удалить слова вместе с группой</button>
            <button class="btn btn-ghost" style="justify-content:center;padding:14px;color:var(--text3)" data-choice="cancel">Отмена</button>
          </div>`;
        body.addEventListener('click', async ev => {
          const btn = ev.target.closest('[data-choice]');
          if (!btn) return;
          closeDrawer();
          if (btn.dataset.choice === 'cancel') return;
          await _doDeleteGroup(id, btn.dataset.choice);
        });
      }
    });
  } else {
    if (!confirm('Удалить пустую группу?')) return;
    await _doDeleteGroup(id, 'delete');
  }
}

async function _doDeleteGroup(id, choice) {
  await dbDelete('groups', id);
  if (choice === 'delete') {
    for (const c of AppState.cards.filter(c => c.groupId === id)) {
      await dbDelete('cards', c.id);
    }
  } else {
    const orphaned = AppState.cards.filter(c => c.groupId === id);
    orphaned.forEach(c => { c.groupId = null; });
    if (orphaned.length > 0) await dbPutBatch('cards', orphaned);
  }
  AppState.groups = AppState.groups.filter(g => g.id !== id);
  AppState.cards = await dbGetAll('cards');
  invalidate('groups', 'cards', 'ready', 'stats');
  showToast('Группа удалена');
}


function toggleGroupMenu(btn) {
  const menu = btn.nextElementSibling;
  const isOpen = menu.classList.contains('open');
  closeGroupMenus();
  if (!isOpen) menu.classList.add('open');
}

function closeGroupMenus() {
  document.querySelectorAll('.group-menu.open').forEach(m => m.classList.remove('open'));
}

document.addEventListener('click', e => {
  if (!e.target.closest('.group-more')) closeGroupMenus();
});

Object.assign(window, {
  updateFilterBtn,
  openGroupFilter,
  setCardFilter,
  renderCardsPage,
  cleanupCardsVirtualScroller,
  openAddCard,
  openEditCard,
  saveCard,
  deleteCardById,
  renderGroupsPage,
  openAddGroup,
  openEditGroup,
  toggleGroupMenu,
  closeGroupMenus,
  saveGroup,
  deleteGroup,
});
