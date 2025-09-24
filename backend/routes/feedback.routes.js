import express from "express";
import { verifyAuthentication } from "../middleware/auth.middleware.js";
import FeedbackController from "../controllers/feedback.controller.js";

const router = express.Router();

router.route("/api/add-feedback").post(
    verifyAuthentication,
    FeedbackController.addFeedback
)

router.route("/api/feedback").post(
    verifyAuthentication,
    FeedbackController.addFeedback
)

router.route("/api/feedback").get(
    //verifyAuthentication,
    FeedbackController.getAllFeedback
)

// get feedback by user nic
router.route("/api/feedback/:nic").get(
    //verifyAuthentication,
    FeedbackController.getFeedbackByNic
)

// delete feedback
router.route("/api/delete-feedback/:id").delete(
    verifyAuthentication,
    FeedbackController.deleteFeedback
)

// update feedback
router.route("/api/update-feedback/:id").put(
    verifyAuthentication,
    FeedbackController.updateFeedback
)

export {router};
