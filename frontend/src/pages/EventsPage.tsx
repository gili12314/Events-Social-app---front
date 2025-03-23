// src/pages/EventsPage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Event {
  _id: string;
  title: string;
  description: string;
  image?: string;
}

function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>אירועים</h1>
      
      {/* כפתור "צור אירוע חדש" */}
      <div style={{ marginBottom: "20px" }}>
        <Link to="/events/create">
          <button className="btn" style={{ padding: "10px 20px", fontSize: "1rem" }}>
            צור אירוע חדש
          </button>
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {events.map((event) => (
          <div
            key={event._id}
            style={{
              border: "1px solid #ccc",
              padding: "16px",
              borderRadius: "8px",
              backgroundColor: "#fff",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>{event.title}</h2>
            {event.image && (
              <img
                src={`http://localhost:3000${event.image}`}
                alt={event.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  marginBottom: "8px",
                }}
              />
            )}
            <p style={{ marginBottom: "8px" }}>{event.description}</p>
            <Link
              to={`/events/${event._id}`}
              style={{ color: "#007bff", textDecoration: "underline" }}
            >
              פרטים נוספים
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;
