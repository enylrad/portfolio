// Mascota del nav: un droide pixel que reacciona al tema.
// Oscuro: tranquilo. Claro: se quema los ojos y se pone gafas de sol. Clic: salta y saluda.
import { drawSprite } from './sprites.js';

const W = 20, H = 24;
const OX = 2, OY = 8;               // origen del droide (16×15) dentro del lienzo
const EYES = [[5, 4], [10, 4]];     // ojos relativos al droide
const GREEN = '#3ddc84', GREEN_DARK = '#1f8a50', SMOKE = '#9aa3b2';
const SHADES_Y = OY + 3;            // gafas puestas

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isLight = () => document.documentElement.dataset.theme === 'light';

export function initMascot() {
  const btn = document.querySelector('.mascot');
  if (!btn) return;
  const canvas = btn.querySelector('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

  let state = isLight() ? 'idleLight' : 'idleDark';
  let t0 = performance.now();
  let nextBlink = t0 + 2500;
  let lastKey = '';
  let raf = 0;

  const go = (name) => { state = name; t0 = performance.now(); };

  window.addEventListener('themechange', () => {
    if (reducedMotion) return go(isLight() ? 'idleLight' : 'idleDark');
    go(isLight() ? 'toLight' : 'toDark');
  });
  btn.addEventListener('click', () => {
    if (!reducedMotion && (state === 'idleDark' || state === 'idleLight')) go('wave');
  });

  // ---------- Pose de cada instante ----------
  function pose(now) {
    const e = now - t0;
    const p = { dx: 0, dy: 0, eyes: 'open', shades: null, glint: -1, arm: 'down', smoke: -1, heart: null };
    const breathe = reducedMotion ? 0 : Math.floor(now / 600) % 2;
    const blinking = !reducedMotion && now >= nextBlink && now < nextBlink + 130;
    if (!reducedMotion && now >= nextBlink + 130) nextBlink = now + 3000 + Math.random() * 2500;

    switch (state) {
      case 'idleDark':
        p.dy = breathe;
        if (blinking) p.eyes = 'blink';
        break;

      case 'idleLight': {
        p.dy = breathe;
        p.shades = SHADES_Y;
        const g = reducedMotion ? -1 : (now % 3200);
        if (g < 360) p.glint = Math.floor(g / 60); // brillo que recorre el cristal
        break;
      }

      case 'toLight':
        if (e < 300) { p.eyes = 'squint'; p.dx = Math.floor(e / 50) % 2; }
        else if (e < 1000) { p.eyes = 'burn'; p.smoke = e - 300; p.dx = Math.floor(e / 70) % 2; if (e >= 800) p.arm = 'forehead'; }
        else if (e < 1400) {
          p.eyes = 'burn'; p.arm = 'forehead'; p.smoke = e - 300;
          p.shades = Math.min(SHADES_Y, -3 + Math.floor((e - 1000) / 50) * 2);
        } else if (e < 1800) { p.shades = SHADES_Y; p.glint = Math.floor((e - 1400) / 60); }
        else go('idleLight');
        break;

      case 'toDark':
        if (e < 200) { p.shades = SHADES_Y; p.arm = 'forehead'; }
        else if (e < 600) {
          p.arm = 'forehead'; p.eyes = 'squint';
          p.shades = SHADES_Y - Math.floor((e - 200) / 40) * 2;
        } else if (e < 1300) {
          if (e < 760) p.dy = -3;
          if (e >= 700) p.heart = e - 700;
        } else go('idleDark');
        break;

      case 'wave':
        if (isLight()) p.shades = SHADES_Y;
        if (e < 150) p.dy = -3;
        else if (e < 1050) p.arm = Math.floor((e - 150) / 150) % 2 ? 'wave2' : 'wave1';
        else go(isLight() ? 'idleLight' : 'idleDark');
        break;
    }
    return p;
  }

  // ---------- Dibujo ----------
  function draw(p) {
    ctx.clearRect(0, 0, W, H);
    const ox = OX + p.dx, oy = OY + p.dy;
    const px = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); };

    drawSprite(ctx, 'droid', ox, oy);

    // Brazo derecho: se quita el de reposo y se dibuja en la pose que toque
    if (p.arm !== 'down') {
      ctx.clearRect(ox + 15, oy + 7, 1, 4);
      if (p.arm === 'forehead') { px(ox + 15, oy + 5, GREEN); px(ox + 15, oy + 4, GREEN); px(ox + 14, oy + 3, GREEN); px(ox + 13, oy + 3, GREEN); }
      if (p.arm === 'wave1') for (let y = 3; y < 7; y++) px(ox + 16, oy + y, GREEN);
      if (p.arm === 'wave2') { px(ox + 16, oy + 6, GREEN); px(ox + 16, oy + 5, GREEN); px(ox + 17, oy + 4, GREEN); px(ox + 17, oy + 3, GREEN); }
    }

    // Ojos
    EYES.forEach(([ex, ey]) => {
      const x = ox + ex, y = oy + ey;
      if (p.eyes === 'blink') { px(x, y, GREEN_DARK); }
      if (p.eyes === 'squint') { px(x - 1, y, GREEN_DARK); px(x, y, GREEN_DARK); px(x + 1, y, GREEN_DARK); }
      if (p.eyes === 'burn') {
        px(x, y, '#ff5c7a');
        const flick = Math.floor(performance.now() / 90) % 2;
        px(x, y - 1, flick ? '#f59e0b' : '#ffd166');
        if (flick) px(x + (ex < 8 ? -1 : 1), y - 1, '#f59e0b');
      }
    });

    // Humo saliendo de la cabeza
    if (p.smoke >= 0) {
      for (let i = 0; i < 6; i++) {
        const age = p.smoke - i * 90;
        if (age < 0) continue;
        const y = oy + 1 - Math.floor(age / 70);
        if (y < 0) continue;
        const x = ox + 4 + ((i * 5) % 9) + (Math.floor(age / 140) % 2);
        ctx.globalAlpha = Math.max(0.25, 1 - age / 700);
        px(x, y, SMOKE);
        ctx.globalAlpha = 1;
      }
    }

    // Gafas de sol (y brillo que recorre el cristal)
    if (p.shades !== null) {
      const sy = p.shades + p.dy; // las gafas se mueven con la cabeza
      drawSprite(ctx, 'mascotShades', ox + 2, sy);
      if (p.glint >= 0 && p.glint < 6) {
        const gx = [1, 2, 3, 7, 8, 9][p.glint];
        px(ox + 2 + gx, sy + 1, '#ffffff');
      }
    }

    // Corazón que sube al volver al modo oscuro
    if (p.heart !== null && p.heart < 600) {
      ctx.globalAlpha = p.heart > 400 ? 1 - (p.heart - 400) / 200 : 1;
      drawSprite(ctx, 'mascotHeart', ox + 13, oy - 3 - Math.floor(p.heart / 100));
      ctx.globalAlpha = 1;
    }
    // Chispa al ponerse las gafas
    if (state === 'toLight') {
      const e = performance.now() - t0;
      if (e >= 1400 && e < 1650) drawSprite(ctx, 'mascotSparkle', ox + 12, oy);
    }
  }

  function frame(now) {
    const p = pose(now);
    const key = JSON.stringify(p) + state + Math.floor(now / 90);
    if (key !== lastKey) { lastKey = key; draw(p); }
    raf = requestAnimationFrame(frame);
  }
  const start = () => { if (!raf) raf = requestAnimationFrame(frame); };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  draw(pose(performance.now()));
  if (!reducedMotion) start();
  else window.addEventListener('themechange', () => draw(pose(performance.now())));

  // Para depurar desde la consola: window.__mascot('toLight', 900) dibuja ese estado en ese instante.
  window.__mascot = (name, at = 0) => { state = name; t0 = performance.now() - at; draw(pose(performance.now())); };
}
