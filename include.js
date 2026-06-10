fetch('/nav.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('nav-placeholder').innerHTML = html;

    // Highlight current page link
    const links = document.querySelectorAll('#nav-placeholder a');
    links.forEach(link => {
      if (link.href === window.location.href) {
        link.classList.add('active');
      }
    });
  });