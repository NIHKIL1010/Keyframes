

/*
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // TODO: Add your login API logic here
    // Example: axios.post('/api/login', { email, password })

    // After successful login, redirect to home page
    navigate("/dashboard/home");
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <img src={process.env.PUBLIC_URL + "/images/logo.jpg"} alt="KEYFRAMES Logo" className="logo" />
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="primary-btn">Login</button>
        </form>
        <p style={{ marginTop: "10px" }}>
          Don't have an account? <a href="/register" style={{ color: "#ffb347" }}>Register</a>
        </p>
      </div>
    </div>
  );
}
*/
/*
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("/api/auth/login", { email, password });

    // Save token
    localStorage.setItem("token", response.data.token);
    console.log("Token saved:", localStorage.getItem("token")); // debug

    // Redirect
    navigate("/dashboard/home");
  } catch (err) {
    console.error(err.response?.data || err);
  }
};


  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <button onClick={handleLogin} className="primary-btn">
          Login
        </button>
      </div>
    </div>
  );
}
*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      // Save token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to MyAccount
      navigate("/Dashboard/Home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Wrap inputs in a form */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />

          <button type="submit" className="primary-btn">
            Login
          </button>
        </form>

        <p style={{ marginTop: "10px", color: "#fff" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "#ffb347", textDecoration: "underline", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
