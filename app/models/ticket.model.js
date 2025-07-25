const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    code: String,
    status: String,
    price: String,
    qr: String,
    isActive: Boolean,
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "UserInfo" },
    soldBy: { type: mongoose.Schema.Types.ObjectId, ref: "UserInfo" },
    guestInfo: {
      name: String,
      phone: String,
    },
  },
  {
    timestamps: { createdAt: "create_At", updatedAt: "update_At" },
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
