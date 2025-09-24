import express from "express";
import ClientController from "../controllers/client.controller.js"; //Always add .js at the end
import { verifyAuthentication } from "../middleware/auth.middleware.js";
import csrfProtection from "../middleware/csrf.middleware.js" //CSRF Protection

const router = express.Router();

router.route("/api/add-client").post(
    verifyAuthentication,
    csrfProtection,
    ClientController.addClient
)

router.route("/api/clients").get(
    verifyAuthentication,
    ClientController.getAllClients
);

router.route("/api/clients/nic").get(
    verifyAuthentication, 
    ClientController.getAllClientNICs
);

router.route("/api/update-client/:id").put(
    verifyAuthentication,
    csrfProtection, 
    ClientController.updateClient
);

router.route("/api/client/:id").delete(
    verifyAuthentication,
    csrfProtection,
    ClientController.deleteClient
);

router.route("/api/client-details/:id").get(
    verifyAuthentication,
    ClientController.getClientDetails
);

router.route("/api/update-client-password/:id").put(
    verifyAuthentication,
    csrfProtection,
    ClientController.updateClientPassword
);

export {router};
