const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  quote: {
    type: String,
  },
  isSuper: {
    type: Boolean,
    default: false,
  },
  upId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
    required: true,
  },
});

module.exports = mongoose.model("Actor", actorSchema);
