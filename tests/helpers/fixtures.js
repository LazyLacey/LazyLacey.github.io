/**
 * Shared test data fixtures.
 * New cards (no cardStats entry) are always "overdue" per isSrsOverdue,
 * so they will always appear in the study queue immediately after seeding.
 */

const CARDS = {
  basic: [
    { ro: 'bună ziua', ru: 'добрый день' },
    { ro: 'mulțumesc', ru: 'спасибо' },
    { ro: 'te rog', ru: 'пожалуйста' },
    { ro: 'da', ru: 'да' },
    { ro: 'nu', ru: 'нет' },
  ],
  single: { ro: 'casă', ru: 'дом' },
  withDiacritics: { ro: 'învăța', ru: 'учиться' },
  withNote: { ro: 'frumos', ru: 'красивый', note: 'прилагательное' },
};

const GROUPS = {
  basics: { name: 'Базовые фразы' },
  food: { name: 'Еда' },
  numbers: { name: 'Числа' },
};

const TEST_PACK = {
  type: 'tests',
  name: 'Тест артикли',
  icon: '📝',
  topics: { 'articles': 'Артикли' },
  questions: [
    {
      id: 'q1',
      topic: 'articles',
      type: 'choice',
      question: 'Определённый артикль для "masă" (стол)?',
      options: ['masa', 'mesele', 'un masă', 'o masă'],
      answer: 'masa',
      explain: 'Определённый артикль для сущ. женского рода — суффикс -a',
    },
    {
      id: 'q2',
      topic: 'articles',
      type: 'fill',
      question: 'Вставьте артикль: ___ carte (книга, неопр.)',
      answer: 'o',
      explain: 'Неопределённый артикль жен. рода — o',
    },
    {
      id: 'q3',
      topic: 'articles',
      type: 'choice',
      question: 'Неопределённый артикль для "băiat" (мальчик)?',
      options: ['un', 'o', 'băiatul', 'nişte'],
      answer: 'un',
    },
  ],
};

const VERB_PACK = {
  type: 'verbs',
  name: 'Глаголы основные',
  pronouns: ['eu', 'tu', 'el/ea', 'noi', 'voi', 'ei/ele'],
  tenses: ['prezent', 'trecut', 'viitor'],
  verbs: [
    {
      id: 'a_fi',
      infinitive: 'a fi',
      translation: 'быть',
      forms: {
        prezent: ['sunt', 'ești', 'este', 'suntem', 'sunteți', 'sunt'],
        trecut: ['am fost', 'ai fost', 'a fost', 'am fost', 'ați fost', 'au fost'],
        viitor: ['voi fi', 'vei fi', 'va fi', 'vom fi', 'veți fi', 'vor fi'],
      },
    },
    {
      id: 'a_avea',
      infinitive: 'a avea',
      translation: 'иметь',
      forms: {
        prezent: ['am', 'ai', 'are', 'avem', 'aveți', 'au'],
        trecut: ['am avut', 'ai avut', 'a avut', 'am avut', 'ați avut', 'au avut'],
        viitor: ['voi avea', 'vei avea', 'va avea', 'vom avea', 'veți avea', 'vor avea'],
      },
    },
  ],
};

/** Minimal deck of 3 cards for study tests that need a short session. */
const MINI_DECK = [
  { ro: 'unu', ru: 'один' },
  { ro: 'doi', ru: 'два' },
  { ro: 'trei', ru: 'три' },
];

module.exports = { CARDS, GROUPS, TEST_PACK, VERB_PACK, MINI_DECK };
