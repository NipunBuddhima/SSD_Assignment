import jwt from "jsonwebtoken";
import OrderService from "../services/order.service.js";
import UserService from "../services/user.service.js";

export const verifyResourceAccess = (resourceType) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      if (!token) {
        return res.status(401).send({ message: "Unauthorized!" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userNic = decoded.nicNo || decoded.id;

      // Get user  role
      const user = await UserService.getUserByNic(userNic);
      if (!user) {
        return res.status(403).send({ message: "User not found" });
      }

      req.user = user;

      switch (resourceType) {
        case "order":
          const orderId = req.params.orderId;
          if (!orderId) {
            next();
            return;
          }

          const order = await OrderService.getOrderDetailsByOrderId(orderId);
          if (!order) {
            return res.status(404).send({ message: "Order not found" });
          }

          const hasAccess = await canAccessOrder(user, order);
          if (!hasAccess) {
            return res
              .status(403)
              .send({ message: "Access denied to this order" });
          }
          break;

        case "branch":
          const branchId = req.params.branchId || req.body.branchId;
          if (!branchId) {
            next();
            return;
          }

          if (user.role === "branch_manager" && user.branchId !== branchId) {
            return res
              .status(403)
              .send({ message: "Access denied to this branch" });
          }
          break;
      }

      next();
    } catch (error) {
      console.error("Resource access error:", error);
      res.status(401).send({ message: "Invalid token or access denied" });
    }
  };
};

async function canAccessOrder(user, order) {
  if (user.role === "company_manager") {
    return true;
  }

  if (user.role === "branch_manager") {
    return (
      order.sendingBranchId === user.branchId ||
      order.receivingBranchId === user.branchId
    );
  }

  if (user.role === "delivery_person") {
    return order.deliveryPersonId === user.id;
  }

  if (user.role === "customer") {
    return order.senderNic === user.nic || order.receiverNic === user.nic;
  }

  return false;
}
