import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProfilePictureUpload from "../components/ProfilePictureUpload";

interface UserProfile {
  _id: string;
  username: string;
  email: string;
  profileImage?: string;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  image?: string;
  date: string;
  location: string;
}

function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [myEvents, setMyEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await axios.get("http://localhost:3000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    const fetchMyEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await axios.get("http://localhost:3000/api/events/my-events", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch my events", error);
      }
    };

    fetchProfile();
    fetchMyEvents();
  }, []);

  if (!profile) {
    return <div>טוען...</div>;
  }

  const profileImageUrl =
    profile.profileImage && profile.profileImage.startsWith("http")
      ? profile.profileImage
      : `http://localhost:3000${profile.profileImage || ""}`;

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>פרופיל משתמש</h1>
      <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
        {profile.profileImage ? (
          <img
            src={profileImageUrl}
            alt="Profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%", marginRight: "20px" }}
          />
        ) : (
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: "#ccc",
              marginRight: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            אין תמונה
          </div>
        )}
        <div>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{profile.username}</p>
          <p style={{ color: "#555" }}>{profile.email}</p>
          <Link to="/profile/edit" style={{ color: "#007bff", textDecoration: "underline", marginTop: "8px", display: "block" }}>
            ערוך פרופיל
          </Link>
        </div>
      </div>
      <ProfilePictureUpload />
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "40px" }}>האירועים שלי</h2>
      {myEvents.length === 0 ? (
        <p>לא נוצרו אירועים.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {myEvents.map((event) => (
            <li key={event._id} style={{ marginBottom: "10px" }}>
              <Link to={`/events/${event._id}`} style={{ color: "#007bff", textDecoration: "underline" }}>
                {event.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProfilePage; 
