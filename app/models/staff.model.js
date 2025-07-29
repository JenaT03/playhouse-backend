const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  upId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
    required: true,
  },
});

module.exports = mongoose.model("Staff", staffSchema);
