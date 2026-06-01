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
      { phIcon: 'ph-cards-three', color: '#7b79ff', title: 'Карточки',             sub: '~800 слов · 14 тем',                fn: "loadReadyPack('data/romanian-cards.json','cards')" },
      { phIcon: 'ph-book-open',   color: '#30d158', title: 'Грамматика — пак 1',   sub: 'Артикли, падежи, времена, глаголы', fn: "loadReadyPack('data/grammar-tests.json','tests')" },
      { phIcon: 'ph-text-aa',     color: '#ff6b35', title: 'Глаголы',               sub: '20 базовых глаголов',                fn: "loadReadyPack('data/verbs-pack-1.json','verbs')" },
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
      { phIcon: 'ph-cards-three', color: '#7b79ff', title: 'Карточки',             sub: '~1500 слов · 42 темы',                fn: "loadReadyPack('data/spanish-cards.json','cards')" },
      { phIcon: 'ph-sparkle',     color: '#f4c430', title: 'Промпты для нейросети', sub: 'Сгенерируйте свои карточки и тесты', fn: 'obDownloadPrompts()', download: true },
    ],
  },
};

function currentLang() {
  return LANGUAGES[localStorage.getItem('lang') || 'romanian'];
}

window.LANGUAGES = LANGUAGES;
window.currentLang = currentLang;
