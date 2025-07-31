const express = require("express");
const playController = require("../controllers/play.controller.js");
const router = express.Router();

router
  .route("/")
  .get(playController.getAllPlays)
  .post(playController.createPlay);

router
  .route("/:id")
  .get(playController.getPlayById)
  .put(playController.updatePlay)
  .delete(playController.deletePlay);

module.exports = router;
