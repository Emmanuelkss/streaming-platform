import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";
import { getPopularMovies, searchMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  // The active search lives in the URL (?q=...) so results can be shared
  // and the browser back button works as expected.
  const [searchParams, setSearchParams] = useSearchParams();
  const activeQuery = searchParams.get("q")?.trim() ?? "";

  const [searchInput, setSearchInput] = useState(activeQuery);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const fetchPage = (pageNumber) =>
    activeQuery
      ? searchMovies(activeQuery, pageNumber)
      : getPopularMovies(pageNumber);

  // Load the first page whenever the search changes
  useEffect(() => {
    let ignore = false;
    setSearchInput(activeQuery);
    setLoading(true);
    setError(null);

    fetchPage(1)
      .then((data) => {
        if (ignore) return;
        setMovies(data.results);
        setPage(data.page);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        if (ignore) return;
        console.error(err);
        setError(
          activeQuery
            ? "Failed to search movies. Please try again."
            : "Failed to load popular movies. Please try again later."
        );
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchInput.trim();
    setSearchParams(query ? { q: query } : {});
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchParams({});
  };

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const data = await fetchPage(page + 1);
      // Avoid duplicate keys if TMDB shifts results between pages
      setMovies((prev) => {
        const seen = new Set(prev.map((m) => m.id));
        return [...prev, ...data.results.filter((m) => !seen.has(m.id))];
      });
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
      setError("Failed to load more movies.");
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form" role="search">
        <input
          type="search"
          placeholder="Search for movies..."
          className="search-input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          aria-label="Search for movies"
        />
        <button type="submit" className="search-button" disabled={loading}>
          Search
        </button>
      </form>

      <div className="home-header">
        <h2>{activeQuery ? `Results for “${activeQuery}”` : "Popular movies"}</h2>
        {activeQuery && (
          <button type="button" className="clear-button" onClick={clearSearch}>
            ✕ Clear search
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">
          <div className="spinner" aria-hidden="true" />
          Loading...
        </div>
      ) : movies.length === 0 && !error ? (
        <div className="empty-state">
          No movies found for “{activeQuery}”. Try another title.
        </div>
      ) : (
        <>
          <MovieGrid movies={movies} />
          {page < totalPages && (
            <div className="load-more">
              <button
                type="button"
                className="search-button"
                onClick={loadMore}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
