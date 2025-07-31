const express = require("express");
const SeatStatusController = require("../controllers/seat-status.controller.js");
const router = express.Router();

router.route("/").get(SeatStatusController.getAllSeatStatuses);

router
  .route("/:id")
  .get(SeatStatusController.getSeatStatusById)
  .put(SeatStatusController.updateSeatStatus);

module.exports = router;
