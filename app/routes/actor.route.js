const express = require("express");
const actorController = require("../controllers/actor.controller.js");
const router = express.Router();

router
  .route("/")
  .get(actorController.getAllActors)
  .post(actorController.createActor);
router
  .route("/:id")
  .get(actorController.getActorById)
  .put(actorController.updateActor)
  .delete(actorController.deleteActor);

module.exports = router;
