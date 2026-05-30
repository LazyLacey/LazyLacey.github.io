# App Mechanics for Test Authors

## Окружение

Мобильное приложение (mobile-first). Playwright конфиг: `devices['Pixel 5']` (393×851).
Node.js: требуется ≥ 18, проект пинит v20 (`.nvmrc`). Перед запуском: `nvm use 20`.

`retries: 1` — в конфиге включён один автоматический ретрай для нестабильных тестов при долгом прогоне.

---

## Архитектура

Vanilla JS SPA, один файл `index.html`. Нет фреймворков. Три IndexedDB:
- `RomanianVocab` v6 — карточки, группы, статистика, сессии, настройки
- `RomanianTests` v1 — грамматические тест-паки
- `RomanianVerbs` v1 — глагольные паки

---

## Навигация

Страницы переключаются через `showPage(name)`. Bottom nav есть только для:
`study`, `cards`, `groups`, `stats`, `settings`.

**Грамматика** в nav отсутствует — доступна только через кнопку на экране study:
```js
page.evaluate(() => showPage('grammar'))
```
`page.click('#nav-grammar')` — таймаут 30s, такого элемента нет.

---

## Учебная сессия

### Запуск

1. `setReadyMode('type' | 'choice' | 'browse' | 'marathon' | 'errors')` — устанавливает режим  
2. `#ready-start-btn` — запускает сессию

`setReadyMode()` вызывает `scheduleUpdateReadyCount()` — 50ms setTimeout, который
запускает `updateReadyCount()` → `buildStudyQueue()`. Это **сбрасывает** `AppState.studyIndex = 0`
и перемешивает очередь. Таймер может сработать уже во время сессии.

### Гонка состояний (race condition)

`renderReadyScreen()` — async функция, вызывается через RAF/setTimeout из `invalidate()`.
Внутри вызывает `buildStudyQueue()`, который:
- Пересобирает `AppState.studyQueue`
- Сбрасывает `AppState.studyIndex = 0`

**Проблема:** если между `page.evaluate()` (читаем правильный ответ) и `page.click('#btn-check')`
сработает RAF с `renderReadyScreen()`, очередь перемешается и ответ окажется неверным.

**Решение:** делать fill + click атомарно в одном `page.evaluate()`:
```js
await page.evaluate(() => {
  const card = AppState.studyQueue[AppState.studyIndex];
  if (!card) return;
  document.getElementById('type-answer').value = card.ro;
  document.getElementById('btn-check').click();
});
```

### Повторы ошибок (scheduleRetry)

Карточка с неверным ответом добавляется обратно в очередь (до 2 раз).
Сессия из N карточек может потребовать до 3N ответов.

**Вывод:** цикл должен проверять не `attempt < N`, а факт завершения:
```js
for (let attempt = 0; attempt < MINI_DECK.length * 4; attempt++) {
  const done = await page.evaluate(() =>
    document.getElementById('session-summary').style.display === 'flex' ||
    !document.getElementById('ready-screen').classList.contains('hidden')
  );
  if (done) break;
  // ...
}
```

### Видимость элементов во время сессии

После `checkTypeAnswer()`:
- `#btn-check` — `display:none` (скрыт)
- `#btn-next` — добавляется класс `visible` (показан)
- `#type-answer` — получает класс `correct` или `wrong`

После `renderStudy()` (следующая карточка):
- `#persistent-type-area` — `display:block` (видим)
- `#btn-check` — `display:''` (видим)
- `#type-answer` — `className = 'type-input'` (классы сброшены)
- `#btn-next` — класс `visible` убран

CSS: `.next-btn { display: none }` / `.next-btn.visible { display: flex }` —
кнопка скрыта по умолчанию, управляется классом.

### Завершение сессии

`nextCard()` при `studyIndex >= studyQueue.length`:
- `showSummary: true` → скрывает `#study-session` → `await getBestAccuracy()` → `showSessionSummary()` → `#session-summary` получает `display:flex`
- `showSummary: false` → скрывает `#study-session` → `endSession()` → `renderReadyScreen()` (async) → ready screen видим

