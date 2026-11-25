/* Home page: project preview videos and the contact form. */
(function () {
  var isTouch = window.matchMedia('(hover: none)').matches;
  var medias = document.querySelectorAll('[data-work-media]');

  // Fetch each preview a little before it scrolls into view so it is already
  // buffered when it needs to play.
  if ('IntersectionObserver' in window) {
    var preload = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        var v = entry.target.querySelector('video');
        if (v) { v.preload = 'auto'; v.load(); }
      });
    }, { rootMargin: '600px 0px 600px 0px' });
    medias.forEach(function (el) { preload.observe(el); });
  }

  medias.forEach(function (media) {
    var video = media.querySelector('video');
    if (!video) return;
    var card = media.closest('.proj') || media;

    function play() {
      media.classList.add('is-playing');
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    }
    function stop(reset) {
      media.classList.remove('is-playing');
      video.pause();
      if (reset) video.currentTime = 0;
    }

    if (isTouch && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) play(); else stop(false);
        });
      }, { threshold: 0.6 }).observe(media);
    } else if (!media.closest('#work')) {
      card.addEventListener('mouseenter', play);
      card.addEventListener('mouseleave', function () { stop(true); });
    }
  });

  // Contact form opens the visitor's mail app with the message filled in.
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get('name') || '').toString().trim();
      var email = (data.get('email') || '').toString().trim();
      var subject = (data.get('subject') || '').toString().trim() || 'New message from kreemaly.com';
      var message = (data.get('message') || '').toString().trim();
      var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;
      window.location.href = 'mailto:kreemmohamed01@gmail.com' +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    });
  }

  // Language bars fill when they scroll into view
  var bars = document.querySelectorAll('.lang-bar');
  if ('IntersectionObserver' in window) {
    var barIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        barIO.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    bars.forEach(function (b) { barIO.observe(b); });
  } else {
    bars.forEach(function (b) { b.classList.add('in'); });
  }
})();

