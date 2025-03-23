import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function HomePage() {
  const { token } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (token) {
      nav("/events");
    }
  }, [token]);

  return (
    <div className="container" style={{ textAlign: "center", paddingTop: "60px" }}>
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "20px" }}>
        Welcome to the Events App!
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "40px", color: "#555" }}>
        Here you can create, manage, and share social events easily and conveniently.
      </p>
      <div>
        <Link to="/login" style={{ marginRight: "10px", padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", borderRadius: "4px" }}>
          Login
        </Link>
        <Link to="/register" style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "#fff", borderRadius: "4px" }}>
          Register
        </Link>
      </div>
    </div>
  );
}

export default HomePage;