

const router = require("express").Router();
const { verifyToken } = require("../middleware/authMiddleware"); // <-- destructure the function

// GET current user info
router.get("/me", verifyToken, (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role || "user",
  });
});

module.exports = router;
