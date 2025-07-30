const express = require("express");
const typeController = require("../controllers/type.controller.js");

const router = express.Router();

router
  .route("/")
  .get(typeController.getAllTypes)
  .post(typeController.createType);

router
  .route("/:id")
  .get(typeController.getTypeById)
  .put(typeController.updateType)
  .delete(typeController.deleteType);

module.exports = router;
