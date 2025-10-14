const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const multer = require("multer");
const path = require("path");

// ------------------------------
// File upload config
// ------------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ------------------------------
// POST /api/payment
// ------------------------------
router.post("/", upload.single("screenshot"), async (req, res) => {
  try {
    const { name, email, phone, paymentDetails, plan } = req.body;
    if (!name || !email || !phone || !paymentDetails || !plan) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, error: "Screenshot is required" });
    }

    const payment = new Payment({
      name,
      email,
      phone,
      paymentDetails,
      plan,
      screenshot: req.file.filename, // save filename to DB
    });

    await payment.save();

    res.status(201).json({ success: true, message: "Payment details saved successfully!" });
  } catch (err) {
    console.error("Payment submission error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
