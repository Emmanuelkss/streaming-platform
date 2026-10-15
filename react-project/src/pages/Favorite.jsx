import { Link } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/Favorites.css";

function Favorite() {
  const { favorites, clearFavorites } = useMovieContext();

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No favorite movies yet</h2>
        <p>
          Tap the ♡ on any movie to save it here. Your favorites are stored in
          your browser, so they'll still be here next time.
        </p>
        <Link to="/" className="search-button favorites-cta">
          Browse movies
        </Link>
      </div>
    );
  }

  return (
    <div className="favorites">
      <div className="favorites-header">
        <h2>
          Your favorites <span className="favorites-count">({favorites.length})</span>
        </h2>
        <button type="button" className="clear-button" onClick={clearFavorites}>
          Clear all
        </button>
      </div>
      <MovieGrid movies={favorites} />
    </div>
  );
}

export default Favorite;
