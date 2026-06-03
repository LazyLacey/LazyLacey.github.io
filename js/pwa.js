import { registerSW } from 'virtual:pwa-register';

const APP_VERSION = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '—';
const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

window._appVersion = isLocal ? 'dev' : APP_VERSION;
['app-version'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.textContent = window._appVersion;
});

const updateSW = registerSW({
  onNeedRefresh() { showUpdateBanner(() => updateSW(true)); },
  onOfflineReady() {},
});

function showUpdateBanner(onUpdate) {
  if (document.getElementById('sw-update-banner')) return;
  const banner = document.createElement('div');
  banner.id = 'sw-update-banner';
  banner.setAttribute('role', 'alert');
  banner.style.cssText = [
    'position:fixed',
    'bottom:max(1rem, env(safe-area-inset-bottom))',
    'left:50%',
    'transform:translateX(-50%)',
    'z-index:99999',
    'display:flex',
    'align-items:center',
    'gap:0.75rem',
    'padding:0.75rem 1rem',
    'border-radius:14px',
    'background:rgba(30,30,60,0.97)',
    'backdrop-filter:blur(12px)',
    '-webkit-backdrop-filter:blur(12px)',
    'border:1px solid rgba(100,100,255,0.25)',
    'box-shadow:0 8px 32px rgba(0,0,0,0.5)',
    'font-family:var(--font-ui,"DM Sans",sans-serif)',
    'font-size:0.875rem',
    'color:#e8e8f0',
    'max-width:calc(100vw - 2rem)',
    'width:max-content',
  ].join(';');
  banner.innerHTML = `
    <i class="ph ph-arrows-clockwise" style="font-size:1.1rem;flex-shrink:0"></i>
    <span>Доступна новая версия</span>
    <button id="sw-update-btn" style="padding:0.35rem 0.85rem;border-radius:8px;border:none;background:linear-gradient(135deg,#6464ff,#a064ff);color:#fff;font-weight:600;font-size:0.8125rem;cursor:pointer;white-space:nowrap">Обновить</button>
    <button id="sw-dismiss-btn" aria-label="Закрыть" style="background:none;border:none;color:#888;cursor:pointer;font-size:1.1rem;padding:0 0.25rem;line-height:1">✕</button>
  `;
  document.body.appendChild(banner);
  document.getElementById('sw-update-btn').addEventListener('click', () => { onUpdate(); banner.remove(); });
  document.getElementById('sw-dismiss-btn').addEventListener('click', () => banner.remove());
}
