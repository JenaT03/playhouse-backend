const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  code: String,
  name: String,
  address: String,
  gender: String,
  birth: Date,
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
});

module.exports = mongoose.model("UserProfile", profileSchema);
