import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/global.css";
import "../styles/AdminDashboard.css";
import { io } from "socket.io-client";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [insights, setInsights] = useState({
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
    recentActivities: [],
  });

  // ------------------ SOCKET.IO ------------------
  const userId = localStorage.getItem("userId"); // optional if needed
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("new-notification", (notification) => {
      if (
        notification.type === "global" ||
        (notification.type === "personal" && notification.user === userId)
      ) {
        setNotifications((prev) => [notification, ...prev]);
      }
    });
    return () => socket.disconnect();
  }, [userId]);

  // ------------------ Fetch Functions ------------------
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchInsights = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/insights", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInsights(res.data);
    } catch (err) {
      console.error("Error fetching insights:", err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const res = await axios.get(
        `http://localhost:5000/api/notifications/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) setNotifications(res.data.notifications);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchInsights();
    fetchNotifications();
  }, []);

  // ------------------ Actions ------------------
  const handleBlock = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/admin/users/${userId}/block`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
      fetchInsights();
    } catch (err) {
      console.error("Error blocking/unblocking user:", err);
    }
  };

  const handleRoleChange = async (userId, currentRole) => {
    try {
      const token = localStorage.getItem("token");
      const newRole = currentRole === "user" ? "admin" : "user";
      await axios.patch(
        `http://localhost:5000/api/admin/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
      fetchInsights();
    } catch (err) {
      console.error("Error changing role:", err);
    }
  };

  const sendNotification = async () => {
    try {
      if (!notificationMessage) return alert("Please enter a message");
      const token = localStorage.getItem("token");

      if (selectedUser) {
        await axios.post(
          `http://localhost:5000/api/notifications/personal/${selectedUser}`,
          { message: notificationMessage },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `http://localhost:5000/api/notifications/global`,
          { message: notificationMessage },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setNotificationMessage("");
      setSelectedUser("");
      fetchNotifications();
      alert("Notification sent!");
    } catch (err) {
      console.error("Error sending notification:", err);
    }
  };

  // ------------------ Logout ------------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  // ------------------ Render ------------------
  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="dashboard-left">
          <section className="insights-cards">
            <div className="card total-users">
              <h3>Total Users</h3>
              <p>{insights.totalUsers}</p>
            </div>
            <div className="card active-users">
              <h3>Active Users</h3>
              <p>{insights.activeUsers}</p>
            </div>
            <div className="card blocked-users">
              <h3>Blocked Users</h3>
              <p>{insights.blockedUsers}</p>
            </div>
          </section>

          <section className="recent-activity-section">
            <h2>Recent Activity Logs</h2>
            {insights.recentActivities.length === 0 ? (
              <p>No recent activity.</p>
            ) : (
              <div className="activity-list">
                {insights.recentActivities.map((act) => (
                  <div key={act._id} className="activity-item">
                    <p>
                      <strong>{act.action}</strong> by <strong>{act.performedBy.name}</strong> ({act.performedBy.email}) on <strong>{act.user.name}</strong> ({act.user.email})
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right Column */}
        <div className="dashboard-right">
          <section className="notifications-section">
            <h2>Send Notifications</h2>
            <textarea
              value={notificationMessage}
              onChange={(e) => setNotificationMessage(e.target.value)}
              placeholder="Enter notification message"
            />
            <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
              <option value="">Global Notification</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
              ))}
            </select>
            <button onClick={sendNotification} className="primary-btn">Send</button>

            <div className="notifications-list">
              {notifications.map((n, idx) => (
                <div key={idx} className={`notification ${n.type}`}>
                  {n.type === "personal" ? "(Personal) " : "(Global) "} {n.message}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Users Management */}
      <section className="users-management">
        <h2>Users Management</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleBlock(user._id)}>{user.isBlocked ? "Unblock" : "Block"}</button>
                  <button onClick={() => handleRoleChange(user._id, user.role)}>Toggle Role</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
