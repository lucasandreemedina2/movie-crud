import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;