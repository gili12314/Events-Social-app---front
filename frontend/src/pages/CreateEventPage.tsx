import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const CreateEventPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imagePath = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const uploadResponse = await axiosInstance.post("/events/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imagePath = uploadResponse.data.eventImage;
      }
      const eventPayload: { title: string; description: string; date: string; location: string; image?: string } = {
        title,
        description,
        date,
        location,
      };
      if (imagePath) {
        eventPayload.image = imagePath;
      }
      const response = await axiosInstance.post("/events", eventPayload);
      if (response.status === 201) {
        navigate("/events");
      }
    } catch (error) {
      console.error("Error creating event", error);
    }
  };

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>יצירת אירוע חדש</h1>
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
          <label>תמונה (אופציונלי):</label>
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
          צור אירוע
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;
