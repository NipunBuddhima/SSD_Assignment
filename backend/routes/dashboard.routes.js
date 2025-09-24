import express from "express";
import DashboardController from "../controllers/dashboard.controller";
import { verifyAuthentication } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/api/getTotalOrderCountOfBranch").get(
    verifyAuthentication,
    DashboardController.getTotalOrderCountOfBranch
)

router.route("/api/getTotalReceivedOrderCountOfBranch").get(
    verifyAuthentication,
    DashboardController.getTotalReceivedOrderCount
)

router.route("/api/getTotalOpenedTicketCountOfBranch").get(
    verifyAuthentication,
    DashboardController.getTotalOpenedTicketCount
)

router.route("/api/getTotalFeedbackCountOfBranch").get(
    verfityAuthentication,
    DashboardController.getTotalFeedbackCount
)

export {router};