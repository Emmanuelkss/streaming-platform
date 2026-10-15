const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

async function request(path, params = {}) {
  if (!API_KEY) {
    throw new Error(
      "Missing TMDB API key. Add VITE_TMDB_API_KEY to your .env file."
    );
  }

  const url = new URL(`${BASE_URL}${path}`);
  url.search = new URLSearchParams({ api_key: API_KEY, ...params }).toString();

  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error(`TMDB request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

function toPage(data) {
  return {
    results: data.results ?? [],
    page: data.page ?? 1,
    totalPages: data.total_pages ?? 1,
  };
}

export const getPopularMovies = async (page = 1) =>
  toPage(await request("/movie/popular", { page }));

export const searchMovies = async (query, page = 1) =>
  toPage(await request("/search/movie", { query, page }));

export const getMovieDetails = async (id) =>
  request(`/movie/${id}`, { append_to_response: "credits" });

export const posterUrl = (path, size = "w500") =>
  path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