// Hero portrait: gentle 3D tilt that follows the pointer (desktop only)
(function () {
  var el = document.getElementById('hero3d');
  if (!el || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var hero = el.closest('.hero'), raf = 0, x = 0, y = 0;
  hero.addEventListener('pointermove', function (e) {
    var r = hero.getBoundingClientRect();
    x = (e.clientX - r.left) / r.width - 0.5;
    y = (e.clientY - r.top) / r.height - 0.5;
    if (!raf) raf = requestAnimationFrame(function () {
      raf = 0;
      el.style.setProperty('--ry', (-5 + x * 14).toFixed(2) + 'deg');
      el.style.setProperty('--rx', (-y * 8).toFixed(2) + 'deg');
    });
  });
  hero.addEventListener('pointerleave', function () {
    el.style.removeProperty('--ry'); el.style.removeProperty('--rx');
  });
})();

// ===== Premium showcase layer (v2) =====
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var work = document.getElementById('work');
  if (!work) return;
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  // Clip-path reveal
  if (!reduce && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal');
    var rio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-shown'); rio.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.proj-media').forEach(function (m) { rio.observe(m); });
  }

  // Autoplay previews while in view (desktop too)
  if (fine && 'IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target.querySelector('video');
        if (!v) return;
        if (e.isIntersecting) {
          e.target.classList.add('is-playing');
          var p = v.play(); if (p && p.catch) p.catch(function () {});
        } else { e.target.classList.remove('is-playing'); v.pause(); }
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('#work [data-work-media]').forEach(function (m) { vio.observe(m); });
  }

  // Websites: index list + full-screen panels
  var rail = work.querySelector('.grid-phone');
  if (rail) {
    var cards = Array.prototype.slice.call(rail.children);
    var list = document.createElement('ol');
    list.className = 'work-index';
    cards.forEach(function (c, i) {
      c.id = c.id || 'project-' + (i + 1);
      var img = c.querySelector('.proj-media img');
      if (img) c.style.setProperty('--bg', 'url("' + img.getAttribute('src') + '")');
      var num = c.querySelector('.proj-num');
      if (num) num.textContent = pad(i + 1) + ' / ' + pad(cards.length);
      var name = c.querySelector('.proj-name'), cat = c.querySelector('.proj-cat');
      var cta = c.querySelector('.proj-cta');
      var url = cta ? cta.getAttribute('href') : '#' + c.id;
      var li = document.createElement('li');
      li.innerHTML = '<a href="' + url + '" target="_blank" rel="noopener noreferrer"><small>' + pad(i + 1) + '</small><span>' +
        (name ? name.textContent : '') + '</span><em>' + (cat ? cat.textContent : '') + '</em></a>';
      list.appendChild(li);
    });
    rail.parentNode.insertBefore(list, rail);
    if ('IntersectionObserver' in window && !reduce) {
      var lio = new IntersectionObserver(function (es) {
        es.forEach(function (e) { e.target.classList.toggle('is-live', e.isIntersecting); });
      }, { threshold: 0.3 });
      cards.forEach(function (c) { lio.observe(c); });
    } else cards.forEach(function (c) { c.classList.add('is-live'); });
  }

  // Clicking any project video opens the live site
  document.querySelectorAll('.proj-media').forEach(function (m) {
    var cta = m.querySelector('.proj-cta');
    if (!cta) return;
    m.setAttribute('data-href', cta.href);
    m.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      window.open(cta.href, '_blank', 'noopener');
    });
  });

  // Phones: size each panel's video to the space left under its text
  var panels = work.querySelectorAll('.grid-phone .proj');
  function fit() {
    panels.forEach(function (p) {
      var h = 0;
      ['.proj-info', '.proj-desc'].forEach(function (s) { var el = p.querySelector(s); if (el) h += el.offsetHeight; });
      p.style.setProperty('--txt', (h + 24) + 'px');
    });
  }
  fit();
  addEventListener('resize', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

  // Dashboards: shrink + dim each card as the next one stacks over it
  var groups = [work.querySelectorAll('.grid-phone .proj'), work.querySelectorAll('.grid-desk .proj')].map(function (n) { return Array.prototype.slice.call(n); });
  if (!reduce) {
    var ticking = false;
    function onScroll() {
      ticking = false;
      groups.forEach(function (stack) {
        for (var i = 0; i < stack.length; i++) {
          var a = stack[i].getBoundingClientRect();
          if (a.bottom < -200 || a.top > innerHeight + 200) { if (i < stack.length - 1) continue; }
          var m = stack[i].parentNode.classList.contains('grid-phone') && stack[i].querySelector('.proj-media');
          if (m) {
            var nb = stack[i + 1] ? stack[i + 1].getBoundingClientRect().top : innerHeight * 2;
            var c = Math.max(-1, Math.min(1, (nb - innerHeight) / innerHeight));
            m.style.setProperty('--par', (c * 60).toFixed(1) + 'px');
            m.style.setProperty('--rot', (c * -3).toFixed(2) + 'deg');
          }
          if (i === stack.length - 1) continue;
          var b = stack[i + 1].getBoundingClientRect();
          var t = Math.min(1, Math.max(0, 1 - (b.top - a.top) / a.height));
          stack[i].style.setProperty('--stack-scale', (1 - t * 0.08).toFixed(4));
          stack[i].style.setProperty('--stack-dim', (1 - t * 0.6).toFixed(3));
        }
      });
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();
  }

  // Scroll progress line
  var line = document.createElement('div');
  line.className = 'scroll-line';
  document.body.appendChild(line);
  function prog() {
    var h = document.documentElement.scrollHeight - innerHeight;
    line.style.setProperty('--p', h > 0 ? (scrollY / h).toFixed(4) : 0);
  }
  addEventListener('scroll', prog, { passive: true }); prog();

  // Smooth inertial scrolling on desktop (Lenis)
  if (false) { // moved to story.js (shared by home + pricing)
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js';
    s.onload = function () {
      if (!window.Lenis) return;
      var lenis = new Lenis({ lerp: 0.12, anchors: { offset: -64 } });
      window.__lenis = lenis;
      if (window.ScrollTrigger) lenis.on('scroll', window.ScrollTrigger.update);
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
      var obs = new MutationObserver(function () {
        if (document.documentElement.classList.contains('intro-lock')) lenis.stop(); else lenis.start();
      });
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      if (document.documentElement.classList.contains('intro-lock')) lenis.stop();
    };
    document.head.appendChild(s);
  }

  // "View" cursor over project media
  if (fine && !reduce) {
    var cur = document.createElement('div');
    cur.className = 'view-cursor';
    cur.setAttribute('aria-hidden', 'true');
    cur.textContent = 'View';
    document.body.appendChild(cur);
    window.addEventListener('pointermove', function (e) {
      cur.style.setProperty('--x', e.clientX + 'px');
      cur.style.setProperty('--y', e.clientY + 'px');
    }, { passive: true });
    document.querySelectorAll('.proj-media').forEach(function (m) {
      m.addEventListener('mouseenter', function () { cur.classList.add('on'); });
      m.addEventListener('mouseleave', function () { cur.classList.remove('on'); });
    });
  }
})();
