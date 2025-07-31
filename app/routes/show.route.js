const express = require("express");
const ShowController = require("../controllers/show.controller.js");
const router = express.Router();

router
  .route("/")
  .get(ShowController.getAllShows)
  .post(ShowController.createShow);
router
  .route("/:id")
  .get(ShowController.getShowById)
  .put(ShowController.updateShow)
  .delete(ShowController.deleteShow);

module.exports = router;
