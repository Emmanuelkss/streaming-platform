import MovieCard from "../components/MovieCard";
import { useState, useEffect, use} from "react";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";
function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const[error, setError] = useState(null);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      }
      catch (error) {
        console.log(error);
        setError("Failed to load popular movies. Please try again later.");
      }
      finally {
        setLoading(false);
      }
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for ${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading? (<div className="loading">Loading...</div> 
      ): (
      <div className="movies-grid">
        {movies.map(
          (movie) =>
            movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
              <MovieCard movie={movie} key={movie.id} />
            )
        )}
      </div>
          )}
    </div>
  );
}

export default Home;