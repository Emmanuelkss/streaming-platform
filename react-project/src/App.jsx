import './style.css';
import MovieCard from './components/MovieCard';
function App() {
  return (
    <>
      <MovieCard movie={{ title: "Ensenshi", release_date: "2023-01-01" }} />
      <MovieCard movie={{ title: "Ensenshi", release_date: "2023-01-01" }} />
    </>
  );
}

export default App;
