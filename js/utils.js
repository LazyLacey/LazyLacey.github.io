function esc(s) {
  return (s || '').replace(/&/g,'&amp;').replace(/\x3C/g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function diffHighlightInline(input, correct, hardMode = false) {
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const a = input.toLowerCase().slice(0, correct.length);
  let html = 'Правильно: <strong>';
  for (let k = 0; k < correct.length; k++) {
    const ca = k < a.length ? a[k] : '';
    const cc = correct[k];
    const match = hardMode ? ca === cc.toLowerCase() : norm(ca) === norm(cc);
    html += match
      ? `<span style="color:var(--green)">${esc(cc)}</span>`
      : `<span style="color:var(--red)">${esc(cc)}</span>`;
  }
  html += '</strong>';
  return html;
}

// plural(5, 'карточка', 'карточки', 'карточек') → '5 карточек'
function plural(n, form1, form2, form5) {
  const mod10  = n % 10;
  const mod100 = n % 100;
  let form;
  if (mod10 === 1 && mod100 !== 11) form = form1;
  else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) form = form2;
  else form = form5;
  return `${n} ${form}`;
}

function emptyState(icon, title, sub) {
  return `<div class="empty-state"><div class="empty-icon">${icon}</div><div class="empty-title">${title}</div><div class="empty-sub">${sub}</div></div>`;
}

function pageTabs(tabs) {
  return `<div class="page-tabs">${tabs.map(t =>
    `<button class="page-tab${t.active ? ' active' : ''}" id="${t.id}" onclick="${t.onclick}">${esc(t.label)}</button>`
  ).join('')}</div>`;
}

function pageHeader(titleHTML, actionHTML = '') {
  return `<div class="page-header"><div class="page-title">${titleHTML}</div><div class="page-header-action">${actionHTML}</div></div>`;
}

function searchRow(inputId, placeholder = 'Поиск...', extraHTML = '') {
  return `<div class="search-row"><i class="ph ph-magnifying-glass"></i><input type="search" id="${inputId}" placeholder="${placeholder}" autocomplete="off">${extraHTML}</div>`;
}

function drawerItem(label, selected, { testid } = {}) {
  const el = document.createElement('div');
  el.className = 'filter-drawer-item' + (selected ? ' active' : '');
  if (testid) el.setAttribute('data-testid', testid);
  el.innerHTML = `<span>${esc(label)}</span><span class="select-check">✓</span>`;
  return el;
}

function showDrawer(title, { subtitle = '', render, onClose } = {}) {
  const el = document.getElementById('app-drawer');
  const titleEl = document.getElementById('app-drawer-title');
  titleEl.textContent = title;
  titleEl.style.marginBottom = subtitle ? '4px' : '20px';
  const subEl = document.getElementById('app-drawer-subtitle');
  subEl.textContent = subtitle;
  subEl.style.display = subtitle ? '' : 'none';
  const body = document.getElementById('app-drawer-body');
  body.innerHTML = '';
  render?.(body);
  el._onClose = onClose || null;
  el.onclick = (e) => { if (e.target === el) dismissDrawer(); };
  el.classList.add('open');
}

function closeDrawer() {
  document.getElementById('app-drawer')?.classList.remove('open');
}

function dismissDrawer() {
  const el = document.getElementById('app-drawer');
  if (!el) return;
  el.classList.remove('open');
  const cb = el._onClose;
  el._onClose = null;
  cb?.();
}

window.drawerItem = drawerItem;
window.esc = esc;
window.diffHighlightInline = diffHighlightInline;
window.plural = plural;
window.emptyState = emptyState;
window.pageTabs = pageTabs;
window.pageHeader = pageHeader;
window.searchRow = searchRow;
window.showDrawer = showDrawer;
window.closeDrawer = closeDrawer;
window.dismissDrawer = dismissDrawer;
