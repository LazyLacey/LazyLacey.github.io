# Форматы файлов данных

## Карточки (`romanian-cards.json`)

Экспортируется из приложения через «Экспортировать» → «Все карточки».

```json
{
  "version": 3,
  "exported": "2026-05-30",
  "groups": [
    { "name": "Еда", "id": 4 }
  ],
  "cards": [
    {
      "id": 1,
      "groupId": 4,
      "ro": "pâine",
      "ru": "хлеб",
      "note": "необязательная заметка"
    }
  ]
}
```

`version` — версия формата экспорта. `v3` включает группы и статистику SRS; `v1`/`v2` — старые форматы без групп.

### Если создаёшь файл вручную или через нейросеть

ID не нужны нигде. Используй `groupName` в карточках вместо `groupId`:

```json
{
  "groups": [
    { "name": "Еда" }
  ],
  "cards": [
    { "groupName": "Еда", "ro": "pâine", "ru": "хлеб", "note": "" }
  ]
}
```

При импорте выбери режим **«Только слова»** — он добавит карточки к существующим и не сотрёт данные. `groupName` должен точно совпадать с `name` группы.

---

## Грамматические тесты (`grammar-tests.json`, `grammar-tests-2.json`)

```json
{
  "type": "testPack",
  "name": "Грамматика румынского",
  "icon": "📖",
  "description": "Необязательное описание",
  "topics": {
    "articles": { "name": "Род и артикли", "icon": "🏷️" },
    "nouns":    { "name": "Существительные", "icon": "📦" }
  },
  "questions": [
    {
      "type": "choice",
      "topicId": "articles",
      "question": "Неопределённый артикль для «băiat» (м.р.)?",
      "options": ["un", "o", "niște", "al"],
      "answer": "un"
    },
    {
      "type": "fill",
      "topicId": "nouns",
      "question": "«băiat» с определённым артиклем?",
      "answer": "băiatul",
      "explain": "М.р. ед.ч.: băiat + ul = băiatul"
    }
  ]
}
```

- `question` — текст вопроса.
- `topics` — необязателен. Без него все вопросы идут в один список.
- `topicId` в вопросе ссылается на ключ в `topics`.
- `type: "choice"` — выбор из вариантов; `options` — массив из 2–4 строк; `answer` должен точно совпадать с одним из `options`.
- `type: "fill"` — ввод ответа вручную; регистр и пробелы по краям игнорируются.
- `explain` — необязательная подсказка, показывается после ответа.

---

## Глагольный пак (`verbs-pack-1.json`)

```json
{
  "type": "verbPack",
  "name": "Базовые глаголы",
  "icon": "🔤",
  "description": "Необязательное описание",
  "tenses": ["prezent", "trecut", "viitor"],
  "pronouns": ["eu", "tu", "el/ea", "noi", "voi", "ei/ele"],
  "verbs": [
    {
      "id": "a_fi",
      "infinitive": "a fi",
      "translation": "быть",
      "group": "irregular",
      "forms": {
        "prezent": ["sunt", "ești", "este", "suntem", "sunteți", "sunt"],
        "trecut":  ["am fost", "ai fost", "a fost", "am fost", "ați fost", "au fost"],
        "viitor":  ["voi fi", "vei fi", "va fi", "vom fi", "veți fi", "vor fi"]
      }
    }
  ]
}
```

- `tenses` — список времён для тренировки; названия произвольные, главное чтобы совпадали с ключами в `forms`.
- `pronouns` — ровно 6 форм в том же порядке, что и массивы в `forms`.
- `group` — произвольная строка (для отображения): `"I"`, `"II"`, `"III"`, `"IV"`, `"irregular"`.
- Каждый массив в `forms` — ровно 6 элементов.
- Поле `version` в файле приложением не читается — можно не указывать.
