import express from "express";
import DashboardController from "../controllers/dashboard.controller";
import { verifyAuthentication } from "../middleware/auth.middleware";

const router = express.Router();

router.route("/api/getTotalOrderCountOfBranch").get(
    // verfifyAuthentication
    DashboardController.getTotalOrderCountOfBranch
)

router.route("/api/getTotalReceivedOrderCountOfBranch").get(
    // VerifyAuthentication
    DashboardController.getTotalReceivedOrderCount
)

router.route("/api/getTotalOpenedTicketCountOfBranch").get(
    // VerifyAuthentication
    DashboardController.getTotalOpenedTicketCount
)

router.route("/api/getTotalFeedbackCountOfBranch").get(
    // VerfityAuthentication
    DashboardController.getTotalFeedbackCount
)

export {router};