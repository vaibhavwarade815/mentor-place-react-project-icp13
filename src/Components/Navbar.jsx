import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">PlaceMentor AI</h2>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/upload">Resume Upload</Link>
      </div>
    </nav>
  );
};

export default Navbar;