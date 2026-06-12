function MovieCard({
  titulo,
  imagen,
  puntuacion,
  onClick,
  onDelete,
}) {
  return (
    <div className="movie-card" onClick={onClick}>
      <img
        src={imagen}
        alt={titulo}
      />

      <h3>{titulo}</h3>

      <p>⭐ {puntuacion}</p>

      <div className="buttons">
        <button>Editar</button>
        <button
  onClick={(e) => {
    e.stopPropagation();
    onDelete();
  }}
>
  Eliminar
</button>
      </div>
    </div>
  );
}

export default MovieCard;