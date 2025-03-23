// src/components/LikeButton.tsx
import React, { useState } from "react";
import axios from "axios";

interface LikeButtonProps {
  eventId: string;
  initialLikes: string[];
}

const LikeButton: React.FC<LikeButtonProps> = ({ eventId, initialLikes }) => {
  const [likes, setLikes] = useState<string[]>(initialLikes);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token") || "";
  const currentUserId = localStorage.getItem("userId") || "";
  const isLiked = likes.includes(currentUserId);

  const toggleLike = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:3000/api/events/${eventId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200 && response.data.event) {
        setLikes(response.data.event.likes);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={toggleLike} disabled={loading} style={{ cursor: loading ? "not-allowed" : "pointer" }}>
        {isLiked ? "💙 Unlike" : "🤍 Like"}
      </button>
      <span style={{ marginLeft: "8px" }}>{likes.length}</span>
    </div>
  );
};

export default LikeButton;
