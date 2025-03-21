import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">אירועים</Link>
        <Link to="/events" className="navbar-link">אירועים</Link>
        <Link to="/profile" className="navbar-link">פרופיל</Link>
        <Link to="/notifications" className="navbar-link">התראות</Link>
      </div>
      <div className="navbar-right">
        <button onClick={handleLogout}>התנתק</button>
      </div>
    </nav>
  );
}

export default Navbar;
