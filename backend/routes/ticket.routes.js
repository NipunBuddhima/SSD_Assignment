import express from "express";
import { verifyAuthentication } from "../middleware/auth.middleware.js";
import TicketController from "../controllers/ticket.controller.js";
import csrfProtection from "../middleware/csrf.middleware.js";

const router = express.Router();

router.route("/api/add-ticket").post(
    verifyAuthentication,
    csrfProtection,
    TicketController.addTicket
)

router.route("/api/reasons").get(
    verifyAuthentication,
    TicketController.getAllReasons
)

router.route("/api/tickets/:branchId").get(
    verifyAuthentication,
    TicketController.getAllTicketsByBranchId
)

// route to update a ticket by ticket id
router.route("/api/update-ticket/:id").put(
    verifyAuthentication,
    csrfProtection,
    TicketController.updateTicket
)

// update ticket reply
router.route("/api/update-ticket-reply/:id").put(
    verifyAuthentication,
    csrfProtection,
    TicketController.updateTicketReply
)

// update ticket status
router.route("/api/update-ticket-status/:ticketId/:statusId").put(
    verifyAuthentication,
    csrfProtection,
    TicketController.ticketStatusUpdate
)

// delete ticket
router.route("/api/delete-ticket/:id").delete(
    verifyAuthentication,
    csrfProtection,
    TicketController.deleteTicket
)

router.route("/api/tickets-by-nic/:nic").get(
    verifyAuthentication,
    TicketController.getTicketsByNic
)

export {router};
