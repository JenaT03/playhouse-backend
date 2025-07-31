const mongoose = require("mongoose");

const seatStatusSchema = new mongoose.Schema({
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Show",
    required: true,
  },
  seatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seat",
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "locked", "booked"],
    default: "available",
  },
  lockedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

module.exports = mongoose.model("SeatStatus", seatStatusSchema);
