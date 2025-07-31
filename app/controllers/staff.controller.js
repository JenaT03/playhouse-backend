const mongoose = require("mongoose");
const ApiError = require("../api-error.js");
const Staff = require("../models/staff.model.js");

exports.createStaff = async (req, res, next) => {
  const { code, upId } = req.body;

  if (!code || !upId) {
    return next(new ApiError(400, "Trường quan trọng không thể để trống!"));
  }
  if (!mongoose.Types.ObjectId.isValid(upId)) {
    return next(new ApiError(400, "ID đối tượng không hợp lệ!"));
  }

  try {
    const staff = await Staff.create({ code, upId });
    return res.send(staff);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi tạo đối tượng: " + err.message));
  }
};

exports.getAllStaffs = async (req, res, next) => {
  try {
    const staffs = await Staff.find({}).populate("upId");
    return res.send(staffs);
  } catch (err) {
    return next(
      new ApiError(500, "Lỗi khi lấy danh sách đối tượng: " + err.message)
    );
  }
};

exports.getStaffById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID đối tượng không hợp lệ!"));
  }

  try {
    const staff = await Staff.findById(req.params.id).populate("upId");
    if (!staff) {
      return next(new ApiError(404, "Không tìm thấy đối tượng với ID này!"));
    }
    return res.send(staff);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi lấy đối tượng: " + err.message));
  }
};

exports.updateStaff = async (req, res, next) => {
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
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      { code, upId },
      { new: true }
    ).populate("upId");
    if (!staff) {
      return next(new ApiError(404, "Không tìm thấy đối tượng với ID này!"));
    }
    return res.send(staff);
  } catch (err) {
    return next(
      new ApiError(500, "Lỗi khi cập nhật đối tượng: " + err.message)
    );
  }
};

exports.deleteStaff = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID đối tượng không hợp lệ!"));
  }

  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) {
      return next(new ApiError(404, "Không tìm thấy đối tượng với ID này!"));
    }
    return res.send({ message: "Xóa đối tượng thành công!" });
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi xóa đối tượng: " + err.message));
  }
};
