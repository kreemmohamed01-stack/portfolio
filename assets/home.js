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
    } else {
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
