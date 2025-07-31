const mongoose = require("mongoose");
const ApiError = require("../api-error");
const Row = require("../models/row.model.js");

exports.getAllRows = async (req, res, next) => {
  try {
    const rows = await Row.find({});
    return res.send(rows);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi lấy hàng: " + err.message));
  }
};

exports.getRowById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID hàng không hợp lệ!"));
  }
  try {
    const row = await Row.findById(req.params.id);
    if (!row) {
      return next(new ApiError(404, "Hàng không tìm thấy!"));
    }
    return res.send(row);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi lấy hàng: " + err.message));
  }
};
