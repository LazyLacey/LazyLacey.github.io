// ===== STATS =====
async function renderStats() {
  const grid = document.getElementById('stats-grid');
  if (!grid) return;
  await renderHeatmap();
  await renderRecord();

  const total = AppState.cards.length;
  const learned = [...AppState.cardStats.values()].filter(s => (s.srsLevel || 0) >= 3).length;
  const {totalShows, totalCorrect} = getTotalShowsCorrect();
  const overallPct = totalShows > 0 ? Math.round(totalCorrect / totalShows * 100) : 0;
  const srsDue = AppState.cards.filter(c => isSrsOverdue(c)).length;

  grid.innerHTML = `
    <div class="stat-card"><div class="stat-card-label">Всего слов</div><div class="stat-card-value accent">${total}</div></div>
    <div class="stat-card"><div class="stat-card-label">Выучено</div><div class="stat-card-value green">${learned}</div></div>
    <div class="stat-card"><div class="stat-card-label">Всего показов</div><div class="stat-card-value">${totalShows}</div></div>
    <div class="stat-card"><div class="stat-card-label">% правильных</div><div class="stat-card-value">${overallPct}%</div></div>
    <div class="stat-card" style="grid-column:1/-1"><div class="stat-card-label">К повторению сегодня (SRS)</div><div class="stat-card-value accent">${srsDue}</div></div>`;

  await drawProgressChart();

  const legend = document.getElementById('chart-legend');
  if (legend) {
    legend.innerHTML = `
      <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text3)">
        <div style="width:14px;height:10px;border-radius:3px;background:var(--accent-a25);flex-shrink:0"></div>Показано
      </div>
      <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text3)">
        <div style="width:14px;height:10px;border-radius:3px;background:var(--green);flex-shrink:0"></div>Правильно
      </div>`;
  }

  const worstEl = document.getElementById('stats-worst-cards');
  if (worstEl) {
    const worst = [...AppState.cardStats.values()]
      .filter(s => (s.shows || 0) >= 3)
      .map(s => ({
        card: AppState.cards.find(c => c.id === s.cardId),
        pct: Math.round((s.correct || 0) / s.shows * 100),
        shows: s.shows,
      }))
      .filter(x => x.card)
      .sort((a, b) => a.pct - b.pct)
      .slice(0, 5);

    if (worst.length === 0) {
      worstEl.innerHTML = '';
    } else {
      worstEl.innerHTML = `
        <div style="padding:16px 20px 8px;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--text3);font-weight:600">Сложные слова</div>
        ${worst.map(({card, pct, shows}) => `
          <div style="display:flex;align-items:center;gap:12px;padding:10px 20px;border-bottom:1px solid var(--border)">
            <div style="flex:1;min-width:0">
              <div style="font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(card.ro)}</div>
              <div style="font-size:12px;color:var(--text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(card.ru)}</div>
            </div>
            <div style="text-align:right;flex-shrink:0">
              <div style="font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:${pct < 40 ? 'var(--red)' : pct < 65 ? 'var(--accent)' : 'var(--text2)'}">${pct}%</div>
              <div style="font-size:11px;color:var(--text3)">${plural(shows, 'раз', 'раза', 'раз')}</div>
            </div>
          </div>`).join('')}`;
    }
  }
}

// ===== ANSWER LOG HELPER =====
async function getAnswerLogByDate_impl() {
  const allDays = await dbGetAll('dailyStats');
  const byDate = {};
  for (const d of allDays) byDate[d.date] = {total:d.total, correct:d.correct};
  return byDate;
}
async function getAnswerLogByDate() { return getAnswerLogByDate_impl(); }

let _chartPeriod = 7;

function setChartPeriod(days) {
  _chartPeriod = days;
  const btn7  = document.getElementById('chart-btn-7');
  const btn30 = document.getElementById('chart-btn-30');
  if (btn7 && btn30) {
    btn7.classList.toggle('chart-period-btn-active', days === 7);
    btn30.classList.toggle('chart-period-btn-active', days === 30);
  }
  drawProgressChart();
}

