// src/pages/LoginPage.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });
      // שמירת הטוקן
      localStorage.setItem("token", response.data.token);
      // שמירת מזהה המשתמש
      localStorage.setItem("userId", response.data.user._id);
      navigate("/events");
    } catch (error) {
      console.error("Login failed:", error);
      alert("התחברות נכשלה. בדוק את הפרטים והנסה שוב.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "80px" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>התחברות</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: "12px" }}
        />
        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: "12px" }}
        />
        <button type="submit" className="btn" style={{ width: "100%" }}>
          התחבר
        </button>
      </form>
      <p style={{ marginTop: "16px", textAlign: "center" }}>
        אין לך חשבון? <Link to="/register" style={{ color: "#007bff", textDecoration: "underline" }}>הרשם כאן</Link>
      </p>
    </div>
  );
}

export default LoginPage;
