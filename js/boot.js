// Applies the saved theme and language before first paint (no flash).
(function () {
  var d = document.documentElement, t, l;
  try { t = localStorage.getItem('theme'); l = localStorage.getItem('lang'); } catch (e) {}
  if (t === 'light' || t === 'dark') d.dataset.theme = t;
  if (!l) l = (navigator.language || '').toLowerCase().indexOf('en') === 0 ? 'en' : 'es';
  d.dataset.lang = l;
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    d.classList.add('js-anim');
    // Safety net: if the animations never start, show everything.
    setTimeout(function () { if (!window.__animReady) d.classList.remove('js-anim'); }, 2500);
  }
})();
