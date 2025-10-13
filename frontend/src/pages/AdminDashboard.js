

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/global.css";
// import "../styles/AdminDashboard.css";
// import { io } from "socket.io-client";

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [notificationMessage, setNotificationMessage] = useState("");
//   const [selectedUser, setSelectedUser] = useState("");
//   const [insights, setInsights] = useState({
//     totalUsers: 0,
//     activeUsers: 0,
//     blockedUsers: 0,
//     recentActivities: [],
//   });
//   const [searchTerm, setSearchTerm] = useState("");

//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");

//   // ------------------ SOCKET.IO ------------------
//   useEffect(() => {
//     const socket = io("http://localhost:5000");

//     socket.emit("register-user", userId);

//     socket.on("new-notification", (notification) => {
//       if (
//         notification.type === "global" ||
//         (notification.type === "personal" && notification.user?.toString() === userId)
//       ) {
//         setNotifications((prev) => {
//           if (prev.some((n) => n._id === notification._id)) return prev;
//           return [notification, ...prev];
//         });
//       }
//     });

//     return () => socket.disconnect();
//   }, [userId]);

//   // ------------------ Fetch Functions ------------------
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     }
//   };

//   const fetchInsights = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/insights", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setInsights(res.data);
//     } catch (err) {
//       console.error("Error fetching insights:", err);
//     }
//   };

//   const fetchNotifications = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/notifications/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.data.success) {
//         const sorted = res.data.notifications.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setNotifications(sorted);
//       }
//     } catch (err) {
//       console.error("Error fetching notifications:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchInsights();
//     fetchNotifications();
//   }, []);

//   // ------------------ Actions ------------------
//   const handleBlock = async (userId) => {
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/admin/users/${userId}/block`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchUsers();
//       fetchInsights();
//     } catch (err) {
//       console.error("Error blocking/unblocking user:", err);
//     }
//   };

//   const handleRoleChange = async (userId, currentRole) => {
//     try {
//       const newRole = currentRole === "user" ? "admin" : "user";
//       await axios.patch(
//         `http://localhost:5000/api/admin/users/${userId}/role`,
//         { role: newRole },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchUsers();
//       fetchInsights();
//     } catch (err) {
//       console.error("Error changing role:", err);
//     }
//   };

//   const sendNotification = async () => {
//     try {
//       if (!notificationMessage.trim()) return alert("Please enter a message");

//       if (selectedUser) {
//         await axios.post(
//           `http://localhost:5000/api/notifications/personal/${selectedUser}`,
//           { message: notificationMessage },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } else {
//         await axios.post(
//           `http://localhost:5000/api/notifications/global`,
//           { message: notificationMessage },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       }

//       setNotificationMessage("");
//       setSelectedUser("");
//       fetchNotifications();
//       alert("✅ Notification sent successfully!");
//     } catch (err) {
//       console.error("Error sending notification:", err);
//       alert("❌ Failed to send notification.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   // ------------------ Render ------------------
//   const filteredUsers = users.filter(
//     (u) =>
//       u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       u.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const timeAgo = (dateStr) => {
//     const diff = (new Date() - new Date(dateStr)) / 1000;
//     if (diff < 60) return `${Math.floor(diff)} sec ago`;
//     if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
//     if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
//     return `${Math.floor(diff / 86400)} d ago`;
//   };

//   return (
//     <div className="admin-dashboard">
//       <header className="dashboard-header">
//         <h1>Admin Dashboard</h1>
//         <button className="logout-btn" onClick={handleLogout}>
//           Logout
//         </button>
//       </header>

//       <div className="dashboard-grid">
//         {/* Left Column */}
//         <div className="dashboard-left">
//           <section className="insights-cards">
//             <div className="card total-users">
//               <h3>Total Users</h3>
//               <p>{insights.totalUsers}</p>
//             </div>
//             <div className="card active-users">
//               <h3>Active Users</h3>
//               <p>{insights.activeUsers}</p>
//             </div>
//             <div className="card blocked-users">
//               <h3>Blocked Users</h3>
//               <p>{insights.blockedUsers}</p>
//             </div>
//           </section>

//           <section className="recent-activity-section">
//             <h2>Recent Activity Logs</h2>
//             {insights.recentActivities.length === 0 ? (
//               <p>No recent activity.</p>
//             ) : (
//               <div className="activity-list">
//                 {insights.recentActivities.map((act) => (
//                   <div key={act._id} className="activity-item">
//                     <p>
//                       <strong>{act.action}</strong> by{" "}
//                       <strong>{act.performedBy.name}</strong> (
//                       {act.performedBy.email}) on{" "}
//                       <strong>{act.user.name}</strong> ({act.user.email}) -{" "}
//                       <em>{timeAgo(act.createdAt)}</em>
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </section>
//         </div>

//         {/* Right Column */}
//         <div className="dashboard-right">
//           <section className="notifications-section">
//             <h2>Send Notifications</h2>
//             <textarea
//               value={notificationMessage}
//               onChange={(e) => setNotificationMessage(e.target.value)}
//               placeholder="Enter notification message"
//             />
//             <select
//               value={selectedUser}
//               onChange={(e) => setSelectedUser(e.target.value)}
//             >
//               <option value="">Global Notification</option>
//               {users.map((u) => (
//                 <option key={u._id} value={u._id}>
//                   {u.name} ({u.email})
//                 </option>
//               ))}
//             </select>
//             <button onClick={sendNotification} className="primary-btn">
//               Send
//             </button>

