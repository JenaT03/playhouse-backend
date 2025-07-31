const mongoose = require("mongoose");
const ApiError = require("../api-error.js");
const Audience = require("../models/audience.model.js");

exports.createAudience = async (req, res, next) => {
  const { code, upId } = req.body;

  if (!code || !upId) {
    return next(new ApiError(400, "Trường quan trọng không thể để trống!"));
  }
  if (!mongoose.Types.ObjectId.isValid(upId)) {
    return next(new ApiError(400, "ID đối tượng không hợp lệ!"));
  }

  try {
    const audience = await Audience.create({ code, upId });
    return res.send(audience);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi tạo đối tượng: " + err.message));
  }
};

exports.getAllAudiences = async (req, res, next) => {
  try {
    const audiences = await Audience.find({}).populate("upId");
    return res.send(audiences);
  } catch (err) {
    return next(
      new ApiError(500, "Lỗi khi lấy danh sách đối tượng: " + err.message)
    );
  }
};

exports.getAudienceById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID đối tượng không hợp lệ!"));
  }

  try {
    const audience = await Audience.findById(req.params.id).populate("upId");
    if (!audience) {
      return next(new ApiError(404, "Không tìm thấy đối tượng với ID này!"));
    }
    return res.send(audience);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi lấy đối tượng: " + err.message));
  }
};

exports.updateAudience = async (req, res, next) => {
  const { code, upId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID đối tượng không hợp lệ!"));
  }

  if (!code || !upId) {
    return next(new ApiError(400, "Trường quan trọng không thể để trống!"));
  }

  if (!mongoose.Types.ObjectId.isValid(upId)) {
    return next(new ApiError(400, "ID đối tượng không hợp lệ!"));
  }

  try {
    const audience = await Audience.findByIdAndUpdate(
      req.params.id,
      { code, upId },
      { new: true }
    ).populate("upId");
    if (!audience) {
      return next(new ApiError(404, "Không tìm thấy đối tượng với ID này!"));
    }
    return res.send(audience);
  } catch (err) {
    return next(
      new ApiError(500, "Lỗi khi cập nhật đối tượng: " + err.message)
    );
  }
};

exports.deleteAudience = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID đối tượng không hợp lệ!"));
  }

  try {
    const audience = await Audience.findByIdAndDelete(req.params.id);
    if (!audience) {
      return next(new ApiError(404, "Không tìm thấy đối tượng với ID này!"));
    }
    return res.send({ message: "Xóa đối tượng thành công!" });
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi xóa đối tượng: " + err.message));
  }
};
