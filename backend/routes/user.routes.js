//Router which handles all types of user loggin in and registrations

//Depends on UserController to hanlde requests and responses

import express from "express";
import UserController from "../controllers/user.controller.js";

//using auth middleware for logging out
import { verifyAuthentication } from "../middleware/auth.middleware.js";
import csrfProtection from "../middleware/csrf.middleware.js";

const router = express.Router();

router.route("/api/user/login").post(csrfProtection, UserController.verifyCredentials);

router
  .route("api/user/logout")
  //before logging out, checking auth status 
  .post(verifyAuthentication, csrfProtection, UserController.logOutUser);

export { router };
