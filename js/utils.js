function esc(s) {
  return (s || '').replace(/&/g,'&amp;').replace(/\x3C/g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function diffHighlightInline(input, correct, hardMode = false) {
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const a = input.toLowerCase().slice(0, correct.length);
  let html = 'Правильно: <strong>';
  for (let k = 0; k < correct.length; k++) {
    const ca = k < a.length ? a[k] : '';
    const cc = correct[k];
    const match = hardMode ? ca === cc.toLowerCase() : norm(ca) === norm(cc);
    html += match
      ? `<span style="color:var(--green)">${esc(cc)}</span>`
      : `<span style="color:var(--red)">${esc(cc)}</span>`;
  }
  html += '</strong>';
  return html;
}

// plural(5, 'карточка', 'карточки', 'карточек') → '5 карточек'
function plural(n, form1, form2, form5) {
  const mod10  = n % 10;
  const mod100 = n % 100;
  let form;
  if (mod10 === 1 && mod100 !== 11) form = form1;
  else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) form = form2;
  else form = form5;
  return `${n} ${form}`;
}

function emptyState(icon, title, sub) {
  return `<div class="empty-state"><div class="empty-icon">${icon}</div><div class="empty-title">${title}</div><div class="empty-sub">${sub}</div></div>`;
}

window.esc = esc;
window.diffHighlightInline = diffHighlightInline;
window.plural = plural;
window.emptyState = emptyState;
