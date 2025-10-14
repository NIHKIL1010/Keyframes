import { useState } from "react";
import axios from "axios";
import "../styles/contacts.css";

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hosted backend URL from .env
    const API_URL = process.env.REACT_APP_API_URL || "https://keyframes.onrender.com";

    try {
      const response = await axios.post(`${API_URL}/api/contacts/add`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success || response.status === 200) {
        alert("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // reset form
      } else {
        alert("❌ Failed to send message. Try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error.response?.data || error.message);
      alert("❌ Failed to send message. Try again.");
    }
  };

  return (
    <div className="contacts-page">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
