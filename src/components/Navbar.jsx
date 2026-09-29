import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import finderMark from "../assets/finder-mark.svg";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();
    const clean = query.trim();
    if (!clean) return;
    navigate(`/search?q=${encodeURIComponent(clean)}`);
    setQuery("");
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="GitHub Finder home">
          <img src={finderMark} alt="" width="38" height="38" />
          <span className="brand-copy"><strong>GitHub</strong><span>finder</span></span>
        </Link>
        <nav className="primary-nav" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link is-active" : "nav-link"}>Discover</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link is-active" : "nav-link"}>About</NavLink>
        </nav>
        <div className="header-tools">
          <form className="header-search" onSubmit={handleSearch} role="search">
            <label className="sr-only" htmlFor="header-query">Search GitHub</label>
            <Search size={15} aria-hidden="true" />
            <input
              id="header-query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a profile"
              autoComplete="off"
            />
            <button type="submit" aria-label="Search GitHub profiles" disabled={!query.trim()}><ArrowRight size={15} /></button>
          </form>
          <span className="header-status"><i aria-hidden="true" /> Public data</span>
        </div>
      </div>
    </header>
  );
}
