const mongoose = require("mongoose");
const ApiError = require("../api-error");
const SeatStatus = require("../models/seat-status.model.js");

exports.getAllSeatStatuses = async (req, res, next) => {
  try {
    const seatStatuses = await SeatStatus.find({}).populate(
      "seatId showId lockedBy"
    );
    return res.send(seatStatuses);
  } catch (err) {
    return next(
      new ApiError(500, "Lỗi khi lấy trạng thái ghế: " + err.message)
    );
  }
};

exports.getSeatStatusById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID trạng thái ghế không hợp lệ!"));
  }
  try {
    const seatStatus = await SeatStatus.findById(req.params.id).populate(
      "seatId showId lockedBy"
    );
    if (!seatStatus) {
      return next(new ApiError(404, "Trạng thái ghế không tìm thấy!"));
    }
    return res.send(seatStatus);
  } catch (err) {
    return next(
      new ApiError(500, "Lỗi khi lấy trạng thái ghế: " + err.message)
    );
  }
};

exports.updateSeatStatus = async (req, res, next) => {
  const { seatId, showId, status, lockedBy } = req.body;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID trạng thái ghế không hợp lệ!"));
  }
  if (!seatId || !showId) {
    return next(new ApiError(400, "Ghế và buổi diễn không thể để trống!"));
  }
  if (
    !mongoose.Types.ObjectId.isValid(seatId) ||
    !mongoose.Types.ObjectId.isValid(showId)
  ) {
    return next(new ApiError(400, "ID ghế hoặc buổi diễn không hợp lệ!"));
  }
  try {
    const updatedSeatStatus = await SeatStatus.findByIdAndUpdate(
      req.params.id,
      { seatId, showId, status, lockedBy },
      { new: true }
    ).populate("seatId showId lockedBy");
    if (!updatedSeatStatus) {
      return next(new ApiError(404, "Trạng thái ghế không tìm thấy!"));
    }
    return res.send(updatedSeatStatus);
  } catch (err) {
    return next(
      new ApiError(500, "Lỗi khi cập nhật trạng thái ghế: " + err.message)
    );
  }
};
