const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
  name: String,
  group: String,
});

module.exports = mongoose.model("Permission", permissionSchema);
