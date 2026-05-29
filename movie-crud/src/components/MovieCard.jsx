function MovieCard() {
  return (
    <div className="movie-card">

      <img
        src="https://via.placeholder.com/300x400"
        alt=""
      />

      <h3>Batman</h3>

      <p>Acción</p>

      <div className="buttons">
        <button>Editar</button>
        <button>Eliminar</button>
      </div>

    </div>
  )
}

export default MovieCard;