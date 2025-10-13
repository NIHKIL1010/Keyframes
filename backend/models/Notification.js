


const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    type: { type: String, enum: ["global", "personal"], required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.type === "personal"; // required only for personal notifications
      },
    },
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ], // optional: track which users have read this notification
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
