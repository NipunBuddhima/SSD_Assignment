import express from "express";
import BranchController from "../controllers/branch.controller.js";
import { verifyAuthentication, adminOnly, managerAccess } from "../middleware/auth.middleware.js";

const router = express.Router();

// Admin only - Add branch
router.route("/api/v1/add-branch").post(
  ...adminOnly,
  BranchController.addBranch
);

// Manager access - Get branch by manager NIC
router.route("/api/v1/branch-id-by-nic").post(
  ...managerAccess,
  BranchController.getBranchIdByBranchManagerNIC
);

// Manager access - Get all branches (restricted access)
router.route("/api/v1/branches").get(
  ...managerAccess,
  BranchController.getAllBranches
);

// Admin only - Update branch
router.route("/api/v1/update-branch/:branchId").put(
  ...adminOnly,
  BranchController.updateBranch
);

// Admin only - Delete branch
router.route("/api/v1/delete-branch/:branchId").delete(
  ...adminOnly,
  BranchController.deleteBranch
);

export { router };
