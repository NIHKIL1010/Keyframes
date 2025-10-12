const mongoose = require("mongoose");

const ActivityLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // admin who performed the action
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // target user
}, { timestamps: true });

module.exports = mongoose.model("ActivityLog", ActivityLogSchema);
