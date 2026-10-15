import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>This page doesn't exist — maybe it got cut in the final edit.</p>
      <Link to="/" className="search-button">
        Back to home
      </Link>
    </div>
  );
}

export default NotFound;
