/* Story layer: hero intro + travelling video, grain text, website reel,
   dark-reveal skills story. Scroll effects read scrollY every frame, so
   they work the same with native scrolling and with Lenis. */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var phone = matchMedia('(max-width: 760px)');
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };
  var easeInOut = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  var docTop = function (el) { var r = el.getBoundingClientRect(); return r.top + scrollY; };

  /* ---------- pick desktop / phone recording ---------- */
  function setSources() {
    document.querySelectorAll('video[data-desktop]').forEach(function (v) {
      var src = phone.matches ? v.dataset.mobile : v.dataset.desktop;
      if (v.getAttribute('data-cur') === src) return;
      v.setAttribute('data-cur', src);
      if (v.hasAttribute('autoplay') || v.dataset.loaded) { v.src = src; v.load(); }
      if (phone.matches && v.poster) v.poster = v.poster.replace('-desktop-', '-mobile-');
      else if (v.poster) v.poster = v.poster.replace('-mobile-', '-desktop-');
    });
  }
  setSources();
  phone.addEventListener && phone.addEventListener('change', function () {
    document.querySelectorAll('video[data-desktop]').forEach(function (v) { v.removeAttribute('data-cur'); });
    setSources();
  });
  function ensureLoaded(v) {
    if (!v || v.dataset.loaded) return;
    v.dataset.loaded = '1';
    v.src = v.getAttribute('data-cur') || v.dataset.desktop;
    v.preload = 'auto';
  }
  function play(v) { if (!v) return; ensureLoaded(v); var p = v.play(); if (p && p.catch) p.catch(function () {}); }

  /* ---------- grain / noise filter (SVG) ---------- */
  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  document.body.appendChild(svg);
  var gid = 0;
  function Grain(el, opts) {
    opts = opts || {};
    this.el = el; this.p = 0; this.scatter = opts.scatter || 6; this.freq = opts.freq || 0.85;
    var id = 'grain-' + (++gid);
    var f = document.createElementNS(NS, 'filter');
    f.setAttribute('id', id);
    f.setAttribute('x', '-5%'); f.setAttribute('y', '-10%'); f.setAttribute('width', '110%'); f.setAttribute('height', '120%');
    f.innerHTML =
      '<feTurbulence type="fractalNoise" baseFrequency="' + this.freq + '" numOctaves="2" seed="1" result="noise"/>' +
      '<feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  14 0 0 0 0" result="mask"/>' +
      '<feComposite in="SourceGraphic" in2="mask" operator="in" result="cut"/>' +
      '<feDisplacementMap in="cut" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G"/>';
    svg.appendChild(f);
    this.turb = f.children[0]; this.mat = f.children[1]; this.disp = f.children[3];
    this.url = 'url(#' + id + ')';
  }
  Grain.prototype.set = function (p) {
    this.p = p;
    if (p <= 0.001) { this.el.style.filter = ''; return; }
    // noise R is ~0.25..0.75: alpha = 14 * (R - threshold)
    var th = 0.18 + p * 0.62;
    this.mat.setAttribute('values', '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  14 0 0 0 ' + (-14 * th).toFixed(3));
    this.disp.setAttribute('scale', (p * this.scatter).toFixed(2));
    this.turb.setAttribute('seed', String((Math.random() * 999) | 0));
    this.el.style.filter = this.url;
  };
  // Animate p from a to b over ms, boiling the noise at ~24fps
  Grain.prototype.tween = function (a, b, ms, done) {
    var self = this, start = performance.now(), last = 0;
    cancelAnimationFrame(this.raf);
    (function tick(now) {
      var t = clamp((now - start) / ms, 0, 1);
      if (now - last > 40 || t === 1) { last = now; self.set(a + (b - a) * easeOut(t)); }
      if (t < 1) self.raf = requestAnimationFrame(tick); else if (done) done();
    })(start);
  };

  /* ---------- grain titles: assemble from noise when they enter ---------- */
  var grainTitles = [];
  if (!reduce) {
    document.querySelectorAll('[data-grain-title]').forEach(function (el) {
      var g = new Grain(el, { scatter: 10 });
      el.style.visibility = 'hidden';
      grainTitles.push(g);
      el._grain = g;
      if (matchMedia('(hover: hover)').matches) {
        el.addEventListener('pointerenter', function () { if (!el._busy) g.tween(0, 0.55, 260); });
        el.addEventListener('pointerleave', function () { if (!el._busy) g.tween(g.p, 0, 420); });
      }
    });
    var assemble = function (el) {
      var g = el._grain; el._busy = true;
      g.set(1); el.style.visibility = '';
      g.tween(1, 0, 900, function () { el._busy = false; g.set(0); });
    };
    if ('IntersectionObserver' in window) {
      var gio = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          gio.unobserve(e.target);
          var heroLine = e.target.closest('.jhero');
          if (heroLine && !document.documentElement.classList.contains('story-ready')) {
            e.target._pending = true; return;
          }
          assemble(e.target);
        });
      }, { threshold: 0.4 });
      grainTitles.forEach(function (g) { gio.observe(g.el); });
    } else grainTitles.forEach(function (g) { g.el.style.visibility = ''; });
  }

  /* ---------- hero intro: wordmark letters, star, then the rest ---------- */
  var word = document.querySelector('.jhero-word');
  var hero = document.querySelector('.jhero');
  function heroIntro() {
    var root = document.documentElement;
    if (!word || reduce || !window.gsap) {
      root.classList.add('story-ready');
      grainTitles.forEach(function (g) { if (g.el._pending) { g.el.style.visibility = ''; } });
      return;
    }
    var gsap = window.gsap;
    ['.jw-a', '.jw-b'].forEach(function (sel) {
      var el = word.querySelector(sel);
      el.innerHTML = el.textContent.split('').map(function (c) { return '<span class="ch">' + c + '</span>'; }).join('');
    });
    var tl = gsap.timeline({ onComplete: function () { root.classList.add('story-ready'); } });
    gsap.set('.jhero-lead, .jhero-video', { opacity: 0, y: 24 });
    tl.from('.jw-a .ch', { yPercent: 110, duration: .9, ease: 'back.out(0.7)', stagger: .06 })
      .from('.jw-star', { y: '-70vh', rotate: -90, duration: .8, ease: 'back.out(1)' }, '-=0.6')
      .to('.jw-star', { x: '30vw', duration: .75, ease: 'power4.inOut', yoyo: true, repeat: 1 }, '-=0.1')
      .from('.jw-b', { clipPath: 'inset(0 0 0 100%)', duration: .7, ease: 'power2.inOut' }, '-=1.1')
      .add(function () {
        document.querySelectorAll('.jhero [data-grain-title]').forEach(function (el, i) {
          setTimeout(function () {
            var g = el._grain; if (!g) { el.style.visibility = ''; return; }
            g.set(1); el.style.visibility = ''; el._busy = true;
            g.tween(1, 0, 900, function () { el._busy = false; g.set(0); });
          }, i * 180);
        });
      }, '-=0.2')
      .to('.jhero-lead, .jhero-video', { opacity: 1, y: 0, duration: .8, ease: 'power3.out', stagger: .1 }, '+=0.15');
  }
  // Wait for the intro video overlay (if any) before playing the hero intro
  (function waitIntro() {
    var root = document.documentElement;
    if (root.classList.contains('intro-lock')) {
      var mo = new MutationObserver(function () {
        if (!root.classList.contains('intro-lock')) { mo.disconnect(); setTimeout(heroIntro, 150); }
      });
      mo.observe(root, { attributes: true, attributeFilter: ['class'] });
    } else if (document.readyState === 'complete') heroIntro();
    else addEventListener('load', heroIntro);
  })();

  /* ---------- hero video travels down into the next section ---------- */
  var hv = document.getElementById('heroVideo');
  var landing = document.getElementById('heroVideoLanding');
  var hvGeo = null;
  function measureHero() {
    if (!hv || !landing || phone.matches || reduce) { hvGeo = null; if (hv) hv.style.transform = ''; return; }
    var prev = hv.style.transform; hv.style.transform = 'none';
    var a = hv.getBoundingClientRect(), b = landing.getBoundingClientRect();
    hv.style.transform = prev;
    var sTop = a.top + scrollY, lTop = b.top + scrollY;
    hvGeo = {
      dx: b.right - a.right, dy: lTop - sTop, s: b.width / a.width,
      start: sTop - innerHeight * 0.4, end: lTop - innerHeight * 0.12
    };
  }
  function updateHero() {
    if (!hvGeo) return;
    var t = clamp((scrollY - hvGeo.start) / (hvGeo.end - hvGeo.start), 0, 1), e = easeInOut(t);
    hv.style.transform = 'translate3d(' + (hvGeo.dx * e).toFixed(1) + 'px,' + (hvGeo.dy * t).toFixed(1) + 'px,0) scale(' + (1 + (hvGeo.s - 1) * e).toFixed(4) + ')';
    hv.style.borderRadius = (14 + e * 6) + 'px';
  }

  /* ---------- write-on statement: words appear through grain with scroll ---------- */
  var wo = document.querySelector('[data-write-on]');
  var words = [], ghostGrain = null, midGrain = null;
  if (wo) {
    var txt = wo.querySelector('.write-on__text');
    txt.innerHTML = txt.textContent.trim().split(/\s+/).map(function (w) { return '<span class="w">' + w + '</span>'; }).join(' ');
    words = Array.prototype.slice.call(txt.querySelectorAll('.w'));
    if (!reduce) {
      var ghost = wo.querySelector('.write-on__ghost');
      ghostGrain = new Grain(ghost, { scatter: 7, freq: 0.9 });
      midGrain = new Grain(document.createElement('span'), { scatter: 14 });
      midGrain.set(0.55);
      // keep the ghost boiling while visible
      var boiling = false;
      new IntersectionObserver(function (es) { boiling = es[0].isIntersecting; }).observe(wo);
      setInterval(function () { if (boiling) { ghostGrain.set(0.42); midGrain.set(0.55); } }, 80);
    } else words.forEach(function (w) { w.classList.add('on'); });
  }
  function updateWords() {
    if (!wo || reduce) return;
    var r = wo.getBoundingClientRect();
    var t = clamp((innerHeight * 0.85 - r.top) / (innerHeight * 0.6 + r.height * 0.5), 0, 1);
    var n = words.length, edge = t * (n + 2);
    for (var i = 0; i < n; i++) {
      var w = words[i], d = edge - i;
      if (d >= 2) { if (w._s !== 2) { w._s = 2; w.classList.add('on'); w.style.filter = ''; w.style.opacity = ''; } }
      else if (d > 0) { if (w._s !== 1) { w._s = 1; w.classList.remove('on'); w.style.filter = midGrain.url; } w.style.opacity = (0.35 + d * 0.3).toFixed(2); }
      else if (w._s !== 0) { w._s = 0; w.classList.remove('on'); w.style.filter = ''; w.style.opacity = ''; }
    }
  }

  /* ---------- website reel ---------- */
  var reel = document.getElementById('reel');
  var slides = reel ? Array.prototype.slice.call(reel.querySelectorAll('.reel-slide')) : [];
  var active = -1;
  function updateReel() {
    if (!reel || reduce) return;
    var top = docTop(reel), h = reel.offsetHeight - innerHeight;
    var prog = clamp((scrollY - top) / Math.max(1, h), 0, 1) * (slides.length - 1);
    slides.forEach(function (s, i) {
      var anim = s._anim || (s._anim = s.querySelector('.reel-anim'));
      var shade = s._shade || (s._shade = s.querySelector('.reel-shade'));
      if (i > 0) {
        var r = easeOut(clamp((prog - (i - 1)) / 0.7, 0, 1));
        // first new slide rises from below, the rest slide in from alternating sides
        var off = ((1 - r) * 105).toFixed(2) + '%';
        anim.style.transform = r >= 1 ? 'none'
          : i === 1 ? 'translate3d(0,' + off + ',0)'
          : 'translate3d(' + (i % 2 ? '' : '-') + off + ',0,0)';
        s.style.visibility = r > 0 ? 'visible' : 'hidden';
      }
      var next = clamp((prog - i) / 0.7, 0, 1);
      shade.style.opacity = (easeOut(next) * 0.55).toFixed(3);
      anim.style.scale = String(1 - easeOut(next) * 0.06);
    });
    var cur = clamp(Math.round(prog), 0, slides.length - 1);
    var inView = scrollY + innerHeight > top && scrollY < top + reel.offsetHeight;
    if (cur !== active || !inView) {
      slides.forEach(function (s, i) {
        var v = s.querySelector('video');
        if (inView && Math.abs(i - cur) <= 1) ensureLoaded(v);
        if (inView && i === cur) { v.currentTime = 0; play(v); } else if (!v.paused) v.pause();
      });
      active = inView ? cur : -1;
    }
  }

  /* ---------- skills: dark background opens out, steps open one by one ---------- */
  var dark = document.querySelector('[data-dark-reveal]');
  var darkBg = dark && dark.querySelector('[data-dark-background]');
  var steps = dark ? Array.prototype.slice.call(dark.querySelectorAll('[data-process-step]')) : [];
  function updateDark() {
    if (!dark || reduce) return;
    var r = dark.getBoundingClientRect();
    // phase 1: as the section rises into view the black panel widens to full bleed
    var t = clamp((innerHeight - r.top) / innerHeight, 0, 1), e = easeOut(t);
    darkBg.style.setProperty('--side', ((1 - e) * (phone.matches ? 8 : 32)).toFixed(2) + '%');
    darkBg.style.setProperty('--r', ((1 - e) * 28).toFixed(1) + 'px');
    dark.style.setProperty('--content', clamp((t - 0.55) / 0.45, 0, 1).toFixed(3));
    // phase 2: while pinned, open each step in turn
    var span = dark.offsetHeight - innerHeight;
    var p = clamp(-r.top / Math.max(1, span), 0, 1) * (steps.length - 1);
    steps.forEach(function (s, i) {
      var o = clamp(1 - Math.abs(p - i) * 1.4, 0, 1);
      s.style.setProperty('--open', easeInOut(o).toFixed(3));
    });
  }

  /* ---------- About: chapters assemble from grain and dissolve back ---------- */
  var fog = document.querySelector('[data-fog-story]');
  var chapters = fog ? Array.prototype.slice.call(fog.querySelectorAll('[data-fog-chapter]')) : [];
  var portrait = fog && fog.querySelector('[data-fog-portrait]');
  var chGrains = [], portraitGrain = null, fogBar = fog && fog.querySelector('.fog-progress');
  if (fog && !reduce) {
    chapters.forEach(function (c) { chGrains.push(new Grain(c, { scatter: 16, freq: 0.75 })); });
    if (portrait) portraitGrain = new Grain(portrait, { scatter: 20, freq: 0.6 });
  } else chapters.forEach(function (c) { c.classList.add('is-on'); });
  var lastBoil = 0;
  function updateFog() {
    if (!fog || reduce) return;
    var r = fog.getBoundingClientRect(), span = fog.offsetHeight - innerHeight;
    var t = clamp(-r.top / Math.max(1, span), 0, 1);
    var p = t * chapters.length;                       // 0..n
    var boil = performance.now() - lastBoil > 70;      // new noise ~14 times a second
    if (boil) lastBoil = performance.now();
    chapters.forEach(function (c, i) {
      // inside its slot: grain clears in the first 30%, holds, breaks up in the last 25%
      var local = p - i, g;
      if (local < 0 || local > 1) g = 1;
      else if (local < 0.3) g = 1 - local / 0.3;
      else if (local > 0.75 && i < chapters.length - 1) g = (local - 0.75) / 0.25;
      else g = 0;
      if (i === chapters.length - 1 && local > 1) g = 0;
      c.classList.toggle('is-on', g < 0.98);
      if (g < 0.98 && (boil || g === 0)) chGrains[i].set(g);
    });
    if (portrait) {
      var pg = clamp(1 - p / 0.6, 0, 1);
      if (boil || pg === 0) portraitGrain.set(pg);
      portrait.style.setProperty('--ps', (0.88 + Math.min(1, p / chapters.length) * 0.12).toFixed(3));
    }
    if (fogBar) fogBar.style.setProperty('--fp', t.toFixed(3));
  }
  // keep the grain moving between scroll events
  setInterval(function () { if (fog && !reduce) { var r = fog.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) updateFog(); } }, 90);

  /* ---------- frame loop ---------- */
  var ticking = false;
  function frame() {
    ticking = false;
    updateHero(); updateWords(); updateReel(); updateDark(); updateFog();
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', function () { measureHero(); req(); });
  addEventListener('load', function () { measureHero(); req(); });
  measureHero(); frame();
  if (hv) hv.querySelector('video') && play(hv.querySelector('video'));
})();
