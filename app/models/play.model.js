const mongoose = require("mongoose");

const playSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    typeIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Type", required: true },
    ],
  },
  {
    timestamps: { createdAt: "create_At", updatedAt: "update_At" },
  }
);

module.exports = mongoose.model("Play", playSchema);
