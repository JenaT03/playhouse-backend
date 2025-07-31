const mongoose = require("mongoose");
const ApiError = require("../api-error");
const Feedback = require("../models/feedback.model.js");

exports.createFeedback = async (req, res, next) => {
  const { content, rating, isActive, playId, accountId } = req.body;
  if (!playId || !accountId || !rating) {
    return next(new ApiError(400, "Trường quan trọng không thể để trống!"));
  }
  if (
    !mongoose.Types.ObjectId.isValid(playId) ||
    !mongoose.Types.ObjectId.isValid(accountId)
  ) {
    return next(new ApiError(400, "ID vở kịch hoặc người dùng không hợp lệ!"));
  }
  try {
    const feedback = await Feedback.create({
      content,
      rating,
      isActive,
      playId,
      accountId,
    });
    return res.send(feedback);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi tạo phản hồi: " + err.message));
  }
};

exports.getAllFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find({}).populate("playId accountId");
    return res.send(feedbacks);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi lấy phản hồi: " + err.message));
  }
};

exports.getFeedbackById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID phản hồi không hợp lệ!"));
  }
  try {
    const feedback = await Feedback.findById(req.params.id).populate(
      "playId accountId"
    );
    if (!feedback) {
      return next(new ApiError(404, "Phản hồi không tìm thấy!"));
    }
    return res.send(feedback);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi lấy phản hồi: " + err.message));
  }
};

exports.updateFeedback = async (req, res, next) => {
  const { content, rating, isActive, playId, accountId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID phản hồi không hợp lệ!"));
  }
  if (!playId || !accountId || !rating) {
    return next(new ApiError(400, "Trường quan trọng không thể để trống!"));
  }
  if (
    !mongoose.Types.ObjectId.isValid(playId) ||
    !mongoose.Types.ObjectId.isValid(accountId)
  ) {
    return next(new ApiError(400, "ID vở kịch hoặc người dùng không hợp lệ!"));
  }
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { content, rating, isActive, playId, accountId },
      { new: true }
    ).populate("playId accountId");
    if (!feedback) {
      return next(new ApiError(404, "Phản hồi không tìm thấy!"));
    }
    return res.send(feedback);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi cập nhật phản hồi: " + err.message));
  }
};

exports.deleteFeedback = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID phản hồi không hợp lệ!"));
  }
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return next(new ApiError(404, "Phản hồi không tìm thấy!"));
    }
    return res.send({ message: "Phản hồi đã được xóa thành công!" });
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi xóa phản hồi: " + err.message));
  }
};
