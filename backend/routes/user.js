/*const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');

// Dummy route for MyAccount (no user info shown)
router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'You are logged in' });
});

module.exports = router;
*/const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");

// GET current user
router.get("/me", authMiddleware, (req, res) => {
  // user info comes from token
  res.json({ name: req.user.name, email: req.user.email });
});

module.exports = router;
