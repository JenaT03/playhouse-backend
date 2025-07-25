const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  code: String,
  upId: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile" },
});

module.exports = mongoose.model("Staff", staffSchema);
