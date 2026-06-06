const LANGUAGES = {
  romanian: {
    id: 'romanian',
    name: 'Румынский',
    nativeName: 'Română',
    flag: '🇷🇴',
    targetLabel: 'Румынский',
    nativeLabel: 'Русский',
    dbPrefix: 'Romanian',
    grammarFile: 'js/grammar-romanian.js',
    diacriticHints: ['ă', 'â', 'î', 'ș', 'ț'],
    verbPronouns: ['eu', 'tu', 'el/ea', 'noi', 'voi', 'ei/ele'],
    readyPacks: [
      { phIcon: 'ph-cards-three', color: '#7b79ff', title: 'Карточки',             sub: '~1600 слов · 42 темы',               fn: "loadReadyPack('data/romanian-cards.json','cards')" },
      { phIcon: 'ph-book-open',   color: '#30d158', title: 'Грамматика — пак 1',   sub: 'Артикли, падежи, времена, глаголы', fn: "loadReadyPack('data/grammar-tests-romanian.json','tests')" },
      { phIcon: 'ph-text-aa',     color: '#ff6b35', title: 'Глаголы',               sub: '20 базовых глаголов',                fn: "loadReadyPack('data/verbs-romanian.json','verbs')" },
      { phIcon: 'ph-sparkle',     color: '#f4c430', title: 'Промпты для нейросети', sub: 'Сгенерируйте свои карточки и тесты', fn: 'obDownloadPrompts()', download: true },
    ],
  },
  spanish: {
    id: 'spanish',
    name: 'Испанский',
    nativeName: 'Español',
    flag: '🇪🇸',
    targetLabel: 'Испанский',
    nativeLabel: 'Русский',
    dbPrefix: 'Spanish',
    grammarFile: 'js/grammar-spanish.js',
    diacriticHints: ['á', 'é', 'í', 'ó', 'ú', 'ñ', '¿', '¡'],
    verbPronouns: ['yo', 'tú', 'él/ella', 'nosotros', 'vosotros', 'ellos/ellas'],
    readyPacks: [
      { phIcon: 'ph-cards-three', color: '#7b79ff', title: 'Карточки',             sub: '~1567 слов · 45 тем',               fn: "loadReadyPack('data/spanish-cards.json','cards')" },
      { phIcon: 'ph-book-open',   color: '#30d158', title: 'Грамматика — тесты',   sub: '20 тем, 200 вопросов',                fn: "loadReadyPack('data/grammar-tests-spanish.json','tests')" },
      { phIcon: 'ph-text-aa',     color: '#ff6b35', title: 'Глаголы',               sub: '10 базовых глаголов, 3 времени',       fn: "loadReadyPack('data/verbs-spanish.json','verbs')" },
      { phIcon: 'ph-sparkle',     color: '#f4c430', title: 'Промпты для нейросети', sub: 'Сгенерируйте свои карточки и тесты', fn: 'obDownloadPrompts()', download: true },
    ],
  },
  german: {
    id: 'german',
    name: 'Немецкий',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    targetLabel: 'Немецкий',
    nativeLabel: 'Русский',
    dbPrefix: 'German',
    grammarFile: 'js/grammar-german.js',
    diacriticHints: ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'],
    verbPronouns: ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'],
    readyPacks: [
      { phIcon: 'ph-book-open',   color: '#30d158', title: 'Грамматика — тесты',   sub: '20 тем, 200 вопросов',                fn: "loadReadyPack('data/grammar-tests-german.json','tests')" },
      { phIcon: 'ph-sparkle',     color: '#f4c430', title: 'Промпты для нейросети', sub: 'Сгенерируйте свои карточки и тесты', fn: 'obDownloadPrompts()', download: true },
    ],
  },
  italian: {
    id: 'italian',
    name: 'Итальянский',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    targetLabel: 'Итальянский',
    nativeLabel: 'Русский',
    dbPrefix: 'Italian',
    grammarFile: 'js/grammar-italian.js',
    diacriticHints: ['à', 'è', 'é', 'ì', 'ò', 'ù'],
    verbPronouns: ['io', 'tu', 'lui/lei', 'noi', 'voi', 'loro'],
    readyPacks: [
      { phIcon: 'ph-book-open',   color: '#30d158', title: 'Грамматика — тесты',   sub: '33 темы, 330 вопросов',               fn: "loadReadyPack('data/grammar-tests-italian.json','tests')" },
      { phIcon: 'ph-sparkle',     color: '#f4c430', title: 'Промпты для нейросети', sub: 'Сгенерируйте свои карточки и тесты', fn: 'obDownloadPrompts()', download: true },
    ],
  },
  french: {
    id: 'french',
    name: 'Французский',
    nativeName: 'Français',
    flag: '🇫🇷',
    targetLabel: 'Французский',
    nativeLabel: 'Русский',
    dbPrefix: 'French',
    grammarFile: 'js/grammar-french.js',
    diacriticHints: ['à', 'â', 'ç', 'é', 'è', 'ê', 'î', 'ô', 'ù', 'û'],
    verbPronouns: ['je', 'tu', 'il/elle', 'nous', 'vous', 'ils/elles'],
    readyPacks: [
      { phIcon: 'ph-book-open',   color: '#30d158', title: 'Грамматика — тесты',   sub: '29 тем, 290 вопросов',                fn: "loadReadyPack('data/grammar-tests-french.json','tests')" },
      { phIcon: 'ph-sparkle',     color: '#f4c430', title: 'Промпты для нейросети', sub: 'Сгенерируйте свои карточки и тесты', fn: 'obDownloadPrompts()', download: true },
    ],
  },
  korean: {
    id: 'korean',
    name: 'Корейский',
    nativeName: '한국어',
    flag: '🇰🇷',
    targetLabel: 'Корейский',
    nativeLabel: 'Русский',
    dbPrefix: 'Korean',
    grammarFile: 'js/grammar-korean.js',
    diacriticHints: [],
    verbPronouns: ['나', '너', '그/그녀', '우리', '여러분', '그들'],
    readyPacks: [
      { phIcon: 'ph-book-open',   color: '#30d158', title: 'Грамматика — тесты',   sub: '30 тем, 300 вопросов',                fn: "loadReadyPack('data/grammar-tests-korean.json','tests')" },
      { phIcon: 'ph-sparkle',     color: '#f4c430', title: 'Промпты для нейросети', sub: 'Сгенерируйте свои карточки и тесты', fn: 'obDownloadPrompts()', download: true },
    ],
  },
};

function currentLang() {
  return LANGUAGES[localStorage.getItem('lang') || 'romanian'];
}

window.LANGUAGES = LANGUAGES;
window.currentLang = currentLang;
