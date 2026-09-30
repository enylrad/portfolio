// Droid Runner — easter egg. Se carga con import() solo al activarse.
import { drawSprite, spriteSize } from './sprites.js';

const W = 256, H = 144, GROUND = 120;
const GRAVITY = 900, JUMP_V = 310, SHORT_HOP_V = 130;
const HI_KEY = 'droidRunnerHi';

const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } },
};
const rand = (a, b) => a + Math.random() * (b - a);
const hash = (i) => { const s = Math.sin(i * 127.1) * 43758.5453; return s - Math.floor(s); };

const THEMES = {
  dark: { sky: '#07090d', far: '#1b2230', chip: '#131923', pin: '#2a3342', board: '#0b1811', trace: '#1d4d34', pad: '#c9a227', line: '#3ddc84' },
  light: { sky: '#eef1f5', far: '#cfd5df', chip: '#dde2ea', pin: '#b3bcc9', board: '#d5ebde', trace: '#98caab', pad: '#b8860b', line: '#1fb866' },
};

let dialog, canvas, ctx, stage, ui, opts, s;
let raf = 0, last = 0, hi = Number(store.get(HI_KEY)) || 0;
const input = { jumpHeld: false, duck: false, pointerY: null };

export function openGame(options) {
  opts = options;
  if (!dialog) setup();
  reset();
  showMessage('PRESS START', opts.t('game.start'));
  dialog.showModal();
  stage.focus();
  opts.onOpen?.();
  start();
}

function setup() {
  dialog = document.querySelector('.game');
  stage = dialog.querySelector('.game-stage');
  canvas = dialog.querySelector('.game-canvas');
  canvas.width = W; canvas.height = H;
  ctx = canvas.getContext('2d');
  ui = {
    score: dialog.querySelector('[data-game-score]'),
    hi: dialog.querySelector('[data-game-hi]'),
    level: dialog.querySelector('[data-game-level]'),
    msg: dialog.querySelector('.game-msg'),
    title: dialog.querySelector('.game-msg-title'),
    text: dialog.querySelector('.game-msg-text'),
  };

  dialog.addEventListener('close', () => { stop(); opts?.onClose?.(); });
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  dialog.querySelector('.game-close').addEventListener('click', () => dialog.close());

  dialog.addEventListener('keydown', (e) => {
    if (e.target.closest('.game-close')) return;
    const k = e.key;
    if (k === ' ' || k === 'ArrowUp' || k === 'w' || k === 'W' || k === 'Enter') {
      e.preventDefault();
      if (!e.repeat) jump();
      input.jumpHeld = true;
    } else if (k === 'ArrowDown' || k === 's' || k === 'S') {
      e.preventDefault();
      input.duck = true;
    }
  });
  dialog.addEventListener('keyup', (e) => {
    const k = e.key;
    if (k === ' ' || k === 'ArrowUp' || k === 'w' || k === 'W' || k === 'Enter') input.jumpHeld = false;
    if (k === 'ArrowDown' || k === 's' || k === 'S') input.duck = false;
  });

  // Táctil: tocar = saltar; deslizar hacia abajo = agacharse.
  stage.addEventListener('pointerdown', (e) => {
    if (e.button > 0) return;
    stage.setPointerCapture(e.pointerId);
    input.pointerY = e.clientY;
    input.jumpHeld = true;
    jump();
  });
  stage.addEventListener('pointermove', (e) => {
    if (input.pointerY !== null && e.clientY - input.pointerY > 24) input.duck = true;
  });
  const release = () => { input.pointerY = null; input.jumpHeld = false; input.duck = false; };
  stage.addEventListener('pointerup', release);
  stage.addEventListener('pointercancel', release);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (dialog.open) start();
  });
}

function reset() {
  s = {
    mode: 'ready', t: 0, speed: 90, dist: 0, bg: 0, bonus: 0, score: 0, level: 21, flash: 0,
    nextSpawn: 90, nextCoin: 160, obstacles: [], coins: [],
    droid: { x: 26, bottom: GROUND, vy: 0, onGround: true, duck: false, anim: 0 },
  };
  input.jumpHeld = input.duck = false;
  updateHud(true);
}

