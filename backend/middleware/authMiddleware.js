const jwt = require("jsonwebtoken");

// Verify normal user token
function verifyToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Bearer TOKEN
  if (!token) return res.status(401).json({ message: "Invalid token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, name: decoded.name, email: decoded.email, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
}

// Verify admin role
function verifyAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin access required" });
    next();
  });
}

module.exports = { verifyToken, verifyAdmin };
