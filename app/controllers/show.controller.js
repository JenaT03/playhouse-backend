const mongoose = require("mongoose");
const ApiError = require("../api-error");
const Show = require("../models/show.model.js");
const SeatStatus = require("../models/seat-status.model.js");
const Seat = require("../models/seat.model.js");

exports.createShow = async (req, res, next) => {
  const { code, date, starttime, endtime, isActive, price, playId } = req.body;
  if (!code || !date || !starttime || !endtime || !playId) {
    return next(new ApiError(400, "Trường quan trọng không thể để trống!"));
  }
  if (
    !price ||
    !price.vip?.trim() ||
    !price.standard?.trim() ||
    !price.balcony?.trim()
  ) {
    return next(new ApiError(400, "Giá vé không thể để trống!"));
  }
  if (!mongoose.Types.ObjectId.isValid(playId)) {
    return next(new ApiError(400, "ID vở kịch không hợp lệ!"));
  }
  try {
    const show = await Show.create({
      code,
      date,
      starttime,
      endtime,
      isActive,
      price,
      playId,
    });

    // Tạo trạng thái ghế cho buổi diễn mới
    const seats = await Seat.find({});
    const seatStatuses = seats.map((seat) => ({
      seatId: seat._id,
      showId: show._id,
      status: "available", // Trạng thái ban đầu là "available"
      lockedBy: null,
    }));
    await SeatStatus.insertMany(seatStatuses);

    return res.send(show);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi tạo buổi diễn: " + err.message));
  }
};

exports.getAllShows = async (req, res, next) => {
  try {
    const shows = await Show.find({}).populate("playId");
    return res.send(shows);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi lấy buổi diễn: " + err.message));
  }
};

exports.getShowById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID buổi diễn không hợp lệ!"));
  }
  try {
    const show = await Show.findById(req.params.id).populate("playId");
    if (!show) {
      return next(new ApiError(404, "Buổi diễn không tìm thấy!"));
    }
    return res.send(show);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi lấy buổi diễn: " + err.message));
  }
};

exports.updateShow = async (req, res, next) => {
  const { code, date, starttime, endtime, isActive, price, playId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID buổi diễn không hợp lệ!"));
  }
  if (!code || !date || !starttime || !endtime || !playId) {
    return next(new ApiError(400, "Trường quan trọng không thể để trống!"));
  }
  if (
    !price ||
    !price.vip?.trim() ||
    !price.standard?.trim() ||
    !price.balcony?.trim()
  ) {
    return next(new ApiError(400, "Giá vé không thể để trống!"));
  }
  if (!mongoose.Types.ObjectId.isValid(playId)) {
    return next(new ApiError(400, "ID vở kịch không hợp lệ!"));
  }
  try {
    const updatedShow = await Show.findByIdAndUpdate(
      req.params.id,
      { code, date, starttime, endtime, isActive, price, playId },
      { new: true }
    ).populate("playId");
    if (!updatedShow) {
      return next(new ApiError(404, "Buổi diễn không tìm thấy!"));
    }
    return res.send(updatedShow);
  } catch (err) {
    return next(
      new ApiError(500, "Lỗi khi cập nhật buổi diễn: " + err.message)
    );
  }
};

exports.deleteShow = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID buổi diễn không hợp lệ!"));
  }
  try {
    const deletedShow = await Show.findByIdAndDelete(req.params.id);
    if (!deletedShow) {
      return next(new ApiError(404, "Buổi diễn không tìm thấy!"));
    }
    // Xóa trạng thái ghế liên quan đến buổi diễn
    await SeatStatus.deleteMany({ showId: req.params.id });
    return res.send({ message: "Buổi diễn đã được xóa thành công!" });
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi xóa buổi diễn: " + err.message));
  }
};
