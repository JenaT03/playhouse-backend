const mongoose = require("mongoose");
const ApiError = require("../api-error");
const Seat = require("../models/seat.model.js");

exports.getAllSeats = async (req, res, next) => {
  try {
    const seats = await Seat.find({}).populate("rowId");
    return res.send(seats);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi lấy ghế: " + err.message));
  }
};

exports.getSeatById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID ghế không hợp lệ!"));
  }
  try {
    const seat = await Seat.findById(req.params.id).populate("rowId");
    if (!seat) {
      return next(new ApiError(404, "Ghế không tìm thấy!"));
    }
    return res.send(seat);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi lấy ghế: " + err.message));
  }
};
