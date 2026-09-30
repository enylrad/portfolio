import { en, esExtra, meta } from './i18n.js';
import { mountSprites } from './sprites.js';

const root = document.documentElement;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;
const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } },
};

$('.year').textContent = new Date().getFullYear();
mountSprites();

/* =========================================================
   Reloj del head unit con la hora local del visitante
   ========================================================= */
const huTime = $('.hu-time');
const clockFmt = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
function tickClock() {
  huTime.textContent = clockFmt.format(new Date());
  setTimeout(tickClock, 60000 - (Date.now() % 60000) + 50);
}
tickClock();

/* =========================================================
   Toast
   ========================================================= */
const toastEl = $('.toast');
let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2400);
}

/* =========================================================
   Idioma (ES en el HTML, EN en i18n.js)
   ========================================================= */
const es = { ...esExtra };
$$('[data-i18n]').forEach((el) => { es[el.dataset.i18n] = el.textContent.trim(); });
$$('[data-i18n-attr]').forEach((el) => {
  el.dataset.i18nAttr.split(';').forEach((pair) => {
    const [attr, key] = pair.split(':');
    es[key] = el.getAttribute(attr);
  });
});
const dicts = { es, en };
const t = (key) => dicts[root.lang]?.[key] ?? es[key] ?? key;

function applyLang(lang) {
  const dict = dicts[lang];
  root.lang = lang;
  root.dataset.lang = lang;
  $$('[data-i18n]').forEach((el) => {
    const v = dict[el.dataset.i18n];
    if (v != null) el.textContent = v;
  });
  $$('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, key] = pair.split(':');
      if (dict[key] != null) el.setAttribute(attr, dict[key]);
    });
  });
  document.title = meta[lang].title;
  $('meta[name="description"]').setAttribute('content', meta[lang].description);
  $('.lang-current').textContent = lang.toUpperCase();
  $('.lang-other').textContent = lang === 'es' ? 'EN' : 'ES';
  updateThemeLabel();
}

$('.lang-toggle').addEventListener('click', () => {
  const next = root.lang === 'es' ? 'en' : 'es';
  store.set('lang', next);
  if (document.startViewTransition && !reducedMotion) document.startViewTransition(() => applyLang(next));
  else applyLang(next);
});

/* =========================================================
   Tema claro / oscuro (revelado circular con View Transitions)
   ========================================================= */
const themeMeta = $('meta[name="theme-color"]');
function updateThemeLabel() {
  const dark = root.dataset.theme !== 'light';
  const label = root.lang === 'en'
    ? (dark ? 'Switch to light theme' : 'Switch to dark theme')
    : (dark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
  $('.theme-toggle').setAttribute('aria-label', label);
}
function setTheme(theme) {
  root.dataset.theme = theme;
  themeMeta.setAttribute('content', theme === 'light' ? '#f6f7f9' : '#07090d');
  store.set('theme', theme);
  updateThemeLabel();
  window.dispatchEvent(new Event('themechange'));
}
// Transición pixel: la web con el tema nuevo aparece por cuadros sobre la vieja,
// enmascarando la instantánea nueva de la View Transition con una rejilla SVG.
let themeBusy = false;
function pixelThemeTransition(next, originX, originY) {
  const CELL = 16, DURATION = 650, STEPS = 14;
  const cols = Math.ceil(innerWidth / CELL), rows = Math.ceil(innerHeight / CELL);
  const maxD = Math.hypot(Math.max(originX, innerWidth - originX), Math.max(originY, innerHeight - originY)) / CELL;
  const times = new Float32Array(cols * rows);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const d = Math.hypot(c + 0.5 - originX / CELL, r + 0.5 - originY / CELL);
      times[r * cols + c] = Math.min(1, (d / maxD) * 0.75 + Math.random() * 0.25);
    }
  }

  const style = document.createElement('style');
  const setMask = (progress) => {
    let rects = '';
    for (let r = 0; r < rows; r++) {
      let c = 0;
      while (c < cols) {
        if (times[r * cols + c] > progress) { c++; continue; }
        const start = c;
        while (c < cols && times[r * cols + c] <= progress) c++;
        rects += `<rect x="${start}" y="${r}" width="${c - start}" height="1"/>`;
      }
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cols} ${rows}" preserveAspectRatio="none" shape-rendering="crispEdges" fill="#fff">${rects}</svg>`;
    const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    style.textContent = `html.vt-pixel::view-transition-new(root){-webkit-mask-image:${url};mask-image:${url};-webkit-mask-size:100% 100%;mask-size:100% 100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}`;
  };
  setMask(-1);
  document.head.appendChild(style);

  root.classList.add('vt-pixel', 'no-tx');
  const vt = document.startViewTransition(() => setTheme(next));
  vt.ready.then(() => {
    const t0 = performance.now();
    let lastStep = -1;
    const frame = (now) => {
      const step = Math.min(STEPS, Math.floor(((now - t0) / DURATION) * STEPS));
      if (step !== lastStep) { lastStep = step; setMask(step / STEPS); }
      if (step < STEPS) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }).catch(() => {});
  vt.finished.finally(() => {
    style.remove();
    root.classList.remove('vt-pixel', 'no-tx');
    themeBusy = false;
  });
}
$('.theme-toggle').addEventListener('click', (e) => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  if (reducedMotion || !document.startViewTransition) return setTheme(next);
  if (themeBusy) return;
  themeBusy = true;
  const r = e.currentTarget.getBoundingClientRect();
  pixelThemeTransition(next, r.left + r.width / 2, r.top + r.height / 2);
});
themeMeta.setAttribute('content', root.dataset.theme === 'light' ? '#f6f7f9' : '#07090d');

