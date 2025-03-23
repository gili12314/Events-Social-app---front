import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { AuthGuarded } from "../AuthGuarded";

interface Notification {
  _id: string;
  recipient: string;
  sender: {
    _id: string;
    username: string;
  };
  event: {
    _id: string;
    title: string;
  };
  type: "like" | "join";
  isRead: boolean;
  createdAt: string;
}

function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get("/notifications");
      setNotifications(response.data.notifications || response.data);
    } catch (error) {
      console.error("Error fetching notifications", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async () => {
    try {
      await axiosInstance.put("/notifications/read");
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notifications as read", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>התראות</h1>
      {loading ? (
        <p className="loading">טוען התראות...</p>
      ) : notifications.length === 0 ? (
        <p>אין התראות חדשות.</p>
      ) : (
        <div>
          <button onClick={markAsRead} className="btn" style={{ marginBottom: "20px" }}>
            סימון כנקראות
          </button>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {notifications.map((notification) => (
              <li key={notification._id} style={{ padding: "12px", marginBottom: "8px", border: "1px solid #ccc", borderRadius: "4px", backgroundColor: notification.isRead ? "#e9ecef" : "#fff" }}>
                <p>
                  <strong>{notification.sender.username}</strong> {notification.type === "join" ? "הצטרף" : "עשה לייק"} לאירוע: <strong>{notification.event.title}</strong>
                </p>
                <p style={{ fontSize: "0.85rem", color: "#666" }}>
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AuthGuarded(NotificationsPage);
