const mongoose = require("mongoose");
const ApiError = require("../api-error");
const Role = require("../models/role.model.js");
const Permission = require("../models/permission.model.js");

exports.createRole = async (req, res, next) => {
  const { code, group, name, perIds } = req.body;

  if (!code || !name || !group) {
    return next(new ApiError(400, "Không thể để trống các trường quan trọng!"));
  }

  if (
    !Array.isArray(perIds) ||
    !perIds.every((id) => mongoose.Types.ObjectId.isValid(id))
  ) {
    return next(new ApiError(400, "Danh sách quyền không hợp lệ!"));
  }

  try {
    const role = await Role.create({ code, group, name, perIds });
    return res.send(role);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi tạo vai trò: " + err.message));
  }
};

exports.getAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.find({}).populate("perIds");
    return res.send(roles);
  } catch (err) {
    return next(
      new ApiError(500, "Lỗi khi lấy danh sách vai trò: " + err.message)
    );
  }
};

exports.getRoleById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID vai trò không hợp lệ!"));
  }

  try {
    const role = await Role.findById(req.params.id).populate("perIds");
    if (!role) {
      return next(new ApiError(404, "Không tìm thấy vai trò với ID này!"));
    }
    return res.send(role);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi lấy vai trò: " + err.message));
  }
};

exports.updateRole = async (req, res, next) => {
  const { code, group, name, perIds } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID vai trò không hợp lệ!"));
  }

  if (!code || !name || !group) {
    return next(new ApiError(400, "Không thể để trống các trường quan trọng!"));
  }

  if (
    !Array.isArray(perIds) ||
    !perIds.every((id) => mongoose.Types.ObjectId.isValid(id))
  ) {
    return next(new ApiError(400, "Danh sách quyền không hợp lệ!"));
  }

  try {
    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { code, group, name, perIds },
      { new: true }
    ).populate("perIds");
    if (!role) {
      return next(new ApiError(404, "Không tìm thấy vai trò với ID này!"));
    }
    return res.send(role);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi cập nhật vai trò: " + err.message));
  }
};

exports.deleteRole = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID vai trò không hợp lệ!"));
  }

  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) {
      return next(new ApiError(404, "Không tìm thấy vai trò với ID này!"));
    }
    return res.send({ message: "Vai trò đã được xóa thành công!" });
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi xóa vai trò: " + err.message));
  }
};
