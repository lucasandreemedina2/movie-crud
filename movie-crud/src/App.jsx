import Navbar from "./components/Navbar"
import MovieCard from "./components/MovieCard"

function App() {
  return (
    <div>

      <Navbar />

      <div className="container">

        <MovieCard
          titulo="Oppenheimer"
          puntuacion="8.5"
          imagen="https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg"
        />

        <MovieCard
          titulo="Interstellar"
          puntuacion="8.8"
          imagen="https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
        />

        <MovieCard
          titulo="Joker"
          puntuacion="8.4"
          imagen="https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
        />

      </div>

    </div>
  )
}

export default App