import { albums, heroImage, links, songs, videos } from './data.js'
import txusPortrait from './assets/images/txus-portrait.jpg'
import josePortrait from './assets/images/jose-andrea-portrait.jpg'
import carlitosPortrait from './assets/images/carlitos-portrait.jpg'

const members = [
  { name: 'Txus di Fellatio', instrument: 'Batería y fundador', years: 'Desde 1988', image: txusPortrait, alt: 'Txus di Fellatio tocando la batería' },
  { name: 'Mohamed', instrument: 'Violín', years: 'Miembro histórico', image: 'https://colmenaraldia.com/wp-content/uploads/2025/08/mohamed-magodeoz-1024x749.png', alt: 'Mohamed, violinista de Mägo de Oz' },
  { name: 'José Andrëa', instrument: 'Voz', years: '1996–2011', image: josePortrait, alt: 'José Andrëa cantando en directo en Santiago de Chile' },
  { name: 'Carlitos', instrument: 'Guitarra', years: '1992–2018', image: carlitosPortrait, alt: 'Carlitos tocando la guitarra en directo' },
]

const concerts = [
  ['12 jun 2027', 'Madrid', 'Recinto Ferial', 'Comprar'],
  ['19 jun 2027', 'Barcelona', 'Parc del Fòrum', 'Comprar'],
  ['26 jun 2027', 'Valencia', 'Marina Norte', 'Comprar'],
  ['03 jul 2027', 'Sevilla', 'Auditorio Rocío Jurado', 'Agotado'],
  ['10 jul 2027', 'Bilbao', 'Miribilla', 'Comprar'],
  ['17 jul 2027', 'Zaragoza', 'Príncipe Felipe', 'Comprar'],
]

const slides = [
  { image: heroImage, alt: 'Mägo de Oz actuando en directo', title: 'Mägo de Oz', text: 'Donde el violín se encuentra con la distorsión.' },
  { image: albums[1].image, alt: 'Portada del disco Finisterra', title: 'Finisterra', text: 'Un viaje de rock, libertad y raíces celtas.' },
  { image: albums[3].image, alt: 'Portada del disco Gaia II: La voz dormida', title: 'La voz dormida', text: 'Historias que suenan y se cantan en directo.' },
]

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[character]))

function renderHeader() {
  return `
    <header class="sticky-top">
      <div class="topline py-1 d-none d-md-block">
        <div class="container d-flex justify-content-between small text-uppercase">
          <span>Folk metal · Madrid · Desde 1988</span>
        </div>
      </div>
      <nav class="navbar navbar-expand-lg border-bottom" data-bs-theme="dark" aria-label="Navegación principal">
        <div class="container">
          <a class="navbar-brand brand-name" href="#inicio" aria-label="Mägo de Oz, inicio">MÄGO DE OZ<span>.</span></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Abrir menú">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mainNav">
            <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              <li class="nav-item"><a class="nav-link" href="#grupo">El grupo</a></li>
              <li class="nav-item"><a class="nav-link" href="#musica">Música</a></li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#discografia" role="button" data-bs-toggle="dropdown" aria-expanded="false">Discografía</a>
                <ul class="dropdown-menu dropdown-menu-dark">
                  ${albums.map((album) => `<li><a class="dropdown-item" href="#album-${escapeHtml(album.id)}">${escapeHtml(album.title)}</a></li>`).join('')}
                </ul>
              </li>
              <li class="nav-item"><a class="nav-link" href="#gira">Gira</a></li>
              <li class="nav-item"><a class="nav-link" href="#videos">Vídeos</a></li>
              <li class="nav-item"><a class="nav-link" href="#contacto">Contacto</a></li>
              <li class="nav-item ms-lg-2"><a class="btn btn-outline-primary d-none d-lg-inline-flex" href="#gira">Entradas</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>`
}

