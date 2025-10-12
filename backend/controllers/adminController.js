const User = require("../models/User");
const Notification = require("../models/Notification");

// =========================
// GET ALL USERS
// =========================
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude passwords
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Get Users Error:", err.message);
    res.status(500).json({ message: "Server error fetching users" });
  }
};

// =========================
// GET DASHBOARD INSIGHTS
// =========================
exports.getInsights = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isBlocked: false });
    const blockedUsers = await User.countDocuments({ isBlocked: true });

    // Fetch last 10 activities (for demo purposes)
    const recentActivities = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("user", "name email"); // only needed for personal notifications

    const formattedActivities = recentActivities.map((act) => ({
      _id: act._id,
      action: act.type === "global" ? "Sent Global Notification" : "Sent Personal Notification",
      performedBy: { name: req.user.name, email: req.user.email }, // admin performing action
      user: act.user ? { name: act.user.name, email: act.user.email } : { name: "All Users", email: "" },
    }));

    res.status(200).json({
      totalUsers,
      activeUsers,
      blockedUsers,
      recentActivities: formattedActivities,
    });
  } catch (err) {
    console.error("❌ Get Insights Error:", err.message);
    res.status(500).json({ message: "Server error fetching insights" });
  }
};

// =========================
// GET NOTIFICATIONS
// =========================
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email"); // only for personal notifications
    res.status(200).json(notifications);
  } catch (err) {
    console.error("❌ Get Notifications Error:", err.message);
    res.status(500).json({ message: "Server error fetching notifications" });
  }
};

// =========================
// BLOCK/UNBLOCK USER
// =========================
exports.blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBlocked = !user.isBlocked; // toggle
    await user.save();
    res.status(200).json({ message: `User ${user.isBlocked ? "blocked" : "unblocked"}` });
  } catch (err) {
    console.error("❌ Block User Error:", err.message);
    res.status(500).json({ message: "Server error blocking/unblocking user" });
  }
};

// =========================
// TOGGLE USER ROLE
// =========================
exports.toggleRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = user.role === "user" ? "admin" : "user";
    await user.save();
    res.status(200).json({ message: `User role changed to ${user.role}` });
  } catch (err) {
    console.error("❌ Toggle Role Error:", err.message);
    res.status(500).json({ message: "Server error changing user role" });
  }
};

// =========================
// SEND NOTIFICATION
// =========================
exports.sendNotification = async (req, res) => {
  try {
    const { message } = req.body;
    const { userId } = req.params;

    if (userId) {
      // Personal Notification
      const personalNotification = await Notification.create({
        message,
        type: "personal",
        user: userId,
      });
      res.status(201).json(personalNotification);
    } else {
      // Global Notification
      const globalNotification = await Notification.create({
        message,
        type: "global",
      });
      res.status(201).json(globalNotification);
    }
  } catch (err) {
    console.error("❌ Send Notification Error:", err.message);
    res.status(500).json({ message: "Server error sending notification" });
  }
};
