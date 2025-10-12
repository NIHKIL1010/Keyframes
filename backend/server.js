
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");
// const http = require("http");

// dotenv.config();

// const app = express();
// const server = http.createServer(app);

// // ------------------------------
// // SOCKET.IO
// // ------------------------------
// const io = require("socket.io")(server, {
//   cors: { origin: "http://localhost:3000" },
// });

// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// // ------------------------------
// // MIDDLEWARE
// // ------------------------------
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(express.json());

// // ------------------------------
// // ROUTES
// // ------------------------------
// const authRoutes = require("./routes/auth");
// const userRoutes = require("./routes/user");
// const contactRoutes = require("./routes/contacts");
// const adminRoutes = require("./routes/admin");
// const notificationRoutes = require("./routes/notifications");

// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/contacts", contactRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/notifications", notificationRoutes);

// // ------------------------------
// // DATABASE CONNECTION
// // ------------------------------
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB connected successfully"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// // ------------------------------
// // TEST ROUTE
// // ------------------------------
// app.get("/", (req, res) => res.send("✅ Backend server running!"));

// // ------------------------------
// // START SERVER
// // ------------------------------
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

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
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

app.use((req, res, next) => {
  req.io = io; // attach io to request
  next();
});

// ------------------------------
// MIDDLEWARE
// ------------------------------
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// ------------------------------
// ROUTES
// ------------------------------
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const contactRoutes = require("./routes/contacts");
const adminRoutes = require("./routes/admin");
const notificationRoutes = require("./routes/notifications");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);

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
// START SERVER
// ------------------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