function renderCarousel() {
  return `
    <section id="inicio" aria-label="Portada">
      <div class="container-fluid p-0"><div class="row g-0"><div class="col-12">
        <div id="bandCarousel" class="carousel slide hero-carousel" data-bs-ride="carousel">
          <div class="carousel-indicators">
            ${slides.map((slide, index) => `<button type="button" data-bs-target="#bandCarousel" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}" aria-label="Diapositiva ${index + 1}" aria-current="${index === 0 ? 'true' : 'false'}"></button>`).join('')}
          </div>
          <div class="carousel-inner">
            ${slides.map((slide, index) => `
              <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img class="d-block w-100" src="${escapeHtml(slide.image)}" alt="${escapeHtml(slide.alt)}" width="1881" height="1019">
                <div class="carousel-caption d-none d-md-block">
                  <p class="text-purple text-uppercase">La música es solo el principio</p>
                  <h1>${escapeHtml(slide.title)}</h1>
                  <p class="lead">${escapeHtml(slide.text)}</p>
                  <a class="btn btn-primary btn-lg" href="#musica">Descubrir su música</a>
                </div>
              </div>`).join('')}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#bandCarousel" data-bs-slide="prev" aria-label="Imagen anterior"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Anterior</span></button>
          <button class="carousel-control-next" type="button" data-bs-target="#bandCarousel" data-bs-slide="next" aria-label="Imagen siguiente"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Siguiente</span></button>
        </div>
      </div></div></div>
    </section>`
}

function renderGroup() {
  return `
    <section id="grupo" class="py-5" aria-labelledby="group-title">
      <div class="container py-lg-4">
        <div class="row align-items-center g-4 mb-5">
          <div class="col-12 col-lg-6">
            <p class="text-purple text-uppercase">El origen del viaje</p>
            <h2 class="section-title display-4" id="group-title">Raíces celtas.<br>Alma de metal.</h2>
            <p>Mägo de Oz nació en Madrid en 1988. Su sonido mezcla heavy metal, violín y melodías de raíz celta en canciones que cuentan historias.</p>
            <a class="btn btn-outline-primary" href="${links.biography}" target="_blank" rel="noreferrer">Leer biografía oficial</a>
          </div>
          <div class="col-12 col-lg-6"><img class="img-fluid rounded-2" src="${heroImage}" alt="Mägo de Oz sobre el escenario durante un concierto" width="1881" height="1019"></div>
        </div>
        <h3 class="h4 mb-4">Miembros destacados</h3>
        <div class="row g-4">
          ${members.map((member) => `
            <div class="col-12 col-sm-6 col-lg-3">
              <article class="card h-100">
                <img class="card-img-top member-photo" src="${escapeHtml(member.image)}" alt="${escapeHtml(member.alt)}" loading="lazy" width="800" height="600">
                <div class="card-body"><p class="small text-purple mb-2">${escapeHtml(member.years)}</p><h4 class="h5 card-title">${escapeHtml(member.name)}</h4><p class="card-text text-body-secondary">${escapeHtml(member.instrument)}</p></div>
              </article>
            </div>`).join('')}
        </div>
      </div>
    </section>`
}

function renderMusic() {
  return `
    <section id="musica" class="py-5 section-alt" aria-labelledby="music-title">
      <div class="container py-lg-4">
        <p class="text-purple text-uppercase">Dale al play</p>
        <h2 class="section-title display-4 mb-4" id="music-title">Hay canciones. Y hay himnos.</h2>
        <div class="row g-3">
          ${songs.map((song, index) => {
            const album = albums.find((item) => item.id === song.albumId)
            return `
              <div class="col-12 col-md-6 col-lg-4">
                <div class="song-item d-flex align-items-center gap-3 p-3 h-100">
                  <span class="song-number">${String(index + 1).padStart(2, '0')}</span>
                  <img class="song-cover" src="${album.image}" alt="" loading="lazy" width="52" height="52">
                  <div class="flex-grow-1"><h3 class="h6 mb-1">${escapeHtml(song.title)}</h3><span class="small text-body-secondary">${escapeHtml(album.title)}</span></div>
                  <a class="btn btn-sm btn-outline-primary" href="${song.spotify}" target="_blank" rel="noreferrer" aria-label="Escuchar ${escapeHtml(song.title)} en Spotify">Escuchar</a>
                </div>
              </div>`
          }).join('')}
        </div>
      </div>
    </section>`
}

function renderDiscography() {
  return `
    <section id="discografia" class="py-5" aria-labelledby="albums-title">
      <div class="container py-lg-4">
        <p class="text-purple text-uppercase">Historias que suenan</p>
        <h2 class="section-title display-4 mb-4" id="albums-title">Discografía</h2>
        <div class="row g-4">
          ${albums.map((album) => `
            <div class="col-12 col-sm-6 col-lg-3" id="album-${escapeHtml(album.id)}">
              <article class="card h-100">
                <img class="card-img-top album-cover" src="${album.image}" alt="Portada de ${escapeHtml(album.title)}, de Mägo de Oz" loading="lazy" width="500" height="500">
                <div class="card-body d-flex flex-column">
                  <p class="small text-purple mb-2">${album.year}</p><h3 class="h5 card-title">${escapeHtml(album.title)}</h3>
                  <button class="btn btn-sm btn-outline-primary mt-auto align-self-start" type="button" data-bs-toggle="collapse" data-bs-target="#songs-${escapeHtml(album.id)}" aria-expanded="false" aria-controls="songs-${escapeHtml(album.id)}">Ver canciones</button>
                  <div class="collapse mt-3" id="songs-${escapeHtml(album.id)}"><ul class="mb-0">${songs.filter((song) => song.albumId === album.id).map((song) => `<li>${escapeHtml(song.title)}</li>`).join('')}</ul></div>
                </div>
              </article>
            </div>`).join('')}
        </div>
      </div>
    </section>`
}

function renderTour() {
  return `
    <section id="gira" class="py-5 section-alt" aria-labelledby="tour-title">
      <div class="container py-lg-4">
        <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-3 mb-4">
          <div><p class="text-purple text-uppercase">Nos vemos en el camino</p><h2 class="section-title display-4 mb-0" id="tour-title">Próximas fechas</h2></div>
          <a class="btn btn-outline-primary d-none d-lg-inline-flex" href="${links.concerts}" target="_blank" rel="noreferrer">Agenda oficial</a>
        </div>
        <p class="tour-note p-3 mb-4">Fechas de ejemplo para esta práctica; no son conciertos anunciados. Consulta la agenda oficial de la banda.</p>
        <div class="table-responsive"><table class="table table-dark table-striped table-hover align-middle"><caption class="caption-top">Gira de ejemplo · 2027</caption><thead><tr><th scope="col">Fecha</th><th scope="col">Ciudad</th><th scope="col">Sala</th><th scope="col">Entradas</th></tr></thead><tbody>
          ${concerts.map(([date, city, venue, ticket]) => `<tr><td>${date}</td><td>${city}</td><td>${venue}</td><td>${ticket === 'Agotado' ? '<span class="badge text-bg-secondary">Agotado</span>' : `<a class="btn btn-sm btn-primary" href="${links.concerts}" target="_blank" rel="noreferrer">Comprar</a>`}</td></tr>`).join('')}
        </tbody></table></div>
        <nav class="mt-4" aria-label="Paginación de fechas"><ul class="pagination justify-content-center"><li class="page-item active" aria-current="page"><span class="page-link">1</span></li><li class="page-item disabled"><span class="page-link">2</span></li><li class="page-item disabled"><span class="page-link">Siguiente</span></li></ul></nav>
      </div>
    </section>`
}

function renderVideos() {
  return `
    <section id="videos" class="py-5" aria-labelledby="videos-title">
      <div class="container py-lg-4"><p class="text-purple text-uppercase">Más allá del sonido</p><h2 class="section-title display-4 mb-4" id="videos-title">Se escucha. Se canta. Se vive.</h2>
        <div class="row g-3">${videos.map((video) => `<div class="col-12 col-md-4"><a class="video-link d-flex flex-column justify-content-between h-100 p-4" href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noreferrer"><span class="small text-purple">${escapeHtml(video.version)}</span><span class="h4 my-4">${escapeHtml(video.title)}</span><span>Ver en YouTube ↗</span></a></div>`).join('')}</div>
      </div>
    </section>`
}

function renderContact() {
  return `
    <section id="contacto" class="py-5 section-alt text-center" aria-labelledby="contact-title">
      <div class="container py-4"><p class="text-purple text-uppercase">Prensa, contratación y mensajes</p><h2 class="section-title display-4" id="contact-title">¿Hablamos?</h2><p class="mb-4">Escribe al equipo de Mägo de Oz.</p><button class="btn btn-primary btn-lg" type="button" data-bs-toggle="modal" data-bs-target="#contactModal">Abrir formulario de contacto</button></div>
    </section>
    <div class="modal fade" id="contactModal" tabindex="-1" aria-labelledby="contactModalTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered"><div class="modal-content">
        <div class="modal-header"><h2 class="modal-title fs-5" id="contactModalTitle">Contacto</h2><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div>
        <form id="contactForm" class="needs-validation" novalidate>
          <div class="modal-body">
            <div class="mb-3"><label class="form-label" for="contactName">Nombre</label><input class="form-control" id="contactName" name="name" required><div class="invalid-feedback">Escribe tu nombre.</div></div>
            <div class="mb-3"><label class="form-label" for="contactEmail">Correo electrónico</label><input class="form-control" id="contactEmail" name="email" type="email" required><div class="invalid-feedback">Escribe un correo electrónico válido.</div></div>
            <div class="mb-3"><label class="form-label" for="contactReason">Motivo</label><select class="form-select" id="contactReason" name="reason" required><option value="" selected disabled>Elige una opción</option><option>Prensa</option><option>Contratación</option><option>Fans</option></select><div class="invalid-feedback">Elige el motivo del mensaje.</div></div>
            <div class="mb-3"><label class="form-label" for="contactMessage">Mensaje</label><textarea class="form-control" id="contactMessage" name="message" rows="4" required></textarea><div class="invalid-feedback">Escribe un mensaje.</div></div>
            <div class="form-check"><input class="form-check-input" id="privacy" type="checkbox" required><label class="form-check-label" for="privacy">Acepto la política de privacidad.</label><div class="invalid-feedback">Debes aceptar la política de privacidad.</div></div>
            <p class="form-text mb-0 mt-3" id="contactFeedback" aria-live="polite">Formulario de ejemplo. No envía datos.</p>
          </div>
          <div class="modal-footer"><button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button><button type="submit" class="btn btn-primary">Enviar</button></div>
        </form>
      </div></div>
    </div>`
}

function renderFooter() {
  return `
    <footer class="py-4 border-top">
      <div class="container"><div class="row align-items-center g-3">
        <div class="col-12 col-lg-4"><a class="navbar-brand brand-name" href="#inicio" aria-label="Mägo de Oz, inicio">MÄGO DE OZ<span>.</span></a><p class="small text-body-secondary mb-0">© 2026 Mägo de Oz</p></div>
        <div class="col-12 col-lg-5"><nav class="d-flex flex-wrap gap-3" aria-label="Redes sociales"><a href="${links.instagram}" target="_blank" rel="noreferrer">Instagram</a><a href="${links.youtube}" target="_blank" rel="noreferrer">YouTube</a><a href="${links.spotify}" target="_blank" rel="noreferrer">Spotify</a></nav></div>
        <div class="col-12 col-lg-3 text-lg-end"><a href="#aviso-legal">Aviso legal</a></div>
        <div class="col-12"><p class="small text-body-secondary mb-0" id="aviso-legal">Las marcas, canciones y fotografías pertenecen a sus titulares.</p></div>
      </div></div>
    </footer>`
}

export function renderPage() {
  return `${renderHeader()}<main>${renderCarousel()}${renderGroup()}${renderMusic()}${renderDiscography()}${renderTour()}${renderVideos()}${renderContact()}</main>${renderFooter()}<a class="btn btn-primary position-fixed bottom-0 start-0 end-0 m-3 d-lg-none shadow z-3" href="#gira">Entradas</a>`
}