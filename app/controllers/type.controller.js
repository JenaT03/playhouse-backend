const mongoose = require("mongoose");
const ApiError = require("../api-error");
const Type = require("../models/type.model.js");

exports.createType = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Tên thể loại không thể để trống!"));
  }

  let { name, isActive } = req.body;

  try {
    let type = await Type.create({ name, isActive });
    return res.send(type);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi tạo thể loại: " + err.message));
  }
};

exports.getAllTypes = async (req, res, next) => {
  try {
    let types = await Type.find({});
    return res.send(types);
  } catch (err) {
    return next(
      new ApiError(500, "Lỗi khi lấy danh sách thể loại: " + err.message)
    );
  }
};

exports.getTypeById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID thể loại không hợp lệ!"));
  }

  try {
    let type = await Type.findById(req.params.id);
    if (!type) {
      return next(new ApiError(404, "Không tìm thấy thể loại với ID này!"));
    }
    return res.send(type);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi lấy thể loại: " + err.message));
  }
};

exports.updateType = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID thể loại không hợp lệ!"));
  }

  if (!req.body?.name) {
    return next(new ApiError(400, "Tên thể loại không thể để trống!"));
  }

  let { name, isActive } = req.body;

  try {
    let type = await Type.findByIdAndUpdate(
      req.params.id,
      { name, isActive },
      { new: true }
    );
    if (!type) {
      return next(new ApiError(404, "Không tìm thấy thể loại với ID này!"));
    }
    return res.send(type);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi cập nhật thể loại: " + err.message));
  }
};

exports.deleteType = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID thể loại không hợp lệ!"));
  }

  try {
    let type = await Type.findByIdAndDelete(req.params.id);
    if (!type) {
      return next(new ApiError(404, "Không tìm thấy thể loại với ID này!"));
    }
    return res.send({ message: "Xóa thể loại thành công!" });
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi xóa thể loại: " + err.message));
  }
};
