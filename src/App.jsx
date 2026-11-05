import { useEffect, useRef, useState } from 'react'
import { albums, links, milestones, songs, videos, heroImage } from './data.js'

function Icon({ name, size = 20, ...props }) {
  const shapes = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    external: <path d="M7 17 17 7M7 7h10v10" />,
    down: <path d="M12 4v16M6 14l6 6 6-6" />,
    play: <path d="m9 5 11 7-11 7Z" />,
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {shapes[name]}
    </svg>
  )
}

function ExternalLink({ href, children, className = '', ...props }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props}>
      {children}
    </a>
  )
}

function Wordmark() {
  return (
    <span className="wordmark">
      MÄGO <span>DE</span> OZ<span className="wordmark-dot">.</span>
    </span>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef(null)
  const navRef = useRef(null)
  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    function closeOutside(event) {
      if (!navRef.current?.contains(event.target)) setMenuOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOutside)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOutside)
    }
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="oz-topline">
        <div className="container oz-topline-inner">
          <span>FOLK METAL · MADRID · DESDE 1988</span>
          <div className="oz-socials" aria-label="Redes oficiales">
            <ExternalLink href={links.spotify}>
              SPOTIFY <Icon name="external" size={12} />
            </ExternalLink>
            <ExternalLink href={links.youtube}>
              YOUTUBE <Icon name="external" size={12} />
            </ExternalLink>
            <ExternalLink href={links.instagram}>
              INSTAGRAM <Icon name="external" size={12} />
            </ExternalLink>
          </div>
        </div>
      </div>
      <nav className="oz-navbar" aria-label="Navegación principal" ref={navRef}>
        <div className="container navigation-inner">
          <a
            className="brand"
            href="#inicio"
            aria-label="Mägo de Oz, inicio"
            onClick={() => setMenuOpen(false)}
          >
            <Wordmark />
          </a>
          <button
            ref={toggleRef}
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="oz-navigation"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={25} />
          </button>
          <div className={`oz-navigation ${menuOpen ? 'is-open' : ''}`} id="oz-navigation">
            <a href="#musica" onClick={() => setMenuOpen(false)}>
              Música
            </a>
            <a href="#discografia" onClick={() => setMenuOpen(false)}>
              Discografía
            </a>
            <a href="#historia" onClick={() => setMenuOpen(false)}>
              La banda
            </a>
            <a href="#videos" onClick={() => setMenuOpen(false)}>
              Vídeos
            </a>
            <ExternalLink className="header-cta" href={links.official}>
              Web oficial <Icon name="external" size={16} />
            </ExternalLink>
          </div>
        </div>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="oz-hero" id="inicio" aria-labelledby="hero-title">
      <img
        className="hero-image"
        src={heroImage}
        alt="Mägo de Oz sobre el escenario durante un concierto en Torrent en 2013"
        fetchPriority="high"
        width="1881"
        height="1019"
      />
      <div className="hero-shade" />
      <div className="container hero-content">
        <p className="eyebrow">
          <span /> LA MÚSICA ES SOLO EL PRINCIPIO
        </p>
        <h1 id="hero-title">
          MÄGO
          <br />
          <span>DE OZ.</span>
        </h1>
        <p className="hero-copy">
          Donde el violín se encuentra con la distorsión.
          <br className="desktop-break" /> Un viaje de rock, libertad y raíces celtas.
        </p>
        <div className="hero-actions">
          <a className="oz-button button-primary" href="#musica">
            <Icon name="play" size={18} /> Descubrir su música
          </a>
          <a className="text-link" href="#historia">
            Conocer la historia <Icon name="arrow" />
          </a>
        </div>
      </div>
      <div className="hero-bottom container">
        <a className="scroll-cue" href="#musica">
          <Icon name="down" size={16} /> SIGUE EL CAMINO
        </a>
        <span>
          EL ESPÍRITU DEL DIRECTO <span className="live-dot" />
        </span>
      </div>
    </section>
  )
}

const storageKey = 'mago-de-oz:favoritas:v1'
function readFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]')
    return Array.isArray(stored)
      ? [...new Set(stored.filter((id) => songs.some((song) => song.id === id)))]
      : []
  } catch {
    return []
  }
}
function normalize(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es')
}

