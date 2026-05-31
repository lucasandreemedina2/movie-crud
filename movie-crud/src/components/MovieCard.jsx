function MovieCard({ titulo, imagen, puntuacion }) {
  return (
    <div className="movie-card">

      <img
        src={imagen}
        alt={titulo}
      />

      <h3>{titulo}</h3>

      <p>⭐ {puntuacion}</p>

      <div className="buttons">
        <button>Editar</button>
        <button>Eliminar</button>
      </div>

    </div>
  )
}

export default MovieCard;