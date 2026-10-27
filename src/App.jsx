function App() {
  return (
    <div className="container grid-demo">
      <h1>Desplazamiento de columnas (offset)</h1>
      <p>
        Las clases offset dejan columnas vacías a la izquierda de una celda.
        Cambia el ancho de la ventana para ver el efecto.
      </p>
      <div className="row">
        <div className="col-md-4">.col-md-4</div>
        <div className="col-md-4 offset-md-4">
          .col-md-4 .offset-md-4
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 offset-md-3">
          .col-md-3 .offset-md-3
        </div>
        <div className="col-md-3 offset-md-3">
          .col-md-3 .offset-md-3
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          .col-md-6 .offset-md-3
        </div>
      </div>
    </div>
  )
}

export default App