`#study-session` скрывается **синхронно**, до первого `await` — Playwright видит сессию завершённой сразу после `page.click('#btn-next')`.

Для надёжного цикла всё равно рекомендуется ждать settle:
```js
await page.waitForFunction(() => {
  const summary = document.getElementById('session-summary');
  const ready   = document.getElementById('ready-screen');
  const inp     = document.getElementById('type-answer');
  return (summary && summary.style.display === 'flex') ||
    (ready && !ready.classList.contains('hidden')) ||
    (inp && inp.offsetParent !== null && inp.className === 'type-input');
}, { timeout: 5000 }).catch(() => {});
```

---

## Настройки

Чекбоксы визуально скрыты через CSS:
```css
.toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
```
`page.click('#setting-hard-mode')` — не работает (элемент есть, но невидим).

**Решение:** кликать по родительскому `label.toggle`:
```js
const label = page.locator('label.toggle').filter({ has: page.locator('#setting-hard-mode') });
await label.click();
```

Настройки **не сохраняются автоматически** — нужно нажать «Сохранить настройки»:
```js
await page.locator('button', { hasText: /сохранить настройки/i }).click();
```

---

## Импорт / Экспорт

Store `cardStats` имеет `keyPath: 'cardId'` **без autoIncrement**.
Если карточки в импорте без поля `id`, то `cardId: undefined` → DataError.

**Решение:** в тестовых данных для импорта всегда давать явные id:
```js
cards: [{ id: 100, ro: 'nou', ru: 'новый' }, ...]
```

Для ручного создания записи статистики в тестах (например, чтобы проверить что импорт её не затирает):
```js
await page.evaluate(async () => {
  const card = AppState.cards.find(c => c.ro === 'vechi');
  const statsObj = { cardId: card.id, shows: 5, correct: 3,
                     lastSeen: Date.now(), streak: 2, srsLevel: 1, nextReview: 0 };
  await putCardStats(statsObj);
  AppState.cardStats.set(card.id, statsObj);
});
```

---

## Статистика

`#stats-grid` рендерится **асинхронно** после навигации. Читать textContent сразу нельзя.

**Решение:** использовать `toContainText` с таймаутом:
```js
await expect(page.locator('#stats-grid')).toContainText('0', { timeout: 5000 });
```

`#stats-grid` содержит `.stat-card` элементы с `.stat-card-label` и `.stat-card-value`.
Для проверки конкретного показателя (например «Всего показов»):
```js
const shows = await page.evaluate(() => {
  for (const cell of document.querySelectorAll('#stats-grid .stat-card')) {
    if (cell.textContent.includes('показов'))
      return parseInt(cell.querySelector('.stat-card-value')?.textContent || '0');
  }
  return 0;
});
expect(shows).toBeGreaterThan(0);
```

`resetStats()` — async, делает `await dbClear(...)` по цепочке. `page.click()` возвращается до окончания.
Дожидаться тоста:
```js
await expect(page.locator('#toast')).toContainText(/сброшена/i, { timeout: 5000 });
```

Кнопка сброса — `div.setting-row`, **не** `<button>`:
```js
page.locator('.setting-row', { hasText: /сбросить статистику/i })
```

---

## Очистка данных

`clearData()` — async, удаляет все карточки, группы и статистику. Запрашивает `confirm`.

```js
page.once('dialog', d => d.accept());
await page.evaluate(() => clearData());
await expect(page.locator('#toast')).toContainText(/очистка завершена/i, { timeout: 5000 });
```

Кнопка в настройках — `div.setting-row.setting-row-danger` с текстом «Очистить данные»:
```js
page.locator('.setting-row', { hasText: /очистить данные/i })
```

Отличие от `resetStats()`: `clearData` удаляет сами карточки и группы, `resetStats` оставляет их.

---

## Импорт — режимы

`showImportModePicker(data)` показывает bottom sheet с кнопками `data-mode`:
- `replace` → `doImportReplace(data)` — полный сброс и замена
- `words` → `doImportWordsOnly(data)` — добавить только новые карточки
- `merge` → `doImportMergeHistory(data)` — слить историю без потерь (показывается только если есть история)

