/*import React from "react";
import logo from "./styles/images/logo.jpg";
import bg from "./styles/images/bg.jpg";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";

const App = () => {
  const [view, setView] = React.useState(null); // null, "login", "register"

  return (
    <div style={{
      backgroundColor: "#000",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff"
    }}>
      {!view ? (
        <div style={{
          backgroundColor: "#111",
          padding: "40px",
          borderRadius: "12px",
          textAlign: "center",
          width: "300px",
          boxShadow: "0 0 20px rgba(255,255,255,0.1)"
        }}>
          <img src={logo} alt="Logo" style={{ width: "100px", marginBottom: "20px" }} />
          <h2>Welcome to Keyframes</h2>
          <button
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#ff3c00",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => setView("login")}
          >
            Login
          </button>
          <button
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "6px",
              border: "1px solid #ff3c00",
              backgroundColor: "transparent",
              color: "#ff3c00",
              cursor: "pointer",
            }}
            onClick={() => setView("register")}
          >
            Register
          </button>
        </div>
      ) : view === "login" ? (
        <LoginForm goBack={() => setView(null)} />
      ) : (
        <RegisterForm goBack={() => setView(null)} />
      )}
    </div>
  );
};

export default App;
*/
/*
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
*/
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Explicit route for login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
