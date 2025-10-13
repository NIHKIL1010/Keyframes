
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/paymentForm.css"; // separate CSS for form

export default function PaymentForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPlan = location.state?.planName || "No plan selected";

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", paymentDetails: "", screenshot: null });
  const [preview, setPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "screenshot") {
      setFormData({ ...formData, screenshot: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.screenshot) {
      alert("Please upload payment screenshot!");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("paymentDetails", formData.paymentDetails);
    data.append("plan", selectedPlan);
    data.append("screenshot", formData.screenshot);

    try {
      await axios.post("http://localhost:5000/api/payment", data);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Error submitting form. Try again.");
    }
  };

  if (submitted)
    return (
      <h2 className="success-message">
        Thank you! Your payment details for <span>{selectedPlan}</span> have been submitted.
      </h2>
    );

  return (
    <div className="payment-form-container">
      <div className="payment-form-box">
        {/* Go Back Button */}
        <button className="back-button" onClick={() => navigate("/pricing")}>
          &larr; Back to Pricing
        </button>

        <h2>Payment Form - <span>{selectedPlan}</span></h2>
        <form onSubmit={handleSubmit} className="payment-form">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

          <label>Payment Details</label>
          <input type="text" name="paymentDetails" value={formData.paymentDetails} onChange={handleChange} required />

          <label>Upload Payment Screenshot</label>
          <input type="file" name="screenshot" accept="image/*" onChange={handleChange} required />

          {preview && <img src={preview} alt="Preview" className="screenshot-preview" />}

          <button type="submit" disabled={!formData.screenshot}>Submit Payment</button>
        </form>
      </div>
    </div>
  );
}
