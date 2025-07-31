const express = require("express");
const StaffController = require("../controllers/staff.controller.js");

const router = express.Router();

router
  .route("/")
  .get(StaffController.getAllStaffs)
  .post(StaffController.createStaff);

router
  .route("/:id")
  .get(StaffController.getStaffById)
  .put(StaffController.updateStaff)
  .delete(StaffController.deleteStaff);

module.exports = router;
