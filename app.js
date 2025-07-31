const express = require("express");
const cors = require("cors"); //midleware cho phép app chấp nhận req từ các nguồn khác nhau
const ApiError = require("./app/api-error");
const typeRouter = require("./app/routes/type.route.js");
const roleRouter = require("./app/routes/role.route.js");
const accountRouter = require("./app/routes/account.route.js");
const userProfileRouter = require("./app/routes/user-profile.route.js");
const audienceRouter = require("./app/routes/audience.route.js");
const staffRouter = require("./app/routes/staff.route.js");
const actor = require("./app/routes/actor.route.js");
const playRouter = require("./app/routes/play.route.js");
const feedbackRouter = require("./app/routes/feedback.route.js");
const rowRouter = require("./app/routes/row.route.js");
const seatRouter = require("./app/routes/seat.route.js");
const seatStatusRouter = require("./app/routes/seat-status.route.js");
const showRouter = require("./app/routes/show.route.js");
const ticketRouter = require("./app/routes/ticket.route.js");

const app = express();

app.use(cors());
app.use(express.json()); // chuyển đổi Json trong body của req sang đối tượng javascript

app.get("/", (req, res) => {
  res.json({ message: "Wellcome to playhouse application" });
});

app.use("/api/types", typeRouter);
app.use("/api/roles", roleRouter);
app.use("/api/accounts", accountRouter);
app.use("/api/user-profiles", userProfileRouter);
app.use("/api/audiences", audienceRouter);
app.use("/api/staffs", staffRouter);
app.use("/api/actors", actor);
app.use("/api/plays", playRouter);
app.use("/api/feedbacks", feedbackRouter);
app.use("/api/rows", rowRouter);
app.use("/api/seats", seatRouter);
app.use("/api/seat-statuses", seatStatusRouter);
app.use("/api/shows", showRouter);
app.use("/api/tickets", ticketRouter);

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
