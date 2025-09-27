
/* 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css"; // Keep your original styles
import AnimatedBackground from "../components/AnimatedBackground"; // Your animated background component
import axios from "axios"; // For API calls

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      // POST request to backend login API
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        // Save token or user info if needed
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="login-page">
      <AnimatedBackground />
      <div className="login-container">
        <img src="/images/logo.png" alt="KEYFRAMES Logo" className="logo" />
        <h2>KEYFRAMES LOGIN</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
          <button type="submit" className="primary-btn">
            Login
          </button>
        </form>
        <p>
          Don’t have an account?{" "}
          <button
            className="link-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/global.css";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        alert("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="form-page">
      <AnimatedBackground />
      <div className="form-container">
        <img src="/images/logo.png" alt="KEYFRAMES Logo" className="logo" />
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="form-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
          <button type="submit" className="primary-btn">Login</button>
        </form>
        <p>
          Don’t have an account?{" "}
          <button className="link-btn" onClick={() => navigate("/register")}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
