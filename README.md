# David Pérez Salort — Portfolio

Web personal de una sola página: HTML, CSS y JavaScript sin paso de build. Las animaciones usan GSAP + ScrollTrigger y el scroll suave usa Lenis. Todo está alojado en el propio repo (`vendor/`, `assets/fonts/`), sin dependencias de CDN.

## Ver en local

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

Hace falta servirlo por HTTP (no con `file://`), porque `js/main.js` es un módulo ES.

## Estructura

| Ruta | Contenido |
| --- | --- |
| `index.html` | Marcado y textos en español (fuente principal) |
| `js/i18n.js` | Traducciones al inglés y metadatos por idioma |
| `js/main.js` | Tema, idioma, animaciones e interacciones |
| `js/sprites.js` | Sprites pixel art (matrices de caracteres) para la web y el juego |
| `js/mascot.js` | Droide del nav: se pone gafas de sol en modo claro y saluda al pulsarlo |
| `js/game.js` | Easter egg «Droid Runner» (se carga solo al activarlo) |
| `css/styles.css` | Estilos y tokens de tema claro/oscuro |
| `vendor/` | GSAP 3.13, ScrollTrigger y Lenis 1.3 (minificados) |
| `assets/` | Fuentes (Inter, Space Grotesk, Pixelify Sans y VT323 para los números), favicons y foto |
| `cv/` | Aquí va el PDF del CV |

## Editar textos

- **Español:** directamente en `index.html`.
- **Inglés:** la misma clave `data-i18n` en `js/i18n.js`.

## Proyectos

Cada proyecto es un `<li class="cart">` en la sección `#projects` de `index.html`. El icono de la etiqueta es un sprite de `js/sprites.js` (`data-sprite="p-<slug>"`) y el texto en inglés va en `js/i18n.js` con la clave `projects.<slug>`.

## Easter egg

Código Konami (↑↑↓↓←→←→BA) o clic en el droide del footer: abre «Droid Runner», un runner pixel art en `js/game.js`. El récord se guarda en `localStorage`.

## CV en PDF

El botón «Descargar CV» sirve `cv/David-Perez-Salort-CV-ES.pdf` o `-EN.pdf` según el idioma activo. Los PDFs salen de `cv/cv.html`: una página centrada en experiencia y tecnologías, en ES/EN con `?lang=`. Para regenerarlos, con el servidor local en marcha:

```bash
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
for L in es en; do
  "$EDGE" --headless=new --no-pdf-header-footer --virtual-time-budget=6000     --print-to-pdf="cv/David-Perez-Salort-CV-${L^^}.pdf" "http://localhost:8000/cv/cv.html?lang=$L"
done
```

Si cambias la experiencia o el stack en la web, actualízalos también en `cv/cv.html` y regenera los PDFs.

## Despliegue en Firebase Hosting

Proyecto `portfolio-8fa1d` → https://portfolio-8fa1d.web.app. La configuración ya está en `firebase.json` y `.firebaserc`, que sirven la raíz del repo, ignoran `README.md` y los ficheros ocultos y ponen caché larga a fuentes e imágenes.

```bash
firebase hosting:channel:deploy preview --expires 7d   # URL temporal para revisar
firebase deploy --only hosting                         # publicar en producción
```
