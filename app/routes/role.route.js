const express = require("express");
const roleController = require("../controllers/role.controller.js");
const router = express.Router();

router
  .route("/")
  .get(roleController.getAllRoles)
  .post(roleController.createRole);

router
  .route("/:id")
  .get(roleController.getRoleById)
  .put(roleController.updateRole)
  .delete(roleController.deleteRole);

module.exports = router;
