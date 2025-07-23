const mongoose = require("mongoose");

const playSchema = new mongoose.Schema(
  {
    code: String,
    title: String,
    description: String,
    img: String,
    content: String,
    isActive: Boolean,
    typeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Type" }],
  },
  {
    timestamps: { createdAt: "create_At", updatedAt: "update_At" },
  }
);

module.exports = mongoose.model("Play", playSchema);
