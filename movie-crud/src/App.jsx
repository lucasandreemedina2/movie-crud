import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
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
        if (!response.ok) {
          throw new Error("Error al cargar películas");
        }
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
      .then((data) => {
        setMovies(data.results || []);
      });
  };
const deleteMovie = (id) => {
setMovies(movies.filter((movie) => movie.id !== id));
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
      .then((data) => {
        setMovies(data.results || []);
      });
  };

  return (
    <div>
      <Navbar
        search={search}
        setSearch={setSearch}
        onSearch={searchMovies}
      />
 {selectedMovie && (
  <div className="movie-details">
    <img
      src={
        "https://image.tmdb.org/t/p/w500" +
        selectedMovie.poster_path
      }
      alt={selectedMovie.title}
    />

    <div className="movie-info">
      <h2>{selectedMovie.title}</h2>

      <p>
        ⭐ {selectedMovie.vote_average.toFixed(1)}
      </p>

      <p>
        📅 {selectedMovie.release_date}
      </p>

      <p>
        {selectedMovie.overview ||
          "No hay descripción disponible"}
      </p>

      <button>🎬 Ver Trailer</button>
      <button>❤️ Favorito</button>
      <button onClick={() => setSelectedMovie(null)}>
        🔙 Volver
      </button>
    </div>
  </div>
)}
      <div className="container">
        {loading && <p>Cargando películas...</p>}
        {error && <p>{error}</p>}

        {!loading &&
          !error &&
          movies.map((movie) => {
            const imagen =
              "https://image.tmdb.org/t/p/w500" + movie.poster_path;

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
/>
            );
          })}
      </div>
    </div>
  );
}

export default App;