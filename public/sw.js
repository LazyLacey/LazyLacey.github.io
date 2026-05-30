// ============================================================
//  sw.js — сервис воркер для Română PWA
//  Стратегия: Cache-first для всего (своё + шрифты).
//  Обновление: проверка при старте, баннер для пользователя.
// ============================================================

const CACHE_VERSION = '3.5.8';
const STATIC_CACHE  = `romana-static-${CACHE_VERSION}`;
const FONT_CACHE    = 'romana-fonts';   // не версионируем — URL шрифтов иммутабельны

// Только стабильные ресурсы без хешей в имени.
// Hashed JS/CSS (Vite) кешируются динамически через cache-first при первом запросе.
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// ──────────────────────── УТИЛИТЫ ───────────────────────────

const FETCH_TIMEOUT_MS = 5000;

/** fetch с таймаутом 5 с. Бросает AbortError если сервер не ответил вовремя. */
function fetchWithTimeout(input, init = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  return fetch(input, { ...init, signal: controller.signal })
    .finally(() => clearTimeout(timeoutId));
}

// ───────────────────────────── INSTALL ──────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache =>
      Promise.all(
        STATIC_ASSETS.map(url =>
          fetchWithTimeout(url, { cache: 'no-store' })
            .then(res => { if (res.ok) cache.put(url, res); })
            .catch(() => {}) // нет сети при установке — не блокируем
        )
      )
    ).then(() => console.log('[SW] Установлен, ресурсы закешированы'))
  );
});

// ───────────────────────────── ACTIVATE ─────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key.startsWith('romana-static-') && key !== STATIC_CACHE)
          .map(key => {
            console.log('[SW] Удаляем старый кеш:', key);
            return caches.delete(key);
          })
      )
    ).then(() => {
      console.log('[SW] Активирован');
      return self.clients.claim();
    })
  );
});

// ───────────────────────────── FETCH ────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  // Шрифты Google — иммутабельная статика, кешируем в отдельный кеш
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(request, FONT_CACHE));
    return;
  }

  // Свои файлы
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Всё остальное — обычный fetch без кеширования
});

// ──────────────────────── СТРАТЕГИЯ ─────────────────────────────────

/**
 * Cache-first: сначала кеш, при промахе — сеть (и кешируем ответ).
 * При отсутствии сети навигационные запросы получают index.html.
 */
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetchWithTimeout(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    if (request.mode === 'navigate') {
      const fallback = await caches.match('/index.html');
      if (fallback) return fallback;
    }
    return new Response('Нет соединения с интернетом', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

// ──────────────────── СООБЩЕНИЯ ОТ СТРАНИЦЫ ─────────────────────────
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data?.type === 'GET_VERSION') {
    event.source.postMessage({ type: 'VERSION', version: CACHE_VERSION });
  }
});
