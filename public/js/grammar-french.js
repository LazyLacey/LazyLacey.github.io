// Данные грамматики для французского языка.
// Загружается динамически через import() в init() — должен писать на window.

window.grammarTopics = [
  // ─────────────────────────────────────────────
  // 1. РОД И АРТИКЛИ
  // ─────────────────────────────────────────────
  {
    id: 'articles',
    title: 'Род и артикли',
    icon: '🏷️',
    description: 'le/la/les, un/une/des, слияния au/aux/du/des',
    sections: [
      { id: 'articles-gender', title: 'Два рода', body: '', examples: [] },
      { id: 'articles-definite', title: 'Определённый артикль le/la/l\'/les', body: '', examples: [] },
      { id: 'articles-indefinite', title: 'Неопределённый артикль un/une/des', body: '', examples: [] },
      { id: 'articles-partitive', title: 'Партитивный артикль du/de la/de l\'', body: '', examples: [] },
      { id: 'articles-contractions', title: 'Слияния: au/aux, du/des', body: '', examples: [] },
      { id: 'articles-elision', title: 'Элизия: le/la → l\'', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. СУЩЕСТВИТЕЛЬНЫЕ
  // ─────────────────────────────────────────────
  {
    id: 'nouns',
    title: 'Существительные',
    icon: '📦',
    description: 'Мн. число, исключения, определение рода',
    sections: [
      { id: 'nouns-plural', title: 'Множественное число', body: '', examples: [] },
      { id: 'nouns-gender-hints', title: 'Как угадать род по окончанию', body: '', examples: [] },
      { id: 'nouns-irregular', title: 'Нерегулярные формы мн. числа', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. ПРИЛАГАТЕЛЬНЫЕ
  // ─────────────────────────────────────────────
  {
    id: 'adjectives',
    title: 'Прилагательные',
    icon: '🎨',
    description: 'Согласование, позиция, BAGS-правило',
    sections: [
      { id: 'adjectives-agreement', title: 'Согласование в роде и числе', body: '', examples: [] },
      { id: 'adjectives-position', title: 'Позиция: после существительного (общее правило)', body: '', examples: [] },
      { id: 'adjectives-bags', title: 'BAGS-прилагательные — до существительного', body: '', examples: [] },
      { id: 'adjectives-meaning-change', title: 'Прилагательные меняющие смысл от позиции', body: '', examples: [] },
      { id: 'adjectives-comparison', title: 'Степени сравнения — plus/moins, le plus, нерегулярные', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. МЕСТОИМЕНИЯ
  // ─────────────────────────────────────────────
  {
    id: 'pronouns',
    title: 'Местоимения',
    icon: '👤',
    description: 'Субъектные, прямые, косвенные, y, en, притяжательные, указательные',
    sections: [
      { id: 'pronouns-subject', title: 'Субъектные местоимения', body: '', examples: [] },
      { id: 'pronouns-direct', title: 'Прямые объектные: me/te/le/la/nous/vous/les', body: '', examples: [] },
      { id: 'pronouns-indirect', title: 'Косвенные объектные: me/te/lui/nous/vous/leur', body: '', examples: [] },
      { id: 'pronouns-y', title: 'Местоимение y', body: '', examples: [] },
      { id: 'pronouns-en', title: 'Местоимение en', body: '', examples: [] },
      { id: 'pronouns-order', title: 'Порядок при нескольких клитиках', body: '', examples: [] },
      { id: 'pronouns-possessive', title: 'Притяжательные: mon/ma/mes…', body: '', examples: [] },
      { id: 'pronouns-demonstrative', title: 'Указательные: ce/cet/cette/ces, celui/celle', body: '', examples: [] },
      { id: 'pronouns-relative', title: 'Относительные: qui, que, dont, où', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. ГЛАГОЛЫ. PRÉSENT
  // ─────────────────────────────────────────────
  {
    id: 'verbs-present',
    title: 'Глаголы. Présent',
    icon: '⚡',
    description: 'Три группы (-er, -ir, -re), нерегулярные être/avoir/aller/faire',
    sections: [
      { id: 'verbs-er', title: 'Глаголы -er (1-я группа)', body: '', examples: [] },
      { id: 'verbs-ir', title: 'Глаголы -ir (2-я группа)', body: '', examples: [] },
      { id: 'verbs-re', title: 'Глаголы -re (3-я группа)', body: '', examples: [] },
      { id: 'verbs-etre', title: 'Être (быть)', body: '', examples: [] },
      { id: 'verbs-avoir', title: 'Avoir (иметь)', body: '', examples: [] },
      { id: 'verbs-aller-faire', title: 'Aller, faire и другие нерегулярные', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. ГЛАГОЛЫ. PASSÉ COMPOSÉ
  // ─────────────────────────────────────────────
  {
    id: 'verbs-passe-compose',
    title: 'Глаголы. Passé composé',
    icon: '⏮️',
    description: 'avoir/être + participe passé, согласование причастия',
    sections: [
      { id: 'pc-avoir', title: 'Passé composé с avoir', body: '', examples: [] },
      { id: 'pc-etre', title: 'Passé composé с être — глаголы движения и возвратные', body: '', examples: [] },
      { id: 'pc-agreement', title: 'Согласование причастия', body: '', examples: [] },
      { id: 'pc-participles', title: 'Образование participe passé — правильные и нерегулярные', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. ГЛАГОЛЫ. IMPARFAIT
  // ─────────────────────────────────────────────
  {
    id: 'verbs-imparfait',
    title: 'Глаголы. Imparfait',
    icon: '🌅',
    description: 'Описание, фон, повторяющееся прошлое',
    sections: [
      { id: 'imparfait-formation', title: 'Образование imparfait', body: '', examples: [] },
      { id: 'imparfait-vs-pc', title: 'Imparfait vs passé composé — когда что', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 8. ГЛАГОЛЫ. FUTUR
  // ─────────────────────────────────────────────
  {
    id: 'verbs-future',
    title: 'Глаголы. Будущее время',
    icon: '⏭️',
    description: 'Futur simple и futur proche (aller + infinitif)',
    sections: [
      { id: 'future-proche', title: 'Futur proche: aller + infinitif', body: '', examples: [] },
      { id: 'future-simple', title: 'Futur simple', body: '', examples: [] },
      { id: 'future-irregular', title: 'Нерегулярные основы futur simple', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 9. ГЛАГОЛЫ. CONDITIONNEL
  // ─────────────────────────────────────────────
  {
    id: 'verbs-conditional',
    title: 'Conditionnel',
    icon: '🤔',
    description: 'Вежливость, гипотезы, нереальные ситуации',
    sections: [
      { id: 'cond-present', title: 'Conditionnel présent — вежливость и гипотезы', body: '', examples: [] },
      { id: 'cond-passe', title: 'Conditionnel passé — нереальное прошлое', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 10. ГЛАГОЛЫ. SUBJONCTIF
  // ─────────────────────────────────────────────
  {
    id: 'verbs-subjonctif',
    title: 'Subjonctif',
    icon: '🔀',
    description: 'После que, глаголов желания/сомнения/необходимости',
    sections: [
      { id: 'subj-present', title: 'Subjonctif présent — образование', body: '', examples: [] },
      { id: 'subj-triggers', title: 'После каких глаголов и выражений', body: '', examples: [] },
      { id: 'subj-passe', title: 'Subjonctif passé', body: '', examples: [] },
      { id: 'subj-irregular', title: 'Нерегулярные формы (être, avoir, aller, faire…)', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 11. PLUS-QUE-PARFAIT
  // ─────────────────────────────────────────────
  {
    id: 'verbs-pluperfect',
    title: 'Plus-que-parfait',
    icon: '⏪',
    description: 'Предпрошедшее — действие до другого действия в прошлом',
    sections: [
      { id: 'plpf-formation', title: 'Образование', body: '', examples: [] },
      { id: 'plpf-usage', title: 'Употребление — quand, après que, avant que', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 12. ГЛАГОЛЫ. IMPÉRATIF
  // ─────────────────────────────────────────────
  {
    id: 'imperative',
    title: 'Impératif',
    icon: '📢',
    description: 'Команды для tu/vous/nous, отрицательный императив',
    sections: [
      { id: 'imp-formation', title: 'Образование: tu/vous/nous', body: '', examples: [] },
      { id: 'imp-negative', title: 'Отрицательный импératif', body: '', examples: [] },
      { id: 'imp-pronouns', title: 'Местоимения при императиве', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 13. ВОЗВРАТНЫЕ ГЛАГОЛЫ
  // ─────────────────────────────────────────────
  {
    id: 'reflexive',
    title: 'Возвратные глаголы',
    icon: '🔄',
    description: 'Se laver, se lever — me/te/se/nous/vous/se',
    sections: [
      { id: 'reflexive-present', title: 'Возвратные глаголы в présent', body: '', examples: [] },
      { id: 'reflexive-passe', title: 'В passé composé — всегда être, согласование', body: '', examples: [] },
      { id: 'reflexive-common', title: 'Частые возвратные глаголы', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 14. ОТРИЦАНИЕ
  // ─────────────────────────────────────────────
  {
    id: 'negation',
    title: 'Отрицание',
    icon: '🚫',
    description: 'ne…pas, ne…jamais, ne…rien, ne…personne, ne…plus',
    sections: [
      { id: 'negation-pas', title: 'Ne…pas — базовое отрицание', body: '', examples: [] },
      { id: 'negation-other', title: 'Ne…jamais, ne…rien, ne…personne, ne…plus, ne…que', body: '', examples: [] },
      { id: 'negation-spoken', title: 'Разговорное — пропуск ne', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 15. ВОПРОСЫ
  // ─────────────────────────────────────────────
  {
    id: 'questions',
    title: 'Вопросы',
    icon: '❓',
    description: 'Интонация, est-ce que, инверсия, вопросительные слова',
    sections: [
      { id: 'questions-intonation', title: 'Вопрос через интонацию', body: '', examples: [] },
      { id: 'questions-est-ce-que', title: 'Est-ce que…?', body: '', examples: [] },
      { id: 'questions-inversion', title: 'Инверсия субъекта и глагола', body: '', examples: [] },
      { id: 'questions-words', title: 'Вопросительные слова: qui, que, où, quand, comment, pourquoi, combien', body: '', examples: [] },
      { id: 'questions-quel', title: 'Quel/quelle — «какой»', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 16. ЧИСЛИТЕЛЬНЫЕ
  // ─────────────────────────────────────────────
  {
    id: 'numerals',
    title: 'Числительные',
    icon: '🔢',
    description: 'Особенности 70, 80, 90; порядковые; даты',
    sections: [
      { id: 'numerals-cardinal', title: 'Количественные — особенности 70/80/90 и согласование', body: '', examples: [] },
      { id: 'numerals-ordinal', title: 'Порядковые: premier, deuxième…', body: '', examples: [] },
      { id: 'numerals-dates', title: 'Даты', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 17. ПРЕДЛОГИ
  // ─────────────────────────────────────────────
  {
    id: 'prepositions',
    title: 'Предлоги',
    icon: '📍',
    description: 'à, de, en, dans, pour, sur, avec и их управление',
    sections: [
      { id: 'prepositions-a-de', title: 'À и de — самые частые', body: '', examples: [] },
      { id: 'prepositions-place', title: 'Место: dans, sur, sous, devant, derrière, entre', body: '', examples: [] },
      { id: 'prepositions-time', title: 'Время: en, dans, pendant, depuis, pour, il y a', body: '', examples: [] },
      { id: 'prepositions-countries', title: 'Страны и города: en/au/aux/à', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 18. СОЮЗЫ И ПРИДАТОЧНЫЕ
  // ─────────────────────────────────────────────
  {
    id: 'conjunctions',
    title: 'Союзы и придаточные',
    icon: '🔗',
    description: 'Сочинительные, подчинительные, относительные',
    sections: [
      { id: 'conj-coordinating', title: 'Сочинительные: et, mais, ou, donc, car, or, ni', body: '', examples: [] },
      { id: 'conj-subordinating', title: 'Подчинительные: que, parce que, si, quand, bien que…', body: '', examples: [] },
      { id: 'conj-si', title: 'Условные с si — три типа', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 19. СПЕЦИФИКА: LIAISON И ÉLISION
  // ─────────────────────────────────────────────
  {
    id: 'liaison-elision',
    title: 'Liaison и élision',
    icon: '🔊',
    description: 'Обязательные и запрещённые связывания, выпадение гласной',
    sections: [
      { id: 'elision', title: 'Élision — выпадение гласной (l\', j\', qu\'…)', body: '', examples: [] },
      { id: 'liaison-mandatory', title: 'Обязательный liaison', body: '', examples: [] },
      { id: 'liaison-forbidden', title: 'Запрещённый liaison', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 20. СПЕЦИФИКА: МЕСТОИМЕНИЕ ON
  // ─────────────────────────────────────────────
  {
    id: 'pronoun-on',
    title: 'Местоимение on',
    icon: '🫂',
    description: 'On = «люди вообще», «мы» в разговорной речи',
    sections: [
      { id: 'on-impersonal', title: 'On как безличное «люди/один»', body: '', examples: [] },
      { id: 'on-nous', title: 'On вместо nous в разговорной речи', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 21. СПЕЦИФИКА: FAIRE + INFINITIF
  // ─────────────────────────────────────────────
  {
    id: 'faire-causative',
    title: 'Faire + infinitif',
    icon: '➡️',
    description: 'Каузативная конструкция — «заставить/дать сделать»',
    sections: [
      { id: 'faire-causative-form', title: 'Образование и смысл', body: '', examples: [] },
      { id: 'faire-causative-pronouns', title: 'Местоимения при faire + infinitif', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 22. КОНСТРУКЦИЯ «НРАВИТСЯ»
  // ─────────────────────────────────────────────
  {
    id: 'like',
    title: 'Конструкция «нравится»',
    icon: '❤️',
    description: 'Plaire vs aimer — структурная разница',
    sections: [
      { id: 'like-aimer', title: 'Aimer — любить, нравиться', body: '', examples: [] },
      { id: 'like-plaire', title: 'Plaire — нравиться (как в румынском/итальянском)', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 23. PASSÉ RÉCENT / VENIR DE
  // ─────────────────────────────────────────────
  {
    id: 'venir-de',
    title: 'Passé récent: venir de',
    icon: '🔄',
    description: 'Только что сделал — venir de + infinitif',
    sections: [
      { id: 'venir-de-formation', title: 'Образование и употребление', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 24. ДНИ, МЕСЯЦЫ, ВРЕМЯ СУТОК
  // ─────────────────────────────────────────────
  {
    id: 'time-calendar',
    title: 'Дни, месяцы, время суток',
    icon: '📅',
    description: 'Названия, предлоги en/à/au, выражения времени',
    sections: [
      { id: 'days', title: 'Дни недели', body: '', examples: [] },
      { id: 'months', title: 'Месяцы', body: '', examples: [] },
      { id: 'time-parts', title: 'Части суток и выражения', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 25. КОТОРЫЙ ЧАС
  // ─────────────────────────────────────────────
  {
    id: 'time-clock',
    title: 'Который час',
    icon: '🕐',
    description: 'Официальный 24-часовой и разговорный варианты',
    sections: [
      { id: 'time-ask', title: 'Quelle heure est-il?', body: '', examples: [] },
      { id: 'time-official', title: 'Официальное время (24 ч.)', body: '', examples: [] },
      { id: 'time-colloquial', title: 'Разговорное — et quart, et demie, moins le quart', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 26. ТЕЛО ЧЕЛОВЕКА
  // ─────────────────────────────────────────────
  {
    id: 'body',
    title: 'Тело человека',
    icon: '🫀',
    description: 'Части тела, артикль вместо притяжательного',
    sections: [
      { id: 'body-parts', title: 'Основные части тела', body: '', examples: [] },
      { id: 'body-article', title: 'Определённый артикль вместо притяжательного', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 27. РАЗГОВОРНЫЕ МЕХАНИКИ
  // ─────────────────────────────────────────────
  {
    id: 'conversation-mechanics',
    title: 'Разговорные механики',
    icon: '🗣️',
    description: 'Заполнители пауз, согласие, переспрос',
    sections: [
      { id: 'conv-fillers', title: 'Заполнители: ben, euh, donc, bon, voilà…', body: '', examples: [] },
      { id: 'conv-agree', title: 'Согласие и несогласие', body: '', examples: [] },
      { id: 'conv-clarify', title: 'Переспрос и уточнение', body: '', examples: [] },
      { id: 'conv-reactions', title: 'Устойчивые реакции', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 28. СИТУАТИВНЫЕ ДИАЛОГИ
  // ─────────────────────────────────────────────
  {
    id: 'dialogues',
    title: 'Ситуативные диалоги',
    icon: '💬',
    description: 'Знакомство, кафе, транспорт, магазин, врач, телефон',
    sections: [
      { id: 'dialogues-greetings', title: 'Знакомство и приветствия', body: '', examples: [] },
      { id: 'dialogues-cafe', title: 'В кафе и ресторане', body: '', examples: [] },
      { id: 'dialogues-directions', title: 'Дорога и транспорт', body: '', examples: [] },
      { id: 'dialogues-shopping', title: 'В магазине', body: '', examples: [] },
      { id: 'dialogues-health', title: 'У врача и о здоровье', body: '', examples: [] },
      { id: 'dialogues-phone', title: 'По телефону', body: '', examples: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 29. УСТОЙЧИВЫЕ ВЫРАЖЕНИЯ И ФРАЗЕОЛОГИЯ
  // ─────────────────────────────────────────────
  {
    id: 'phraseology',
    title: 'Устойчивые выражения',
    icon: '🧩',
    description: 'Идиомы, дискурсивные связки, повседневные фразы',
    sections: [
      { id: 'phrase-verbs', title: 'Глагольные устойчивые сочетания', body: '', examples: [] },
      { id: 'phrase-connectors', title: 'Дискурсивные связки', body: '', examples: [] },
      { id: 'phrase-everyday', title: 'Повседневные фразы-реакции', body: '', examples: [] },
    ],
  },
]

// ─────────────────────────────────────────────
// 30. GÉRONDIF И PARTICIPE PRÉSENT
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'gerondif',
  title: 'Gérondif et participe présent',
  icon: '🔄',
  description: 'En + participe présent (gérondif) и participe présent как прилагательное — две разные функции',
  sections: [
    {
      id: 'gerondif-formation',
      title: 'Образование participe présent',
      body: 'Participe présent образуется от основы формы «nous» в présent + окончание -ant: nous parlons → parlant, nous finissons → finissant, nous prenons → prenant. Три исключения: être → étant, avoir → ayant, savoir → sachant.',
      examples: [
        { ro: 'parler → parlant', ru: 'говорить → говорящий' },
        { ro: 'finir → finissant', ru: 'заканчивать → заканчивающий' },
        { ro: 'être → étant', ru: 'быть → будучи' },
        { ro: 'avoir → ayant', ru: 'иметь → имея' },
      ],
    },
    {
      id: 'gerondif-use',
      title: 'Gérondif: en + participe présent',
      body: 'Gérondif = en + participe présent. Выражает одновременность, способ или условие. Важно: субъект gérondif и главного глагола должен быть одним и тем же лицом.',
      examples: [
        { ro: 'Il chante en travaillant.', ru: 'Он поёт, работая / пока работает.' },
        { ro: 'Elle apprend le français en regardant des films.', ru: 'Она учит французский, смотря фильмы.' },
        { ro: 'En arrivant, il a vu ses amis.', ru: 'Приехав, он увидел друзей.' },
      ],
    },
    {
      id: 'participe-adjective',
      title: 'Participe présent как прилагательное',
      body: 'Без «en» participe présent функционирует как прилагательное — тогда оно называется «adjectif verbal» и согласуется с существительным в роде и числе.',
      examples: [
        { ro: 'une histoire fascinante', ru: 'захватывающая история', note: 'adjectif verbal — согласуется' },
        { ro: 'un enfant obéissant', ru: 'послушный ребёнок' },
        { ro: 'en lisant (gérondif) vs lisant (participe)', ru: 'читая (действие) vs читающий (определение)', note: 'ключевое различие' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────
// 31. C'EST VS IL EST
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'cest-vs-ilst',
  title: "C'est vs il est",
  icon: '⚖️',
  description: "Одна из самых частых точек ошибок — когда «это» и когда «он/она»",
  sections: [
    {
      id: 'cest-rules',
      title: "Когда c'est",
      body: "C'est используется: (1) перед артиклем + существительным, (2) перед именем собственным, (3) перед местоимением, (4) перед прилагательным, когда оно относится к ситуации в целом, а не к конкретному лицу.",
      examples: [
        { ro: "C'est un médecin.", ru: 'Это врач.', note: 'артикль + существительное' },
        { ro: "C'est Marie.", ru: 'Это Мари.', note: 'имя собственное' },
        { ro: "C'est moi.", ru: 'Это я.', note: 'местоимение' },
        { ro: "C'est intéressant!", ru: 'Это интересно!', note: 'оценка ситуации в целом' },
      ],
    },
    {
      id: 'ilst-rules',
      title: 'Когда il/elle est',
      body: 'Il/elle est используется: (1) перед прилагательным, которое описывает конкретного человека или предмет, (2) перед профессией/национальностью/религией без артикля.',
      examples: [
        { ro: 'Il est médecin.', ru: 'Он — врач.', note: 'профессия без артикля' },
        { ro: 'Elle est française.', ru: 'Она француженка.', note: 'национальность без артикля' },
        { ro: 'Il est grand.', ru: 'Он высокий.', note: 'прилагательное о конкретном человеке' },
        { ro: "Il est médecin. / C'est un bon médecin.", ru: 'Он врач. / Это хороший врач.', note: 'классическая пара' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────
// 32. NE…QUE (ОГРАНИЧИТЕЛЬНОЕ ОТРИЦАНИЕ)
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'ne-que',
  title: 'Ne…que',
  icon: '🎯',
  description: "«Только» — ограничение, не отрицание",
  sections: [
    {
      id: 'ne-que-structure',
      title: 'Структура и смысл',
      body: "Ne…que — не настоящее отрицание, а ограничение: «только». Ne стоит перед глаголом, que — перед тем, что ограничивается. Синоним: seulement. В разговорной речи ne часто опускается: «J'ai que dix euros».",
      examples: [
        { ro: "Je n'ai que dix euros.", ru: 'У меня только десять евро.' },
        { ro: "Il ne mange que des légumes.", ru: 'Он ест только овощи.' },
        { ro: "Elle ne travaille que le lundi.", ru: 'Она работает только по понедельникам.' },
        { ro: "Je n'ai que faire de ça.", ru: 'Мне это совсем не нужно.', note: 'устойчивое выражение' },
      ],
    },
    {
      id: 'ne-que-vs-pas',
      title: 'Ne…que vs ne…pas',
      body: 'Ne…pas — полное отрицание («не»). Ne…que — ограничение («только»). Разница принципиальная: «je ne mange pas de viande» (я не ем мясо) vs «je ne mange que de la viande» (я ем только мясо).',
      examples: [
        { ro: "Je ne mange pas de viande.", ru: 'Я не ем мясо.', note: 'полное отрицание' },
        { ro: "Je ne mange que de la viande.", ru: 'Я ем только мясо.', note: 'ограничение' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────
// 33. КОСВЕННАЯ РЕЧЬ (DISCOURS INDIRECT)
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'reported-speech',
  title: 'Косвенная речь',
  icon: '💬',
  description: 'Discours indirect — согласование времён, трансформации',
  sections: [
    {
      id: 'reported-intro',
      title: 'Трансформации при переводе в косвенную речь',
      body: 'При переводе прямой речи в косвенную меняются: местоимения, указательные слова, наречия времени и — главное — времена глаголов. Глагол введения в прошедшем времени запускает «согласование времён» (concordance des temps).',
      table: {
        headers: ['Прямая речь', 'Косвенная речь (глагол в прош.)'],
        rows: [
          ['présent', 'imparfait'],
          ['passé composé', 'plus-que-parfait'],
          ['futur simple', 'conditionnel présent'],
          ['futur antérieur', 'conditionnel passé'],
          ['imparfait', 'imparfait (без изменений)'],
        ],
      },
      examples: [
        { ro: "Il dit: «Je suis fatigué.» → Il dit qu'il est fatigué.", ru: 'Глагол в наст. — времена не меняются.' },
        { ro: "Il a dit: «Je suis fatigué.» → Il a dit qu'il était fatigué.", ru: 'Глагол в прош. — présent → imparfait.' },
        { ro: "Elle a dit: «Je viendrai.» → Elle a dit qu'elle viendrait.", ru: 'futur → conditionnel.' },
      ],
    },
    {
      id: 'reported-questions',
      title: 'Косвенные вопросы',
      body: 'Общий вопрос вводится через «si» (не «que»), специальный — через вопросительное слово. Порядок слов — прямой (не инверсия).',
      examples: [
        { ro: "Il demande: «Tu viens?» → Il demande si tu viens.", ru: 'si — для вопроса да/нет.' },
        { ro: "Elle demande: «Où habites-tu?» → Elle demande où tu habites.", ru: 'Вопросительное слово — без инверсии.' },
        { ro: "Il a demandé: «Qu'est-ce que tu fais?» → Il a demandé ce que je faisais.", ru: 'que → ce que в косвенном.' },
      ],
    },
    {
      id: 'reported-time-shift',
      title: 'Смена наречий времени и места',
      body: 'При переносе в косвенную речь меняются указательные слова.',
      table: {
        headers: ['Прямая речь', 'Косвенная речь'],
        rows: [
          ['maintenant', 'à ce moment-là'],
          ['aujourd\'hui', 'ce jour-là'],
          ['hier', 'la veille'],
          ['demain', 'le lendemain'],
          ['ici', 'là'],
          ['ce/cet/cette', 'ce/cet/cette…-là'],
        ],
      },
      examples: [
        { ro: "Il a dit: «Je viendrai demain.» → Il a dit qu'il viendrait le lendemain.", ru: 'demain → le lendemain.' },
      ],
    },
  ],
})