//             <div className="notifications-list scrollable">
//               {notifications.map((n) => (
//                 <div
//                   key={n._id}
//                   className={`notification ${n.type} ${
//                     !n.readBy?.includes(userId) ? "unread" : ""
//                   }`}
//                 >
//                   {n.type === "personal" ? "(Personal) " : "(Global) "}{" "}
//                   {n.message} <span className="notif-time">{timeAgo(n.createdAt)}</span>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>
//       </div>

//       {/* Users Management */}
//       <section className="users-management">
//         <h2>Users Management</h2>
//         <input
//           type="text"
//           placeholder="Search by name/email..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="user-search"
//         />
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user) => (
//               <tr key={user._id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.role}</td>
//                 <td>
//                   <button onClick={() => handleBlock(user._id)}>
//                     {user.isBlocked ? "Unblock" : "Block"}
//                   </button>
//                   <button onClick={() => handleRoleChange(user._id, user.role)}>
//                     Toggle Role
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>
//     </div>
//   );
// }

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
    newUsersToday: 0,
    pendingApprovals: 0,
  });
  const [activityFilter, setActivityFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // ------------------ SOCKET.IO ------------------
  useEffect(() => {
    const socket = io("http://localhost:5000");
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

    socket.on("update-insights", (updated) => setInsights(updated));

    return () => socket.disconnect();
  }, [userId]);

  // ------------------ Fetch Functions ------------------
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
    }
  };

  const fetchInsights = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/insights", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInsights(res.data);
    } catch (err) {
      console.error("Error fetching insights:", err.response?.data || err.message);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/notifications/${userId}`, {
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

  useEffect(() => {
    fetchUsers();
    fetchInsights();
    fetchNotifications();
  }, []);

  // ------------------ Actions ------------------
  const handleBlock = async (userId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/admin/users/${userId}/block`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
      fetchInsights();
    } catch (err) {
      console.error("Error blocking/unblocking user:", err.response?.data || err.message);
    }
  };

  const handleRoleChange = async (userId, currentRole) => {
    try {
      const newRole = currentRole === "user" ? "admin" : "user";
      await axios.patch(
        `http://localhost:5000/api/admin/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
      fetchInsights();
    } catch (err) {
      console.error("Error changing role:", err.response?.data || err.message);
    }
  };

  const sendNotification = async () => {
    try {
      if (!notificationMessage.trim()) return alert("Please enter a message");

      const url = selectedUser
        ? `http://localhost:5000/api/notifications/personal/${selectedUser}`
        : `http://localhost:5000/api/notifications/global`;

      const res = await axios.post(
        url,
        { message: notificationMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setNotificationMessage("");
        setSelectedUser("");
        fetchNotifications();
        alert("✅ Notification sent successfully!");
      } else {
        console.error("Backend rejected request:", res.data);
        alert("❌ Failed: " + res.data.error || res.data.message);
      }
    } catch (err) {
      console.error("Error sending notification:", err.response?.data || err.message);
      alert("❌ Failed to send notification. Check console for details.");
    }
  };

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  // ------------------ Render ------------------
  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button className="primary-btn" onClick={markAllRead}>
            Mark all notifications read
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
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
            <div className="card new-users-today">
              <h3>New Users Today</h3>
              <p>{insights.newUsersToday || 0}</p>
            </div>
            <div className="card pending-approvals">
              <h3>Pending Approvals</h3>
              <p>{insights.pendingApprovals || 0}</p>
            </div>
          </section>

          <section className="recent-activity-section">
            <h2>Recent Activity Logs</h2>
            <select
              value={activityFilter}
              onChange={(e) => setActivityFilter(e.target.value)}
            >
              <option value="all">All Actions</option>
              <option value="block">Block/Unblock</option>
              <option value="role">Role Change</option>
            </select>
            <div className="activity-list">
              {insights.recentActivities
                .filter((act) =>
                  activityFilter === "all" ? true : act.action.includes(activityFilter)
                )
                .map((act) => (
                  <div key={act._id} className="activity-item">
                    <p>
                      <strong>{act.action}</strong> by{" "}
                      <strong>{act.performedBy.name}</strong> (
                      {act.performedBy.email}) on{" "}
                      <strong>{act.user.name}</strong> ({act.user.email})
                    </p>
                  </div>
                ))}
            </div>
          </section>

          <section className="analytics-section">
            <h2>Analytics</h2>
            <div className="analytics-placeholder">[Charts/Graphs placeholder]</div>
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
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Global Notification</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
            <button onClick={sendNotification} className="primary-btn">
              Send
            </button>

            <div className="notifications-list">
              {notifications.map((n) => (
                <div
                  key={n._id}
                  className={`notification ${n.type} ${n.read ? "" : "unread"}`}
                >
                  <span style={{ marginRight: "5px" }}>
                    {n.type === "personal" ? "👤" : "🌐"}
                  </span>
                  {n.type === "personal" ? "(Personal) " : "(Global) "} {n.message}
                  <span className="notif-time">
                    {new Date(n.createdAt).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="users-management">
        <h2>Users Management</h2>
        <select
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        >
          <option value="all">All Users</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="blocked">Blocked</option>
        </select>
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
            {users
              .filter((u) => {
                if (userFilter === "all") return true;
                if (userFilter === "blocked") return u.isBlocked;
                return u.role === userFilter;
              })
              .map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleBlock(user._id)}>
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                    <button onClick={() => handleRoleChange(user._id, user.role)}>
                      Toggle Role
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
