/*
import { useNavigate } from "react-router-dom";

export default function MyAccount() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // redirect to login
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          borderRadius: "12px",
          backgroundColor: "rgba(0,0,0,0.7)", // dark semi-transparent to match bg
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.7)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.5)";
        }}
      >
        <h2 style={{ color: "#fff" }}>My Account</h2>
        <p style={{ color: "#ccc" }}>Welcome to your account.</p>
        <button
          className="primary-btn"
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "10px 25px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#ff4d4f",
            color: "#fff",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ff7875")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff4d4f")}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

*/
/*
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyAccount() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/"); // redirect to login if no token
      return;
    }

    // Fetch user info from backend
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` }, // send token in headers
        });
        setUser(res.data); // backend should return { name, email, ... }
      } catch (err) {
        console.error("Failed to fetch user info:", err);
        localStorage.removeItem("token"); // remove invalid token
        navigate("/"); // redirect to login
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // redirect to login
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          borderRadius: "12px",
          backgroundColor: "rgba(0,0,0,0.7)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.7)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.5)";
        }}
      >
        <h2 style={{ color: "#fff" }}>My Account</h2>
        {loading ? (
          <p style={{ color: "#ccc" }}>Loading user info...</p>
        ) : user ? (
          <>
            <p style={{ color: "#ccc" }}>Welcome, {user.name}!</p>
            <p style={{ color: "#ccc" }}>Email: {user.email}</p>
          </>
        ) : (
          <p style={{ color: "#ccc" }}>No user info available</p>
        )}

        <button
          className="primary-btn"
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "10px 25px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#ff4d4f",
            color: "#fff",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ff7875")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff4d4f")}
        >
          Logout
        </button>
      </div>
    </div>
  );
}*/

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyAccount() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data); // check returned data
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
        localStorage.removeItem("token");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          borderRadius: "12px",
          backgroundColor: "rgba(0,0,0,0.7)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.7)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.5)"; }}
      >
        <h2 style={{ color: "#fff" }}>My Account</h2>
        {loading ? (
          <p style={{ color: "#ccc" }}>Loading user info...</p>
        ) : user ? (
          <>
            <p style={{ color: "#ccc" }}>Welcome, {user.name}!</p>
            <p style={{ color: "#ccc" }}>Email: {user.email}</p>
          </>
        ) : (
          <p style={{ color: "#ccc" }}>No user info available</p>
        )}
        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "10px 25px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#ff4d4f",
            color: "#fff",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ff7875")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff4d4f")}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

