// Small enhancements; every page works without them.
(function () {
  document.documentElement.classList.add('js');

  // Email buttons (N-09): addresses are base64 in data-m and only become mailto links here.
  document.querySelectorAll('[data-m]').forEach(el => {
    const addr = atob(el.dataset.m);
    if (el.tagName === 'A') el.href = 'mailto:' + addr + (el.dataset.s ? '?subject=' + encodeURIComponent(el.dataset.s) : '');
    else el.textContent = addr;
  });

  // Phone menu: the nav stays visible without JavaScript; with it, a Menu button toggles it on small screens.
  const btn = document.querySelector('.menu-btn'), nav = document.getElementById('nav');
  if (btn && nav) {
    btn.hidden = false;
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
      btn.textContent = open ? 'Close' : 'Menu';
    });
  }

  // Drop-down menus: one open at a time; close on outside click or Escape.
  const subs = [...document.querySelectorAll('.nav details')];
  subs.forEach(d => d.addEventListener('toggle', () => { if (d.open) subs.forEach(o => { if (o !== d) o.open = false; }); }));
  document.addEventListener('click', e => subs.forEach(d => { if (!d.contains(e.target)) d.open = false; }));
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const open = subs.find(d => d.open);
    if (open) { open.open = false; open.querySelector('summary').focus(); }
  });

  // Lightbox (F-06): photos link to their large version; open it in a dialog instead of leaving the page.
  const box = document.querySelector('.lightbox');
  if (box && box.showModal) {
    const img = box.querySelector('img'), cap = box.querySelector('.lb-cap');
    document.querySelectorAll('a.zoom').forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      img.src = a.href;
      img.alt = a.dataset.caption || '';
      cap.textContent = a.dataset.caption || '';
      box.showModal();
    }));
    box.addEventListener('click', e => { if (e.target === box || e.target === img) box.close(); });
  }
})();
