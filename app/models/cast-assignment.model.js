const mongoose = require("mongoose");

const castAssignmentSchema = new mongoose.Schema({
  name: String,
  playId: { type: mongoose.Schema.Types.ObjectId, ref: "Play" },
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: "Actor" },
});

module.exports = mongoose.model("CastAssignment", castAssignmentSchema);
