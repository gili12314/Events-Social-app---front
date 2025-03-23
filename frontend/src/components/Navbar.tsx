// src/components/Navbar.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">אירועים</Link>
        {isLoggedIn && (
          <>
            <Link to="/profile" className="navbar-link">פרופיל</Link>
            <Link to="/notifications" className="navbar-link">התראות</Link>
          </>
        )}
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <button onClick={handleLogout}>התנתק</button>
        ) : (
          <>
            <Link to="/login" className="navbar-link">התחבר</Link>
            <Link to="/register" className="navbar-link">הרשם</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
