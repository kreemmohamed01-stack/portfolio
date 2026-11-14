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
