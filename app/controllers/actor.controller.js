const mongoose = require("mongoose");
const ApiError = require("../api-error.js");
const Actor = require("../models/actor.model.js");

exports.createActor = async (req, res, next) => {
  const { code, description, quote, isSuper, upId } = req.body;
  if (!code || !upId) {
    return next(new ApiError(400, "Trường quan trọng không thể để trống!"));
  }
  if (!mongoose.Types.ObjectId.isValid(upId)) {
    return next(new ApiError(400, "ID đối tượng không hợp lệ!"));
  }
  try {
    const actor = await Actor.create({
      code,
      description,
      quote,
      isSuper,
      upId,
    });
    return res.send(actor);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi tạo diễn viên: " + err.message));
  }
};

exports.getAllActors = async (req, res, next) => {
  try {
    const actors = await Actor.find({}).populate("upId");
    return res.send(actors);
  } catch (err) {
    return next(
      new ApiError(500, "Lỗi khi lấy danh sách diễn viên: " + err.message)
    );
  }
};

exports.getActorById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID diễn viên không hợp lệ!"));
  }

  try {
    const actor = await Actor.findById(req.params.id).populate("upId");
    if (!actor) {
      return next(new ApiError(404, "Không tìm thấy diễn viên với ID này!"));
    }
    return res.send(actor);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi lấy diễn viên: " + err.message));
  }
};

exports.updateActor = async (req, res, next) => {
  const { code, description, quote, isSuper, upId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID diễn viên không hợp lệ!"));
  }

  if (!code || !upId) {
    return next(new ApiError(400, "Trường quan trọng không thể để trống!"));
  }

  try {
    const actor = await Actor.findByIdAndUpdate(
      req.params.id,
      { code, description, quote, isSuper, upId },
      { new: true }
    );
    if (!actor) {
      return next(new ApiError(404, "Không tìm thấy diễn viên với ID này!"));
    }
    return res.send(actor);
  } catch (err) {
    return next(
      new ApiError(500, "Lỗi khi cập nhật diễn viên: " + err.message)
    );
  }
};

exports.deleteActor = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID diễn viên không hợp lệ!"));
  }

  try {
    const actor = await Actor.findByIdAndDelete(req.params.id);
    if (!actor) {
      return next(new ApiError(404, "Không tìm thấy diễn viên với ID này!"));
    }
    return res.send({ message: "Diễn viên đã được xóa thành công!" });
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi xóa diễn viên: " + err.message));
  }
};
