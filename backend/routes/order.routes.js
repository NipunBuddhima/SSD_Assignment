import express from "express";
import OrderController from "../controllers/order.controller.js"; //Always add .js at the end
import { verifyAuthentication } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/api/add-order").post(
    verifyAuthentication,
    OrderController.addOrder
);

router.route("/api/packagetypes").get(
    verifyAuthentication,
    OrderController.getAllPackageTypes
);

router.route("/api/orderstatus").get(
    verifyAuthentication,
    OrderController.getAllOrderStatus
);

router.route("/api/orders-by-branch").post(
    verifyAuthentication,
    OrderController.getAllOrderByBranchId
);

router.route("/api/courier-fee").post(
    verifyAuthentication,
    OrderController.getCourierFee
);

router.route("/api/order/:orderId").get(
    verifyAuthentication,
    OrderController.getOrderDetailsByOrderId
);

router.route("/api/update-order/:orderId").put(
    verifyAuthentication,
    OrderController.updateOrder
);

router.route("/api/delete-order/:orderId").delete(
    // verifyAuthentication,
    OrderController.deleteOrder
);

router.route("/api/receivedOrders/:branchId").get(
    // verifyAuthentication,
    OrderController.getAllReceivedOrdersByBranchId
);

router.route("/api/assign-delivery-person/:orderId/:nic").put(
    // verifyAuthentication,
    OrderController.assignDeliveryPerson
);

router.route("/api/incoming-orders/:branchId").get(
    // verifyAuthentication,
    OrderController.getAllIncomingOrdersByBranchId
);

router.route("/api/update-order-status/:orderId/:status").put(
    // verifyAuthentication,
    OrderController.updateOrderStatus
);

router.route("/api/received-orders-by-status/:branchId/:status").get(
    // verifyAuthentication,
    OrderController.getReceivedOrdersByStatus
);

router.route("/api/order-view/:orderId").get(
    // verifyAuthentication,
    OrderController.getOrderViewDetailsByOrderId
);

router.route("/api/check-order-existing-status/:orderId").get(
    // verifyAuthentication,
    OrderController.checkOrderExistingStatus
);

// getAllAvailableOrdersByUserNic
router.route("/api/orders-by-nic/:nic").get(
    // verifyAuthentication,
    OrderController.getAllAvailableOrdersByUserNic
);

export {router};
