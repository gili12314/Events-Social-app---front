import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {register} = useAuth()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      alert("Registration successful!");
      navigate("/events");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed, please try again.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "80px" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>הרשמה</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ marginBottom: "12px" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: "12px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: "12px" }}
        />
        <button type="submit" className="btn" style={{ width: "100%", backgroundColor: "#28a745" }}>
        Register
        </button>
      </form>
      <p style={{ marginTop: "16px", textAlign: "center" }}>
        Already have an account? <Link to="/login" style={{ color: "#007bff", textDecoration: "underline" }}>Login here</Link>
      </p>
    </div>
  );
}

export default RegisterPage;