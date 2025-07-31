const express = require("express");
const SeatController = require("../controllers/seat.controller.js");
const router = express.Router();

router.route("/").get(SeatController.getAllSeats);

router.route("/:id").get(SeatController.getSeatById);

module.exports = router;
