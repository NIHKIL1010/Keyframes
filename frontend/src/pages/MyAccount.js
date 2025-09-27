
import { useNavigate } from "react-router-dom";

export default function MyAccount() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth tokens if implemented, e.g. localStorage.removeItem("token");
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="page-content">
      <h2>My Account</h2>
      <p>Manage your profile, preferences, and settings here.</p>
      <button 
        onClick={handleLogout} 
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#1e3c72",
          color: "white",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}

