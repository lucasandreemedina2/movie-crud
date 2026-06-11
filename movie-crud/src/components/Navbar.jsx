function Navbar({ search, setSearch, onSearch }) {
  return (
    <nav className="navbar">
      <h2>🎬 Movie CRUD</h2>

      <div className="search-box">
        <input
  type="text"
  placeholder="Buscar película..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  }}
/>
        <button onClick={onSearch}>Buscar</button>
      </div>
    </nav>
  );
}

export default Navbar;