const express = require("express");
const ticketController = require("../controllers/ticket.controller.js");
const router = express.Router();

router
  .route("/")
  .get(ticketController.getAllTickets)
  .post(ticketController.createTicket);

router
  .route("/:id")
  .get(ticketController.getTicketById)
  .put(ticketController.updateTicket)
  .delete(ticketController.deleteTicket);

module.exports = router;
