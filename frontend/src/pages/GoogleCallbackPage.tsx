// src/pages/GoogleCallbackPage.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallbackPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // קריאת הפרמטרים מה-URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userId = params.get("userId");

    console.log("GoogleCallbackPage received params:", { token, userId });

    if (token && userId) {
      // שמירת הטוקן ומזהה המשתמש ב-localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      console.log("After setting, token in LS:", localStorage.getItem("token"));
      console.log("After setting, userId in LS:", localStorage.getItem("userId"));
      // העברת המשתמש לעמוד הראשי (למשל, /events)
      navigate("/events");
    } else {
      console.warn("Missing token or userId in query parameters");
      navigate("/login");
    }
  }, [navigate]);

  return <div>טוען...</div>;
};

export default GoogleCallbackPage;
