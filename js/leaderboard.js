// Ranking online de Droid Runner sobre Firestore (API REST, sin SDK).
// La seguridad está en firestore.rules: esta clave es pública por diseño en Firebase web.
const API_KEY = 'AIzaSyCYzY5ppBKZR4iMAgmjgbPyz4S-h28MmaU';
const PROJECT = 'portfolio-8fa1d';
const DOCS = `projects/${PROJECT}/databases/(default)/documents`;
const FS = `https://firestore.googleapis.com/v1/${DOCS}`;
const AUTH_KEY = 'droidRunnerAuth';

export const BLOCKED = ['ASS', 'FCK', 'FUK', 'FUC', 'SEX', 'KKK', 'NAZ', 'NIG', 'CUM', 'DIC', 'COK', 'PUT', 'PNE', 'CAC', 'CUL', 'PIS'];

const store = {
  get: () => { try { return JSON.parse(localStorage.getItem(AUTH_KEY)); } catch { return null; } },
  set: (v) => { try { localStorage.setItem(AUTH_KEY, JSON.stringify(v)); } catch { /* sin almacenamiento */ } },
};

async function post(url, body, token, form = false) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': form ? 'application/x-www-form-urlencoded' : 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: form ? body : JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error?.message || `HTTP ${res.status}`);
  return data;
}

// ---------- Identidad anónima (persistente en este navegador) ----------
let auth = store.get();
async function ensureAuth() {
  if (auth && auth.exp > Date.now() + 60_000) return auth;
  if (auth?.refresh) {
    try {
      const d = await post(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
        `grant_type=refresh_token&refresh_token=${encodeURIComponent(auth.refresh)}`, null, true);
      auth = { uid: d.user_id, token: d.id_token, refresh: d.refresh_token, exp: Date.now() + Number(d.expires_in) * 1000 };
      store.set(auth);
      return auth;
    } catch { /* token caducado o revocado: nueva identidad */ }
  }
  const d = await post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, { returnSecureToken: true });
  auth = { uid: d.localId, token: d.idToken, refresh: d.refreshToken, exp: Date.now() + Number(d.expiresIn) * 1000 };
  store.set(auth);
  return auth;
}

// ---------- Partida: el servidor sella la hora de inicio ----------
let runStartedAt = null;
export async function startRun() {
  runStartedAt = null;
  const a = await ensureAuth();
  const d = await post(`${FS}:commit?key=${API_KEY}`, {
    writes: [{
      update: { name: `${DOCS}/runs/${a.uid}`, fields: {} },
      updateTransforms: [{ fieldPath: 'startedAt', setToServerValue: 'REQUEST_TIME' }],
    }],
  }, a.token);
  runStartedAt = d.writeResults?.[0]?.transformResults?.[0]?.timestampValue || null;
  return runStartedAt;
}
export const hasRun = () => runStartedAt !== null;
export const myUid = () => auth?.uid || null;

// ---------- Enviar puntuación (se valida en las reglas) ----------
export async function submitScore(name, score) {
  if (!runStartedAt) throw new Error('NO_RUN');
  const a = await ensureAuth();
  await post(`${FS}:commit?key=${API_KEY}`, {
    writes: [{
      update: {
        name: `${DOCS}/scores/${a.uid}`,
        fields: {
          name: { stringValue: name },
          score: { integerValue: String(score) },
          runStartedAt: { timestampValue: runStartedAt },
        },
      },
      updateTransforms: [{ fieldPath: 'createdAt', setToServerValue: 'REQUEST_TIME' }],
    }],
  }, a.token);
  runStartedAt = null; // cada partida se envía una sola vez
}

// ---------- Top 10 (lectura pública) ----------
export async function top10() {
  const rows = await post(`${FS}:runQuery?key=${API_KEY}`, {
    structuredQuery: {
      from: [{ collectionId: 'scores' }],
      orderBy: [{ field: { fieldPath: 'score' }, direction: 'DESCENDING' }],
      limit: 10,
    },
  });
  return rows.filter((r) => r.document).map((r) => ({
    uid: r.document.name.split('/').pop(),
    name: r.document.fields.name.stringValue,
    score: Number(r.document.fields.score.integerValue),
  }));
}
