const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../api-error");
const Account = require("../models/account.model.js");
const Role = require("../models/role.model.js");

exports.createAccount = async (req, res, next) => {
  const { phone, email, password, avatar, isActive, roleIds } = req.body;

  if (!phone || !password || !roleIds) {
    return next(new ApiError(400, "Không thể để trống các trường quan trọng!"));
  }

  if (
    !Array.isArray(roleIds) ||
    !roleIds.every((id) => mongoose.Types.ObjectId.isValid(id))
  ) {
    return next(new ApiError(400, "ID vai trò không hợp lệ!"));
  }

  try {
    const role = await Role.findById(roleIds);
    if (!role) {
      return next(new ApiError(404, "Vai trò không tồn tại!"));
    }

    const existedAccount = await Account.findOne({ phone });
    if (existedAccount) {
      console.log("Existed account:", existedAccount);
      return next(new ApiError(400, "Số điện thoại đã được sử dụng!"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const account = await Account.create({
      phone,
      email,
      password: hashedPassword,
      avatar,
      isActive,
      roleIds,
    });
    return res.send(account);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi tạo tài khoản: " + err.message));
  }
};

exports.login = async (req, res, next) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return next(
      new ApiError(400, "Số điện thoại và mật khẩu không thể để trống!")
    );
  }
  try {
    const account = await Account.findOne({ phone });
    if (!account) {
      return next(new ApiError(404, "Tài khoản không tồn tại!"));
    }
    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      return next(new ApiError(401, "Mật khẩu không chính xác!"));
    }
    const token = jwt.sign(
      { id: account._id, roles: account.roleIds },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res.send({
      message: "Đăng nhập thành công!",
      token,
      account: {
        id: account._id,
        phone: account.phone,
        email: account.email,
        avatar: account.avatar,
        isActive: account.isActive,
        roleIds: account.roleIds,
      },
    });
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi đăng nhập: " + err.message));
  }
};

exports.logout = (req, res) => {
  // Xóa token khỏi client (thường là xóa cookie hoặc localStorage)
  res.send({ message: "Đăng xuất thành công!" });
};

exports.getAllAccounts = async (req, res, next) => {
  try {
    const accounts = await Account.find({}).populate("roleIds");
    return res.send(accounts);
  } catch (err) {
    return next(
      new ApiError(500, "Lỗi khi lấy danh sách tài khoản: " + err.message)
    );
  }
};

exports.getAccountById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID tài khoản không hợp lệ!"));
  }

  try {
    const account = await Account.findById(req.params.id).populate("roleIds");
    if (!account) {
      return next(new ApiError(404, "Không tìm thấy tài khoản với ID này!"));
    }
    return res.send(account);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi lấy tài khoản: " + err.message));
  }
};

exports.updateAccount = async (req, res, next) => {
  const { phone, email, password, avatar, isActive, roleIds } = req.body;

  if (!phone || !password || !roleIds) {
    return next(new ApiError(400, "Không thể để trống các trường quan trọng!"));
  }

  if (
    !Array.isArray(roleIds) ||
    !roleIds.every((id) => mongoose.Types.ObjectId.isValid(id))
  ) {
    return next(new ApiError(400, "ID vai trò không hợp lệ!"));
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID tài khoản không hợp lệ!"));
  }

  try {
    const role = await Role.findById(roleIds);
    if (!role) {
      return next(new ApiError(404, "Vai trò không tồn tại!"));
    }

    const existedAccount = await Account.findOne({
      phone,
      _id: { $ne: req.params.id },
    });
    if (existedAccount) {
      console.log("Existed account:", existedAccount);
      return next(new ApiError(400, "Số điện thoại đã được sử dụng!"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const account = await Account.findByIdAndUpdate(
      req.params.id,
      {
        phone,
        email,
        password: hashedPassword,
        avatar,
        isActive,
        roleIds,
      },
      { new: true }
    );
    if (!account) {
      return next(new ApiError(404, "Không tìm thấy tài khoản với ID này!"));
    }
    return res.send(account);
  } catch (err) {
    return next(
      new ApiError(500, "Lỗi khi cập nhật tài khoản: " + err.message)
    );
  }
};

exports.deleteAccount = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID tài khoản không hợp lệ!"));
  }

  try {
    const account = await Account.findByIdAndDelete(req.params.id);
    if (!account) {
      return next(new ApiError(404, "Không tìm thấy tài khoản với ID này!"));
    }
    return res.send({ message: "Tài khoản đã được xóa thành công!" });
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi xóa tài khoản: " + err.message));
  }
};
