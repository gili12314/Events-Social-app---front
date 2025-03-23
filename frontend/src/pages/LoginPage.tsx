// src/pages/LoginPage.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {login} = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/events");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Login failed:", error.response?.data || error.message);
        alert("התחברות נכשלה. בדוק את הפרטים והנסה שוב.");
      } else {
        console.error("Unexpected error:", error);
        alert("התחברות נכשלה, שגיאה בלתי צפויה.");
      }
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
        <button type="submit" className="btn" style={{ width: "100%", padding: "10px" }}>
          התחבר
        </button>
      </form>
      <div style={{ textAlign: "center", margin: "20px 0" }}>או</div>
      <div style={{ textAlign: "center" }}>
        <GoogleLoginButton />
      </div>
      <p style={{ marginTop: "16px", textAlign: "center" }}>
        אין לך חשבון? <Link to="/register" style={{ color: "#007bff", textDecoration: "underline" }}>הרשם כאן</Link>
      </p>
    </div>
  );
}

export default LoginPage;