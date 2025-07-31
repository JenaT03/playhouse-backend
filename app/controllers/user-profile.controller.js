const mongoose = require("mongoose");
const ApiError = require("../api-error.js");
const UserProfile = require("../models/user-profile.model.js");

exports.createUserProfile = async (req, res, next) => {
  const { name, address, gender, birth, accountId } = req.body;

  if (!name || !accountId) {
    return next(new ApiError(400, "Các trường quan trọng không thể để trống!"));
  }
  if (!mongoose.Types.ObjectId.isValid(accountId)) {
    return next(new ApiError(400, "ID tài khoản không hợp lệ!"));
  }
  try {
    const userProfile = await UserProfile.create({
      name,
      address,
      gender,
      birth,
      accountId,
    });
    return res.send(userProfile);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi tạo đối tượng: " + err.message));
  }
};

exports.getAllUserProfiles = async (req, res, next) => {
  try {
    const userProfiles = await UserProfile.find({}).populate("accountId");
    return res.send(userProfiles);
  } catch (err) {
    return next(
      new ApiError(500, "Lỗi khi lấy danh sách đối tượng: " + err.message)
    );
  }
};

exports.getUserProfileById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID đối tượng không hợp lệ!"));
  }

  try {
    const userProfile = await UserProfile.findById(req.params.id).populate(
      "accountId"
    );
    if (!userProfile) {
      return next(new ApiError(404, "Không tìm thấy đối tượng với ID này!"));
    }
    return res.send(userProfile);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi lấy đối tượng: " + err.message));
  }
};

exports.updateUserProfile = async (req, res, next) => {
  const { name, address, gender, birth, accountId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID đối tượng không hợp lệ!"));
  }
  if (!mongoose.Types.ObjectId.isValid(accountId)) {
    return next(new ApiError(400, "ID tài khoản không hợp lệ!"));
  }
  if (!name || !accountId) {
    return next(new ApiError(400, "Các trường quan trọng không thể để trống!"));
  }
  try {
    const userProfile = await UserProfile.findByIdAndUpdate(
      req.params.id,
      { name, address, gender, birth, accountId },
      { new: true }
    ).populate("accountId");
    if (!userProfile) {
      return next(new ApiError(404, "Không tìm thấy đối tượng với ID này!"));
    }
    return res.send(userProfile);
  } catch (err) {
    return next(
      new ApiError(500, "Lỗi khi cập nhật đối tượng: " + err.message)
    );
  }
};

exports.deleteUserProfile = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID đối tượng không hợp lệ!"));
  }

  try {
    const userProfile = await UserProfile.findByIdAndDelete(req.params.id);
    if (!userProfile) {
      return next(new ApiError(404, "Không tìm thấy đối tượng với ID này!"));
    }
    return res.send({ message: "Đối tượng đã được xóa thành công!" });
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi xóa đối tượng: " + err.message));
  }
};
