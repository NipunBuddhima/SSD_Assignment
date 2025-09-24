// Client Management Controller

import OrderService from "../services/order.service.js";

let OrderController = {};

/////////////////////////////////////// Add a new order ////////////////////////////////////////////////

OrderController.addOrder = async (req, res) => {

    try {
        const {
            weight,
            sendingDate,
            paymentDate,
            packageTypes,
            sendingBranch,
            receivingBranch,
            specialNotes,
            orderStatus,
            sender,
            receiver,
            contactNumber,
            address
        } = req.body;

        await OrderService.addOrder(
            weight,
            sendingDate,
            paymentDate,
            packageTypes,
            sendingBranch,
            receivingBranch,
            specialNotes,
            orderStatus,
            sender,
            receiver,
            contactNumber,
            address
        );

        res.status(201).send({ message: "Order added successfully" });

    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

/////////////////////////////////////// Get all order by branch Id ////////////////////////////////////////////////


OrderController.getAllOrderByBranchId = async(req, res) => {
    let {branchId} = req.body;
    try {
        let data = await OrderService.getAllOrdersByBranch(branchId);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}

/////////////////////////////////////// Get all received orders by branch Id ////////////////////////////////////////////////

OrderController.getAllReceivedOrdersByBranchId = async(req, res) => {
    let {branchId} = req.params;
    try {
        let data = await OrderService.getAllReceivedOrdersByBranch(branchId);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}


/////////////////////////////////////// Update order ////////////////////////////////////////////////

OrderController.updateOrder = async(req, res) => {
    let {orderId} = req.params;
    let {
        weight,
        sendingDate,
        paymentDate,
        packageTypes,
        sendingBranch,
        receivingBranch,
        specialNotes,
        orderStatus,
        sender,
        receiver,
        contactNumber,
        address
    } = req.body;
    try {
        await OrderService.updateOrder(
            orderId,
            weight,
            sendingDate,
            paymentDate,
            packageTypes,
            sendingBranch,
            receivingBranch,
            specialNotes,
            orderStatus,
            sender,
            receiver,
            contactNumber,
            address
        );
        res.status(200).send({ message: "Order updated successfully" });
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}


/////////////////////////////////////// Get order details by order Id ////////////////////////////////////////////////

OrderController.getOrderDetailsByOrderId = async(req, res) => {
    let {orderId} = req.params;
    try {
        let data = await OrderService.getOrderDetailsByOrderId(orderId);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}

/////////////////////////////////////// Get all package types ////////////////////////////////////////////////

OrderController.getAllPackageTypes = async (req, res) => {
    try {
        let data = await OrderService.getAllPackageTypes();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}

/////////////////////////////////////// Get all order status ////////////////////////////////////////////////

OrderController.getAllOrderStatus = async (req, res) => {
    try {
        let data = await OrderService.getAllOrderStatus();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}

/////////////////////////////////////// Get Courier Fee ////////////////////////////////////////////////

OrderController.getCourierFee = async (req, res) => {
    let { packageWeight, packageTypeId } = req.body;
  
    try {
      let fee = await OrderService.getOrderFee(packageWeight, packageTypeId);
      res.status(200).send({ fee: fee });
    } catch (error) {
      res.status(500).send({ error: "internal Server Error!" });
    }
  };
  
  /////////////////////////////////////// Assign Delivery Person ////////////////////////////////////////////////
  
    OrderController.assignDeliveryPerson = async (req, res) => {
    let { orderId, nic } = req.params;

    try {
        await OrderService.assignDeliveryPerson(orderId, nic);
        res.status(200).send({ message: "Delivery person assigned successfully" });
    }
    catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}

/////////////////////////////////////// Get all incoming orders by branch Id ////////////////////////////////////////////////

OrderController.getAllIncomingOrdersByBranchId = async(req, res) => {
    let {branchId} = req.params;
    try {
        let data = await OrderService.getAllIncomingOrdersByBranchId(branchId);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}

/////////////////////////////////////// Update order status ////////////////////////////////////////////////

OrderController.updateOrderStatus = async(req, res) => {

    let {orderId, status} = req.params;
    try {
        await OrderService.updateOrderStatus(orderId, status);
        res.status(200).send({ message: "Order status updated successfully" });
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}


/////////////////////////////////////// Get received orders by status ////////////////////////////////////////////////

OrderController.getReceivedOrdersByStatus = async(req, res) => {
    let {branchId, status} = req.params;
    try {
        let data = await OrderService.getReceivedOrdersByStatus(branchId, status);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}

/////////////////////////////////////// Get order view details by order Id ////////////////////////////////////////////////

OrderController.getOrderViewDetailsByOrderId = async(req, res) => {
    let {orderId} = req.params;
    try {
        let data = await OrderService.getOrderViewDetailsByOrderId(orderId);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}

/////////////////////////////////////// Check Order Existing Status By Order Id ////////////////////////////////////////////////

OrderController.checkOrderExistingStatus = async(req, res) => {
    let {orderId} = req.params;
    try {
        let data = await OrderService.checkOrderExistingStatus(orderId);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}

/////////////////////////////////////// Delete Order By Order Id ////////////////////////////////////////////////

OrderController.deleteOrder = async(req, res) => {

    let {orderId} = req.params;
    try {
        await OrderService.deleteOrder(orderId);
        res.status(200).send({ message: "Order deleted successfully" });
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}

/////////////////////////////////////// Get all available orders by user NIC ////////////////////////////////////////////////

OrderController.getAllAvailableOrdersByUserNic = async(req, res) => {

    let {nic} = req.params;
    try {
        let data = await OrderService.getAllAvailableOrdersByUserNic(nic);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}

  
export default OrderController;