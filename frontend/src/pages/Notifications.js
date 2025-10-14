import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "../styles/global.css";
import "../styles/notifications.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const API_URL = process.env.REACT_APP_API_URL || "https://keyframes.onrender.com";

  // ------------------ Fetch notifications from backend ------------------
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/notifications/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const sorted = res.data.notifications.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotifications(sorted);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err.response?.data || err.message);
    }
  };

  // ------------------ Socket.io real-time updates ------------------
  useEffect(() => {
    fetchNotifications();

    const socket = io(API_URL, { transports: ["websocket"], withCredentials: true });
    socket.emit("register-user", userId);

    socket.on("new-notification", (notification) => {
      if (
        notification.type === "global" ||
        (notification.type === "personal" && notification.user?.toString() === userId)
      ) {
        setNotifications((prev) => {
          if (prev.some((n) => n._id === notification._id)) return prev;
          return [notification, ...prev];
        });
      }
    });

    return () => socket.disconnect();
  }, [userId, API_URL]);

  return (
    <div className="notifications-page">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        <div className="notifications-list">
          {notifications.map((notif) => (
            <div key={notif._id} className={`notification-card ${notif.type}`}>
              <span className="notif-type">
                {notif.type === "personal" ? "(Personal) " : "(Global) "}
              </span>
              {notif.message}
              <span className="notif-time">
                {new Date(notif.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
