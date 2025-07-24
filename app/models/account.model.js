const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  phone: String,
  email: String,
  password: String,
  avatar: String,
  isActive: Boolean,
  roleIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
});

module.exports = mongoose.model("Account", accountSchema);
