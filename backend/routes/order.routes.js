import express from "express";
import OrderController from "../controllers/order.controller.js";
import {
  verifyAuthentication,
  requireRole,
} from "../middleware/auth.middleware.js";
import { verifyResourceAccess } from "../middleware/resource.middleware.js";

const router = express.Router();

router
  .route("/api/add-order")
  .post(verifyAuthentication, OrderController.addOrder);

router
  .route("/api/packagetypes")
  .get(verifyAuthentication, OrderController.getAllPackageTypes);

router
  .route("/api/orderstatus")
  .get(verifyAuthentication, OrderController.getAllOrderStatus);

router
  .route("/api/orders-by-branch")
  .post(
    verifyAuthentication,
    requireRole(["branch_manager", "company_manager"]),
    verifyResourceAccess("branch"),
    OrderController.getAllOrderByBranchId
  );

router
  .route("/api/courier-fee")
  .post(verifyAuthentication, OrderController.getCourierFee);

router
  .route("/api/order/:orderId")
  .get(
    verifyAuthentication,
    verifyResourceAccess("order"),
    OrderController.getOrderDetailsByOrderId
  );

router
  .route("/api/update-order/:orderId")
  .put(
    verifyAuthentication,
    requireRole(["branch_manager", "company_manager"]),
    verifyResourceAccess("order"),
    OrderController.updateOrder
  );

router
  .route("/api/delete-order/:orderId")
  .delete(
    verifyAuthentication,
    requireRole(["company_manager"]),
    verifyResourceAccess("order"),
    OrderController.deleteOrder
  );

router
  .route("/api/receivedOrders/:branchId")
  .get(
    verifyAuthentication,
    requireRole(["branch_manager", "company_manager"]),
    verifyResourceAccess("branch"),
    OrderController.getAllReceivedOrdersByBranchId
  );

router
  .route("/api/assign-delivery-person/:orderId/:nic")
  .put(
    verifyAuthentication,
    requireRole(["branch_manager", "company_manager"]),
    verifyResourceAccess("order"),
    OrderController.assignDeliveryPerson
  );

router
  .route("/api/incoming-orders/:branchId")
  .get(
    verifyAuthentication,
    requireRole(["branch_manager", "company_manager"]),
    verifyResourceAccess("branch"),
    OrderController.getAllIncomingOrdersByBranchId
  );

router
  .route("/api/update-order-status/:orderId/:status")
  .put(
    verifyAuthentication,
    requireRole(["branch_manager", "company_manager", "delivery_person"]),
    verifyResourceAccess("order"),
    OrderController.updateOrderStatus
  );

router
  .route("/api/received-orders-by-status/:branchId/:status")
  .get(
    verifyAuthentication,
    requireRole(["branch_manager", "company_manager"]),
    verifyResourceAccess("branch"),
    OrderController.getReceivedOrdersByStatus
  );

router
  .route("/api/order-view/:orderId")
  .get(
    verifyAuthentication,
    verifyResourceAccess("order"),
    OrderController.getOrderViewDetailsByOrderId
  );

router
  .route("/api/check-order-existing-status/:orderId")
  .get(
    verifyAuthentication,
    verifyResourceAccess("order"),
    OrderController.checkOrderExistingStatus
  );

router.route("/api/orders-by-nic/:nic").get(
  verifyAuthentication,
  requireRole(["customer", "company_manager", "branch_manager"]),
  async (req, res, next) => {
    // Only allow users to access their own orders unless they're managers
    if (req.user.role === "customer" && req.params.nic !== req.user.nic) {
      return res.status(403).send({ message: "Access denied" });
    }
    next();
  },
  OrderController.getAllAvailableOrdersByUserNic
);

export { router };
