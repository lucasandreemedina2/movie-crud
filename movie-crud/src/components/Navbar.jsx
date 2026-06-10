function Navbar({ search, setSearch }) {
  return (
    <nav className="navbar">
      <h2>🎬 Movie CRUD</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar película..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button>Buscar</button>
      </div>
    </nav>
  );
}

export default Navbar;