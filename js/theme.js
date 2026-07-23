const THEMES = [
  { id: '',          name: 'Полночь',    bg: '#0f0f1a', accent: '#c8a96e', dot: '#c8a96e' },
  { id: 'forest',    name: 'Лес',        bg: '#0d1a12', accent: '#ff7c5c', dot: '#ff7c5c' },
  { id: 'ocean',     name: 'Океан',      bg: '#0d1520', accent: '#f0a832', dot: '#f0a832' },
  { id: 'cherry',    name: 'Вишня',      bg: '#1a0d14', accent: '#5ecfb0', dot: '#5ecfb0' },
  { id: 'amethyst',  name: 'Аметист',    bg: '#12101a', accent: '#f0926a', dot: '#f0926a' },
  { id: 'dawn',      name: 'Рассвет',    bg: '#f5f2ed', accent: '#c0602a', dot: '#c0602a' },
];

function applyTheme(themeId) {
  if (themeId) {
    document.documentElement.setAttribute('data-theme', themeId);
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  try { localStorage.setItem('appTheme', themeId); } catch(e) {}
  updateThemeUI(themeId);
}

function updateThemeUI(themeId) {
  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
  const label = document.getElementById('current-theme-label');
  if (label) label.textContent = theme.name;
  renderThemeDots(themeId);
  if (document.getElementById('page-stats')?.classList.contains('active')) {
    window.renderStats?.();
  }
}

function renderThemeDots(activeId) {
  const row = document.getElementById('theme-dots-row');
  if (!row) return;
  const currentTheme = activeId !== undefined ? activeId : (document.documentElement.getAttribute('data-theme') || '');
  row.innerHTML = THEMES.map(t => {
    const isActive = t.id === currentTheme;
    return `<button title="${t.name}" onclick="applyTheme('${t.id}');updateThemeUI('${t.id}')"
      style="width:28px;height:28px;border-radius:50%;background:${t.dot};
             border:2.5px solid ${isActive ? 'var(--text)' : 'transparent'};
             cursor:pointer;padding:0;transition:transform 0.15s,border-color 0.15s;
             box-shadow:${isActive ? '0 0 0 1.5px var(--bg2)' : 'none'};
             transform:${isActive ? 'scale(1.18)' : 'scale(1)'}"
      onmouseenter="this.style.transform='scale(1.15)'"
      onmouseleave="this.style.transform='${isActive ? 'scale(1.18)' : 'scale(1)'}'"></button>`;
  }).join('');
}

function initTheme() {
  try {
    const saved = localStorage.getItem('appTheme') || '';
    applyTheme(saved);
  } catch(e) {}
}

// ===== ACCESSIBILITY: РЕЖИМ ДЛЯ СЛАБОВИДЯЩИХ =====
function applyFarsightedMode(enabled) {
  if (enabled) {
    document.documentElement.setAttribute('data-farsighted', '1');
  } else {
    document.documentElement.removeAttribute('data-farsighted');
  }
  try { localStorage.setItem('farsightedMode', enabled ? '1' : ''); } catch(e) {}
  const cb = document.getElementById('setting-farsighted');
  if (cb) cb.checked = enabled;
}

function initFarsightedMode() {
  try {
    const saved = localStorage.getItem('farsightedMode') === '1';
    applyFarsightedMode(saved);
  } catch(e) {}
}

Object.assign(window, { applyTheme, updateThemeUI, renderThemeDots, applyFarsightedMode });

initTheme();
initFarsightedMode();