applyLang(root.dataset.lang === 'en' ? 'en' : 'es');

/* =========================================================
   Copiar email y botón CV
   ========================================================= */
$$('[data-copy]').forEach((btn) => btn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(btn.dataset.copy);
    toast(t('contact.copied'));
  } catch {
    location.href = `mailto:${btn.dataset.copy}`;
  }
}));
$$('[data-cv]').forEach((a) => a.addEventListener('click', (e) => {
  if (a.getAttribute('href') === '#') { e.preventDefault(); toast(t('contact.cvSoon')); }
}));

/* =========================================================
   Nav con fondo al hacer scroll
   ========================================================= */
const nav = $('.nav');
const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 20);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* =========================================================
   Tarjetas tecnológicas: foco + inclinación 3D
   ========================================================= */
$$('.tech-card').forEach((card) => {
  let raf = 0;
  card.addEventListener('pointermove', (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
      if (finePointer && !reducedMotion) {
        card.classList.add('is-tilting');
        card.style.setProperty('--rx', `${(0.5 - py) * 12}deg`);
        card.style.setProperty('--ry', `${(px - 0.5) * 14}deg`);
      }
    });
  });
  card.addEventListener('pointerleave', () => {
    cancelAnimationFrame(raf);
    card.classList.remove('is-tilting');
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  });
});

/* =========================================================
   Canvas del hero: campo de píxeles que se encienden cerca del puntero
   ========================================================= */
