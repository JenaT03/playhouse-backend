const express = require("express");
const feedbackController = require("../controllers/feedback.controller.js");
const router = express.Router();

router
  .route("/")
  .post(feedbackController.createFeedback)
  .get(feedbackController.getAllFeedbacks);

router
  .route("/:id")
  .get(feedbackController.getFeedbackById)
  .put(feedbackController.updateFeedback)
  .delete(feedbackController.deleteFeedback);

module.exports = router;
