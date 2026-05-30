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

window.LANGUAGES = LANGUAGES;
window.currentLang = currentLang;
