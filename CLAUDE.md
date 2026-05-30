# CLAUDE.md — контекст для быстрого восстановления

## Проект

**Fișki** — мобильная PWA для изучения румынского языка. Vanilla JS, single `index.html` (~3500 строк JS inline + HTML), никаких фреймворков.

- **Stack:** Node 20 (`.nvmrc`), Vite (dev/build), Playwright e2e, GitHub Pages
- **Тесты:** Playwright, эмуляция Pixel 5, `workers:1 retries:1`, 17 spec-файлов / 173 теста
- **Деплой:** `.github/workflows/deploy.yml` — автодеплой при пуше в `main`

## Файловая структура

```
index.html          — весь app (JS inline + HTML)
style.css           — все стили
js/db.js            — IndexedDB хелперы, DB-имена из currentLang() (window-экспорт)
js/languages.js     — реестр языков + currentLang() (window-экспорт)
js/grammar-content.js — данные грамматики (grammarTopics)
js/onboarding.js    — онбординг
js/sample-data-romanian.js — SAMPLE_CARDS/VERBS/TESTS_DATA (window-экспорт)
public/             — sw.js, manifest.json, assets, data
tests/specs/        — e2e тесты
PLAN.md             — детальный план рефакторинга под мультиязычность
```

**IndexedDB:** три БД — `RomanianVocab` v6, `RomanianTests` v1, `RomanianVerbs` v1.

## Текущий статус рефакторинга (мультиязычность)

| Фаза | Статус | Суть |
|------|--------|------|
| 0 — Vite + GitHub Actions | ✅ | Сборка, деплой |
| 1 — `js/languages.js` | ✅ | Реестр языков |
| 2 — `js/db.js` | ✅ | DB-хелперы вынесены |
| 3 — `js/sample-data-romanian.js` | ✅ | Вынос SAMPLE_*_DATA |
| 4 — Параметризация DB | ✅ | DB-имена из currentLang() |
| **5 — Лейблы в UI** | **⬜ следующая** | Плейсхолдеры, заголовки |
| 6 — `js/grammar-romanian.js` | ⬜ | Динамическая загрузка |
| 7 — Диакритика из конфига | ⬜ | diacriticHints из языка |
| 8 — Language picker в UI | ⬜ | Переключатель в настройках |

Детали каждой фазы — в `PLAN.md`.

## Правила работы

1. **Тесты перед коммитом** — не коммитить до завершения `npm test`.
2. **Скриншот перед коммитом** — для любых визуальных изменений показать скриншот и дождаться ОК.
3. **Window-экспорты** — все функции, вызываемые через `onclick`, из `js/*.js` класть на `window`.
4. **CACHE_VERSION** — инкрементировать `CACHE_VERSION` в `public/sw.js` при каждом коммите. Текущая: `3.5.4`.
5. **Раскладка** — пользователь иногда пишет русский текст в английской раскладке, декодировать его.

## Архитектурные решения

- Поля `ro`/`ru` в карточках — универсальные ключи для всех языков (только лейблы меняются).
- При смене языка — `location.reload()`, каждый язык имеет свои три БД с префиксом.
- Все JS-модули подключаются как `type="module"`, функции для onclick-атрибутов явно кладутся на `window`.
