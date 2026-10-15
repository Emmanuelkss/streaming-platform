import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import { getMovieDetails, posterUrl } from "../services/api";
import "../css/MovieDetails.css";

function formatRuntime(minutes) {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useMovieContext();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    getMovieDetails(id)
      .then((data) => {
        if (!ignore) setMovie(data);
      })
      .catch((err) => {
        if (ignore) return;
        console.error(err);
        setError(
          err.status === 404
            ? "This movie doesn't exist."
            : "Failed to load movie details. Please try again."
        );
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" aria-hidden="true" />
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-error">
        <p className="error-message">{error}</p>
        <Link to="/" className="search-button">
          Back to home
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(movie.id);
  const poster = posterUrl(movie.poster_path);
  const backdrop = posterUrl(movie.backdrop_path, "original");
  const year = movie.release_date?.slice(0, 4);
  const runtime = formatRuntime(movie.runtime);
  const cast = movie.credits?.cast?.slice(0, 8) ?? [];
  const director = movie.credits?.crew?.find((p) => p.job === "Director");

  return (
    <div className="details">
      {backdrop && (
        <div
          className="details-backdrop"
          style={{ backgroundImage: `url(${backdrop})` }}
          aria-hidden="true"
        />
      )}

      <button type="button" className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="details-content">
        <div className="details-poster">
          {poster ? (
            <img src={poster} alt={movie.title} />
          ) : (
            <div className="poster-placeholder">{movie.title}</div>
          )}
        </div>

        <div className="details-info">
          <h1>
            {movie.title} {year && <span className="details-year">({year})</span>}
          </h1>
          {movie.tagline && <p className="details-tagline">{movie.tagline}</p>}

          <div className="details-meta">
            {movie.vote_average > 0 && (
              <span className="rating-pill">★ {movie.vote_average.toFixed(1)}</span>
            )}
            {runtime && <span>{runtime}</span>}
            {movie.release_date && <span>{movie.release_date}</span>}
          </div>

          {movie.genres?.length > 0 && (
            <ul className="genres">
              {movie.genres.map((g) => (
                <li key={g.id}>{g.name}</li>
              ))}
            </ul>
          )}

          <h3>Overview</h3>
          <p className="details-overview">
            {movie.overview || "No overview available."}
          </p>

          {director && (
            <p className="details-director">
              <strong>Director:</strong> {director.name}
            </p>
          )}

          <button
            type="button"
            className={`details-favorite ${favorite ? "active" : ""}`}
            onClick={() => toggleFavorite(movie)}
            aria-pressed={favorite}
          >
            {favorite ? "♥ In your favorites" : "♡ Add to favorites"}
          </button>

          {cast.length > 0 && (
            <>
              <h3>Top cast</h3>
              <ul className="cast-list">
                {cast.map((person) => (
                  <li key={person.credit_id}>
                    {person.profile_path ? (
                      <img
                        src={posterUrl(person.profile_path, "w185")}
                        alt={person.name}
                        loading="lazy"
                      />
                    ) : (
                      <div className="cast-placeholder" aria-hidden="true">
                        {person.name.charAt(0)}
                      </div>
                    )}
                    <span className="cast-name">{person.name}</span>
                    <span className="cast-character">{person.character}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
