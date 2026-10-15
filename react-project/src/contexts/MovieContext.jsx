import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "movie-app:favorites";

const MovieContext = createContext(null);

function loadFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function MovieProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites);

  // Persist favorites so they survive a page reload
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Storage can be unavailable (private mode, quota) — favorites stay in memory
    }
  }, [favorites]);

  const isFavorite = (movieId) => favorites.some((m) => m.id === movieId);

  const addToFavorites = (movie) => {
    // Only keep the fields the UI needs
    const { id, title, poster_path, release_date, vote_average } = movie;
    setFavorites((prev) =>
      prev.some((m) => m.id === id)
        ? prev
        : [...prev, { id, title, poster_path, release_date, vote_average }]
    );
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));
  };

  const toggleFavorite = (movie) => {
    if (isFavorite(movie.id)) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  };

  const clearFavorites = () => setFavorites([]);

  const value = {
    favorites,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearFavorites,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}

export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used inside a <MovieProvider>");
  }
  return context;
}
