// Anonymous visit counter on Firestore: aggregate numbers only.
// Nothing is stored in the browser (no cookies, no storage) and no personal data is sent.
import { API_KEY, DOCS, FS, post } from './firestore.js';

const BOT = /bot|crawl|spider|slurp|headless|lighthouse|preview|pagespeed|gtmetrix/i;
const SEARCH = /(^|\.)(google|bing|duckduckgo|yahoo|ecosia|yandex|baidu|qwant|startpage|brave)\./;

// Document id for today's counters (UTC), e.g. 20261001. firestore.rules only accepts today.
const today = () => new Date().toISOString().slice(0, 10).replaceAll('-', '');

function source() {
  let host = '';
  try { host = new URL(document.referrer).hostname.replace(/^www\./, ''); } catch { return 'direct'; }
  if (!host || host === location.hostname) return 'direct';
  if (SEARCH.test(host)) return 'search';
  if (/(^|\.)(linkedin\.com|lnkd\.in)$/.test(host)) return 'linkedin';
  if (/(^|\.)github\.(com|io)$/.test(host)) return 'github';
  return 'other';
}

const inc = (fieldPath) => ({ fieldPath, increment: { integerValue: '1' } });

let counted = false;
export function countVisit() {
  if (counted) return;
  counted = true;
  if (navigator.webdriver || BOT.test(navigator.userAgent) || document.prerendering) return;
  if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) return;

  // Only counts after ~5 s with the tab visible: skips instant bounces and background preloads.
  let visibleMs = 0, since = document.hidden ? 0 : performance.now(), sent = false;
  const check = () => {
    if (sent) return;
    if (document.hidden) { if (since) visibleMs += performance.now() - since; since = 0; return; }
    since ||= performance.now();
    const left = 5000 - visibleMs - (performance.now() - since);
    if (left > 0) return void setTimeout(check, left + 50);
    sent = true;
    document.removeEventListener('visibilitychange', check);
    send().catch(() => { /* never affects the page */ });
  };
  document.addEventListener('visibilitychange', check);
  check();
}

function send() {
  const lang = document.documentElement.dataset.lang === 'en' ? 'en' : 'es';
  const device = matchMedia('(pointer: coarse)').matches ? 'mobile' : 'desktop';
  return post(`${FS}:commit?key=${API_KEY}`, {
    writes: [
      { transform: { document: `${DOCS}/visits/${today()}`, fieldTransforms: [inc('total'), inc(lang), inc(device), inc(source())] } },
      { transform: { document: `${DOCS}/stats/all`, fieldTransforms: [inc('total')] } },
    ],
  });
}

// ---------- Public read for the easter egg ----------
async function total(path) {
  const res = await fetch(`${FS}/${path}?key=${API_KEY}`);
  if (res.status === 404) return 0;
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Number((await res.json()).fields?.total?.integerValue || 0);
}
export async function getVisits() {
  const [all, day] = await Promise.all([total('stats/all'), total(`visits/${today()}`)]);
  return { total: all, today: day };
}