function jump() {
  if (s.mode !== 'running') {
    if (s.mode === 'over') reset();
    s.mode = 'running';
    hideMessage();
    return;
  }
  const d = s.droid;
  if (d.onGround) { d.vy = -JUMP_V; d.onGround = false; }
}

function spawnObstacle() {
  const kinds = s.score > 100 ? ['spark', 'robot', 'drone', 'robot'] : ['spark', 'robot'];
  const kind = kinds[Math.floor(Math.random() * kinds.length)];
  const name = kind === 'drone' ? 'droneA' : kind === 'spark' ? 'sparkA' : 'robot';
  const { w, h } = spriteSize(name);
  const bottom = kind === 'drone' ? GROUND - 10 : GROUND;
  s.obstacles.push({ kind, x: W + 4, y: bottom - h, w, h });
}

function spawnCoin() {
  const { w, h } = spriteSize('coin');
  const high = Math.random() < 0.55;
  s.coins.push({ x: W + 4, y: (high ? GROUND - 44 : GROUND - 2) - h, w, h });
}

function droidBox() {
  const d = s.droid;
  const h = d.duck ? 8 : 15;
  return { x: d.x + 2, y: d.bottom - h + 1, w: 12, h: h - 1 };
}
const hit = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
const shrink = (o, n) => ({ x: o.x + n, y: o.y + n, w: o.w - n * 2, h: o.h - n * 2 });

function update(dt) {
  s.t += dt;
  s.speed = Math.min(260, 90 + s.t * 4);
  const dx = s.speed * dt;
  s.dist += dx;
  s.bg += dx;

  const d = s.droid;
  d.vy += GRAVITY * dt;
  if (input.duck && !d.onGround) d.vy += 1400 * dt; // caída rápida
  if (!input.jumpHeld && d.vy < -SHORT_HOP_V) d.vy = -SHORT_HOP_V; // salto variable
  d.bottom += d.vy * dt;
  if (d.bottom >= GROUND) { d.bottom = GROUND; d.vy = 0; d.onGround = true; }
  d.duck = input.duck && d.onGround;
  d.anim += dt * s.speed / 14;

  s.nextSpawn -= dx;
  if (s.nextSpawn <= 0) { spawnObstacle(); s.nextSpawn = rand(110, 190) + s.speed * 0.35; }
  s.nextCoin -= dx;
  if (s.nextCoin <= 0) {
    if (s.nextSpawn > 40) spawnCoin();
    s.nextCoin = rand(170, 320);
  }

  s.obstacles.forEach((o) => { o.x -= dx; });
  s.coins.forEach((c) => { c.x -= dx; });
  s.obstacles = s.obstacles.filter((o) => o.x + o.w > -2);
  s.coins = s.coins.filter((c) => c.x + c.w > -2 && !c.taken);

  const box = droidBox();
  for (const c of s.coins) {
    if (hit(box, c)) { c.taken = true; s.bonus += 25; }
  }
  for (const o of s.obstacles) {
    if (hit(box, shrink(o, 1))) { gameOver(); break; }
  }

  s.score = Math.floor(s.dist / 6) + s.bonus;
  const level = Math.min(36, 21 + Math.floor(s.score / 120));
  if (level > s.level) { s.level = level; s.flash = 1.2; }
  s.flash = Math.max(0, s.flash - dt);
  updateHud();
}

function gameOver() {
  s.mode = 'over';
  const record = s.score > hi;
  if (record) { hi = s.score; store.set(HI_KEY, String(hi)); }
  updateHud(true);
  showMessage('GAME OVER', `${record ? `${opts.t('game.record')} · ` : ''}${opts.t('game.retry')}`);
}

