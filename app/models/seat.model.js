const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  number: Number,
  type: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  rowId: { type: mongoose.Schema.Types.ObjectId, ref: "Row" },
});

module.exports = mongoose.model("Seat", seatSchema);