Все три функции — async, показывают тост по завершении. Вызывать напрямую через `page.evaluate`:
```js
await page.evaluate(async (data) => doImportWordsOnly(data), importData);
await expect(page.locator('#toast')).toContainText(/добавлено|слов/i, { timeout: 5000 });
```

---

## Экспорт группы

`exportGroup(groupId)` — синхронная, создаёт Blob и кликает `<a download>`. Перехватывать через `waitForEvent('download')`:
```js
const [download] = await Promise.all([
  page.waitForEvent('download', { timeout: 5000 }),
  page.evaluate((id) => exportGroup(id), groupId),
]);
expect(download.suggestedFilename()).toMatch(/romanian-group-.+\.json/);
```

---

## Статистика — блок достижений

`renderRecord()` — async, рендерит `#record-block-wrap` с тремя `.record-item` (рекорд точности, стрик, сессии).
Рендерится асинхронно вместе с остальной страницей статистики.

```js
await page.click('#nav-stats');
await expect(page.locator('#record-block-wrap')).toBeVisible({ timeout: 5000 });
const items = page.locator('#record-block-wrap .record-item');
// count === 3
```

---

## Грамматика — DOM-структура

Темы рендерятся как `.gr-topic-card`. Клик добавляет класс `.open`.
Контент появляется через CSS: `.gr-topic-card.open .gr-sections { display:block }`.

Правильные селекторы:
```js
page.locator('#grammar-container .gr-topic-card')           // список тем
page.locator('#grammar-container .gr-topic-card.open .gr-sections')  // открытая тема
```

Вкладки: `#gr-tab-rules`, `#gr-tab-tests`, `#gr-tab-verbs`  
Контейнеры: `#grammar-container`, `#grammar-tests-container`, `#grammar-verbs-container`  
Переключение вкладок: `switchGrammarTab('tests' | 'verbs' | 'rules')`

### Грамматика — кнопки и async-рендер

`switchGrammarTab('tests')` вызывает `renderGrammarTestsHome()` синхронно, но сама функция **async**
(делает `await gtGetPacks()` + `await gtGetAllProgress()`).

`renderGrammarTestsHome()` имеет **inflight-guard** (`_renderGTHomeInflight` / `_renderGTHomePending`) —
аналог `renderReadyScreen()`. Повторный вызов во время выполнения запоминается и перезапустится
по завершении текущего.

В `beforeEach` всё равно ждём завершения рендера перед сидированием пака:
```js
await page.click('#gr-tab-tests');
await expect(page.locator('#grammar-tests-container')).toContainText(
  /нет|импортируйте|загрузите/i, { timeout: 5000 }
);
// затем seedTestPack — после этого нет pending рендера
```

Кнопка запуска теста — `.gt-topic-btn` (НЕ `/начать|старт/`):
```js
page.locator('#grammar-tests-container .gt-topic-btn').first()
```

Кнопки ответа — `.gt-choice` (НЕ `.gt-choice-btn` или `.choice-btn`):
```js
page.locator('#grammar-tests-container .gt-choice').first()
```

`startGrammarTest(topicId, packDbId)` — тихо возвращается если `!packDbId` (falsy). В этом случае
показывается тост 'Набор не найден', а вопрос не рендерится. Убедитесь что `pack.id` не undefined.

Кнопка запуска глагола — `.gt-topic-btn`, кнопки времён — `.vb-tense-btn`:
```js
page.locator('#grammar-verbs-container .gt-topic-btn').first()
page.locator('.vb-tense-btn').first()
```

### Контейнеры грамматики — видимость

`#grammar-container`, `#grammar-tests-container`, `#grammar-verbs-container` показываются только
когда активна соответствующая вкладка. Без клика по вкладке элементы внутри — **hidden**.

```js
await page.click('#gr-tab-verbs');
await expect(page.locator('#grammar-verbs-container')).toBeVisible({ timeout: 3000 });
// теперь можно взаимодействовать с содержимым
```

### Запуск тест-сессии — атомарный паттерн

