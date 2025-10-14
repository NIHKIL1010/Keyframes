const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");

dotenv.config();

const app = express();
const server = http.createServer(app);

// ------------------------------
// SOCKET.IO
// ------------------------------
const { Server } = require("socket.io");

const allowedOrigins = [
  "http://localhost:3000",         // local dev
  "https://keyframes.vercel.app",  // deployed frontend
];

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
// CORS MIDDLEWARE
// ------------------------------
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman or mobile apps)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());

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
