const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  content: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  playId: { type: mongoose.Schema.Types.ObjectId, ref: "Play", required: true },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
