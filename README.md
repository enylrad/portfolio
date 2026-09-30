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
| `css/styles.css` | Estilos y tokens de tema claro/oscuro |
| `vendor/` | GSAP 3.13, ScrollTrigger y Lenis 1.3 (minificados) |
| `assets/` | Fuentes, favicons y foto |
| `cv/` | Aquí va el PDF del CV |

## Editar textos

- **Español:** directamente en `index.html`.
- **Inglés:** la misma clave `data-i18n` en `js/i18n.js`.

## Pendiente

- **CV:** coloca el PDF en `cv/` y cambia `href="#"` del botón `data-cv` en `index.html` por su ruta, añadiendo el atributo `download`.
- **GitHub:** rellena el `href="#"` del icono de GitHub en la sección de contacto.

## Despliegue en Firebase Hosting

```bash
npm i -g firebase-tools
firebase login
firebase init hosting   # public directory: .   · single-page app: No
firebase deploy
```

Conviene añadir en `firebase.json` un `ignore` para `README.md`, `cv/.gitkeep` y los ficheros ocultos.
