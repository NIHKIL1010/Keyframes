const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");

dotenv.config();

const app = express();
const server = http.createServer(app);

// ------------------------------
// ALLOWED ORIGINS
// ------------------------------
const allowedOrigins = [
  "http://localhost:3000",         // Local development
  "https://keyframes.vercel.app",  // Deployed frontend
];

// ------------------------------
// CORS MIDDLEWARE (Permanent fix)
// ------------------------------
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");

  // If it's a preflight request, respond immediately
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// ------------------------------
// BODY PARSER
// ------------------------------
app.use(express.json());

// ------------------------------
// SOCKET.IO
// ------------------------------
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use((req, res, next) => {
  req.io = io; // attach io to request
  next();
});

// ------------------------------
// ROUTES
// ------------------------------
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const contactRoutes = require("./routes/contacts");
const adminRoutes = require("./routes/admin");
const notificationRoutes = require("./routes/notifications");
const paymentRoutes = require("./routes/payment");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/uploads", express.static("uploads")); // serve uploaded screenshots

// ------------------------------
// DATABASE CONNECTION
// ------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ------------------------------
// TEST ROUTE
// ------------------------------
app.get("/", (req, res) => res.send("✅ Backend server running!"));

// ------------------------------
// SOCKET.IO CONNECTION
// ------------------------------
io.on("connection", (socket) => {
  console.log("🟢 A user connected:", socket.id);

  socket.on("register-user", (userId) => {
    if (userId) {
      socket.join(userId);
      console.log(`📡 User ${userId} joined their personal room`);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 A user disconnected:", socket.id);
  });
});

// ------------------------------
// START SERVER
// ------------------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
