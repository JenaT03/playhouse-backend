const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  roleIds: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  ],
});

module.exports = mongoose.model("Account", accountSchema);
