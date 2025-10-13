

// const express = require("express");
// const router = express.Router();
// const Notification = require("../models/Notification");
// const { verifyAdmin } = require("../middleware/authMiddleware");

// // ---------------- GLOBAL NOTIFICATION ----------------
// router.post("/global", verifyAdmin, async (req, res) => {
//   try {
//     const { message } = req.body;
//     if (!message)
//       return res.status(400).json({ success: false, error: "Message required" });

//     const notification = new Notification({
//       message,
//       type: "global",
//     });
//     await notification.save();

//     // Emit to all connected users
//     if (req.io) {
//       req.io.emit("new-notification", {
//         ...notification.toObject(),
//         user: null,
//       });
//     }

//     res.status(201).json({ success: true, notification });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // ---------------- PERSONAL NOTIFICATION ----------------
// router.post("/personal/:userId", verifyAdmin, async (req, res) => {
//   try {
//     const { message } = req.body;
//     const { userId } = req.params;
//     if (!message || !userId)
//       return res
//         .status(400)
//         .json({ success: false, error: "Message & userId required" });

//     const notification = new Notification({
//       message,
//       type: "personal",
//       user: userId,
//     });
//     await notification.save();

//     // Emit only to the specific user (via room)
//     if (req.io) {
//       req.io.to(userId).emit("new-notification", notification);
//     }

//     res.status(201).json({ success: true, notification });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // ---------------- FETCH NOTIFICATIONS ----------------
// router.get("/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const notifications = await Notification.find({
//       $or: [
//         { type: "global" },
//         { type: "personal", user: userId },
//       ],
//     }).sort({ createdAt: -1 });

//     res.json({ success: true, notifications });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const { verifyAdmin } = require("../middleware/authMiddleware");

// ---------------- GLOBAL NOTIFICATION ----------------
router.post("/global", verifyAdmin, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message)
      return res.status(400).json({ success: false, error: "Message required" });

    const notification = new Notification({ message, type: "global" });
    await notification.save();

    if (req.io) {
      req.io.emit("new-notification", { ...notification.toObject(), user: null });
    }

    res.status(201).json({ success: true, notification });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------- PERSONAL NOTIFICATION ----------------
router.post("/personal/:userId", verifyAdmin, async (req, res) => {
  try {
    const { message } = req.body;
    const { userId } = req.params;
    if (!message || !userId)
      return res.status(400).json({ success: false, error: "Message & userId required" });

    const notification = new Notification({ message, type: "personal", user: userId });
    await notification.save();

    if (req.io) {
      req.io.to(userId).emit("new-notification", notification);
    }

    res.status(201).json({ success: true, notification });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------- FETCH NOTIFICATIONS ----------------
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({
      $or: [
        { type: "global" },
        { type: "personal", user: userId },
      ],
    })
      .sort({ createdAt: -1 });

    res.json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
