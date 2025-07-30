const express = require("express");
const accountController = require("../controllers/account.controller.js");
const auth = require("../middlewares/auth.middleware.js");
const router = express.Router();

router.route("/register").post(accountController.createAccount);
router.route("/login").post(accountController.login);
router.route("/logout").post(auth.checkRoles([]), accountController.logout);

router
  .route("/:id")
  .put(accountController.updateAccount)
  .delete(accountController.deleteAccount);
module.exports = router;
