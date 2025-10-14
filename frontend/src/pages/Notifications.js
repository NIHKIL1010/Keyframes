import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/global.css";

export default function Notifications() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_API_URL || "https://keyframes.onrender.com";

  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/notifications/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setNotifications(res.data.notifications.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ));
      }
    } catch (err) {
      console.error("Fetch notifications error:", err.response?.data || err.message);
    }
  };

  const sendNotification = async () => {
    if (!message.trim()) return alert("Please enter a message");

    const url = selectedUser
      ? `${API_URL}/api/notifications/personal/${selectedUser}`
      : `${API_URL}/api/notifications/global`;

    try {
      const res = await axios.post(url, { message }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setMessage("");
        setSelectedUser("");
        fetchNotifications();
        alert("✅ Notification sent!");
      }
    } catch (err) {
      console.error("Send notification error:", err.response?.data || err.message);
      alert("❌ Failed to send notification");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [API_URL]);

  return (
    <div className="notifications-page">
      <h2>Notifications</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter notification message"
      />
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">Global Notification</option>
        {/* Populate with users fetched from API if needed */}
      </select>
      <button onClick={sendNotification}>Send</button>

      <div className="notifications-list">
        {notifications.map((n) => (
          <div key={n._id} className={`notification ${n.type} ${n.read ? "" : "unread"}`}>
            <span>{n.type === "personal" ? "👤" : "🌐"}</span> {n.message}
            <span>{new Date(n.createdAt).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
