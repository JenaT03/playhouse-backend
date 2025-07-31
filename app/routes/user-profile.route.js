const express = require("express");
const userProfileController = require("../controllers/user-profile.controller.js");

const router = express.Router();

router
  .route("/")
  .get(userProfileController.getAllUserProfiles)
  .post(userProfileController.createUserProfile);
router
  .route("/:id")
  .get(userProfileController.getUserProfileById)
  .put(userProfileController.updateUserProfile)
  .delete(userProfileController.deleteUserProfile);

module.exports = router;
