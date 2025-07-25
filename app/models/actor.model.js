const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
  code: String,
  description: String,
  quote: String,
  isSuper: Boolean,
  upId: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile" },
});

module.exports = mongoose.model("Actor", actorSchema);
