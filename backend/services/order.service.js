// Order Management Service [COMPLETED] - Ashan

import { pool } from "../database/database.js";

let OrderService = {};

/////////////////////////////////////// Add a new order ////////////////////////////////////////////////

OrderService.addOrder = async(
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
    address) => {

    let query = `
    INSERT INTO orders(weight, registeredDate, paymentDate, receiverName, receiverAddress, receiverContactNumber, packageTypeId, senderNic, statusId, sendingBranchId, receivingBranchId, specialNote) 
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
        const [rows] = await pool.query(query, [
            weight,
            sendingDate,
            paymentDate,
            receiver,
            address,
            contactNumber,
            packageTypes,
            sender,
            orderStatus,
            sendingBranch,
            receivingBranch,
            specialNotes,
            ]);
    }
    catch (e) {
        console.error(e);
        throw e;
    }

};

/////////////////////////////////////// Get latest order by branch by branch ID  ////////////////////////////////////////////////

OrderService.getLatestOrderByBranch = async(sendingBranchId) => {
    let query = `
    SELECT o.orderId, o.registeredDate, c.fullName, o.receivingBranchId, os.status
    FROM orders o, client c, branch b, orderstatus os
    WHERE o.receivingBranchId = b.branchId AND b.branchId = c.branchId AND os.statusId = o.statusId AND o.sendingBranchId = ?
    ORDER BY registeredDate DESC
    `;

    try{
        let [rows] = await pool.query(query, [sendingBranchId]);
        return rows;
    } catch(e) {
        console.error(e);
        throw e;
    }
};


/////////////////////////////////////// Update an order by orderID ////////////////////////////////////////////////

OrderService.updateOrder = async(
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
    address) => {

    let query = `
    UPDATE orders
    SET weight = ?,
    registeredDate = ?,
    paymentDate = ?,
    receiverName = ?,
    receiverAddress = ?,
    receiverContactNumber = ?,
    packageTypeId = ?,
    senderNic = ?,
    statusId = ?,
    sendingBranchId = ?,
    receivingBranchId = ?,
    specialNote = ?
    WHERE orderId = ?
    `;
    try {
        await pool.query(query, [
            weight,
            sendingDate,
            paymentDate,
            receiver,
            address,
            contactNumber,
            packageTypes,
            sender,
            orderStatus,
            sendingBranch,
            receivingBranch,
            specialNotes,
            orderId
        ]);

    } catch (e) {
        console.error(e);
        throw e;
    }
};

/////////////////////////////////////// Get all sending orders to received order tables by branchId ////////////////////////////////////////////////


OrderService.getAllOrdersByBranch = async(sendingBranchId) => {
    let query = `select o.orderId as order_id, 
    o.registeredDate as orderDate, 
    c.fullName as sender,
    o.receiverName as receiver, 
    b.district as destinationBranch, 
    os.status 
    from orders o
    join client c
    on o.senderNic = c.nic
    join branch b
    on o.receivingBranchId = b.branchId
    join orderstatus os
    on o.statusId = os.statusId
    where o.sendingBranchId = ?`;
    try{
        let [rows] = await pool.query(query, [sendingBranchId]);
        return rows;
    } catch(e) {
        console.error(e);
        throw e;
    }
};

/////////////////////////////////////// Get all received orders to received order tables by branchId ////////////////////////////////////////////////

OrderService.getAllReceivedOrdersByBranch = async(branchId) => {
    let query = `
    SELECT o.orderId, o.receiverName, o.receiverAddress, o.receiverContactNumber, os.status
    FROM orders o, orderstatus os
    WHERE os.statusId = o.statusId AND o.receivingBranchId = ? AND o.statusId != 1
    `;
    try{
        let [rows] = await pool.query(query, [branchId]);
        return rows;
    } catch(e) {
        console.error(e);
        throw e;
    }
}

/////////////////////////////////////// Get an order details by OrderId ////////////////////////////////////////////////

OrderService.getOrderDetailsByOrderId = async(orderId) => {
    let query = `SELECT * FROM orders WHERE orderId = ?`;
    try{
        let [rows] = await pool.query(query, [orderId]);
        return rows;
    } catch(e) {
        console.error(e);
        throw e;
    }
}

/////////////////////////////////////// Delete an order by orderID ////////////////////////////////////////////////

OrderService.deleteOrder = async(orderId) => {
    let query1 = `
    DELETE FROM orderdelivery
    WHERE orderId = ?
    `;

    let query2 = `
    DELETE FROM returnedorder
    WHERE orderId = ?
    `;

    let query3 = `
    DELETE FROM orders
    WHERE orderId = ?
    `;

    try{
        await pool.query(query1, [orderId]);
        await pool.query(query2, [orderId]);
        await pool.query(query3, [orderId]);
    } catch(e) {
        console.error(e);
        throw e;
    }
};

/////////////////////////////////////// Get all packge types ////////////////////////////////////////////////

OrderService.getAllPackageTypes = async () => {
    let query = `
    SELECT * FROM packagetype
    `;

    try{
        let [rows] = await pool.query(query);
        return rows;
    }
    catch (e) {
        console.error(e);
        throw e;
    }
};


/////////////////////////////////////// Get all order status ////////////////////////////////////////////////

OrderService.getAllOrderStatus = async () => {
    let query = `
    SELECT * FROM orderstatus
    `;

    try{
        let [rows] = await pool.query(query);
        return rows;
    }
    catch (e) {
        console.error(e);
        throw e;
    }
};

/////////////////////////////////////// Get courier fee ////////////////////////////////////////////////

OrderService.getOrderFee = async (packageWeight, packageTypeId) => {
    let query = `CALL getCourierFee(?,?)`;
    try {
        let [rows] = await pool.query(query, [packageWeight, packageTypeId]);
        return rows[0][0].totalFee;   
    } catch (error) {
        console.error(error);
        throw error;
    }
}


/////////////////////////////////////// Assign delivery person to an order ////////////////////////////////////////////////

OrderService.assignDeliveryPerson = async(orderId, nic) => {

    let deleteQuery = `
    DELETE FROM orderdelivery
    WHERE orderId = ?
    `;
   

    let query = `
    INSERT INTO orderdelivery(orderId, deliveryPersonNic)
    VALUES(?, ?)
    `;

    try {
        await pool.query(deleteQuery, [orderId]);
        await pool.query(query, [orderId, nic]);

        // if delivery person added successfully this order status update to Assigned status
        
        let query2 = `
        UPDATE orders
        SET statusId = 7
        WHERE orderId = ?
        `;

        await pool.query(query2, [orderId]);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
};

/////////////////////////////////////// Get all incoming orders by branch Id ////////////////////////////////////////////////

OrderService.getAllIncomingOrdersByBranchId = async(branchId) => {
    let query = `
    SELECT o.orderId, o.registeredDate, b.district as sendingBranch, os.status
    FROM orders o, branch b, orderstatus os
    WHERE o.sendingBranchId = b.branchId AND os.statusId = o.statusId AND o.receivingBranchId = ? AND o.statusId = 1
    `;

    try{
        let [rows] = await pool.query(query, [branchId]);
        return rows;
    } catch(e) {
        console.error(e);
        throw e;
    }
}

/////////////////////////////////////// Update order status by orderId ////////////////////////////////////////////////

OrderService.updateOrderStatus = async(orderId, status) => {
    let query = `
    UPDATE orders
    SET statusId = ?
    WHERE orderId = ?
    `;

    try {
        await pool.query(query, [status, orderId]);
    } catch (e) {
        console.error(e);
        throw e;
    }
}

/////////////////////////////////////// Get received orders by status ////////////////////////////////////////////////

OrderService.getReceivedOrdersByStatus = async(branchId, status) => {
    let query = `
    SELECT o.orderId, o.registeredDate, c.fullName as sender, os.status
    FROM orders o, client c, orderstatus os
    WHERE o.senderNic = c.nic AND os.statusId = o.statusId AND o.receivingBranchId = ? AND o.statusId = ?
    `;

    try{
        let [rows] = await pool.query(query, [branchId, status]);
        return rows;
    } catch(e) {
        console.error(e);
        throw e;
    }
}

/////////////////////////////////////// Get order view details by order Id ////////////////////////////////////////////////

OrderService.getOrderViewDetailsByOrderId = async(orderId) => {
    let query = `
    SELECT o.orderId, os.status, c1.fullName as senderName, c1.nic as senderNic, o.receiverName, o.receiverAddress, o.receiverContactNumber, o.weight, pt.packageType, o.specialNote, b1.district as sendingBranch, b2.district as receivingBranch, o.registeredDate, o.paymentDate, o.deliveryDate, o.receivedDate
    FROM orders o
    JOIN client c1 ON o.senderNic = c1.nic
    JOIN branch b1 ON o.sendingBranchId = b1.branchId
    JOIN branch b2 ON o.receivingBranchId = b2.branchId
    JOIN packagetype pt ON o.packageTypeId = pt.packageTypeId
    JOIN orderstatus os ON os.statusId = o.statusId
    WHERE o.orderId = ?
    `;

    try{
        let [rows] = await pool.query(query, [orderId]);
        return rows[0];
    } catch(e) {
        console.error(e);
        throw e;
    }
}

/////////////////////////////////////// Check Order Existing Status By Order Id ////////////////////////////////////////////////

OrderService.checkOrderExistingStatus = async(orderId) => {
    let query = `
    SELECT * FROM orders WHERE orderId = ?
    `;

    try{
        let [rows] = await pool.query(query, [orderId]);
        
        // if order exist return true else return false
        if(rows.length > 0) {
            return true;
        } else {
            return false;
        } 
    }
    catch (e) {
        console.error(e);
        throw e;
    }
}

/////////////////////////////////////// Delete Order By Order Id ////////////////////////////////////////////////

OrderService.deleteOrder = async(orderId) => {
    let query = `
    DELETE FROM orders
    WHERE orderId = ?
    `;

    try {
        const res = await pool.query(query, [orderId]);
        return res;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

/////////////////////////////////////// Get all available orders by user NIC ////////////////////////////////////////////////

OrderService.getAllAvailableOrdersByUserNic = async(nic) => {
    let query = `
    SELECT o.orderId, os.status, c1.fullName as senderName, c1.nic as senderNic, o.receiverName, o.receiverAddress, o.receiverContactNumber, o.weight, pt.packageType, o.specialNote, b1.district as sendingBranch, b2.district as receivingBranch, o.registeredDate, o.paymentDate, o.deliveryDate, o.receivedDate
    FROM orders o
    JOIN client c1 ON o.senderNic = c1.nic
    JOIN branch b1 ON o.sendingBranchId = b1.branchId
    JOIN branch b2 ON o.receivingBranchId = b2.branchId
    JOIN packagetype pt ON o.packageTypeId = pt.packageTypeId
    JOIN orderstatus os ON os.statusId = o.statusId
    WHERE o.senderNic = ?
    `;

    try{
        let [rows] = await pool.query(query, [nic]);
        return rows;
    } catch(e) {
        console.error(e);
        throw e;
    }
}

export default OrderService;