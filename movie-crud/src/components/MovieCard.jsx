import { useState } from "react";

function MovieCard({ titulo, imagen, puntuacion, onClick, onDelete, onEdit }) {
  const [editando, setEditando] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState(titulo);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onEdit(nuevoTitulo);
      setEditando(false);
    }
    if (e.key === "Escape") {
      setNuevoTitulo(titulo);
      setEditando(false);
    }
  };

  return (
    <div className="movie-card" onClick={onClick}>
      <img src={imagen} alt={titulo} />

      {editando ? (
        <input
          autoFocus
          value={nuevoTitulo}
          onChange={(e) => setNuevoTitulo(e.target.value)}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <h3>{titulo}</h3>
      )}

      <p>⭐ {puntuacion}</p>

      <div className="buttons">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditando(true);
          }}
        >
          Editar
        </button>
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