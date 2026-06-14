import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newScore, setNewScore] = useState("");
  const [newImage, setNewImage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    if (search.trim() === "") {
      loadPopularMovies();
    }
  }, [search]);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const url =
      "https://api.themoviedb.org/3/movie/popular?api_key=" +
      apiKey +
      "&language=es-ES&page=1";

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar películas");
        return response.json();
      })
      .then((data) => {
        setMovies(data.results || []);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudieron cargar las películas");
        setLoading(false);
      });
  }, []);

  const loadPopularMovies = () => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const url =
      "https://api.themoviedb.org/3/movie/popular?api_key=" +
      apiKey +
      "&language=es-ES&page=1";

    fetch(url)
      .then((response) => response.json())
      .then((data) => setMovies(data.results || []));
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const editMovie = (id, nuevoTitulo) => {
    setMovies(
      movies.map((m) => (m.id === id ? { ...m, title: nuevoTitulo } : m))
    );
  };

  const addFavorite = () => {
    if (!selectedMovie) return;

    const existe = favorites.find(
      (movie) => movie.id === selectedMovie.id
    );

    if (!existe) {
      setFavorites([...favorites, selectedMovie]);
    }
  };

  const addMovie = () => {
    if (!newTitle.trim()) return;

    const newMovie = {
      id: Date.now(),
      title: newTitle,
      vote_average: Number(newScore) || 0,
      poster_path: newImage,
      overview: "Película creada por el usuario.",
      release_date: "2026",
    };

    setMovies([newMovie, ...movies]);
    setNewTitle("");
    setNewScore("");
  };

  const searchMovies = () => {
    if (search.trim() === "") {
      loadPopularMovies();
      return;
    }
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const url =
      "https://api.themoviedb.org/3/search/movie?api_key=" +
      apiKey +
      "&query=" +
      encodeURIComponent(search) +
      "&language=es-ES";

    fetch(url)
      .then((response) => response.json())
      .then((data) => setMovies(data.results || []));
  };

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} onSearch={searchMovies} />

      <button onClick={() => setShowForm(!showForm)}>➕ Nueva película</button>
      <button onClick={() => setShowFavorites(!showFavorites)}>
        ❤️ Ver Favoritos
      </button>

      {showForm && (
        <div className="add-movie">
          <input
            type="text"
            placeholder="Título"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Puntuación"
            value={newScore}
            onChange={(e) => setNewScore(e.target.value)}
          />
          <input
            type="text"
            placeholder="URL de imagen"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
          />
          <button onClick={addMovie}>➕ Agregar película</button>
        </div>
      )}

      {selectedMovie && (
        <div className="movie-details">
          <img
            src={"https://image.tmdb.org/t/p/w500" + selectedMovie.poster_path}
            alt={selectedMovie.title}
          />
          <div className="movie-info">
            <h2>{selectedMovie.title}</h2>
            <p>⭐ {selectedMovie.vote_average.toFixed(1)}</p>
            <p>📅 {selectedMovie.release_date}</p>
            <p>{selectedMovie.overview || "No hay descripción disponible"}</p>
            <button
              onClick={() =>
                window.open(
                  "https://www.youtube.com/results?search_query=" +
                    selectedMovie.title +
                    "+trailer",
                  "_blank"
                )
              }
            >
              🎬 Ver Trailer
            </button>
            <button onClick={addFavorite}>
              ❤️ Favorito
            </button>
            <button onClick={() => setSelectedMovie(null)}>🔙 Volver</button>
          </div>
        </div>
      )}

      {showFavorites && (
        <>
          <h2>❤️ Favoritos ({favorites.length})</h2>

          <div className="container">
            {favorites.map((movie) => {
              const imagen = movie.poster_path?.startsWith("http")
                ? movie.poster_path
                : movie.poster_path
                ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
                : "https://dummyimage.com/500x750/222/ffffff&text=Sin+Imagen";

              return (
                <MovieCard
                  key={movie.id}
                  titulo={movie.title}
                  puntuacion={movie.vote_average.toFixed(1)}
                  imagen={imagen}
                />
              );
            })}
          </div>
        </>
      )}

      <div className="container">
        {loading && <p>Cargando películas...</p>}
        {error && <p>{error}</p>}

        {!loading &&
          !error &&
          movies.map((movie) => {
            const imagen = movie.poster_path?.startsWith("http")
              ? movie.poster_path
              : movie.poster_path
              ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
              : "https://dummyimage.com/500x750/222/ffffff&text=Sin+Imagen";

            return (
              <MovieCard
                key={movie.id}
                titulo={movie.title}
                puntuacion={movie.vote_average.toFixed(1)}
                imagen={imagen}
                onClick={() => {
                  setSelectedMovie(movie);
                  window.scrollTo(0, 0);
                }}
                onDelete={() => deleteMovie(movie.id)}
                onEdit={(nuevoTitulo) => editMovie(movie.id, nuevoTitulo)}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;