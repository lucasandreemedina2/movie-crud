import Navbar from "./components/Navbar"
import MovieCard from "./components/MovieCard"

function App() {
  return (
    <div>

      <Navbar />

      <div className="container">
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>

    </div>
  )
}

export default App;