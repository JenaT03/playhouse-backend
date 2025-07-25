const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
  {
    code: String,
    date: Date,
    starttime: String,
    endtime: String,
    isActive: Boolean,
    price: {
      vip: String,
      standard: String,
      balcony: String,
    },
    playId: { type: mongoose.Schema.Types.ObjectId, ref: "Play" },
  },
  {
    timestamps: { createdAt: "create_At", updatedAt: "update_At" },
  }
);

module.exports = mongoose.model("Show", showSchema);
