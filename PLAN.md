# План рефакторинга: поддержка нескольких языков

## Принципиальные решения

- Поля `ro`/`ru` в карточках — универсальные внутренние ключи для всех языков. Только лейблы меняются.
- Каждый язык — три отдельные БД: `[Lang]Vocab`, `[Lang]Tests`, `[Lang]Verbs`.
- На переключение языка — `location.reload()`.

## Фазы

### ✅ Фаза 0 — Vite + GitHub Actions
- Vite вместо serve, `npm run dev/build`
- `public/` для статики (assets, data, sw.js, manifest)
- `js/` — модули с `type="module"`, window-экспорты для onclick
- `.github/workflows/deploy.yml` — автодеплой на GitHub Pages

---

### ✅ Фаза 1 — `js/languages.js`
Реестр языков. Нулевой риск — новый файл, ничего не ломает.

```js
const LANGUAGES = {
  romanian: {
    id: 'romanian',
    name: 'Румынский',
    flag: '🇷🇴',
    targetLabel: 'Румынский',
    nativeLabel: 'Русский',
    dbPrefix: 'Romanian',
    grammarFile: 'js/grammar-romanian.js',
    diacriticHints: ['ă', 'â', 'î', 'ș', 'ț'],
  },
};
function currentLang() {
  return LANGUAGES[localStorage.getItem('lang') || 'romanian'];
}
```

---

### ✅ Фаза 2 — `js/db.js`
Вынести все DB-хелперы (`openDB`, `dbGet/Put/GetAll/Clear/Batch` для всех трёх БД) из `index.html` в отдельный файл. ~150 строк. Готовит почву для параметризации.

---

### Фаза 3 — `js/sample-data-romanian.js` (следующее)
Вынести `SAMPLE_CARDS_DATA`, `SAMPLE_VERBS_DATA`, `SAMPLE_TESTS_DATA` из `index.html`. При добавлении нового языка — свой файл `sample-data-italian.js`.

---

### Фаза 4 — Параметризация DB 🔴 высокий риск
Заменить захардкоженные константы на вычисляемые из `currentLang()`:

```js
const DB_NAME       = currentLang().dbPrefix + 'Vocab';
const TESTS_DB_NAME = currentLang().dbPrefix + 'Tests';
const VERBS_DB_NAME = currentLang().dbPrefix + 'Verbs';
```

Требует полного прогона тестов.

---

### Фаза 5 — Лейблы в UI
Заменить «Румынский» / «Romanian» на `currentLang().targetLabel`:
- Плейсхолдеры полей ввода (`#card-ro`, `#card-ru`)
- Заголовки колонок в списке карточек
- `<title>`, `apple-mobile-web-app-title`
- Имена файлов при экспорте (`romanian-vocab.json` → `${lang.id}-vocab.json`)

---

### Фаза 6 — `js/grammar-romanian.js` + динамическая загрузка
- Переименовать `js/grammar-content.js` → `js/grammar-romanian.js`
- Загружать grammar-файл динамически по `currentLang().grammarFile`
- Для нового языка — создать свой `js/grammar-italian.js`

---

### Фаза 7 — Диакритика из конфига
Клавиатурные подсказки диакритики в study-режиме взять из `currentLang().diacriticHints`. Нормализация ответов (NFD) уже языконезависима.

---

### Фаза 8 — Language picker в UI
Секция в Настройках: кнопки-флаги для каждого языка.
При смене: предупреждение → `localStorage.setItem('lang', id)` → `location.reload()`.
