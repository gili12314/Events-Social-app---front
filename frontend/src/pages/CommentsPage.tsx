import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

interface Comment {
  _id: string;
  text: string;
  createdAt: string;
  user: { _id: string; username: string };
}

function CommentsPage() {
  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Comment[]>([]);

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

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>תגובות</h1>
      <CommentForm onSubmit={handleAddComment} />
      <CommentList comments={comments} onEdit={handleUpdateComment} onDelete={handleDeleteComment} />
      <Link to={`/events/${id}`} className="btn" style={{ marginTop: "20px", padding: "10px 20px", fontSize: "1rem" }}>
        חזרה לאירוע
      </Link>
    </div>
  );
}

export default CommentsPage;
