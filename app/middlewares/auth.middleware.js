const jwt = require("jsonwebtoken");
const ApiError = require("../api-error");

exports.checkRoles = (allowedRoles) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(new ApiError(401, "Bạn chưa đăng nhập!"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (
        Array.isArray(decoded.roles) &&
        allowedRoles.length > 0 && //Chỉ kiểm tra quyền nếu bạn thật sự chỉ định role nào đó. Nếu không, chỉ cần xác thực token là đủ.
        !decoded.roles.some((roleId) => allowedRoles.includes(roleId))
      ) {
        return res.status(403).json({ message: "Bạn không có quyền truy cập" });
      }

      next();
    } catch (error) {
      return next(new ApiError(401, `Token không hợp lệ: ${error.message}`));
    }
  };
};
