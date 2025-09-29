/*const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel"); // make sure this path is correct

// POST: Save contact message
router.post("/add", async (req, res) => {
  console.log("Incoming contact request:", req.body);

  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create new contact
    const newContact = new Contact({ name, email, message });

    // Save to DB
    const savedContact = await newContact.save();

    console.log("Contact saved successfully:", savedContact);
    res.status(201).json({ message: "Contact saved successfully", contact: savedContact });
  } catch (error) {
    console.error("Error saving contact:", error);

    // Send detailed error to frontend for debugging
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// GET: Retrieve all contacts (optional)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
*/

const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel");

// POST: save contact
router.post("/add", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: "Contact saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