let lastHud = '';
function updateHud(force) {
  const key = `${s.score}|${hi}|${s.level}|${s.flash > 0}`;
  if (!force && key === lastHud) return;
  lastHud = key;
  ui.score.textContent = String(s.score).padStart(5, '0');
  ui.hi.textContent = String(hi).padStart(5, '0');
  ui.level.textContent = `API ${s.level}`;
  ui.level.classList.toggle('is-up', s.flash > 0);
}

function showMessage(title, text) {
  ui.title.textContent = title;
  ui.text.textContent = text;
  ui.msg.hidden = false;
}
function hideMessage() { ui.msg.hidden = true; }

function render() {
  const c = THEMES[document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'];
  ctx.fillStyle = c.sky;
  ctx.fillRect(0, 0, W, H);

  // Capa lejana: rejilla de puntos.
  ctx.fillStyle = c.far;
  const farOff = Math.floor(s.bg * 0.1) % 16;
  for (let x = -farOff; x < W; x += 16) {
    for (let y = 8; y < GROUND - 8; y += 16) ctx.fillRect(x, y, 1, 1);
  }

  // Capa media: chips con patas.
  const mid = s.bg * 0.35, spacing = 72;
  for (let i = Math.floor(mid / spacing) - 1; i < mid / spacing + W / spacing + 1; i++) {
    const cw = 18 + Math.floor(hash(i) * 20), ch = 10 + Math.floor(hash(i + 7) * 14);
    const x = Math.round(i * spacing - mid + hash(i + 3) * 30);
    const y = 20 + Math.floor(hash(i + 11) * (GROUND - 50 - ch));
    ctx.fillStyle = c.pin;
    for (let p = 3; p < cw - 2; p += 4) { ctx.fillRect(x + p, y - 2, 2, 2); ctx.fillRect(x + p, y + ch, 2, 2); }
    ctx.fillStyle = c.chip;
    ctx.fillRect(x, y, cw, ch);
    ctx.fillStyle = c.pin;
    ctx.fillRect(x + 2, y + 2, 2, 2);
  }

  // Suelo: placa base con pistas y vías.
  ctx.fillStyle = c.board;
  ctx.fillRect(0, GROUND, W, H - GROUND);
  ctx.fillStyle = c.line;
  ctx.fillRect(0, GROUND, W, 1);
  ctx.fillStyle = c.trace;
  const gOff = Math.floor(s.bg) % 24;
  ctx.fillRect(0, GROUND + 7, W, 1);
  ctx.fillRect(0, GROUND + 16, W, 1);
  for (let x = -gOff; x < W; x += 24) {
    ctx.fillRect(x + 6, GROUND + 7, 1, 9);
    ctx.fillStyle = c.pad;
    ctx.fillRect(x + 5, GROUND + 6, 3, 3);
    ctx.fillRect(x + 17, GROUND + 15, 3, 3);
    ctx.fillStyle = c.trace;
  }

  const blink = Math.floor(s.t * 8) % 2;
  s.coins.forEach((co) => drawSprite(ctx, 'coin', co.x, co.y + (blink ? 0 : -1)));
  s.obstacles.forEach((o) => {
    const name = o.kind === 'drone' ? (blink ? 'droneA' : 'droneB') : o.kind === 'spark' ? (blink ? 'sparkA' : 'sparkB') : 'robot';
    drawSprite(ctx, name, o.x, o.y);
  });

  const d = s.droid;
  let name = 'droid';
  if (d.duck) name = 'droidDuck';
  else if (d.onGround && s.mode === 'running') name = Math.floor(d.anim) % 2 ? 'droidRunA' : 'droidRunB';
  const { h } = spriteSize(name);
  drawSprite(ctx, name, d.x, d.bottom - h, s.mode === 'over' ? { G: '#ff5c7a' } : undefined);
}

function frame(now) {
  const dt = Math.min(0.033, (now - last) / 1000);
  last = now;
  if (s.mode === 'running') update(dt);
  render();
  raf = requestAnimationFrame(frame);
}
function start() {
  if (raf) return;
  last = performance.now();
  raf = requestAnimationFrame(frame);
}
function stop() {
  cancelAnimationFrame(raf);
  raf = 0;
}