Не кликать `.gt-topic-btn` — это создаёт окно для гонки с `renderGrammarTestsHome()`.
Вместо этого вызывать `startGrammarTest` напрямую:
```js
await page.evaluate(async () => {
  const packs = await gtGetPacks();
  if (packs[0]) await startGrammarTest(null, packs[0].id);
});
```

Аналогично для глаголов:
```js
await page.evaluate(async () => {
  const packs = await vdbGetAll('verbPacks');
  if (packs[0]) await startVerbSession(packs[0].id, packs[0].verbs[0].id);
});
```

### Fill-in вопросы грамматических тестов

Поле `#gt-fill-input`, кнопка `#gt-check-btn`. После ответа — `checkGTFill()` → `showGTResult()`.

**Формат поля ответа:** оба типа вопросов используют поле `answer:`:
```js
// fill:
{ type: 'fill', q: '...', answer: 'o', explain: '...' }
// choice:
{ type: 'choice', q: '...', options: [...], answer: 'masa' }
```
`checkGTFill()` и `checkGTChoice()` оба читают `q.answer`. Поле `a:` — **не работает**.
Написать `a:` вместо `answer:` → `checkGTFill` упадёт с `Cannot read properties of undefined`,
`checkGTChoice` будет считать все ответы неверными.

**Перемешивание:** `startGrammarTest` делает `pool.sort(() => Math.random() - 0.5)` — порядок
вопросов случайный. Если тест рассчитывает на конкретный тип (choice/fill), нужно принудительно
задать очередь:
```js
await page.evaluate(async () => {
  const packs = await gtGetPacks();
  if (!packs[0]) return;
  const choiceQ = packs[0].questions.find(q => q.type === 'choice');
  GTS.packDbId = packs[0].id; GTS.topicId = null;
  GTS.queue = [choiceQ]; GTS.index = 0; GTS.correct = 0; GTS.answered = false;
  _gtEnterSession(); renderGrammarTestQuestion();
});
```

Кнопка «Следующий» (`#gt-next-btn`) — `display:none` по умолчанию, `.visible` → `display:block`.
`showGTResult()` добавляет `.visible`. Аналогично `.gt-next-btn` в глагольной сессии.

**Ловушка: GTS.index out-of-bounds.** `nextGTQuestion()` — async. Если сразу после клика по
`#gt-next-btn` снова вызвать `checkGTFill()` (пока async ещё в полёте),
`GTS.queue[GTS.index]` будет `undefined` → TypeError. Решение: перед каждым действием проверять:
```js
const ready = await page.evaluate(() => {
  const inp = document.getElementById('gt-fill-input');
  return inp && !inp.readOnly && GTS.index < GTS.queue.length;
});
```

### Экран результатов теста

`.gt-results`, `.gt-results-score-big`, `.gt-results-grade`.

**На экране два `.gt-results-btn-secondary`** (кнопки «Выбрать тему» и «← Правила»).
Использовать `.first()` или `hasText`:
```js
page.locator('.gt-results-btn-secondary', { hasText: /Выбрать тему/i })
```

### Глагольная сессия

`startVerbSession(packId, verbId)` → `VTS` state object → `renderVerbQuestion()`.
Инпут `#vb-answer`, кнопка `#vb-check-btn`, следующая `#vb-next-btn`.
После всех 6 местоимений — `renderVerbResults()` (`.gt-results` класс на контейнере).

Переключение времени: `vbSwitchTense(tense)` (кнопки `.vb-tense-btn`).

---

## seedSettings / invalidate

`seedSettings(page, { showSummary: true })` вызывает `putSetting()` + `loadSettings()`.
`loadSettings()` может вызвать `invalidate()` → RAF → `renderReadyScreen()` → `buildStudyQueue()`.

Если `seedSettings` вызывается **во время сессии** — возможна гонка состояний.
Вызывайте `seedSettings` в `beforeEach`, ДО запуска сессии.

---

## Инициализация

Дожидаться полной инициализации:
```js
await page.waitForFunction(() => typeof _initDone !== 'undefined' && _initDone === true);
```

`_initDone = true` выставляется после открытия всех трёх БД и загрузки данных.