function Music() {
  const [favorites, setFavorites] = useState(readFavorites)
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [query, setQuery] = useState('')
  const [announcement, setAnnouncement] = useState('')
  const [storageAvailable, setStorageAvailable] = useState(true)
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(favorites))
    } catch {
      setStorageAvailable(false)
    }
  }, [favorites])

  const matches = songs.filter((song) => {
    const album = albums.find((item) => item.id === song.albumId)
    return (
      (!favoritesOnly || favorites.includes(song.id)) &&
      normalize(`${song.title} ${album.title} ${album.year}`).includes(normalize(query.trim()))
    )
  })
  function toggleFavorite(song) {
    const removing = favorites.includes(song.id)
    setFavorites((current) =>
      removing ? current.filter((id) => id !== song.id) : [...current, song.id],
    )
    setAnnouncement(`${song.title}: ${removing ? 'eliminada de' : 'añadida a'} tus favoritas.`)
  }
  function clearFilters() {
    setFavoritesOnly(false)
    setQuery('')
  }

  return (
    <section className="music-section section-space" id="musica" aria-labelledby="music-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="section-kicker">01 / DALE AL PLAY</p>
            <h2 id="music-title">
              HAY CANCIONES.
              <br />Y HAY <em>HIMNOS.</em>
            </h2>
          </div>
          <p>
            Seis formas de entrar en su universo.
            <br />
            Encuentra la tuya y guarda tus favoritas.
          </p>
        </div>
        <div className="music-toolbar">
          <div className="music-filters" role="group" aria-label="Filtrar canciones">
            <button
              className={!favoritesOnly ? 'is-active' : ''}
              type="button"
              aria-pressed={!favoritesOnly}
              onClick={() => setFavoritesOnly(false)}
            >
              Todas las canciones <span>{songs.length}</span>
            </button>
            <button
              className={favoritesOnly ? 'is-active' : ''}
              type="button"
              aria-pressed={favoritesOnly}
              onClick={() => setFavoritesOnly(true)}
            >
              <Icon name="heart" size={15} /> Mis favoritas <span>{favorites.length}</span>
            </button>
          </div>
          <label className="song-search">
            <Icon name="search" size={18} />
            <span className="visually-hidden">Buscar por canción, álbum o año</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Busca una canción, álbum o año…"
            />
          </label>
        </div>
        <div className="song-list">
          <div className="song-list-head" aria-hidden="true">
            <span>#</span>
            <span>CANCIÓN / ÁLBUM</span>
            <span>AÑO</span>
            <span>ESCUCHAR</span>
            <span />
          </div>
          <ul aria-label="Selección de canciones">
            {matches.map((song) => {
              const album = albums.find((item) => item.id === song.albumId)
              const favorite = favorites.includes(song.id)
              return (
                <li className="song-row" key={song.id}>
                  <span className="song-number" aria-hidden="true">
                    {String(songs.indexOf(song) + 1).padStart(2, '0')}
                  </span>
                  <div className="song-identity">
                    <img src={album.image} alt="" loading="lazy" width="52" height="52" />
                    <div>
                      <h3>{song.title}</h3>
                      <p>{album.title}</p>
                    </div>
                  </div>
                  <span className="song-year">{album.year}</span>
                  <ExternalLink
                    className="song-listen"
                    href={song.spotify}
                    aria-label={`Buscar ${song.title} de Mägo de Oz en Spotify`}
                  >
                    <Icon name="play" size={15} />
                    <span>Spotify</span>
                    <Icon name="external" size={15} />
                  </ExternalLink>
                  <button
                    className={`favorite-button ${favorite ? 'is-favorite' : ''}`}
                    type="button"
                    aria-label={`${favorite ? 'Quitar' : 'Añadir'} ${song.title} ${favorite ? 'de' : 'a'} favoritas`}
                    aria-pressed={favorite}
                    onClick={() => toggleFavorite(song)}
                  >
                    <Icon name="heart" size={20} />
                  </button>
                </li>
              )
            })}
          </ul>
          {matches.length === 0 && (
            <div className="empty-state">
              <Icon name={favoritesOnly && !favorites.length ? 'heart' : 'search'} size={32} />
              <h3>
                {favoritesOnly && !favorites.length
                  ? 'Tu selección empieza aquí.'
                  : 'No encontramos esa canción.'}
              </h3>
              <p>
                {favoritesOnly && !favorites.length
                  ? 'Pulsa el corazón de una canción para guardarla en tus favoritas.'
                  : 'Prueba con otro título, álbum o año.'}
              </p>
              <button className="text-link" type="button" onClick={clearFilters}>
                Ver todas las canciones <Icon name="arrow" size={18} />
              </button>
            </div>
          )}
        </div>
        <div className="music-footnote">
          <p>
            <Icon name="heart" size={14} />{' '}
            {storageAvailable
              ? 'Tus favoritas se guardan en este navegador.'
              : 'El navegador no permite guardar cambios. Tus favoritas durarán esta visita.'}
          </p>
          <p>
            La música se abre en Spotify <Icon name="external" size={13} />
          </p>
        </div>
        <p className="visually-hidden" role="status">
          {announcement}
        </p>
        <p className="visually-hidden" role="status">
          {matches.length} canciones encontradas.
        </p>
      </div>
    </section>
  )
}

