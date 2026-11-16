/* Shared behaviour: menu, header, scroll reveals. Kept tiny — no work runs
   per scroll frame beyond one cheap rAF-throttled check. */
(function () {
  var body = document.body;
  var header = document.querySelector('.site-header');
  var menuBtn = document.querySelector('.menu-btn');
  var panel = document.querySelector('.menu-panel');
  var scrim = document.querySelector('.menu-scrim');

  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    if (panel) panel.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  if (menuBtn && panel) {
    menuBtn.addEventListener('click', function () { setMenu(!body.classList.contains('menu-open')); });
    if (scrim) scrim.addEventListener('click', function () { setMenu(false); });
    panel.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  // Header: transparent over the hero, solid after; hides while scrolling
  // down and comes back on the way up.
  if (header) {
    var lastY = window.scrollY;
    var ticking = false;
    var update = function () {
      ticking = false;
      var y = window.scrollY;
      header.classList.toggle('is-solid', y > 24 || header.hasAttribute('data-solid'));
      if (!body.classList.contains('menu-open')) {
        header.classList.toggle('is-hidden', y > lastY && y > 220);
      }
      lastY = y;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  // Scroll reveals
  var revealEls = document.querySelectorAll('[data-r]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Hero/load-in states
  requestAnimationFrame(function () { body.classList.add('is-ready'); });
})();

// Numbers count up from 0 the first time they scroll into view
(function () {
  var els = document.querySelectorAll('.stat strong, .pr-stats-row span, [data-count]');
  if (!els.length || !('IntersectionObserver' in window)) return;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = [];
  els.forEach(function (el) {
    var m = el.textContent.trim().match(/^([^\d]*)(\d[\d,]*)([^\d]*)$/);
    if (!m) return;
    var end = parseInt(m[2].replace(/,/g, ''), 10);
    items.push({ el: el, pre: m[1], end: end, post: m[3], comma: m[2].indexOf(',') > -1 });
    if (!reduce) el.textContent = m[1] + '0' + m[3];
  });
  if (reduce) return;
  var fmt = function (n, c) { return c ? n.toLocaleString('en-US') : String(n); };
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      var it = items.filter(function (x) { return x.el === en.target; })[0];
      var t0 = performance.now(), dur = Math.min(2200, 1200 + it.end * 0.8);
      (function step(now) {
        var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 4);
        it.el.textContent = it.pre + fmt(Math.round(it.end * e), it.comma) + it.post;
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    });
  }, { threshold: 0.6 });
  items.forEach(function (it) { it.el.style.fontVariantNumeric = 'tabular-nums'; io.observe(it.el); });
})();
