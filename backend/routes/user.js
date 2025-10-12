// const router = require("express").Router();
// const authMiddleware = require("../middleware/authMiddleware");

// // GET current user
// router.get("/me", authMiddleware, (req, res) => {
//   // user info comes from token
//   res.json({ name: req.user.name, email: req.user.email });
// });

// module.exports = router;

const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");

// GET current user info
router.get("/me", authMiddleware, (req, res) => {
  res.json({ 
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role || "user"
  });
});

module.exports = router;

