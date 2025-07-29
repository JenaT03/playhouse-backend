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
