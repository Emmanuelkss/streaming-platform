import MovieCard from "../components/MovieCard";
import { useState } from "react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const movies = [
    { id: 1, title: "The Shawshank Redemption", year: 1994 },
    { id: 2, title: "The Godfather", year: 1972 },
    { id: 3, title: "The Dark Knight", year: 2008 },
    { id: 4, title: "Pulp Fiction", year: 1994 },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for ${searchQuery}`);
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

      <div className="movies-grid">
        {movies.map(
          (movie) =>
            movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
              <MovieCard movie={movie} key={movie.id} />
            )
        )}
      </div>
    </div>
  );
}

export default Home;