function heroPixelField() {
  const canvas = $('.hero-canvas');
  const ctx = canvas.getContext('2d');
  const hero = $('.hero');
  const CELL = 14, RADIUS = 7;
  const pointer = { x: -9999, y: -9999 };
  let w = 0, h = 0, dpr = 1, cols = 0, rows = 0;
  let star, phase, speed, heat;
  let base = '180,200,230', lit = '61,220,132', running = false, visible = true, frame = 0, last = 0;

  const readColors = () => {
    const cs = getComputedStyle(root);
    base = cs.getPropertyValue('--particle').trim() || base;
    lit = cs.getPropertyValue('--pixel-lit').trim() || lit;
  };
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = hero.clientWidth; h = hero.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(w / CELL); rows = Math.ceil(h / CELL);
    const n = cols * rows;
    star = new Uint8Array(n); phase = new Float32Array(n); speed = new Float32Array(n); heat = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      star[i] = Math.random() < 0.16 ? 1 : 0;
      phase[i] = Math.random() * Math.PI * 2;
      speed[i] = 0.6 + Math.random() * 1.8;
    }
    if (!running) draw(performance.now(), 0);
  }
  // Calienta las celdas alrededor de un punto, en 4 niveles (sin degradados suaves).
  function warm(px, py) {
    const pc = Math.floor(px / CELL), pr = Math.floor(py / CELL);
    for (let dr = -RADIUS; dr <= RADIUS; dr++) {
      const r = pr + dr;
      if (r < 0 || r >= rows) continue;
      for (let dc = -RADIUS; dc <= RADIUS; dc++) {
        const c = pc + dc;
        if (c < 0 || c >= cols) continue;
        const d = Math.hypot(dc, dr);
        if (d > RADIUS) continue;
        const v = Math.ceil((1 - d / RADIUS) * 4) / 4;
        const i = r * cols + c;
        if (v > heat[i]) heat[i] = v;
      }
    }
  }
  function draw(now, dt) {
    const t = now / 1000;
    ctx.clearRect(0, 0, w, h);
    if (running) {
      if (finePointer) { if (pointer.x > -999) warm(pointer.x, pointer.y); }
      else warm(w * (0.5 + 0.38 * Math.sin(t * 0.35)), h * (0.45 + 0.3 * Math.sin(t * 0.57)));
    }
    // Estrellas de 8 bits parpadeando
    ctx.fillStyle = `rgb(${base})`;
    for (let i = 0; i < heat.length; i++) {
      if (!star[i] || heat[i] > 0.05) continue;
      const tw = 0.5 + 0.5 * Math.sin(phase[i] + t * speed[i]);
      const a = Math.round((0.05 + tw * 0.32) * 8) / 8;
      if (a <= 0) continue;
      const size = tw > 0.8 ? 3 : 2;
      ctx.globalAlpha = a;
      ctx.fillRect((i % cols) * CELL + ((CELL - size) >> 1), Math.floor(i / cols) * CELL + ((CELL - size) >> 1), size, size);
    }
    // Píxeles encendidos por el puntero
    const decay = dt * 1.4;
    ctx.fillStyle = `rgb(${lit})`;
    for (let i = 0; i < heat.length; i++) {
      const v = heat[i];
      if (v <= 0.05) continue;
      const q = Math.ceil(v * 4) / 4;
      const size = 2 + Math.round(q * 4) * 2;
      ctx.globalAlpha = 0.12 + q * 0.6;
      ctx.fillRect((i % cols) * CELL + ((CELL - size) >> 1), Math.floor(i / cols) * CELL + ((CELL - size) >> 1), size, size);
      heat[i] = Math.max(0, v - decay);
    }
    ctx.globalAlpha = 1;
  }
  function loop(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    draw(now, dt);
    frame = requestAnimationFrame(loop);
  }
  function update() {
    const should = visible && !document.hidden && !reducedMotion;
    if (should && !running) { running = true; last = performance.now(); frame = requestAnimationFrame(loop); }
    else if (!should && running) { running = false; cancelAnimationFrame(frame); }
  }

  readColors();
  resize();
  let rt;
  addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
  addEventListener('themechange', () => { readColors(); if (!running) draw(performance.now(), 0); });
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top;
  });
  hero.addEventListener('pointerleave', () => { pointer.x = pointer.y = -9999; });
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }).observe(hero);
  document.addEventListener('visibilitychange', update);
  update();
}
heroPixelField();

/* =========================================================
   Easter egg: Droid Runner (código Konami o el droide del footer)
   ========================================================= */
let lenis = null;
let gameModule = null;
async function launchGame() {
  if ($('.game').open) return;
  gameModule ??= await import('./game.js');
  gameModule.openGame({ t, onOpen: () => lenis?.stop(), onClose: () => lenis?.start() });
}
$$('[data-game]').forEach((btn) => btn.addEventListener('click', launchGame));
const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
let konamiPos = 0;
addEventListener('keydown', (e) => {
  if ($('.game').open) return;
  const key = e.key.toLowerCase();
  konamiPos = key === KONAMI[konamiPos] ? konamiPos + 1 : (key === KONAMI[0] ? (konamiPos === 2 ? 2 : 1) : 0);
  if (konamiPos === KONAMI.length) { konamiPos = 0; launchGame(); }
});

/* =========================================================
   Animaciones (GSAP + ScrollTrigger + Lenis)
   ========================================================= */
const { gsap, ScrollTrigger, Lenis } = window;

