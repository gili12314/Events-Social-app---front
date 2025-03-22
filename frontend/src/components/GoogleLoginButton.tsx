// src/components/GoogleLoginButton.tsx
import React from "react";

const GoogleLoginButton: React.FC = () => {
  const handleGoogleLogin = () => {
    // הפנייה לנתיב Google OAuth של ה־Backend.
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#4285F4",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      התחבר עם Google
    </button>
  );
};

export default GoogleLoginButton;
