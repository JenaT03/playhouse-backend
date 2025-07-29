const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: String,
  gender: {
    type: String,
    required: true,
  },
  birth: Date,
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
});

module.exports = mongoose.model("UserProfile", profileSchema);
