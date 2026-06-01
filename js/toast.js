let toastTimer;

function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  const ti = document.getElementById('toast-inner');
  ti.textContent = msg;
  t.className   = 'toast show' + (type ? ' ' + type : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2000);
}

window.showToast = showToast;
