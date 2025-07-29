const mongoose = require("mongoose");

const castAssignmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  playId: { type: mongoose.Schema.Types.ObjectId, ref: "Play", required: true },
  actorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Actor",
    required: true,
  },
});

module.exports = mongoose.model("CastAssignment", castAssignmentSchema);
