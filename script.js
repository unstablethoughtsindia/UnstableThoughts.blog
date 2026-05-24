function openDrawer() {
    document.getElementById('drawer').classList.add('open');
    document.getElementById('drawerOverlay').classList.add('open');
    document.getElementById('hamburger').setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
    setTimeout(function(){ document.getElementById('drawerCloseBtn').focus(); }, 100);
  }
  function closeDrawer() {
    document.getElementById('drawer').classList.remove('open');
    document.getElementById('drawerOverlay').classList.remove('open');
    document.getElementById('hamburger').setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
    document.getElementById('hamburger').focus();
  }
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeDrawer(); });

  // ── Share helpers ────────────────────────────────────────────────
  var SHARE_TITLE = 'The real reason for starting UnstableThoughts and why silence is no longer an option.';

  function getShareURL() {
    // Prefer the canonical OG URL if available, fall back to current page
    var canonical = document.querySelector('meta[property="og:url"]');
    return canonical ? canonical.getAttribute('content') : window.location.href;
  }

  function initShareButtons() {
    var url        = encodeURIComponent(getShareURL());
    var title      = encodeURIComponent(SHARE_TITLE);

    // X / Twitter
    var xBtn = document.querySelector('.share-btn[title="Share on X"]');
    if (xBtn) {
      xBtn.href = 'https://x.com/intent/tweet?url=' + url + '&text=' + title;
      xBtn.target = '_blank';
      xBtn.rel    = 'noopener noreferrer';
    }

    // LinkedIn
    var liBtn = document.querySelector('.share-btn[title="Share on LinkedIn"]');
    if (liBtn) {
      liBtn.href   = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;
      liBtn.target = '_blank';
      liBtn.rel    = 'noopener noreferrer';
    }

    // Email — rebuild with the real URL in the body
    var emailBtn = document.querySelector('.share-btn[title="Share via Email"]');
    if (emailBtn) {
      var subject = encodeURIComponent('UnstableThoughts: The Question — Why?');
      var body    = encodeURIComponent('Thought you might find this interesting:\n\n' + getShareURL());
      emailBtn.href = 'mailto:?subject=' + subject + '&body=' + body;
    }
  }

  // Run once the page is ready
  document.addEventListener('DOMContentLoaded', initShareButtons);
  // ────────────────────────────────────────────────────────────────

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(function(){
      var btn = document.getElementById('copyBtn');
      btn.classList.add('copied');
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width:13px;height:13px;flex-shrink:0;"><path d="M20 6L9 17l-5-5"/></svg>Copied!';
      setTimeout(function(){
        btn.classList.remove('copied');
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:13px;height:13px;flex-shrink:0;"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>Copy link';
      }, 2000);
    });
  }

  window.addEventListener('scroll', function(){
    var p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    document.getElementById('progressBar').style.width = p + '%';
  });

  // share button 

  async function shareArticle() {
  const url = window.location.href;
  const title = document.title;
  if (navigator.share) {
    try { await navigator.share({ title, url }); }
    catch(e) { if (e.name !== 'AbortError') navigator.clipboard.writeText(url); }
  } else {
    navigator.clipboard.writeText(url);
  }
}

