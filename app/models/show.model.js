const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    starttime: {
      type: String,
      required: true,
    },
    endtime: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    price: {
      vip: {
        type: String,
        required: true,
      },
      standard: {
        type: String,
        required: true,
      },
      balcony: {
        type: String,
        required: true,
      },
    },
    playId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Play",
      required: true,
    },
  },
  {
    timestamps: { createdAt: "create_At", updatedAt: "update_At" },
  }
);

module.exports = mongoose.model("Show", showSchema);
