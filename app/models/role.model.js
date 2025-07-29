const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  perIds: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Permission", required: true },
  ],
});

module.exports = mongoose.model("Role", roleSchema);
