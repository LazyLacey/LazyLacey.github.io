// Интервалы в днях для уровней 0..6 (начальная лестница до первого EF-расчёта)
const SRS_BOOTSTRAP = [1, 3, 7, 14, 30, 60, 120];

// EF: easiness factor, float 1.3–3.5; стартует на 2.5 по SM-2
const EF_DEFAULT = 2.5;
const EF_MIN     = 1.3;

function srsNextReview(card, correct, similarity = null) {
  const ef  = card.srsEf       ?? EF_DEFAULT;
  const lvl = card.srsLevel    ?? 0;
  const prev= card.srsInterval ?? 1;

  let newEf, newLevel, newInterval;

  if (!correct) {
    if (similarity !== null && similarity >= 0.8) {
      newEf       = Math.max(EF_MIN, ef - 0.05);
      newLevel    = Math.max(0, lvl - 1);
      newInterval = Math.max(1, Math.round(prev * 0.6));
    } else if (similarity !== null && similarity >= 0.5) {
      newEf       = Math.max(EF_MIN, ef - 0.15);
      newLevel    = Math.max(0, lvl - 2);
      newInterval = Math.max(1, Math.round(prev * 0.3));
    } else {
      newEf       = Math.max(EF_MIN, ef - 0.2);
      newLevel    = 0;
      newInterval = 1;
    }
  } else {
    newEf = Math.min(3.5, ef + 0.1);

    if (lvl === 0) {
      newLevel    = 1;
      newInterval = 1;
    } else if (lvl === 1) {
      newLevel    = 2;
      newInterval = 6;
    } else {
      newLevel    = lvl + 1;
      newInterval = Math.round(prev * newEf);
    }
  }

  return {
    srsLevel:    newLevel,
    srsEf:       parseFloat(newEf.toFixed(2)),
    srsInterval: newInterval,
    nextReview:  Date.now() + newInterval * 86400000,
  };
}

function isSrsOverdue(card) {
  const s = AppState.cardStats.get(card.id);
  if (!s || !s.nextReview) return true;
  return Date.now() >= s.nextReview;
}

function formatSrsDate(ts) {
  if (!ts) return 'сейчас';
  const diff = Math.round((ts - Date.now()) / 86400000);
  if (diff <= 0) return 'сейчас';
  if (diff === 1) return 'завтра';
  return `+${diff}д`;
}

function buildStudyQueue() {
  let pool = AppState.studyFilter !== null
    ? AppState.cards.filter(c => AppState.studyFilter.includes(c.groupId))
    : [...AppState.cards];

  pool = pool.filter(c => isSrsOverdue(c));

  if (pool.length === 0) { AppState.studyQueue = []; AppState.studyIndex = 0; return; }

  const overdue = pool.filter(c => {
    const s = AppState.cardStats.get(c.id);
    return s && s.nextReview;
  }).sort((a, b) => {
    const sa = AppState.cardStats.get(a.id);
    const sb = AppState.cardStats.get(b.id);
    return (sa?.nextReview || 0) - (sb?.nextReview || 0);
  });
  const brand = pool.filter(c => {
    const s = AppState.cardStats.get(c.id);
    return !s || !s.nextReview;
  }).sort(() => Math.random() - 0.5);

  const MS_DAY = 86400000;
  const now = Date.now();
  let i = 0;
  while (i < overdue.length) {
    let j = i + 1;
    const si = AppState.cardStats.get(overdue[i].id);
    while (j < overdue.length) {
      const sj = AppState.cardStats.get(overdue[j].id);
      if (Math.floor(((sj?.nextReview||0) - now) / MS_DAY) !== Math.floor(((si?.nextReview||0) - now) / MS_DAY)) break;
      j++;
    }
    for (let k = j - 1; k > i; k--) {
      const r = i + Math.floor(Math.random() * (k - i + 1));
      [overdue[k], overdue[r]] = [overdue[r], overdue[k]];
    }
    i = j;
  }

  AppState.studyQueue = [...overdue, ...brand].slice(0, 20);
  AppState.studyIndex = 0;
}

window.SRS_BOOTSTRAP = SRS_BOOTSTRAP;
window.EF_DEFAULT = EF_DEFAULT;
window.EF_MIN = EF_MIN;
window.srsNextReview = srsNextReview;
window.isSrsOverdue = isSrsOverdue;
window.formatSrsDate = formatSrsDate;
window.buildStudyQueue = buildStudyQueue;
