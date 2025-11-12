// const router = require("express").Router();
// const User = require("../models/User");
// const Notification = require("../models/Notification");
// const ActivityLog = require("../models/ActivityLog"); // For recent activity logs
// const adminMiddleware = require("../middleware/adminMiddleware");

// // GET all users (for admin dashboard)
// router.get("/users", adminMiddleware, async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Block/Unblock user
// router.patch("/users/:id/block", adminMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.isBlocked = !user.isBlocked; // toggle block status
//     await user.save();

//     // Log action
//     await ActivityLog.create({
//       action: user.isBlocked ? "Blocked user" : "Unblocked user",
//       performedBy: req.user.id,
//       user: user._id
//     });

//     res.json({ message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully` });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Change user role
// router.patch("/users/:id/role", adminMiddleware, async (req, res) => {
//   try {
//     const { role } = req.body;
//     if (!["user", "admin"].includes(role)) {
//       return res.status(400).json({ message: "Invalid role" });
//     }

//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.role = role;
//     await user.save();

//     // Log action
//     await ActivityLog.create({
//       action: `Changed role to ${role}`,
//       performedBy: req.user.id,
//       user: user._id
//     });

//     res.json({ message: "Role updated successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Delete user
// router.delete("/users/:id", adminMiddleware, async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Log action
//     await ActivityLog.create({
//       action: "Deleted user",
//       performedBy: req.user.id,
//       user: user._id
//     });

//     res.json({ message: "User deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Send global notification
// router.post("/notifications/global", adminMiddleware, async (req, res) => {
//   try {
//     const { message } = req.body;
//     if (!message) return res.status(400).json({ message: "Message is required" });

//     const notification = new Notification({ message, type: "global" });
//     await notification.save();

//     res.json({ message: "Global notification sent" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Send personal notification
// router.post("/notifications/personal/:userId", adminMiddleware, async (req, res) => {
//   try {
//     const { message } = req.body;
//     const { userId } = req.params;
//     if (!message) return res.status(400).json({ message: "Message is required" });

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const notification = new Notification({ message, type: "personal", user: userId });
//     await notification.save();

//     res.json({ message: "Personal notification sent" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // GET all notifications (for admin dashboard)
// router.get("/notifications", adminMiddleware, async (req, res) => {
//   try {
//     const notifications = await Notification.find()
//       .populate("user", "name email") // show name/email for personal notifications
//       .sort({ createdAt: -1 });
//     res.json(notifications);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // GET dashboard insights
// router.get("/insights", adminMiddleware, async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     const blockedUsers = await User.countDocuments({ isBlocked: true });
//     const activeUsers = totalUsers - blockedUsers;

//     const recentActivities = await ActivityLog.find()
//       .populate("performedBy", "name email")
//       .populate("user", "name email")
//       .sort({ createdAt: -1 })
//       .limit(10);

//     res.json({ totalUsers, activeUsers, blockedUsers, recentActivities });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Notification = require("../models/Notification");
const ActivityLog = require("../models/ActivityLog");
const adminMiddleware = require("../middleware/adminMiddleware");

// GET all users (for admin dashboard)
router.get("/users", adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Block/Unblock user
router.patch("/users/:id/block", adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBlocked = !user.isBlocked;
    await user.save();

    await ActivityLog.create({
      action: user.isBlocked ? "Blocked user" : "Unblocked user",
      performedBy: req.user.id,
      user: user._id,
    });

    res.status(200).json({ message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully` });
  } catch (err) {
    console.error("Error blocking user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Change user role
router.patch("/users/:id/role", adminMiddleware, async (req, res) => {
  try {
    const { role } = req.body;
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    await ActivityLog.create({
      action: `Changed role to ${role}`,
      performedBy: req.user.id,
      user: user._id,
    });

    res.status(200).json({ message: "Role updated successfully" });
  } catch (err) {
    console.error("Error updating user role:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete user
router.delete("/users/:id", adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await ActivityLog.create({
      action: "Deleted user",
      performedBy: req.user.id,
      user: user._id,
    });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Send global notification
router.post("/notifications/global", adminMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: "Message is required" });

    const notification = new Notification({ message, type: "global" });
    await notification.save();

    res.status(200).json({ message: "Global notification sent" });
  } catch (err) {
    console.error("Error sending global notification:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Send personal notification
router.post("/notifications/personal/:userId", adminMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    const { userId } = req.params;
    if (!message) return res.status(400).json({ message: "Message is required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const notification = new Notification({ message, type: "personal", user: userId });
    await notification.save();

    res.status(200).json({ message: "Personal notification sent" });
  } catch (err) {
    console.error("Error sending personal notification:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all notifications (for admin dashboard)
router.get("/notifications", adminMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET dashboard insights
router.get("/insights", adminMiddleware, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const blockedUsers = await User.countDocuments({ isBlocked: true });
    const activeUsers = totalUsers - blockedUsers;

    const recentActivities = await ActivityLog.find()
      .populate("performedBy", "name email")
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({ totalUsers, activeUsers, blockedUsers, recentActivities });
  } catch (err) {
    console.error("Error fetching insights:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
