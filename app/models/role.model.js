const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  code: String,
  name: String,
  group: String,
  isActive: Boolean,
  perIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
});

module.exports = mongoose.model("Role", roleSchema);
