import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallbackPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userId = params.get("userId");
    const refreshToken = params.get("refreshToken");

    console.log("GoogleCallbackPage received params:", { token, userId, refreshToken });

    if (token && userId && refreshToken) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("refreshToken", refreshToken);
      console.log("After setting, token in LS:", localStorage.getItem("token"));
      console.log("After setting, userId in LS:", localStorage.getItem("userId"));
      console.log("After setting, refreshToken in LS:", localStorage.getItem("refreshToken"));
      navigate("/events");
    } else {
      console.warn("Missing token, refreshToken or userId in query parameters");
      navigate("/login");
    }
  }, [navigate]);

  return <div>טוען...</div>;
};

export default GoogleCallbackPage;