function Discography() {
  return (
    <section
      className="discography-section section-space"
      id="discografia"
      aria-labelledby="albums-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="section-kicker">02 / HISTORIAS QUE SUENAN</p>
            <h2 id="albums-title">
              UN DISCO.
              <br />
              OTRO <em>UNIVERSO.</em>
            </h2>
          </div>
          <p>
            Cuatro paradas en el camino.
            <br />
            Una selección para descubrir su sonido.
          </p>
        </div>
        <div className="album-grid">
          {albums.map((album, index) => (
            <article className="album" key={album.id}>
              <ExternalLink
                className="album-art"
                href={album.spotify}
                aria-label={`Buscar el álbum ${album.title} en Spotify`}
              >
                <img
                  src={album.image}
                  alt={`Portada de ${album.title}, de Mägo de Oz`}
                  loading="lazy"
                  width="500"
                  height="500"
                />
                <span className="album-play">
                  <Icon name="play" size={26} />
                </span>
                <span className="album-index" aria-hidden="true">
                  0{index + 1}
                </span>
              </ExternalLink>
              <p className="album-meta">
                {album.year} <span>ÁLBUM DE ESTUDIO</span>
              </p>
              <h3>{album.title}</h3>
              <p className="album-description">{album.description}</p>
              <ExternalLink className="album-link" href={album.spotify}>
                Buscar en Spotify <Icon name="external" size={16} />
              </ExternalLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function History() {
  return (
    <section
      className="history-section section-space"
      id="historia"
      aria-labelledby="history-title"
    >
      <div className="container history-layout">
        <div className="history-intro">
          <p className="section-kicker">03 / EL ORIGEN DEL VIAJE</p>
          <h2 id="history-title">
            RAÍCES CELTAS.
            <br />
            ALMA DE <em>METAL.</em>
          </h2>
          <p>
            La historia comienza en Madrid, en 1988, con Txus di Fellatio. Guitarras, violín y
            melodías de raíz celta acabarían dando forma a un sonido propio.
          </p>
          <p>
            Sus discos convierten la música en relatos: del mundo de Don Quijote a los viajes de{' '}
            <i>Finisterra</i> y la trilogía <i>Gaia</i>.
          </p>
          <ExternalLink className="text-link" href={links.biography}>
            Leer la biografía oficial <Icon name="external" size={18} />
          </ExternalLink>
        </div>
        <ol className="timeline" aria-label="Hitos de la historia de Mägo de Oz">
          {milestones.map((item) => (
            <li key={item.year}>
              <span className="timeline-year">{item.year}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Videos({ onPlay }) {
  const [selected, setSelected] = useState(videos[0])
  const relatedAlbum = albums.find((album) => album.id === selected.albumId)
  return (
    <section className="videos-section section-space" id="videos" aria-labelledby="videos-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="section-kicker">04 / MÁS ALLÁ DEL SONIDO</p>
            <h2 id="videos-title">
              SE ESCUCHA.
              <br />
              SE CANTA. <em>SE VIVE.</em>
            </h2>
          </div>
          <ExternalLink className="text-link" href={links.youtube}>
            Ir al canal oficial <Icon name="external" size={18} />
          </ExternalLink>
        </div>
        <div className="video-layout">
          <button
            className="video-feature"
            type="button"
            onClick={() => onPlay(selected)}
            aria-label={`Ver ${selected.title}, vídeo oficial`}
          >
            <img
              src={selected.id === videos[0].id ? heroImage : relatedAlbum.image}
              alt=""
              loading="lazy"
              width="1000"
              height="650"
            />
            <span className="video-overlay" />
            <span className="video-label">
              <span className="live-dot" /> VÍDEO OFICIAL
            </span>
            <span className="video-play">
              <Icon name="play" size={30} />
            </span>
            <span className="video-caption">
              <span>{selected.version}</span>
              <strong>{selected.title}</strong>
              <span>
                Ver en YouTube <Icon name="external" size={16} />
              </span>
            </span>
          </button>
          <div className="video-selector">
            <p className="video-selector-title">ELIGE TU PRÓXIMA CANCIÓN</p>
            <div role="group" aria-label="Seleccionar vídeo">
              {videos.map((video, index) => (
                <button
                  key={video.id}
                  type="button"
                  className={`video-choice ${selected.id === video.id ? 'is-selected' : ''}`}
                  aria-pressed={selected.id === video.id}
                  onClick={() => setSelected(video)}
                >
                  <span className="video-choice-number">0{index + 1}</span>
                  <span>
                    <strong>{video.title}</strong>
                    <small>{video.version}</small>
                  </span>
                  <Icon name="arrow" size={18} />
                </button>
              ))}
            </div>
            <p className="video-privacy">
              El reproductor de YouTube se carga solo cuando abres un vídeo. Necesita conexión a
              internet.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function VideoDialog({ video, onClose }) {
  const dialogRef = useRef(null)
  useEffect(() => {
    if (video && !dialogRef.current.open) dialogRef.current.showModal()
    if (!video && dialogRef.current.open) dialogRef.current.close()
  }, [video])
  return (
    <dialog
      ref={dialogRef}
      className="video-dialog"
      aria-labelledby="video-dialog-title"
      onClose={onClose}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {video && (
        <>
          <div className="dialog-heading">
            <div>
              <p className="section-kicker">MÄGO DE OZ / VÍDEO OFICIAL</p>
              <h2 id="video-dialog-title">{video.title}</h2>
            </div>
            <button
              className="dialog-close"
              type="button"
              aria-label="Cerrar vídeo"
              onClick={onClose}
              autoFocus
            >
              <Icon name="close" size={25} />
            </button>
          </div>
          <div className="video-embed">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
              title={`${video.title} — Mägo de Oz, ${video.version}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="dialog-footer">
            <p>¿No carga el reproductor?</p>
            <ExternalLink
              className="text-link"
              href={`https://www.youtube.com/watch?v=${video.id}`}
            >
              Ver en YouTube <Icon name="external" size={17} />
            </ExternalLink>
          </div>
        </>
      )}
    </dialog>
  )
}

function Footer() {
  return (
    <>
      <section className="closing-section" aria-labelledby="closing-title">
        <div className="container closing-inner">
          <div>
            <p className="section-kicker">EL VIAJE CONTINÚA</p>
            <h2 id="closing-title">
              NOS VEMOS <em>EN EL CAMINO.</em>
            </h2>
            <p>Encuentra las fechas y los detalles de sus conciertos en la web oficial.</p>
          </div>
          <ExternalLink className="oz-button button-primary" href={links.concerts}>
            Consultar conciertos <Icon name="external" size={18} />
          </ExternalLink>
        </div>
      </section>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <a className="brand" href="#inicio" aria-label="Volver al inicio">
              <Wordmark />
            </a>
            <p>Folk, metal y un camino por descubrir.</p>
            <div className="footer-socials">
              <ExternalLink href={links.spotify}>
                Spotify <Icon name="external" size={13} />
              </ExternalLink>
              <ExternalLink href={links.youtube}>
                YouTube <Icon name="external" size={13} />
              </ExternalLink>
              <ExternalLink href={links.instagram}>
                Instagram <Icon name="external" size={13} />
              </ExternalLink>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              Proyecto educativo sobre Mägo de Oz. Web no oficial.
              <br />
              La música, las portadas y las marcas pertenecen a sus respectivos titulares.
            </p>
            <a className="back-top" href="#inicio">
              Volver arriba <Icon name="down" size={15} />
            </a>
          </div>
          <details className="credits">
            <summary>Fuentes y créditos de las imágenes</summary>
            <p>
              Historia y fechas:{' '}
              <ExternalLink href={links.biography}>biografía oficial de Mägo de Oz</ExternalLink>.
              Vídeos:{' '}
              <ExternalLink href={links.officialVideos}>selección oficial de la banda</ExternalLink>
              .
            </p>
            <p>
              Fotografía del concierto de Torrent (2013): Premsa Ajuntament de Torrent, a través de{' '}
              <ExternalLink href="https://commons.wikimedia.org/wiki/File:M%C3%A4go_de_Oz_en_2013_(3)_(cropped).jpg">
                Wikimedia Commons
              </ExternalLink>
              . Licencia{' '}
              <ExternalLink href="https://creativecommons.org/licenses/by-sa/2.0/">
                CC BY-SA 2.0
              </ExternalLink>
              . La imagen se muestra recortada y con una capa oscura mediante CSS.
            </p>
            <p>
              Portadas:{' '}
              <ExternalLink href="https://magodeozoficial.com/la-facultad-de-literatura-la-unam-reconoce-a-mago-de-oz/">
                La leyenda de La Mancha
              </ExternalLink>{' '}
              y{' '}
              <ExternalLink href="https://magodeozoficial.com/20-anos-ya-de-la-salida-del-album-finisterra/">
                Finisterra
              </ExternalLink>
              , web oficial;{' '}
              <ExternalLink href="https://music.apple.com/es/album/gaia/369875050">
                Gaia
              </ExternalLink>{' '}
              y{' '}
              <ExternalLink href="https://music.apple.com/es/album/gaia-ii/101291334">
                Gaia II
              </ExternalLink>
              , catálogo de Apple Music. Se reproducen para identificar los discos en este proyecto
              educativo.
            </p>
          </details>
        </div>
      </footer>
    </>
  )
}

function App() {
  const [video, setVideo] = useState(null)
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" tabIndex="-1">
        <Hero />
        <Music />
        <Discography />
        <History />
        <Videos onPlay={setVideo} />
      </main>
      <Footer />
      <VideoDialog video={video} onClose={() => setVideo(null)} />
    </>
  )
}

export default App
