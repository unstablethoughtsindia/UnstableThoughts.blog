// loadNav.js
fetch('/Nav_bar.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('nav-placeholder').innerHTML = html;

    // ✅ NOW the nav is in the DOM — wire up events here
    document.getElementById('hamburger').addEventListener('click', openDrawer);
    document.getElementById('drawerCloseBtn').addEventListener('click', closeDrawer);
    document.getElementById('drawerOverlay').addEventListener('click', closeDrawer);

    document.querySelectorAll('.drawer-item').forEach(function(link) {
      link.addEventListener('click', closeDrawer);
    });

    window.addEventListener('scroll', function() {
      document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 10);
    });

  })
  .catch(err => console.error('Nav load error:', err));
      function openDrawer() {
      document.getElementById('drawer').classList.add('open');
      document.getElementById('drawerOverlay').classList.add('open');
      var hamburger = document.getElementById('hamburger');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      setTimeout(function() {
        document.getElementById('drawerCloseBtn').focus();
      }, 100);
    }

    function closeDrawer() {
      var drawer = document.getElementById('drawer');
      drawer.classList.remove('open');
      document.getElementById('drawerOverlay').classList.remove('open');
      var hamburger = document.getElementById('hamburger');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.classList.remove('is-open');
      document.body.style.overflow = '';
      hamburger.focus();
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeDrawer();
    });

    function toggleFaq(item) {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    }

    // Wire up buttons
    document.getElementById('hamburger').addEventListener('click', openDrawer);
    document.getElementById('drawerCloseBtn').addEventListener('click', closeDrawer);
    document.getElementById('drawerOverlay').addEventListener('click', closeDrawer);

    // Close on drawer link click
    document.querySelectorAll('.drawer-item').forEach(function(link) {
      link.addEventListener('click', closeDrawer);
    });

    // Scroll: add shadow to nav
    window.addEventListener('scroll', function() {
      document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 10);
    });