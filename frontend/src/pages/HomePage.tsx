// src/pages/HomePage.tsx
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // אם קיים טוקן, ננתב את המשתמש לדף האירועים
      navigate("/events");
    }
  }, [navigate]);

  return (
    <div className="container" style={{ textAlign: "center", paddingTop: "60px" }}>
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "20px" }}>
        ברוכים הבאים לאפליקציית האירועים
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "40px", color: "#555" }}>
        כאן תוכל ליצור, לנהל ולשתף אירועים חברתיים בצורה קלה ונוחה.
      </p>
      <div>
        <Link
          to="/login"
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "4px",
          }}
        >
          התחבר
        </Link>
        <Link
          to="/register"
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            borderRadius: "4px",
          }}
        >
          הרשמה
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
