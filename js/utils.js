function esc(s) {
  return (s || '').replace(/&/g,'&amp;').replace(/\x3C/g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function diffHighlightInline(input, correct, hardMode = false) {
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const key = c => hardMode ? c.toLowerCase() : norm(c);

  const a = input, b = correct;
  const m = a.length, n = b.length;

  // LCS DP table
  const dp = Array.from({ length: m + 1 }, () => new Uint16Array(n + 1));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = key(a[i-1]) === key(b[j-1])
        ? dp[i-1][j-1] + 1
        : Math.max(dp[i-1][j], dp[i][j-1]);

  // Backtrack: which positions in correct are matched
  const matched = new Set();
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (key(a[i-1]) === key(b[j-1])) { matched.add(j - 1); i--; j--; }
    else if (dp[i-1][j] >= dp[i][j-1]) i--;
    else j--;
  }

  let html = 'Правильно: <strong>';
  for (let k = 0; k < b.length; k++)
    html += `<span style="color:${matched.has(k) ? 'var(--green)' : 'var(--red)'}">${esc(b[k])}</span>`;
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
