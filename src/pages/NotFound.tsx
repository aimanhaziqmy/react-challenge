import "./notfound.css";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="app">
      <main className="main-content">
        <div className="container">
          <h2>Page Not Found</h2>
          <div className="content">
            <Link to="/">Back to Home</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;
