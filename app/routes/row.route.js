const express = require("express");
const RowController = require("../controllers/row.controller.js");
const router = express.Router();

router.route("/").get(RowController.getAllRows);

router.route("/:id").get(RowController.getRowById);

module.exports = router;
