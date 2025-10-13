
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";
// import "../styles/global.css";
// import "../styles/notifications.css";

// export default function Notifications() {
//   const [notifications, setNotifications] = useState([]);
//   const userId = localStorage.getItem("userId"); // current logged-in user
//   const token = localStorage.getItem("token");

//   // ------------------ Fetch saved notifications ------------------
//   const fetchNotifications = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/notifications/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data.success) {
//         // Sort newest first
//         const sorted = res.data.notifications.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setNotifications(sorted);
//       }
//     } catch (err) {
//       console.error("Error fetching notifications:", err);
//     }
//   };

//   // ------------------ Socket.IO for live updates ------------------
//   useEffect(() => {
//     fetchNotifications(); // initial DB fetch

//     const socket = io("http://localhost:5000");
//     socket.emit("register-user", userId); // register this user for personal notifications

//     socket.on("new-notification", (notification) => {
//       if (
//         notification.type === "global" ||
//         (notification.type === "personal" && notification.user?.toString() === userId)
//       ) {
//         setNotifications((prev) => {
//           // Prevent duplicates if the same notification already exists
//           const exists = prev.some((n) => n._id === notification._id);
//           if (exists) return prev;
//           return [notification, ...prev]; // add new one at top
//         });
//       }
//     });

//     return () => socket.disconnect();
//   }, [userId]);

//   // ------------------ Render ------------------
//   return (
//     <div className="notifications-page">
//       <h2>Notifications</h2>
//       {notifications.length === 0 ? (
//         <p>No notifications yet</p>
//       ) : (
//         <div className="notifications-list">
//           {notifications.map((notif) => (
//             <div
//               key={notif._id || Math.random()}
//               className={`notification-card ${notif.type}`}
//             >
//               <span className="notif-type">
//                 {notif.type === "personal" ? "(Personal) " : "(Global) "}
//               </span>
//               {notif.message}
//               <span className="notif-time">
//                 {new Date(notif.createdAt).toLocaleString()}
//               </span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "../styles/global.css";
import "../styles/notifications.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

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
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();

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

    return () => socket.disconnect();
  }, [userId]);

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
