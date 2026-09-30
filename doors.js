// The film box: a tile marked data-film opens the film right here, in a modal
// player, so a visitor is one click from the work. Closing the box removes the
// player, which stops the sound. Shared by the home and the AI projects page;
// generated tiles carry data-title, data-chapter, data-gallery and data-watch
// for the links under the player.
(function () {
  var box = null;
  function build() {
    box = document.createElement('dialog');
    box.className = 'film-box';
    box.setAttribute('aria-label', 'Film');
    box.innerHTML =
      '<div class="film-box-in">' +
        '<div class="film-box-video"></div>' +
        '<div class="film-box-meta"><span class="film-box-title"></span><span class="film-box-links"></span></div>' +
        '<button type="button" class="film-box-close" aria-label="Close the film">×</button>' +
      '</div>';
    document.body.appendChild(box);
    // the box's own close paths clean up at once; the close event covers Escape
    box.addEventListener('close', function () { if (!box.open) teardown(); });
    // a click on the dark backdrop closes; the dialog itself is the backdrop target
    box.addEventListener('click', function (e) { if (e.target === box) shut(); });
    box.querySelector('.film-box-close').addEventListener('click', shut);
  }
  function shut() {
    box.close();
    teardown();
  }
  function link(href, text, blank) {
    var a = document.createElement('a');
    a.href = href; a.textContent = text;
    if (blank) { a.target = '_blank'; a.rel = 'noopener'; }
    return a;
  }
  function open(btn) {
    if (!box) build();
    var d = btn.dataset;
    var frame = document.createElement('iframe');
    // the single film only, no playlist roll-on (the gallery learned this the hard way)
    frame.src = 'https://www.youtube-nocookie.com/embed/' + d.film + '?rel=0'
      + (window.__noAutoplay ? '' : '&autoplay=1');
    frame.title = d.title + ' · Davis Baldwin';
    frame.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    frame.setAttribute('allowfullscreen', '');
    box.querySelector('.film-box-video').replaceChildren(frame);
    box.querySelector('.film-box-title').textContent = d.title;
    var links = box.querySelector('.film-box-links');
    links.replaceChildren();
    if (d.chapter) links.appendChild(link(d.chapter, 'Chapter'));
    if (d.gallery) links.appendChild(link(d.gallery, 'All films'));
    if (d.watch) links.appendChild(link(d.watch, 'YouTube ↗', true));
    document.body.classList.add('film-open');       // the home's pull timer pauses on this
    box.showModal();
    box.querySelector('.film-box-close').focus();
  }
  function teardown() {                               // idempotent: the player goes, the sound with it
    box.querySelector('.film-box-video').replaceChildren();
    document.body.classList.remove('film-open');
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-film]');
    if (!btn) return;
    e.preventDefault();
    open(btn);
  });

  // The film rail: the edge arrows scroll one tile, and each arrow hides at
  // its own end of the rail, so an arrow showing always means more films.
  document.querySelectorAll('.rail-wrap').forEach(function (wrap) {
    var rail = wrap.querySelector('.rail');
    var prev = wrap.querySelector('.rail-btn.prev'), next = wrap.querySelector('.rail-btn.next');
    if (!rail || !prev || !next) return;
    function step() {
      var t = rail.querySelector('.tile');
      var gap = parseFloat(getComputedStyle(rail).columnGap) || 14;
      return t ? t.getBoundingClientRect().width + gap : rail.clientWidth;
    }
    function paint() {
      prev.hidden = rail.scrollLeft <= 2;
      next.hidden = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
    }
    // repaint after the smooth scroll settles as well as on scroll events, so
    // the arrows are right even where a scroll event never arrives
    prev.addEventListener('click', function () { rail.scrollBy({ left: -step(), behavior: 'smooth' }); setTimeout(paint, 400); });
    next.addEventListener('click', function () { rail.scrollBy({ left: step(), behavior: 'smooth' }); setTimeout(paint, 400); });
    rail.addEventListener('scroll', paint, { passive: true });
    addEventListener('resize', paint);
    paint();
  });
})();
