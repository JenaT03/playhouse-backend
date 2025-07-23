const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema(
  {
    name: String,
    isActive: Boolean,
  },
  {
    timestamps: { createdAt: "create_At", updatedAt: "update_At" },
  }
);

module.exports = mongoose.model("Type", typeSchema);
