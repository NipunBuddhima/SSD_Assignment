import express from "express";
import { verifyAuthentication } from "../middleware/auth.middleware.js";
import DeliveryPersonController from "../controllers/delivery.controller.js"

const router = express.Router();

// Add a new delivery person
router.post("/api/add-delivery-person", verifyAuthentication, DeliveryPersonController.addDeliveryPerson);

// Get all delivery persons
router.get("/api/get-all-delivery-persons", verifyAuthentication, DeliveryPersonController.getAllDeliveryPersons);

// Update a delivery person by NIC
router.put("/api/update-delivery-person/:nic", verifyAuthentication, DeliveryPersonController.updateDeliveryPerson);

// Delete a delivery person by NIC
router.delete("/api/delete-delivery-person/:nic", verifyAuthentication, DeliveryPersonController.deleteDeliveryPerson);

// Get all delivery persons NICs
router.get("/api/get-all-delivery-persons-nics/:branchId", DeliveryPersonController.getAllDeliveryPersonsNics);

// Get orders by delivery person NIC
router.get("/api/get-orders-by-delivery-person-nic/:nic", DeliveryPersonController.getOrdersByDeliveryPersonNic);

export { router };
