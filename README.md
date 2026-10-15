# 🎬 Movie App

A responsive movie discovery app built with **React** and **Vite**, powered by the [TMDB API](https://www.themoviedb.org/documentation/api).
Browse popular movies, search the full TMDB catalog, open a detailed page for any film, and keep a list of favorites that stays saved between visits.

<!-- Add a screenshot of the app here, e.g.:
![Movie App screenshot](docs/screenshot.png)
-->

## Features

- **Popular movies:** the home page loads the current most popular movies from TMDB.
- **Search:** search the TMDB catalog by title. The query lives in the URL (`/?q=inception`), so results can be shared and the browser back button works.
- **Pagination:** a "Load more" button fetches the next page of results.
- **Movie details page** (`/movie/:id`): backdrop, poster, tagline, rating, runtime, genres, overview, director and top cast.
- **Favorites:** add or remove movies with one click from any card or details page. Favorites are kept in `localStorage`, so they survive a page reload. A badge in the navbar shows how many you've saved.
- **Loading, error and empty states** for every request.
- **404 page** for unknown routes.
- **Responsive design** that works from phones to wide screens, plus keyboard focus styles and ARIA labels.

## Tech stack

| Area | Tools |
| --- | --- |
| UI | React 19 (function components and hooks) |
| Routing | React Router 7 (`useParams`, `useSearchParams`, `NavLink`) |
| State | React Context API + `localStorage` |
| Build tool | Vite |
| Data | TMDB REST API via `fetch` |
| Styling | Plain CSS with custom properties (no UI library) |

## What I practiced

- Splitting a UI into reusable components (`MovieCard`, `MovieGrid`, `NavBar`)
- Sharing global state with a custom Context and hook (`useMovieContext`)
- Fetching async data in `useEffect` with cleanup to avoid race conditions
- Client-side routing with dynamic routes and URL search params
- Keeping secrets out of source control with environment variables

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20.19+ or 22.12+
- A free TMDB API key: create an account, then go to **Settings → API** on [themoviedb.org](https://www.themoviedb.org/settings/api)

### Installation

```bash
git clone https://github.com/Emmanuelkss/FirstReactProject.git
cd FirstReactProject/react-project
npm install
```

Create a `.env` file in `react-project/` (you can copy `.env.example`):

```bash
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

Start the dev server:

```bash
npm run dev
```

Then open the URL printed in your terminal (usually http://localhost:5173).

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the app for production into `dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

```
react-project/
├── public/
├── src/
│   ├── components/
│   │   ├── MovieCard.jsx     # Poster, rating, favorite toggle
│   │   ├── MovieGrid.jsx     # Responsive grid of cards
│   │   └── NavBar.jsx        # Navigation + favorites badge
│   ├── contexts/
│   │   └── MovieContext.jsx  # Favorites state, persisted to localStorage
│   ├── pages/
│   │   ├── Home.jsx          # Popular movies, search, pagination
│   │   ├── Favorite.jsx      # Saved movies
│   │   ├── MovieDetails.jsx  # Single movie page
│   │   └── NotFound.jsx      # 404
│   ├── services/
│   │   └── api.js            # TMDB API calls
│   ├── css/                  # One stylesheet per page/component
│   ├── App.jsx               # Routes
│   └── main.jsx              # Entry point
├── .env.example
├── vercel.json               # SPA rewrites for deployment
└── package.json
```

## Deployment

The app is a static site, so it can be deployed for free on **Vercel** or **Netlify**:

1. Import the repository and set the **root directory** to `react-project`.
2. Add the environment variable `VITE_TMDB_API_KEY` in the project settings.
3. Deploy. `vercel.json` rewrites every route to `index.html`, so links like `/movie/550` work on refresh.

> **Note:** Vite inlines `VITE_` variables into the client bundle, so the key is visible in the browser. That's acceptable for a free, read-only TMDB key in a demo project; a production app would proxy requests through a small backend.

## Possible improvements

- Filter by genre and sort by rating or release date
- Infinite scroll instead of a "Load more" button
- Trailers (TMDB `videos` endpoint)
- Unit tests with Vitest and React Testing Library
- Migrate to TypeScript

## Acknowledgements

Movie data and images are provided by [TMDB](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB.

## Author

**Emmanuel Kouassi** · [GitHub](https://github.com/Emmanuelkss)
