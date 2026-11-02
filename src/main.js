/* =====================================================================
   src/main.js — Proyecto Vite (npm create vite@latest · plantilla vanilla)
   Bootstrap instalado con:  npm install bootstrap

   ORDEN DE IMPORTACIÓN OBLIGATORIO (según el enunciado):
     1. CSS de Bootstrap
     2. bootstrap.bundle.min.js  (incluye Popper: dropdown, modal, collapse...)
     3. style.css  (nuestra personalización, al final para que gane)

   NOTA: el index.html de la raíz funciona de forma autónoma con el CDN
   (para abrirlo con doble clic). En el proyecto Vite se borran las dos
   etiquetas <link>/<script> del CDN del <head>/final del index.html y se
   sustituyen por esta línea en el HTML:

       <script type="module" src="/src/main.js"></script>

   Con esto, `npm run build` copia todo a dist/ sin errores.
   ===================================================================== */

// 1) CSS de Bootstrap: estilos de navbar, carrusel, tarjetas, tabla, modal...
import 'bootstrap/dist/css/bootstrap.min.css'

// 2) JavaScript de Bootstrap (bundle = Bootstrap + Popper).
//    Hace funcionar, solo con atributos data-bs-*, el menú móvil
//    (navbar-toggler), el desplegable (dropdown), el carrusel, las listas
//    desplegables (collapse) y la ventana modal.
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// 3) Nuestro CSS (variables redefinidas y detalles mínimos).
//    Va al final para que sus reglas tengan prioridad sobre las de Bootstrap.
import '../style.css'

// ---------------------------------------------------------------------
// No hace falta escribir ningún JavaScript propio:
//   - el menú hamburguesa usa data-bs-toggle="collapse"
//   - el desplegable de discos usa data-bs-toggle="dropdown"
//   - el carrusel usa data-bs-ride="carousel"
//   - «Ver canciones» usa data-bs-toggle="collapse"
//   - el botón "Escríbenos" usa data-bs-toggle="modal"
// Bootstrap se encarga de todo al cargar el bundle.
// ---------------------------------------------------------------------
