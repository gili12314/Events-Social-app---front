import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/register", { username, email, password });
      alert("הרשמה הצליחה! כעת תוכל להתחבר.");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("הרשמה נכשלה, נסה שוב.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "80px" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>הרשמה</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="שם משתמש"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ marginBottom: "12px" }}
        />
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
        <button type="submit" className="btn" style={{ width: "100%", backgroundColor: "#28a745" }}>
          הרשמה
        </button>
      </form>
      <p style={{ marginTop: "16px", textAlign: "center" }}>
        כבר יש לך חשבון? <Link to="/login" style={{ color: "#007bff", textDecoration: "underline" }}>התחבר כאן</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
