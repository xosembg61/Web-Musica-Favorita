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

function Header() {
  return (
    <header className="sticky-top">
      <div className="topline py-1 d-none d-md-block">
        <div className="container d-flex justify-content-between small text-uppercase">
          <span>Folk metal · Madrid · Desde 1988</span>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg border-bottom" aria-label="Navegación principal">
        <div className="container">
          <a className="navbar-brand brand-name" href="#inicio">MÄGO DE OZ<span>.</span></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Abrir menú">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              <li className="nav-item"><a className="nav-link" href="#grupo">El grupo</a></li>
              <li className="nav-item"><a className="nav-link" href="#musica">Música</a></li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#discografia" role="button" data-bs-toggle="dropdown" aria-expanded="false">Discografía</a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  {albums.map((album) => <li key={album.id}><a className="dropdown-item" href={`#album-${album.id}`}>{album.title}</a></li>)}
                </ul>
              </li>
              <li className="nav-item"><a className="nav-link" href="#gira">Gira</a></li>
              <li className="nav-item"><a className="nav-link" href="#videos">Vídeos</a></li>
              <li className="nav-item"><a className="nav-link" href="#contacto">Contacto</a></li>
              <li className="nav-item ms-lg-2"><a className="btn btn-outline-primary d-none d-lg-inline-flex" href="#gira">Entradas</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

function Carousel() {
  return (
    <section id="inicio" aria-label="Portada">
      <div className="container-fluid p-0"><div className="row g-0"><div className="col-12">
      <div id="bandCarousel" className="carousel slide hero-carousel" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {slides.map((slide, index) => <button key={slide.title} type="button" data-bs-target="#bandCarousel" data-bs-slide-to={index} className={index === 0 ? 'active' : ''} aria-label={`Diapositiva ${index + 1}`} aria-current={index === 0 ? 'true' : undefined} />)}
        </div>
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={slide.title}>
              <img className="d-block w-100" src={slide.image} alt={slide.alt} width="1881" height="1019" />
              <div className="carousel-caption d-none d-md-block">
                <p className="text-purple text-uppercase">La música es solo el principio</p>
                <h1>{slide.title}</h1>
                <p className="lead">{slide.text}</p>
                <a className="btn btn-primary btn-lg" href="#musica">Descubrir su música</a>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#bandCarousel" data-bs-slide="prev" aria-label="Imagen anterior"><span className="carousel-control-prev-icon" aria-hidden="true" /><span className="visually-hidden">Anterior</span></button>
        <button className="carousel-control-next" type="button" data-bs-target="#bandCarousel" data-bs-slide="next" aria-label="Imagen siguiente"><span className="carousel-control-next-icon" aria-hidden="true" /><span className="visually-hidden">Siguiente</span></button>
      </div>
      </div></div></div>
    </section>
  )
}

function Group() {
  return (
    <section id="grupo" className="py-5" aria-labelledby="group-title">
      <div className="container py-lg-4">
        <div className="row align-items-center g-4 mb-5">
          <div className="col-12 col-lg-6">
            <p className="text-purple text-uppercase">El origen del viaje</p>
            <h2 className="section-title display-4" id="group-title">Raíces celtas.<br />Alma de metal.</h2>
            <p>Mägo de Oz nació en Madrid en 1988. Su sonido mezcla heavy metal, violín y melodías de raíz celta en canciones que cuentan historias.</p>
            <a className="btn btn-outline-primary" href={links.biography} target="_blank" rel="noreferrer">Leer biografía oficial</a>
          </div>
          <div className="col-12 col-lg-6"><img className="img-fluid rounded-2" src={heroImage} alt="Mägo de Oz sobre el escenario durante un concierto" width="1881" height="1019" /></div>
        </div>
        <h3 className="h4 mb-4">Miembros destacados</h3>
        <div className="row g-4">
          {members.map((member) => (
            <div className="col-12 col-sm-6 col-lg-3" key={member.name}>
              <article className="card h-100">
                <img className="card-img-top member-photo" src={member.image} alt={member.alt} loading="lazy" width="800" height="600" />
                <div className="card-body"><p className="small text-purple mb-2">{member.years}</p><h4 className="h5 card-title">{member.name}</h4><p className="card-text text-body-secondary">{member.instrument}</p></div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Music() {
  return (
    <section id="musica" className="py-5 section-alt" aria-labelledby="music-title">
      <div className="container py-lg-4">
        <p className="text-purple text-uppercase">Dale al play</p>
        <h2 className="section-title display-4 mb-4" id="music-title">Hay canciones. Y hay himnos.</h2>
        <div className="row g-3">
          {songs.map((song, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={song.id}>
              <div className="song-item d-flex align-items-center gap-3 p-3 h-100">
                <span className="song-number">{String(index + 1).padStart(2, '0')}</span>
                <img className="song-cover" src={albums.find((album) => album.id === song.albumId)?.image} alt="" loading="lazy" width="52" height="52" />
                <div className="flex-grow-1"><h3 className="h6 mb-1">{song.title}</h3><span className="small text-body-secondary">{albums.find((album) => album.id === song.albumId)?.title}</span></div>
                <a className="btn btn-sm btn-outline-primary" href={song.spotify} target="_blank" rel="noreferrer" aria-label={`Escuchar ${song.title} en Spotify`}>Escuchar</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Discography() {
  return (
    <section id="discografia" className="py-5" aria-labelledby="albums-title">
      <div className="container py-lg-4">
        <p className="text-purple text-uppercase">Historias que suenan</p>
        <h2 className="section-title display-4 mb-4" id="albums-title">Discografía</h2>
        <div className="row g-4">
          {albums.map((album) => (
            <div className="col-12 col-sm-6 col-lg-3" id={`album-${album.id}`} key={album.id}>
              <article className="card h-100">
                <img className="card-img-top album-cover" src={album.image} alt={`Portada de ${album.title}, de Mägo de Oz`} loading="lazy" width="500" height="500" />
                <div className="card-body d-flex flex-column"><p className="small text-purple mb-2">{album.year}</p><h3 className="h5 card-title">{album.title}</h3>
                  <button className="btn btn-sm btn-outline-primary mt-auto align-self-start" type="button" data-bs-toggle="collapse" data-bs-target={`#songs-${album.id}`} aria-expanded="false" aria-controls={`songs-${album.id}`}>Ver canciones</button>
                  <div className="collapse mt-3" id={`songs-${album.id}`}><ul className="mb-0">{songs.filter((song) => song.albumId === album.id).map((song) => <li key={song.id}>{song.title}</li>)}</ul></div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Tour() {
  return (
    <section id="gira" className="py-5 section-alt" aria-labelledby="tour-title">
      <div className="container py-lg-4">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-3 mb-4"><div><p className="text-purple text-uppercase">Nos vemos en el camino</p><h2 className="section-title display-4 mb-0" id="tour-title">Próximas fechas</h2></div><a className="btn btn-outline-primary d-none d-lg-inline-flex" href={links.concerts} target="_blank" rel="noreferrer">Agenda oficial</a></div>
        <p className="tour-note p-3 mb-4">Fechas de ejemplo para esta práctica; no son conciertos anunciados. Consulta la agenda oficial de la banda.</p>
        <div className="table-responsive"><table className="table table-dark table-striped table-hover align-middle"><caption className="caption-top">Gira de ejemplo · 2027</caption><thead><tr><th scope="col">Fecha</th><th scope="col">Ciudad</th><th scope="col">Sala</th><th scope="col">Entradas</th></tr></thead><tbody>
          {concerts.map(([date, city, venue, ticket]) => <tr key={`${date}-${city}`}><td>{date}</td><td>{city}</td><td>{venue}</td><td>{ticket === 'Agotado' ? <span>Agotado</span> : <a className="btn btn-sm btn-primary" href={links.concerts} target="_blank" rel="noreferrer">Comprar</a>}</td></tr>)}
        </tbody></table></div>
        <nav className="mt-4" aria-label="Paginación de fechas"><ul className="pagination justify-content-center"><li className="page-item active" aria-current="page"><span className="page-link">1</span></li><li className="page-item disabled"><span className="page-link">2</span></li><li className="page-item disabled"><span className="page-link">Siguiente</span></li></ul></nav>
      </div>
    </section>
  )
}

function Videos() {
  return (
    <section id="videos" className="py-5" aria-labelledby="videos-title">
      <div className="container py-lg-4"><p className="text-purple text-uppercase">Más allá del sonido</p><h2 className="section-title display-4 mb-4" id="videos-title">Se escucha. Se canta. Se vive.</h2>
        <div className="row g-3">{videos.map((video) => <div className="col-12 col-md-4" key={video.id}><a className="video-link d-flex flex-column justify-content-between h-100 p-4" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer"><span className="small text-purple">{video.version}</span><span className="h4 my-4">{video.title}</span><span>Ver en YouTube ↗</span></a></div>)}</div>
      </div>
    </section>
  )
}

function ContactModal() {
  return (
    <div className="modal fade" id="contactModal" tabIndex="-1" aria-labelledby="contactModalTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered"><div className="modal-content">
        <div className="modal-header"><h2 className="modal-title fs-5" id="contactModalTitle">Contacto</h2><button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" /></div>
        <form><div className="modal-body">
          <div className="mb-3"><label className="form-label" htmlFor="contactName">Nombre</label><input className="form-control" id="contactName" name="name" required /></div>
          <div className="mb-3"><label className="form-label" htmlFor="contactEmail">Correo electrónico</label><input className="form-control" id="contactEmail" name="email" type="email" required /></div>
          <div className="mb-3"><label className="form-label" htmlFor="contactReason">Motivo</label><select className="form-select" id="contactReason" name="reason" defaultValue=""><option value="" disabled>Elige una opción</option><option>Prensa</option><option>Contratación</option><option>Fans</option></select></div>
          <div className="mb-3"><label className="form-label" htmlFor="contactMessage">Mensaje</label><textarea className="form-control" id="contactMessage" name="message" rows="4" required /></div>
          <div className="form-check"><input className="form-check-input" id="privacy" type="checkbox" required /><label className="form-check-label" htmlFor="privacy">Acepto la política de privacidad.</label></div>
          <p className="form-text mb-0 mt-3">Formulario de ejemplo. No envía datos.</p>
        </div><div className="modal-footer"><button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button><button type="submit" className="btn btn-primary">Enviar</button></div></form>
      </div></div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="py-4 border-top">
      <div className="container"><div className="row align-items-center g-3">
        <div className="col-12 col-lg-4"><a className="navbar-brand brand-name" href="#inicio">MÄGO DE OZ.</a><p className="small text-body-secondary mb-0">© 2026 Mägo de Oz</p></div>
        <div className="col-12 col-lg-5"><nav className="d-flex flex-wrap gap-3" aria-label="Redes sociales"><a href={links.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={links.youtube} target="_blank" rel="noreferrer">YouTube</a><a href={links.spotify} target="_blank" rel="noreferrer">Spotify</a></nav></div>
        <div className="col-12 col-lg-3 text-lg-end"><a href="#aviso-legal">Aviso legal</a></div>
        <div className="col-12"><p className="small text-body-secondary mb-0" id="aviso-legal">Las marcas, canciones y fotografías pertenecen a sus titulares.</p></div>
      </div></div>
    </footer>
  )
}

export default function AppPage() {
  return (
    <>
      <Header />
      <main>
        <Carousel />
        <Group />
        <Music />
        <Discography />
        <Tour />
        <Videos />
        <section id="contacto" className="py-5 section-alt text-center" aria-labelledby="contact-title"><div className="container py-4"><p className="text-purple text-uppercase">Prensa, contratación y mensajes</p><h2 className="section-title display-4" id="contact-title">¿Hablamos?</h2><p className="mb-4">Escribe al equipo de Mägo de Oz.</p><button className="btn btn-primary btn-lg" type="button" data-bs-toggle="modal" data-bs-target="#contactModal">Abrir formulario de contacto</button></div></section>
      </main>
      <Footer />
      <a className="btn btn-primary position-fixed bottom-0 start-0 end-0 m-3 d-lg-none shadow" href="#gira" style={{ zIndex: 1030 }}>Entradas</a>
      <ContactModal />
    </>
  )
}