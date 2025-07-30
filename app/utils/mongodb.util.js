const mongoose = require("mongoose");

class MongoDB {
  static async connect(uri) {
    if (this.connection) return this.connection;
    this.connection = await mongoose.connect(uri);
    return this.connection;
  }
}

module.exports = MongoDB;
