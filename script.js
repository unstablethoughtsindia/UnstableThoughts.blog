/* ── Reading progress ── */
const progressBar = document.getElementById('readingProgress');
const navEl = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop || document.body.scrollTop;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
  if (scrollTop > 50) navEl.classList.add('scrolled');
  else navEl.classList.remove('scrolled');
});

/* ── Theme ── */
const html = document.documentElement;
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

const SUN_PATH = `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;
const MOON_PATH = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;

function setTheme(t) {
  html.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  if (t === 'dark') {
    themeIcon.innerHTML = SUN_PATH;
    themeLabel.textContent = 'Dark';
  } else {
    themeIcon.innerHTML = MOON_PATH;
    themeLabel.textContent = 'Light';
  }
}

document.getElementById('darkToggle').addEventListener('click', () => {
  setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

setTheme(localStorage.getItem('theme') || 'light');

/* ── Share dropdown ── */
const shareBtn = document.getElementById('shareBtn');
const shareDropdown = document.getElementById('shareDropdown');

shareBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  shareDropdown.classList.toggle('open');
});
document.addEventListener('click', () => shareDropdown.classList.remove('open'));
shareDropdown.addEventListener('click', e => e.stopPropagation());

/* ── Share actions ── */
const PAGE_URL = 'https://unstablethoughts.blog/The-real-reason-for-starting-unstablethoughts_ar=001';
const PAGE_TITLE = 'The Question: Why? - UnstableThoughts: ';

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

function copyLink() {
  navigator.clipboard.writeText(PAGE_URL).then(() => showToast('Link copied to clipboard'));
  shareDropdown.classList.remove('open');
}
function shareToX() {
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(PAGE_URL)}&text=${encodeURIComponent(PAGE_TITLE)}`, '_blank');
  shareDropdown.classList.remove('open');
}
function shareToLinkedIn() {
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(PAGE_URL)}`, '_blank');
  shareDropdown.classList.remove('open');
}
function shareToWhatsApp() {
  window.open(`https://wa.me/?text=${encodeURIComponent(PAGE_TITLE + ' ' + PAGE_URL)}`, '_blank');
  shareDropdown.classList.remove('open');
}

/* ── Native share fallback ── */
if (navigator.share) {
  shareBtn.addEventListener('dblclick', () => {
    navigator.share({ title: PAGE_TITLE, url: PAGE_URL });
  });
}
