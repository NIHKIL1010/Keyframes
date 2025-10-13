const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const multer = require("multer");
const path = require("path");

// File upload config
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, "uploads/"); },
  filename: function (req, file, cb) { cb(null, Date.now() + path.extname(file.originalname)); }
});

const upload = multer({ storage });

router.post("/", upload.single("screenshot"), async (req, res) => {
  try {
    const { name, email, phone, paymentDetails, plan } = req.body;
    if (!req.file) return res.status(400).json({ error: "Screenshot is required" });

    const payment = new Payment({
      name, email, phone, paymentDetails, plan,
      screenshot: req.file.path
    });

    await payment.save();
    res.status(201).json({ message: "Payment details saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
