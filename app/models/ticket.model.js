const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "used", "expired"],
      default: "available",
    },
    price: {
      type: String,
      required: true,
    },
    qr: {
      type: String,
      unique: true,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserInfo",
      required: true,
    },
    soldBy: { type: mongoose.Schema.Types.ObjectId, ref: "UserInfo" },
    guestInfo: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: { createdAt: "create_At", updatedAt: "update_At" },
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
