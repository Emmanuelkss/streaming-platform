import MovieCard from "./MovieCard";

function MovieGrid({ movies }) {
  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
}

export default MovieGrid;
