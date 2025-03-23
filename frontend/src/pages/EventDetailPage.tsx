// src/pages/EventDetailPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import LikeButton from "../components/LikeButton";

interface Event {
  _id: string;
  title: string;
  description: string;
  image?: string;
  likes: string[];
  createdBy: { _id: string; username: string };
  participants: string[];
}

interface Comment {
  _id: string;
  text: string;
  createdAt: string;
  user: { _id: string; username: string }; 
}

function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [suggestions, setSuggestions] = useState<string>("");
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const currentUserId = localStorage.getItem("userId") || "";

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axiosInstance.get(`/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event", error);
      }
    };
    fetchEvent();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/comments/${id}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };
    fetchComments();
  }, [id]);

  const handleImprove = async () => {
    try {
      setLoadingSuggestions(true);
      const response = await axiosInstance.post(`/events/${id}/improve`, {});
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error("Error getting suggestions", error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleAddComment = async (text: string) => {
    try {
      const response = await axiosInstance.post(`/comments/${id}`, { text });
      setComments([response.data, ...comments]);
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  const handleUpdateComment = async (commentId: string, newText: string) => {
    try {
      const response = await axiosInstance.put(`/comments/update/${commentId}`, { text: newText });
      setComments(comments.map(c => c._id === commentId ? response.data : c));
    } catch (error) {
      console.error("Error updating comment", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await axiosInstance.delete(`/comments/delete/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment", error);
    }
  };

  const handleJoinLeave = async () => {
    if (!event) return;
    const isParticipant = event.participants.includes(currentUserId);
    try {
      const endpoint = isParticipant ? `/events/${event._id}/leave` : `/events/${event._id}/join`;
      const response = await axiosInstance.post(endpoint);
      setEvent(response.data.event);
    } catch (error) {
      console.error("Error toggling join/leave", error);
    }
  };

  if (!event) return <div>טוען...</div>;

  const creatorId = event.createdBy._id;
  const creatorName = event.createdBy.username;

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>{event.title}</h1>
      <p style={{ fontSize: "1rem", color: "#333" }}>נוצר על ידי: {creatorName}</p>
      {event.image && (
        <img
          src={`http://localhost:3000${event.image}`}
          alt={event.title}
          style={{ width: "100%", height: "400px", objectFit: "cover", margin: "20px 0", borderRadius: "8px" }}
        />
      )}
      <p style={{ marginBottom: "20px" }}>{event.description}</p>
      {currentUserId !== creatorId && (
        <div style={{ marginBottom: "20px" }}>
          <button onClick={handleJoinLeave} className="btn" style={{ padding: "10px 20px", fontSize: "1rem" }}>
            {event.participants.includes(currentUserId) ? "בטל הצטרפות לאירוע" : "הצטרף לאירוע"}
          </button>
        </div>
      )}
      {currentUserId === creatorId && (
        <>
          <div style={{ marginBottom: "20px" }}>
            <Link to={`/events/${event._id}/edit`}>
              <button className="btn" style={{ padding: "10px 20px", fontSize: "1rem" }}>
                עדכן אירוע
              </button>
            </Link>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <button onClick={handleImprove} className="btn" style={{ padding: "10px 20px", fontSize: "1rem" }}>
              שפר את האירוע
            </button>
          </div>
        </>
      )}
      <LikeButton eventId={event._id} initialLikes={event.likes} />
      {loadingSuggestions && <p style={{ marginTop: "20px" }}>טוען הצעות...</p>}
      {suggestions && (
        <div style={{ marginTop: "20px", padding: "16px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#fff" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "12px" }}>הצעות לשיפור האירוע:</h2>
          <p>{suggestions}</p>
        </div>
      )}
      <hr style={{ margin: "40px 0" }} />
      <h2 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "20px" }}>תגובות</h2>
      <CommentForm onSubmit={handleAddComment} />
      <CommentList comments={comments} onEdit={handleUpdateComment} onDelete={handleDeleteComment} />
    </div>
  );
}

export default EventDetailPage;