if (!gsap || !ScrollTrigger || !root.classList.contains('js-anim')) {
  root.classList.remove('js-anim');
} else {
  window.__animReady = true;
  gsap.registerPlugin(ScrollTrigger);
  animate();
}

function splitName() {
  const h1 = $('.hero-name');
  $$('.split', h1).forEach((line) => {
    const words = line.textContent.trim().split(/\s+/);
    line.textContent = '';
    words.forEach((word, wi) => {
      const w = document.createElement('span');
      w.className = 'word';
      [...word].forEach((ch) => {
        const c = document.createElement('span');
        c.className = 'char';
        c.textContent = ch;
        w.appendChild(c);
      });
      line.appendChild(w);
      if (wi < words.length - 1) line.appendChild(document.createTextNode(' '));
    });
  });
  h1.classList.add('is-split');

  // Degradado continuo a lo largo del apellido aunque cada letra sea un elemento.
  const gradLine = $('.gradient-text', h1);
  const fitGradient = () => {
    const width = gradLine.querySelector('.word').offsetWidth;
    $$('.char', gradLine).forEach((c) => {
      c.style.backgroundSize = `${width}px 100%`;
      c.style.backgroundPosition = `${-c.offsetLeft + gradLine.querySelector('.word').offsetLeft}px 0`;
    });
  };
  fitGradient();
  document.fonts?.ready.then(fitGradient);
  addEventListener('resize', fitGradient);
  return $$('.char', h1);
}

