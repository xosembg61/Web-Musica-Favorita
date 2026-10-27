function App() {
  return (
    <>
      <header className="site-header">
        <nav className="navbar navbar-dark oz-navbar">
          <div className="container">
            <a className="navbar-brand" href="#inicio" aria-label="Mägo de Oz, inicio">
              <span className="brand-sigil" aria-hidden="true">M</span>
              <span>MÄGO DE OZ</span>
            </a>
            <a
              className="official-link"
              href="https://magodeozoficial.com/"
              target="_blank"
              rel="noreferrer"
            >
              SITIO OFICIAL <span aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="oz-hero" id="inicio" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Mago_de_Oz.jpg"
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
              href="https://commons.wikimedia.org/wiki/File:Mago_de_Oz.jpg"
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