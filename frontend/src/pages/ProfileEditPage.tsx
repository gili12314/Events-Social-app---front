// src/pages/ProfileEditPage.tsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  _id: string;
  username: string;
  email: string;
  profileImage?: string;
}

const ProfileEditPage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/auth/profile");
        setProfile(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put("/users/update", { username, email });
      if (response.status === 200) {
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  if (!profile) return <div>טוען...</div>;

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>עריכת פרופיל</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label>שם משתמש:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label>אימייל:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <button type="submit" className="btn" style={{ width: "100%", padding: "10px" }}>
          עדכן פרופיל
        </button>
      </form>
    </div>
  );
};

export default ProfileEditPage;
