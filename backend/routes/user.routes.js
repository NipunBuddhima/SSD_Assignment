//Router which handles all types of user logging in and registrations
//Security: Added rate limiting and proper error handling

import express from "express";
import UserController from "../controllers/user.controller.js";
import { verifyAuthentication, rateLimitLogin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Login with rate limiting
router.route("/api/v1/user/login").post(rateLimitLogin, UserController.verifyCredentials);

// Logout with authentication check
router.route("/api/v1/user/logout").post(verifyAuthentication, UserController.logOutUser);

export { router };
