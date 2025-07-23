const express = require("express");
const cors = require("cors"); //midleware cho phép app chấp nhận req từ các nguồn khác nhau
const ApiError = require("./app/api-error");
const app = express();

app.use(cors());
app.use(express.json()); // chuyển đổi Json trong body của req sang đối tượng javascript

app.get("/", (req, res) => {
  res.json({ message: "Wellcome to playhouse application" });
});

app.use((req, res, next) => {
  //code ở đây sẽ chạy khoong có route nào được định nghĩa khớp với req, gọi next() để chuyển sang midleware xử lý lỗi
  return next(new ApiError(404, "Resource not found"));
});

// midleware xử lý lỗi
app.use((err, req, res, next) => {
  // Midleware xử lý lỗi tập trung, trong các đoạn code xử lý ở  các route, gọi next(error) sẽ chuyển về midleware xử lý lỗi này
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
