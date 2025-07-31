const mongoose = require("mongoose");
const ApiError = require("../api-error");
const Play = require("../models/play.model.js");

exports.createPlay = async (req, res, next) => {
  const {
    code,
    title,
    description,
    img,
    content,
    isActive,
    typeIds,
    actorIds,
  } = req.body;
  if (
    !code ||
    !title ||
    !description ||
    !img ||
    !content ||
    !typeIds ||
    !actorIds
  ) {
    return next(new ApiError(400, "Trường quan trọng không thể để trống!"));
  }
  if (!Array.isArray(typeIds) || !Array.isArray(actorIds)) {
    return next(
      new ApiError(400, "Danh sách loại hoặc diễn viên không hợp lệ!")
    );
  }
  if (
    !typeIds.every((id) => mongoose.Types.ObjectId.isValid(id)) ||
    !actorIds.every((id) => mongoose.Types.ObjectId.isValid(id))
  ) {
    return next(new ApiError(400, "ID loại hoặc diễn viên không hợp lệ!"));
  }
  try {
    const play = await Play.create({
      code,
      title,
      description,
      img,
      content,
      isActive,
      typeIds,
      actorIds,
    });
    return res.send(play);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi tạo vở kịch: " + err.message));
  }
};

exports.getAllPlays = async (req, res, next) => {
  try {
    const plays = await Play.find({}).populate("typeIds actorIds");
    return res.send(plays);
  } catch (err) {
    return next(
      new ApiError(500, "Lỗi khi lấy danh sách vở kịch: " + err.message)
    );
  }
};

exports.getPlayById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID vở kịch không hợp lệ!"));
  }

  try {
    const play = await Play.findById(req.params.id).populate(
      "typeIds actorIds"
    );
    if (!play) {
      return next(new ApiError(404, "Không tìm thấy vở kịch với ID này!"));
    }
    return res.send(play);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi lấy vở kịch: " + err.message));
  }
};

exports.updatePlay = async (req, res, next) => {
  const {
    code,
    title,
    description,
    img,
    content,
    isActive,
    typeIds,
    actorIds,
  } = req.body;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID vở kịch không hợp lệ!"));
  }
  if (
    !code ||
    !title ||
    !description ||
    !img ||
    !content ||
    !typeIds ||
    !actorIds
  ) {
    return next(new ApiError(400, "Trường quan trọng không thể để trống!"));
  }
  if (!Array.isArray(typeIds) || !Array.isArray(actorIds)) {
    return next(
      new ApiError(400, "Danh sách loại hoặc diễn viên không hợp lệ!")
    );
  }
  if (
    !typeIds.every((id) => mongoose.Types.ObjectId.isValid(id)) ||
    !actorIds.every((id) => mongoose.Types.ObjectId.isValid(id))
  ) {
    return next(new ApiError(400, "ID loại hoặc diễn viên không hợp lệ!"));
  }
  try {
    const play = await Play.findByIdAndUpdate(
      req.params.id,
      { code, title, description, img, content, isActive, typeIds, actorIds },
      { new: true }
    ).populate("typeIds actorIds");
    if (!play) {
      return next(new ApiError(404, "Không tìm thấy vở kịch với ID này!"));
    }
    return res.send(play);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi cập nhật vở kịch: " + err.message));
  }
};

exports.deletePlay = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError(400, "ID vở kịch không hợp lệ!"));
  }

  try {
    const play = await Play.findByIdAndDelete(req.params.id);
    if (!play) {
      return next(new ApiError(404, "Không tìm thấy vở kịch với ID này!"));
    }
    return res.send({ message: "Vở kịch đã được xóa thành công!" });
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi xóa vở kịch: " + err.message));
  }
};
