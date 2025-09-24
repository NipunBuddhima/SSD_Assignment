import express from "express";
import BranchController from "../controllers/branch.controller.js"; //Always add .js at the end
import { verifyAuthentication } from "../middleware/auth.middleware.js";
import csrfProtection from "../middleware/csrf.middleware.js";

const router = express.Router();

router.route("/api/add-branch").post(
  verifyAuthentication,
  csrfProtection,
  BranchController.addBranch
);

router.route("/api/branch-id-by-nic").post(
  verifyAuthentication,
  csrfProtection,
  BranchController.getBranchIdByBranchManagerNIC
);

router.route("/api/branches").get(
  verifyAuthentication,
  BranchController.getAllBranches
);

// update branch
router.route("/api/update-branch/:branchId").put(
  verifyAuthentication,
  csrfProtection,
  BranchController.updateBranch
);

// delete branch
router.route("/api/delete-branch/:branchId").delete(
  verifyAuthentication,
  csrfProtection,
  BranchController.deleteBranch
);

export { router };
