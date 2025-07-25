const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  content: String,
  rating: Number,
  isActive: Boolean,
  playId: { type: mongoose.Schema.Types.ObjectId, ref: "Play" },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
