window.SAMPLE_CARDS_DATA = {
  version: 3,
  exported: new Date().toISOString().slice(0, 10),
  _comment: "Это тестовый набор карточек. Вы можете создавать такие файлы вручную или попросить нейросеть сгенерировать их в таком же формате. Попробуйте промпт: «Создай JSON файл с 20 румынскими словами в формате этого примера».",
  groups: [{ id: 1, name: "Тестовые слова" }],
  cards: [
    { id: 1, groupId: 1, ro: "bună ziua", ru: "добрый день", note: "приветствие" },
    { id: 2, groupId: 1, ro: "mulțumesc", ru: "спасибо", note: "ț = дж" },
    { id: 3, groupId: 1, ro: "apă", ru: "вода", note: "ă = краткое а" },
    { id: 4, groupId: 1, ro: "casă", ru: "дом", note: "" },
    { id: 5, groupId: 1, ro: "prieteni", ru: "друзья", note: "prietenă — подруга" },
  ]
};

window.SAMPLE_VERBS_DATA = {
  type: "verbPack",
  name: "Базовые глаголы",
  icon: "🔤",
  _comment: "Пак с глаголами для Fișki. Каждый глагол содержит формы для трёх времён: prezent, trecut (perfect compus), viitor. Порядок форм в массиве: eu, tu, el/ea, noi, voi, ei/ele. Попробуйте промпт для нейросети: «Создай JSON-пак глаголов для Fișki в формате этого примера. Добавь глаголы: [список]. Обязательно поля type, name, verbs с id, infinitive, translation, icon и forms с ключами prezent/trecut/viitor, каждый — массив из 6 форм».",
  verbs: [
    {
      id: "a-fi",
      infinitive: "a fi",
      translation: "быть",
      icon: "🟡",
      forms: {
        prezent: ["sunt", "ești", "este", "suntem", "sunteți", "sunt"],
        trecut:  ["am fost", "ai fost", "a fost", "am fost", "ați fost", "au fost"],
        viitor:  ["voi fi", "vei fi", "va fi", "vom fi", "veți fi", "vor fi"]
      }
    },
    {
      id: "a-avea",
      infinitive: "a avea",
      translation: "иметь",
      icon: "🤲",
      forms: {
        prezent: ["am", "ai", "are", "avem", "aveți", "au"],
        trecut:  ["am avut", "ai avut", "a avut", "am avut", "ați avut", "au avut"],
        viitor:  ["voi avea", "vei avea", "va avea", "vom avea", "veți avea", "vor avea"]
      }
    },
    {
      id: "a-merge",
      infinitive: "a merge",
      translation: "идти, ехать",
      icon: "🚶",
      forms: {
        prezent: ["merg", "mergi", "merge", "mergem", "mergeți", "merg"],
        trecut:  ["am mers", "ai mers", "a mers", "am mers", "ați mers", "au mers"],
        viitor:  ["voi merge", "vei merge", "va merge", "vom merge", "veți merge", "vor merge"]
      }
    },
    {
      id: "a-veni",
      infinitive: "a veni",
      translation: "приходить",
      icon: "👋",
      forms: {
        prezent: ["vin", "vii", "vine", "venim", "veniți", "vin"],
        trecut:  ["am venit", "ai venit", "a venit", "am venit", "ați venit", "au venit"],
        viitor:  ["voi veni", "vei veni", "va veni", "vom veni", "veți veni", "vor veni"]
      }
    },
    {
      id: "a-face",
      infinitive: "a face",
      translation: "делать",
      icon: "🛠️",
      forms: {
        prezent: ["fac", "faci", "face", "facem", "faceți", "fac"],
        trecut:  ["am făcut", "ai făcut", "a făcut", "am făcut", "ați făcut", "au făcut"],
        viitor:  ["voi face", "vei face", "va face", "vom face", "veți face", "vor face"]
      }
    }
  ]
};

window.SAMPLE_TESTS_DATA = {
  type: "testPack",
  name: "Приветствия и базовые фразы",
  icon: "👋",
  description: "Тест по базовым румынским фразам — приветствия, числа, вежливые слова",
  _comment: "Пак с тестами для Fișki. Типы вопросов: choice (выбор из вариантов), fill (ввод слова), form (ввод фразы/предложения). Поля: q — вопрос, answer — правильный ответ, options — варианты (только для choice, минимум 2), hint — подсказка (необязательно), topic — категория (необязательно). Попробуйте промпт: «Создай JSON-пак тестов для Fișki в формате этого примера на тему [тема]. Используй все три типа вопросов: choice, fill, form».",
  topics: {
    greetings: "Приветствия",
    numbers: "Числа",
    polite: "Вежливые слова"
  },
  questions: [
    { q: "Как будет «добрый день» по-румынски?", type: "choice", options: ["bună ziua", "noapte bună", "la revedere", "mulțumesc"], answer: "bună ziua", topic: "greetings" },
    { q: "Что означает «bună dimineața»?", type: "choice", options: ["доброй ночи", "доброе утро", "добрый вечер", "до свидания"], answer: "доброе утро", topic: "greetings" },
    { q: "Как сказать «спасибо» по-румынски?", type: "fill", answer: "mulțumesc", hint: "ț = ц, c = к", topic: "polite" },
    { q: "Переведите: «пожалуйста» (в ответ на благодарность)", type: "choice", options: ["cu plăcere", "pardon", "scuze", "salut"], answer: "cu plăcere", topic: "polite" },
    { q: "Как будет число 3 по-румынски?", type: "fill", answer: "trei", topic: "numbers" },
    { q: "Что означает «zece»?", type: "choice", options: ["5", "7", "10", "20"], answer: "10", topic: "numbers" },
    { q: "Как попрощаться по-румынски (до свидания)?", type: "choice", options: ["salut", "la revedere", "bună", "noroc"], answer: "la revedere", topic: "greetings" },
    { q: "Напишите фразу «Как вас зовут?»", type: "form", answer: "Cum vă numiți?", hint: "Вежливая форма", topic: "greetings" },
    { q: "Что значит «scuze»?", type: "choice", options: ["спасибо", "пожалуйста", "извините", "здравствуйте"], answer: "извините", topic: "polite" },
    { q: "Как будет число 100 по-румынски?", type: "fill", answer: "o sută", hint: "Два слова", topic: "numbers" }
  ]
};
