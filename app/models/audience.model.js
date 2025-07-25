const mongoose = require("mongoose");

const audienceSchema = new mongoose.Schema({
  code: String,
  upId: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile" },
});

module.exports = mongoose.model("Audience", audienceSchema);
