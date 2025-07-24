const mongoose = require("mongoose");

const rowSchema = new mongoose.Schema({
  character: String,
});

module.exports = mongoose.model("Row", rowSchema);
