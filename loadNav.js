// loadNav.js
fetch('./Nav_bar.html')
  .then(res => {
    if (!res.ok) {
      throw new Error(`Failed to load nav: ${res.status}`);
    }
    return res.text();
  })
  .then(html => {
    const navPlaceholder = document.getElementById('nav-placeholder');

    if (!navPlaceholder) {
      throw new Error('#nav-placeholder not found');
    }

    navPlaceholder.innerHTML = html;

    const hamburger = document.getElementById('hamburger');
    const closeBtn = document.getElementById('drawerCloseBtn');
    const overlay = document.getElementById('drawerOverlay');
    const mainNav = document.getElementById('mainNav');

    if (hamburger) hamburger.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    document.querySelectorAll('.drawer-item').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    window.addEventListener('scroll', () => {
      if (mainNav) {
        mainNav.classList.toggle('scrolled', window.scrollY > 10);
      }
    });
  })
  .catch(err => {
    console.error('Nav load error:', err);
  });