function App() {
  return (
    <>
      <header className="site-header">
        <div className="oz-topline">
          <div className="container oz-topline-inner">
            <span>FOLK METAL · MADRID</span>
            <div className="oz-socials" aria-label="Redes oficiales">
              <a href="https://open.spotify.com/artist/5ZNxiPcbKgaNcBrERMpqeu" target="_blank" rel="noreferrer">SPOTIFY</a>
              <a href="https://www.youtube.com/channel/UC6nMOIbArzvza6npl0irIWw" target="_blank" rel="noreferrer">YOUTUBE</a>
              <a href="https://www.instagram.com/magodeozoficial/" target="_blank" rel="noreferrer">INSTAGRAM</a>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg navbar-dark oz-navbar">
          <div className="container">
            <a className="navbar-brand" href="#inicio" aria-label="Mägo de Oz, inicio">
              <span className="wordmark">
                <span>MÄGO DE OZ</span>
                <small>DESDE 1988</small>
              </span>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#oz-navigation"
              aria-controls="oz-navigation"
              aria-expanded="false"
              aria-label="Abrir navegación"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="oz-navigation">
              <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-4">
                <li className="nav-item">
                  <a className="nav-link" href="https://open.spotify.com/artist/5ZNxiPcbKgaNcBrERMpqeu" target="_blank" rel="noreferrer">MÚSICA</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://magodeozoficial.com/conciertos/" target="_blank" rel="noreferrer">CONCIERTOS</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://merchandtour.com/collections/mago-de-oz" target="_blank" rel="noreferrer">TIENDA</a>
                </li>
                <li className="nav-item">
                  <a className="header-cta" href="https://magodeozoficial.com/" target="_blank" rel="noreferrer">
                    WEB OFICIAL <span aria-hidden="true">↗</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="oz-hero" id="inicio" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src="https://upload.wikimedia.org/wikipedia/commons/4/4d/M%C3%A4go_de_Oz_en_2013_%283%29_%28cropped%29.jpg"
            alt="Mägo de Oz actuando en directo en Torrent, España"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="container hero-content">
            <p className="eyebrow">FOLK METAL · MADRID · DESDE 1988</p>
            <h1 id="hero-title">MÄGO<br /><span>DE OZ</span></h1>
            <p className="hero-copy">
              Guitarras, violines y folk metal en una travesía nacida en Madrid.
            </p>
            <div className="hero-actions">
              <a
                className="btn btn-listen"
                href="https://open.spotify.com/search/M%C3%A4go%20de%20Oz"
                target="_blank"
                rel="noreferrer"
              >
                Escuchar música <span aria-hidden="true">↗</span>
              </a>
              <a
                className="btn btn-official"
                href="https://magodeozoficial.com/"
                target="_blank"
                rel="noreferrer"
              >
                Web oficial
              </a>
            </div>
          </div>
          <p className="photo-credit">
            Foto: Premsa Ajuntament de Torrent ·{' '}
            <a
              href="https://commons.wikimedia.org/wiki/File:M%C3%A4go_de_Oz_en_2013_(3)_(cropped).jpg"
              target="_blank"
              rel="noreferrer"
            >
              CC BY-SA 2.0
            </a>
          </p>
        </section>
      </main>
    </>
  )
}

export default App