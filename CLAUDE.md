# CLAUDE.md — контекст для быстрого восстановления

## Проект

**Fișki** — мобильная PWA для изучения иностранных языков. Vanilla JS, single `index.html` (~4200 строк JS inline + HTML), никаких фреймворков.

- **Stack:** Node 20 (`.nvmrc`), Vite (dev/build), vite-plugin-pwa (workbox), Playwright e2e, GitHub Pages
- **Тесты:** Playwright, эмуляция Pixel 5, `workers:1 retries:1`, 17 spec-файлов / 174 теста
- **Деплой:** `.github/workflows/deploy.yml` — автодеплой при пуше в `main`; `release-please.yml` — авто-версионирование

## Файловая структура

```
index.html                   — весь app (JS inline + HTML)
style.css                    — все стили
js/db.js                     — IndexedDB хелперы, DB-имена из currentLang() (window-экспорт)
js/grammar-content.js        — данные грамматики (grammarTopics)
js/languages.js              — реестр языков + currentLang() + readyPacks (window-экспорт)
js/onboarding.js             — онбординг (langPicker, dynamicActions из readyPacks)
js/pwa.js                    — регистрация SW (vite-plugin-pwa), update-баннер, версия
js/sample-data-romanian.js   — SAMPLE_CARDS/VERBS/TESTS_DATA (window-экспорт)
public/                      — manifest.json, assets, data/*.json, js/grammar-romanian.js
tests/specs/                 — e2e тесты
PLAN.md                      — детальный план рефакторинга под мультиязычность
```

**IndexedDB:** три БД — `RomanianVocab` v6, `RomanianTests` v1, `RomanianVerbs` v1.

## Статус рефакторинга

### Мультиязычность (фазы 0–8) — ✅ завершено

| Фаза | Суть |
|------|------|
| 0 — Vite + GitHub Actions | Сборка, деплой |
| 1 — `js/languages.js` | Реестр языков |
| 2 — `js/db.js` | DB-хелперы вынесены |
| 3 — `js/sample-data-romanian.js` | Вынос SAMPLE_*_DATA |
| 4 — Параметризация DB | DB-имена из currentLang() |
| 5 — Лейблы в UI | Плейсхолдеры, заголовки |
| 6 — `js/grammar-romanian.js` | Динамическая загрузка (файл в `public/js/`) |
| 7 — Диакритика из конфига | diacriticHints из языка |
| 8 — Language picker в UI | Переключатель в настройках + экран в онбординге |

### Модуляризация (фазы 9–16) — ⬜ следующий этап

Цель: сократить `index.html` с ~4200 до ~2000 строк.

| Фаза | Файл | Сложность |
|------|------|-----------|
| 9  | `js/toast.js` | низкая — нет зависимостей, разблокирует все остальные |
| 10 | `js/utils.js` | низкая — `esc`, `diffHighlightInline`, `plural` |
| 11 | `js/srs.js` | низкая — SM-2 алгоритм, чистые функции |
| 12 | `js/theme.js` | низкая — `applyTheme`, `renderThemeDots` |
| 13 | `js/grammar-ui.js` | средняя — `renderGrammar`, `renderTable`, search |
| 14 | `js/verb-trainer.js` | средняя — VERB TRAINER STATE + UI |
| 15 | `js/settings.js` | высокая — SETTINGS + EXPORT + IMPORT |
| 16 | `js/grammar-tests.js` | средняя — Grammar tests UI |

**Начинать с фазы 9** — все остальные модули вызывают `showToast`.

## Правила работы

1. **Тесты перед коммитом** — не коммитить до завершения `npm test`.
2. **Скриншот перед коммитом** — для любых визуальных изменений показать скриншот и дождаться ОК.
3. **Window-экспорты** — все функции, вызываемые через `onclick`, из `js/*.js` класть на `window`.
4. **Conventional Commits** — формат сообщений коммитов обязателен (release-please читает их для авто-версии):
   - `fix: описание` → patch bump (3.7.0 → 3.7.1)
   - `feat: описание` → minor bump (3.7.0 → 3.8.0)
   - `feat!: описание` или `BREAKING CHANGE` → major bump (3.7.0 → 4.0.0)
   - Можно: `фикс:`, `фича:` — НЕТ, release-please понимает только английские префиксы.
   - Можно добавлять scope: `fix(onboarding): ...`, `feat(db): ...`
5. **Версия** — хранится только в `package.json`, в `vite.config.mjs` читается автоматически. Не менять вручную — release-please обновляет при мерже release-PR.
6. **Раскладка** — пользователь иногда пишет русский текст в английской раскладке, декодировать его.

## Архитектурные решения

- Поля `ro`/`ru` в карточках — универсальные ключи для всех языков (только лейблы меняются).
- При смене языка — `location.reload()`, каждый язык имеет свои три БД с префиксом.
- Все JS-модули подключаются как `type="module"`, функции для onclick-атрибутов явно кладутся на `window`.
- `grammar-*.js` лежат в `public/js/` (не `js/`) — Vite не может включить динамический импорт по строке в bundle.
- `readyPacks` в конфиге языка (`languages.js`) — онбординг и drawer берут список паков оттуда, не хардкод.
