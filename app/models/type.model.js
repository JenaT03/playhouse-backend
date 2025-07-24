const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  name: String,
  isActive: Boolean,
});

module.exports = mongoose.model("Type", typeSchema);
