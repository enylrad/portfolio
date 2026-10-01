# David Pérez Salort — Portfolio

Single-page personal website: plain HTML, CSS and JavaScript with no build step. Animations use GSAP + ScrollTrigger and smooth scrolling uses Lenis. Everything is hosted in the repo itself (`vendor/`, `assets/fonts/`), with no CDN dependencies.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

It has to be served over HTTP (not `file://`), because `js/main.js` is an ES module.

## Structure

| Path | Contents |
| --- | --- |
| `index.html` | Markup and Spanish copy (primary source) |
| `js/boot.js` | Applies the saved theme and language before first paint |
| `js/i18n.js` | English translations and per-language metadata |
| `js/main.js` | Theme, language, animations and interactions |
| `js/sprites.js` | Pixel art sprites (character matrices) for the site and the game |
| `js/mascot.js` | Nav droid: puts on sunglasses in light mode and waves when clicked |
| `js/game.js` | "Droid Runner" easter egg (loaded only when triggered) |
| `js/leaderboard.js` | Droid Runner online leaderboard (Firestore REST API) |
| `css/styles.css` | Styles and light/dark theme tokens |
| `vendor/` | GSAP 3.13, ScrollTrigger and Lenis 1.3 (minified) |
| `assets/` | Fonts (Inter, Space Grotesk, Pixelify Sans and VT323 for digits), favicons and photo |
| `cv/` | CV PDFs (ES/EN) and their source, `cv.html` |
| `firestore.rules` | Firestore security rules for the leaderboard |

## Editing copy

- **Spanish:** directly in `index.html`.
- **English:** the same `data-i18n` key in `js/i18n.js`.

## Projects

Each project is an `<li class="cart">` in the `#projects` section of `index.html`. The label icon is a sprite from `js/sprites.js` (`data-sprite="p-<slug>"`) and the English copy lives in `js/i18n.js` under the `projects.<slug>` key.

## Easter egg

Konami code (↑↑↓↓←→←→BA) or clicking the footer droid opens "Droid Runner", a pixel art runner in `js/game.js`. The personal best is stored in `localStorage`.

### Online leaderboard

- `js/leaderboard.js` talks to Firestore through its REST API (no SDK) using **anonymous** Firebase Auth identities. The "Anonymous" provider must be enabled in the console.
- Security lives in `firestore.rules`:
  - only the top 10 can be read;
  - each player has a single entry, which can only improve;
  - initials are validated (`^[A-Z0-9]{3}$` plus a blocklist);
  - the score must be consistent with the real time elapsed since the server stamped the start of the run (at most ~90 pts/s, at least 3 s);
  - nobody can delete or edit other players' scores.
- Deploy the rules: `firebase deploy --only firestore:rules`.
- Delete an entry: `firebase firestore:delete scores/<uid> --force` (or from the console).

## CV PDF

The "Download CV" button serves `cv/David-Perez-Salort-CV-ES.pdf` or `-EN.pdf` depending on the active language. The PDFs are generated from `cv/cv.html`: a single page focused on experience and technologies, in ES/EN via `?lang=`. To regenerate them, with the local server running:

```bash
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
for L in es en; do
  "$EDGE" --headless=new --no-pdf-header-footer --virtual-time-budget=6000 \
    --print-to-pdf="cv/David-Perez-Salort-CV-${L^^}.pdf" "http://localhost:8000/cv/cv.html?lang=$L"
done
```

If you change the experience or the stack on the site, update `cv/cv.html` as well and regenerate the PDFs.

## Deploying to Firebase Hosting

Project `portfolio-8fa1d`. Public domain: **https://dperez.dev** (custom domain connected in Firebase Hosting); https://portfolio-8fa1d.web.app also serves the site. `og:url`, `<link rel="canonical">`, the JSON-LD `url`, `robots.txt` and `sitemap.xml` all point to `dperez.dev`, so search engines treat it as the original and the Firebase domains as copies. The configuration is already in `firebase.json` and `.firebaserc`: they serve the repo root, ignore `README.md` and hidden files, and set long-lived caching for fonts and images.

```bash
firebase hosting:channel:deploy preview --expires 7d   # temporary URL for review
firebase deploy --only hosting                         # publish to production
```
