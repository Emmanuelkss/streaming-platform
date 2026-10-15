import { Link, NavLink } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/Navbar.css";

function NavBar() {
  const { favorites } = useMovieContext();
  const linkClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">🎬 Movie App</Link>
      </div>
      <div className="navbar-links">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/favorites" className={linkClass}>
          Favorites
          {favorites.length > 0 && (
            <span className="nav-badge">{favorites.length}</span>
          )}
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
