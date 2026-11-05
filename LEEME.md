# Mägo de Oz — Web musical

Proyecto educativo con React 19, Vite 7 y la hoja de estilos de Bootstrap 5. Se ha ampliado la portada original conservando la estética oscura y violeta.

## Probar sin instalar nada

1. Extrae el ZIP completo en una carpeta nueva.
2. Abre **Vista_previa.html** con Chrome, Edge o Firefox haciendo doble clic.
3. Prueba la búsqueda, los corazones de favoritas, las secciones del menú y los vídeos.

La vista previa incluye código, imágenes y fuentes. No necesita Node.js ni un servidor para abrirse. Las favoritas se guardan en el navegador cuando este lo permite; si bloquea el almacenamiento de archivos locales, se conservan durante la visita y la web lo indica. Spotify, YouTube y los enlaces oficiales necesitan internet. No se incluyen archivos de audio ni vídeos descargados.

## Trabajar en el proyecto

Necesitas Node.js 20.19 o superior, o 22.12 o superior. Abre una terminal en esta carpeta y ejecuta:

```powershell
npm ci
npm run dev
```

Abre la dirección local que muestre Vite. Para regenerar la compilación y la vista previa:

```powershell
npm run build
```

Para revisar la compilación con un servidor local:

```powershell
npm run preview
```

## Qué incluye

- Portada con la fotografía original, textos legibles y accesos a las secciones.
- Navegación para móviles, cierre con Escape y enlace para saltar al contenido.
- Seis canciones con búsqueda por título, álbum o año, sin distinguir tildes ni mayúsculas.
- Favoritas guardadas en el navegador y filtro para consultarlas.
- Cuatro discos con portadas incluidas y búsquedas en Spotify.
- Historia de la banda contrastada con su biografía oficial.
- Tres vídeos oficiales con reproductor que se carga al abrirlo y enlace alternativo a YouTube.
- Créditos, fuentes y aviso de proyecto educativo no oficial.
- Fuentes e imágenes locales, sin descargar tipografías durante la visita.

## Archivos principales

- `src/App.jsx`: componentes e interacciones.
- `src/data.js`: canciones, álbumes, hitos y enlaces. Edita este archivo para cambiar la selección.
- `src/style.css`: diseño y adaptación a pantallas pequeñas.
- `src/assets/`: imágenes, fuentes y créditos.
- `dist/`: versión compilada para un servidor web estático.
- `Vista_previa.html`: copia autónoma para abrir directamente en el navegador.
- `scripts/build-preview.mjs`: genera la vista previa desde el mismo código.

No copies `node_modules` de otros equipos: `npm ci` instala las dependencias del archivo de bloqueo. La vista previa no se actualiza con cada cambio; ejecuta `npm run build` para regenerarla.

Esta entrega se ha preparado en una copia de trabajo. La carpeta original del repositorio no se ha modificado. Comprueba primero el resultado y después incorpora los archivos a vuestra rama de trabajo.
