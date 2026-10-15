import { Link } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import { posterUrl } from "../services/api";
import "../css/MovieCard.css";

function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const poster = posterUrl(movie.poster_path);
  const year = movie.release_date?.slice(0, 4);
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;

  return (
    <article className="movie-card">
      <div className="movie-poster">
        <Link to={`/movie/${movie.id}`} aria-label={`View details for ${movie.title}`}>
          {poster ? (
            <img src={poster} alt={movie.title} loading="lazy" />
          ) : (
            <div className="poster-placeholder">{movie.title}</div>
          )}
          <div className="movie-overlay">
            <span className="view-details">View details</span>
          </div>
        </Link>

        {rating && <span className="rating-badge">★ {rating}</span>}

        <button
          type="button"
          className={`favorite-btn ${favorite ? "active" : ""}`}
          onClick={() => toggleFavorite(movie)}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={favorite}
        >
          {favorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="movie-info">
        <h3>
          <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        </h3>
        <p>{year || "Release date unknown"}</p>
      </div>
    </article>
  );
}

export default MovieCard;
