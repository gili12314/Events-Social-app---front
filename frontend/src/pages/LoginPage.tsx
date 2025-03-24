import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = token || localStorage.getItem("token");
    if (storedToken) {
      navigate("/events");
    }
  }, [token, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });
      console.log("Login response:", response.data);
      if (response.data.token && response.data._id) {
        setAuthData(response.data.token, response.data._id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data._id);
      } else {
        console.warn("User information not found in login response");
      }
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
        אין לך חשבון?{" "}
        <Link to="/register" style={{ color: "#007bff", textDecoration: "underline" }}>
          הרשם כאן
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