function animate() {
  // ---------- Scroll suave ----------
  if (Lenis) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = id === '#top' ? 0 : $(id);
    if (target === null || a.hasAttribute('data-cv')) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: target === 0 ? 0 : -76, duration: 1.4 });
    else (target === 0 ? scrollTo({ top: 0, behavior: 'smooth' }) : target.scrollIntoView({ behavior: 'smooth' }));
    if (id === '#main' && target) target.focus?.({ preventScroll: true });
  }));

  // ---------- Intro del hero ----------
  const chars = splitName();
  const heroBits = $$('[data-hero]');
  const roleEl = $('.role-text');
  const roleFull = roleEl.dataset.type;
  roleEl.textContent = '';

  const intro = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 });
  intro
    .fromTo(heroBits[0], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1 })
    .fromTo(chars,
      { opacity: 0, yPercent: 110 },
      { opacity: 1, yPercent: 0, duration: 0.7, stagger: 0.04, ease: 'steps(5)' }, '-=0.7')
    .fromTo(heroBits[1], { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0.8')
    .to({ n: 0 }, {
      n: roleFull.length, duration: 1.1, ease: 'none',
      onUpdate() { roleEl.textContent = roleFull.slice(0, Math.round(this.targets()[0].n)); },
    }, '<')
    .fromTo(heroBits.slice(2), { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.09 }, '-=0.9')
    .fromTo('.hero-visual',
      { opacity: 0, y: 60, scale: 0.92, rotateY: -18 },
      { opacity: 1, y: 0, scale: 1, rotateY: 0, duration: 1.8 }, 0.5)
    .from('.float-chip', { opacity: 0, scale: 0.4, duration: 0.9, stagger: 0.12, ease: 'back.out(2.2)' }, 1.3)
    .from('.code-card', { opacity: 0, y: 30, duration: 1.1 }, 1.1)
    .from('.scroll-hint', { opacity: 0, y: -10, duration: 0.8 }, 1.8);

  $$('[data-count]').forEach((el, i) => {
    intro.from(el, { textContent: 0, duration: 1.8, ease: 'power2.out', snap: { textContent: 1 } }, 1.4 + i * 0.1);
  });

  // Aurora flotando
  $$('.hero-aurora span').forEach((s, i) => {
    gsap.to(s, {
      x: gsap.utils.random(-80, 80), y: gsap.utils.random(-60, 60), scale: gsap.utils.random(0.9, 1.2),
      duration: gsap.utils.random(9, 14), ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i,
    });
  });
  // Chips flotando
  $$('.float-chip').forEach((c, i) => {
    gsap.to(c, { y: i % 2 ? 10 : -10, duration: 2.6 + i * 0.4, ease: 'sine.inOut', repeat: -1, yoyo: true });
  });

  // Inclinación del dispositivo siguiendo al puntero
  const device = $('.device');
  if (finePointer) {
    const hero = $('.hero');
    hero.addEventListener('pointermove', (e) => {
      const px = e.clientX / innerWidth - 0.5;
      const py = e.clientY / innerHeight - 0.5;
      gsap.to(device, { '--rx': `${8 - py * 10}deg`, '--ry': `${-14 + px * 16}deg`, duration: 1, ease: 'power3.out' });
    });
    hero.addEventListener('pointerleave', () => gsap.to(device, { '--rx': '8deg', '--ry': '-14deg', duration: 1.2 }));
  }

  // Parallax de salida del hero
  gsap.to('.hero-copy', {
    yPercent: -12, opacity: 0.25, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('.hero-visual', {
    yPercent: -22, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  // ---------- Barra de progreso ----------
  gsap.to('.scroll-progress', { '--p': '100%', ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

  // ---------- Títulos con máscara ----------
  $$('.mask > span').forEach((span) => {
    gsap.to(span, {
      y: 0, yPercent: 0, duration: 1.2, ease: 'expo.out',
      scrollTrigger: { trigger: span.parentElement, start: 'top 88%', once: true },
    });
  });

  // ---------- Scroll reveal ----------
  gsap.set('.reveal', { y: 24 });
  ScrollTrigger.batch('.reveal', {
    start: 'top 90%',
    once: true,
    onEnter: (batch) => gsap.to(batch, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'steps(6)', overwrite: true,
      onComplete() { gsap.set(this.targets(), { clearProps: 'transform' }); },
    }),
  });

  // ---------- Timeline de experiencia ----------
  gsap.to('.timeline-progress', {
    scaleY: 1, ease: 'none',
    scrollTrigger: { trigger: '.timeline', start: 'top 65%', end: 'bottom 65%', scrub: 0.6 },
  });
  const mm = gsap.matchMedia();
  mm.add({ desktop: '(min-width: 861px)', mobile: '(max-width: 860px)' }, ({ conditions }) => {
    $$('.tl-item').forEach((item, i) => {
      const card = $('.tl-card', item);
      const date = $('.tl-date', item);
      const fromX = conditions.desktop ? (i % 2 ? -70 : 70) : 40;
      gsap.fromTo(card,
        { opacity: 0, x: fromX, rotateY: conditions.desktop ? (i % 2 ? 8 : -8) : 0 },
        { opacity: 1, x: 0, rotateY: 0, duration: 1.2, ease: 'expo.out', clearProps: 'transform',
          scrollTrigger: { trigger: item, start: 'top 85%', once: true } });
      gsap.fromTo(date, { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: item, start: 'top 85%', once: true } });
      ScrollTrigger.create({
        trigger: item, start: 'top 65%',
        onEnter: () => {
          item.classList.add('is-active');
          gsap.fromTo($('.tl-dot', item), { scale: 0.3 }, { scale: 1, duration: 0.9, ease: 'elastic.out(1, 0.45)' });
        },
        onLeaveBack: () => item.classList.remove('is-active'),
      });
    });
  });

  // ---------- Nav: enlace activo ----------
  $$('.nav-links a').forEach((link) => {
    const section = $(link.getAttribute('href'));
    if (!section) return;
    ScrollTrigger.create({
      trigger: section, start: 'top 55%', end: 'bottom 55%',
      onToggle: (self) => link.classList.toggle('is-active', self.isActive),
    });
  });

  // ---------- Botones magnéticos ----------
  if (finePointer) {
    $$('.magnetic').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.3);
        yTo((e.clientY - r.top - r.height / 2) * 0.4);
      });
      el.addEventListener('pointerleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)' });
      });
    });

    // Halo que sigue al cursor
    const halo = $('.cursor-halo');
    const hx = gsap.quickTo(halo, 'x', { duration: 0.8, ease: 'power3.out' });
    const hy = gsap.quickTo(halo, 'y', { duration: 0.8, ease: 'power3.out' });
    addEventListener('pointermove', (e) => {
      halo.classList.add('is-on');
      hx(e.clientX); hy(e.clientY);
    }, { passive: true });
  }

  // Recalcular posiciones cuando carguen fuentes e imágenes
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  addEventListener('load', () => ScrollTrigger.refresh());
}
