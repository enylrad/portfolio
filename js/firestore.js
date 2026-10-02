// Firestore REST API (no SDK), shared by the leaderboard and the visit counter.
// Security lives in firestore.rules: this key is public by design in Firebase web apps.
export const API_KEY = 'AIzaSyCYzY5ppBKZR4iMAgmjgbPyz4S-h28MmaU';
const PROJECT = 'portfolio-8fa1d';
export const DOCS = `projects/${PROJECT}/databases/(default)/documents`;
export const FS = `https://firestore.googleapis.com/v1/${DOCS}`;

export async function post(url, body, token, form = false) {
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
