import express from "express";
import { verifyAuthentication } from "../middleware/auth.middleware.js";
import TransportAgentController from "../controllers/transport.controller.js";
import csrfProtection from "../middleware/csrf.middleware.js";

const router = express.Router();

router.route("/api/add-transport-agent").post(
    verifyAuthentication,
    csrfProtection,
    TransportAgentController.addTransportAgent
)

router.route("/api/transport-agent").get(
    verifyAuthentication,
    TransportAgentController.getAllTransportAgents
)

// update transport agent by nic
router.route("/api/update-transport-agent").put(
    verifyAuthentication,
    csrfProtection,
    TransportAgentController.updateTransportAgent
)

// delete transport agent by nic
router.route("/api/delete-transport-agent/:nic").delete(
    verifyAuthentication,
    csrfProtection,
    TransportAgentController.deleteTransportAgent
)

// get orders by transport agent nic
router.route("/api/orders-by-transport-agent/:nic").get(
    verifyAuthentication,
    TransportAgentController.getOrdersByTransportAgentNic
)

// update order received date by order id
router.route("/api/update-order-received-date/:orderId").put(
    verifyAuthentication,
    csrfProtection,
    TransportAgentController.updateOrderReceivedDate
)

export {router};
