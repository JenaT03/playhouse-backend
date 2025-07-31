const mongoose = require("mongoose");
const ApiError = require("../api-error");
const Ticket = require("../models/ticket.model.js");

exports.createTicket = async (req, res, next) => {
  const {
    code,
    status,
    price,
    qr,
    isActive,
    buyer,
    soldBy,
    guestInfo,
    showId,
    seat,
  } = req.body;
  if (!code || !qr || !showId || !seat || !price) {
    return next(new ApiError(400, "Trường quan trọng không thể để trống!"));
  }
  if (
    !mongoose.Types.ObjectId.isValid(showId) ||
    !mongoose.Types.ObjectId.isValid(seat)
  ) {
    return next(new ApiError(400, "ID ghế, buổi diễn không hợp lệ!"));
  }
  try {
    const ticket = await Ticket.create({
      code,
      status,
      price,
      qr,
      isActive,
      buyer,
      soldBy,
      guestInfo,
      showId,
      seat,
    });
    return res.send(ticket);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi tạo vé: " + err.message));
  }
};

exports.getAllTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({}).populate("showId seat buyer soldBy");
    return res.send(tickets);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi lấy vé: " + err.message));
  }
};

exports.getTicketById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID vé không hợp lệ!"));
  }
  try {
    const ticket = await Ticket.findById(req.params.id).populate(
      "showId seat buyer soldBy"
    );
    if (!ticket) {
      return next(new ApiError(404, "Vé không tìm thấy!"));
    }
    return res.send(ticket);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi lấy vé: " + err.message));
  }
};

exports.updateTicket = async (req, res, next) => {
  const {
    code,
    status,
    price,
    qr,
    isActive,
    buyer,
    soldBy,
    guestInfo,
    showId,
    seat,
  } = req.body;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID vé không hợp lệ!"));
  }
  if (!code || !qr || !showId || !seat || !price) {
    return next(new ApiError(400, "Trường quan trọng không thể để trống!"));
  }
  if (
    !mongoose.Types.ObjectId.isValid(showId) ||
    !mongoose.Types.ObjectId.isValid(seat)
  ) {
    return next(new ApiError(400, "ID ghế, buổi diễn không hợp lệ!"));
  }
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        code,
        status,
        price,
        qr,
        isActive,
        buyer,
        soldBy,
        guestInfo,
        showId,
        seat,
      },
      { new: true }
    );
    if (!updatedTicket) {
      return next(new ApiError(404, "Vé không tìm thấy!"));
    }
    return res.send(updatedTicket);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi cập nhật vé: " + err.message));
  }
};

exports.deleteTicket = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID vé không hợp lệ!"));
  }
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return next(new ApiError(404, "Vé không tìm thấy!"));
    }
    return res.send({ message: "Xóa vé thành công!" });
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi xóa vé: " + err.message));
  }
};
