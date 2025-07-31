const express = require("express");
const AudienceController = require("../controllers/audience.controller.js");

const router = express.Router();

router
  .route("/")
  .get(AudienceController.getAllAudiences)
  .post(AudienceController.createAudience);

router
  .route("/:id")
  .get(AudienceController.getAudienceById)
  .put(AudienceController.updateAudience)
  .delete(AudienceController.deleteAudience);

module.exports = router;
