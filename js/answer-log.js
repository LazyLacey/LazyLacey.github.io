function localDateKey(d) {
  const dd = d || new Date();
  return `${dd.getFullYear()}-${String(dd.getMonth() + 1).padStart(2, '0')}-${String(dd.getDate()).padStart(2, '0')}`;
}

function getCardStats(cardId) {
  return AppState.cardStats.get(cardId) || {
    cardId, shows: 0, correct: 0,
    srsLevel: 0, srsEf: 2.5, srsInterval: 1,
    nextReview: null, lastSeen: null,
  };
}

async function putCardStats(stats) {
  AppState.cardStats.set(stats.cardId, stats);
  await dbPut('cardStats', stats);
}

async function putDailyStats(date, total, correct) {
  let rec = null;
  try { rec = await dbGet('dailyStats', date); } catch(e) {}
  if (!rec) rec = { date, total: 0, correct: 0 };
  rec.total   += total;
  rec.correct += correct;
  await dbPut('dailyStats', rec);
  return rec;
}

async function putSession(session) {
  await dbPut('sessions', session);
  try {
    const rec = await dbGet('meta', 'totalSessionsEver');
    const next = ((rec?.value) || 0) + 1;
    await dbPut('meta', { id: 'totalSessionsEver', value: next });
  } catch(e) {}
  try {
    const all = await dbGetAll('sessions');
    if (all.length > MAX_SESSIONS) {
      const sorted = all.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
      const toDelete = sorted.slice(0, all.length - MAX_SESSIONS);
      for (const s of toDelete) await dbDelete('sessions', s.sessionId);
    }
  } catch(e) {}
}

async function getStreak() {
  const allDays = await dbGetAll('dailyStats');
  const dates = new Set(allDays.map(d => d.date));
  const today = new Date();
  const todayKey = localDateKey(today);
  const startOffset = dates.has(todayKey) ? 0 : 1;
  let streak = 0;
  for (let i = startOffset; i < 3650; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    if (dates.has(localDateKey(d))) streak++;
    else break;
  }
  return streak;
}

async function getBestAccuracy() {
  const sessions = await dbGetAll('sessions');
  let best = 0;
  for (const s of sessions) {
    if (s.total >= 5) {
      const pct = Math.round(s.correct / s.total * 100);
      if (pct > best) best = pct;
    }
  }
  return best;
}

async function getTotalSessions() {
  try {
    const rec = await dbGet('meta', 'totalSessionsEver');
    if (rec?.value) return rec.value;
    // Counter doesn't exist yet — initialize from current sessions store
    // (may be capped at MAX_SESSIONS for existing users, but preserves what we know)
    const sessions = await dbGetAll('sessions');
    const known = sessions.length;
    await dbPut('meta', { id: 'totalSessionsEver', value: known });
    return known;
  } catch(e) {
    const sessions = await dbGetAll('sessions');
    return sessions.length;
  }
}

async function getSessionHistory() {
  const sessions = await dbGetAll('sessions');
  return sessions.map(s => ({
    sessionId: s.sessionId,
    date: s.date,
    total: s.total,
    correct: s.correct,
    pct: s.total > 0 ? Math.round(s.correct / s.total * 100) : 0,
    errorIds: s.errorIds || [],
  })).sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : a.sessionId.localeCompare(b.sessionId));
}

function getTotalShowsCorrect() {
  let totalShows = 0, totalCorrect = 0;
  for (const s of AppState.cardStats.values()) {
    totalShows   += s.shows || 0;
    totalCorrect += s.correct || 0;
  }
  return { totalShows, totalCorrect };
}

function invalidateAggCache() {}

let _errorCardsPromise = null;

async function getErrorCards() {
  if (_errorCardsPromise) return _errorCardsPromise;
  _errorCardsPromise = getSessionHistory().then(history => {
    const recent = history.slice(-AppState.settings.errorSessions);
    const ids    = new Set(recent.flatMap(e => e.errorIds || []).map(String));
    return AppState.cards.filter(c => ids.has(String(c.id)));
  }).catch(() => []);
  return _errorCardsPromise;
}

function invalidateErrorCards() { _errorCardsPromise = null; }

Object.assign(window, {
  localDateKey, getCardStats, putCardStats, putDailyStats, putSession,
  getStreak, getBestAccuracy, getTotalSessions, getSessionHistory,
  getTotalShowsCorrect, invalidateAggCache, getErrorCards, invalidateErrorCards,
});
