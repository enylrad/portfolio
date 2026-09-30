// Aplica tema e idioma guardados antes del primer pintado (sin parpadeo).
(function () {
  var d = document.documentElement, t, l;
  try { t = localStorage.getItem('theme'); l = localStorage.getItem('lang'); } catch (e) {}
  if (t === 'light' || t === 'dark') d.dataset.theme = t;
  if (!l) l = (navigator.language || '').toLowerCase().indexOf('en') === 0 ? 'en' : 'es';
  d.dataset.lang = l;
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    d.classList.add('js-anim');
    // Red de seguridad: si las animaciones no arrancan, mostrar todo.
    setTimeout(function () { if (!window.__animReady) d.classList.remove('js-anim'); }, 2500);
  }
})();
