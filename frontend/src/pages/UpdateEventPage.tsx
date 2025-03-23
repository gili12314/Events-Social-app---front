// src/pages/UpdateEventPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
  likes: string[];
}

const UpdateEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [eventData, setEventData] = useState<Event | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axiosInstance.get(`/events/${id}`);
        setEventData(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setDate(new Date(response.data.date).toISOString().slice(0, 16));
        setLocation(response.data.location);
      } catch (error) {
        console.error("Error fetching event", error);
      }
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imagePath = eventData?.image || "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const uploadResponse = await axiosInstance.put(`/events/${id}/image`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imagePath = uploadResponse.data.eventImage;
      }
      const response = await axiosInstance.put(`/events/${id}`, {
        title,
        description,
        date,
        location,
        image: imagePath,
      });
      if (response.status === 200) {
        navigate(`/events/${id}`);
      }
    } catch (error) {
      console.error("Error updating event", error);
    }
  };

  if (!eventData) {
    return <div>טוען...</div>;
  }

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>עריכת אירוע</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label>כותרת:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label>תיאור:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label>תאריך:</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label>מיקום:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label>תמונה (ניתן להשאיר אם לא רוצים לעדכן):</label>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImageFile(e.target.files[0]);
              }
            }}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <button type="submit" className="btn" style={{ width: "100%", padding: "10px" }}>
          עדכן אירוע
        </button>
      </form>
    </div>
  );
};

export default UpdateEventPage;