async function drawProgressChart() {
  const canvas = document.getElementById('progress-chart');
  if (!canvas) return;

  const byDate = await getAnswerLogByDate();
  const days   = _chartPeriod || 7;
  const today  = new Date();
  const labels = [];
  const dataCorrect = [];
  const dataTotal   = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key   = localDateKey(d);
    const entry = byDate[key] || { total: 0, correct: 0 };
    if (days === 7) {
      labels.push(i === 0 ? 'сег' : i === 1 ? 'вчера' : d.toLocaleDateString('ru', {day:'numeric', month:'numeric'}));
    } else {
      labels.push((i % 5 === 0 || i === 0) ? d.toLocaleDateString('ru', {day:'numeric', month:'numeric'}) : '');
    }
    dataCorrect.push(entry.correct);
    dataTotal.push(entry.total);
  }

  const hasData = dataTotal.some(v => v > 0);
  const dpr = window.devicePixelRatio || 1;
  const W   = Math.max(280, canvas.parentElement.clientWidth - 40);
  const H   = 140;
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const pad    = {top:16, right:12, bottom:30, left:28};
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg2').trim() || '#16162a';
  roundRect(ctx, 0, 0, W, H, 12); ctx.fill();

  if (!hasData) {
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text3').trim() || 'rgba(106,104,96,0.5)';
    ctx.font = '13px DM Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Данных пока нет — начните учить слова', W / 2, H / 2 + 5);
    return;
  }

  const maxVal = Math.max(...dataTotal, 1);

  const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || 'rgba(255,255,255,0.05)';
  const labelColor = getComputedStyle(document.documentElement).getPropertyValue('--text3').trim() || 'rgba(106,104,96,0.6)';
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#c8a96e';
  const greenColor = getComputedStyle(document.documentElement).getPropertyValue('--green').trim() || '#5ec49a';

  ctx.strokeStyle = gridColor;
  ctx.lineWidth   = 1;
  for (let i = 0; i <= 3; i++) {
    const y = pad.top + (chartH / 3) * i;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + chartW, y); ctx.stroke();
    if (i < 3) {
      ctx.fillStyle = labelColor;
      ctx.font = '10px DM Sans, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(maxVal - (maxVal / 3) * i), pad.left - 4, y + 4);
    }
  }

  if (days === 7) {
    const barW = Math.floor(chartW / days);
    const gap  = Math.max(2, Math.floor(barW * 0.18));
    for (let i = 0; i < days; i++) {
      const x  = pad.left + i * barW + gap;
      const bw = barW - gap * 2;
      const tH = dataTotal[i]   > 0 ? (dataTotal[i]   / maxVal) * chartH : 0;
      const cH = dataCorrect[i] > 0 ? (dataCorrect[i] / maxVal) * chartH : 0;
      if (tH > 0) {
        ctx.fillStyle = `rgba(${getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '200,169,110'},0.15)`;
        roundRect(ctx, x, pad.top + chartH - tH, bw, tH, 3); ctx.fill();
        ctx.fillStyle = greenColor;
        roundRect(ctx, x, pad.top + chartH - cH, bw, cH, 3); ctx.fill();
      }
      ctx.fillStyle = i === days - 1 ? `rgba(${getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '200,169,110'},0.8)` : labelColor;
      ctx.font = `${i === days - 1 ? '600 ' : ''}9px DM Sans, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(labels[i], x + bw / 2, H - 8);
    }
  } else {
    const xOf = i => pad.left + (i / (days - 1)) * chartW;
    const yOf = v => pad.top + chartH - (v / maxVal) * chartH;

    function drawLine(data, color, fillColor) {
      ctx.beginPath();
      ctx.moveTo(xOf(0), pad.top + chartH);
      for (let i = 0; i < days; i++) ctx.lineTo(xOf(i), yOf(data[i]));
      ctx.lineTo(xOf(days - 1), pad.top + chartH);
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(xOf(0), yOf(data[0]));
      for (let i = 1; i < days; i++) {
        const x0 = xOf(Math.max(0, i - 1)), y0 = yOf(data[Math.max(0, i - 1)]);
        const x1 = xOf(i), y1 = yOf(data[i]);
        const cpx = (x0 + x1) / 2;
        ctx.bezierCurveTo(cpx, y0, cpx, y1, x1, y1);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth   = 1.5;
      ctx.lineJoin    = 'round';
      ctx.stroke();
    }

    drawLine(dataTotal,   `rgba(${getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '200,169,110'},0.7)`, `rgba(${getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '200,169,110'},0.06)`);
    drawLine(dataCorrect, greenColor, `rgba(${getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '94,196,154'},0.08)`);

    for (let i = 0; i < days; i++) {
      if (!labels[i]) continue;
      ctx.fillStyle = labelColor;
      ctx.font = '9px DM Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(labels[i], xOf(i), H - 8);
    }
  }
}

async function renderHeatmap() {
  const gridEl = document.getElementById('heatmap-grid');
  const labelsEl = document.getElementById('heatmap-labels');
  if (!gridEl) return;
  const byDate = await getAnswerLogByDate();

  const wrapWidth = gridEl.closest('.heatmap-wrap')?.clientWidth || window.innerWidth;
  const CELL = 12, GAP = 3;
  const COLS = Math.max(4, Math.floor((wrapWidth - 40) / (CELL + GAP)));

  const today = new Date();
  const todayDow = (today.getDay() + 6) % 7;
  const gridEnd = new Date(today);
  gridEnd.setDate(today.getDate() + (6 - todayDow));
  const gridStart = new Date(gridEnd);
  gridStart.setDate(gridEnd.getDate() - (COLS * 7 - 1));

  const rows = Array.from({length: 7}, () => []);
  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row < 7; row++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + col * 7 + row);
      const key = localDateKey(d);
      const isFuture = d > today;
      const val = !isFuture && byDate[key] ? byDate[key].total : 0;
      rows[row].push({ date: d, key, val, isFuture });
    }
  }

  const activeDays = Object.values(byDate).map(d => d.total).filter(v => v > 0);
  const avg = activeDays.length > 0
    ? activeDays.reduce((a, b) => a + b, 0) / activeDays.length
    : 10;
  const t1 = 1;
  const t2 = Math.max(2, Math.round(avg * 0.5));
  const t3 = Math.max(t2 + 1, Math.round(avg));
  const t4 = Math.max(t3 + 1, Math.round(avg * 1.5));

  let tableHTML = '<table style="border-collapse:separate;border-spacing:3px;table-layout:fixed;width:100%">';
  tableHTML += '<tr>';
  let lastMonth = -1;
  for (let col = 0; col < COLS; col++) {
    const colDate = rows[0][col].date;
    const month = colDate.getMonth();
    if (month !== lastMonth) {
      lastMonth = month;
      const label = colDate.toLocaleDateString('ru', {month:'short'});
      tableHTML += `<td style="font-size:9px;color:var(--text3);white-space:nowrap;padding-bottom:2px;vertical-align:bottom;overflow:visible">${label}</td>`;
    } else {
      tableHTML += `<td></td>`;
    }
  }
  tableHTML += '</tr>';

  for (let row = 0; row < 7; row++) {
    tableHTML += '<tr>';
    for (let col = 0; col < COLS; col++) {
      const cell = rows[row][col];
      let cls = '';
      if (cell.isFuture) cls = 'future';
      else if (cell.val >= t4) cls = 'l4';
      else if (cell.val >= t3) cls = 'l3';
      else if (cell.val >= t2) cls = 'l2';
      else if (cell.val >= t1) cls = 'l1';
      const title = cell.isFuture ? '' : `${cell.key}: ${cell.val}`;
      tableHTML += `<td class="heatmap-cell ${cls}" title="${title}"></td>`;
    }
    tableHTML += '</tr>';
  }
  tableHTML += '</table>';

  gridEl.innerHTML = tableHTML;
  if (labelsEl) labelsEl.innerHTML = '';
}

async function renderRecord() {
  const el = document.getElementById('record-block-wrap');
  const oldLine = document.getElementById('record-line');
  if (!el) return;

  const bestPct   = await getBestAccuracy();
  const streak    = await getStreak();
  const totalSess = await getTotalSessions();

  let studiedToday = false;
  try {
    const todayRec = await dbGet('dailyStats', localDateKey());
    studiedToday = !!(todayRec && todayRec.total > 0);
  } catch(e) {}
  const fireStyle = studiedToday
    ? 'color:var(--fire,#f97316)'
    : 'filter:grayscale(1);opacity:0.45';

  if (oldLine) oldLine.innerHTML = '';

  el.innerHTML = `
    <div class="record-block-header">
      <div class="record-block-title">Достижения</div>
    </div>
    <div class="record-block-items">
      <div class="record-item">
        <div class="record-item-icon">🎯</div>
        <div class="record-item-val accent">${bestPct}%</div>
        <div class="record-item-label">Рекорд<br>точности</div>
      </div>
      <div class="record-item">
        <div class="record-item-icon" style="${fireStyle}">🔥</div>
        <div class="record-item-val ${studiedToday ? 'fire' : ''}" style="${studiedToday ? '' : 'color:var(--text3)'}">${streak}</div>
        <div class="record-item-label">Дней<br>подряд</div>
      </div>
      <div class="record-item">
        <div class="record-item-icon">📚</div>
        <div class="record-item-val green">${totalSess}</div>
        <div class="record-item-label">Всего<br>сессий</div>
      </div>
    </div>`;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

Object.assign(window, {
  renderStats,
  setChartPeriod,
});
