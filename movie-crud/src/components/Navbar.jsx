function Navbar() {
  return (
    <nav className="navbar">
      <h2>🎬 Movie CRUD</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar película..."
        />
        <button>Buscar</button>
      </div>
    </nav>
  )
}

export default Navbar;