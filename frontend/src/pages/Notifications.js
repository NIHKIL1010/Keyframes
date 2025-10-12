// import '../styles/notifications.css';
// export default function Notifications() {
//   const notifications = [
//     { id: 1, message: "New marketing campaign launched!" },
//     { id: 2, message: "Your portfolio has been approved." },
//     { id: 3, message: "Reminder: Meeting at 3 PM." }
//   ];

//   return (
//     <div className="page-content">
//       <h2>Notifications</h2>
//       <ul>
//         {notifications.map((note) => (
//           <li key={note.id}>{note.message}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/notifications.css";
import { io } from "socket.io-client";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem("userId"); // ensure you store this at login

  useEffect(() => {
    // Fetch notifications
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notifications/${userId}`);
        if (res.data.success) setNotifications(res.data.notifications);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();

    // Setup socket once
    const socket = io("http://localhost:5000");
    socket.on("new-notification", (notification) => {
      if (
        notification.type === "global" ||
        (notification.type === "personal" && notification.user === userId)
      ) {
        setNotifications(prev => [notification, ...prev]);
      }
    });

    return () => socket.disconnect();
  }, [userId]);

  return (
    <div className="page-content">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul>
          {notifications.map((note) => (
            <li key={note._id}>
              {note.type === "personal" ? "(Personal) " : "(Global) "} {note.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
