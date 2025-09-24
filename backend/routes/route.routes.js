import express from "express";
import { verifyAuthentication } from "../middleware/auth.middleware.js";
import RouteController from "../controllers/route.controller.js";

const router = express.Router();

router.route("/api/add-route").post(
    verifyAuthentication,
    RouteController.addRoute
)

router.route("/api/routes").get(
    // verifyAuthentication,
    RouteController.getAllRoutes
)

// get all routes for table
router.route("/api/routes-for-table").get(
    // verifyAuthentication,
    RouteController.getAllRoutesForTable
)

// update route
router.route("/api/update-route").put(
    verifyAuthentication,
    RouteController.updateRoute
)

// delete route
router.route("/api/delete-route/:routeId").delete(
    verifyAuthentication,
    RouteController.deleteRoute
)


router.route("/api/branches-by-transport-agent-nic/:nic").get(
    // verifyAuthentication,
    RouteController.getBranchesByTransportAgentNic
)

export {router};
