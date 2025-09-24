import { pool } from "../database/database.js";
import UserController from "../controllers/user.controller.js";

let DeliveryPersonService = {};

// Client already existing validation
DeliveryPersonService.checkUserExistStatus = async (nic) => {
    let query = `
        SELECT * FROM deliveryperson
        WHERE nic = ?
        LIMIT 1
        `;

    try {
        const [rows] = await pool.query(query, [nic]);

        if (rows.length !== 0) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (e) {
        console.error(e);
        throw e;
    }
};

// Add a delivery person
DeliveryPersonService.addDeliveryPerson = async (
    nic,
    email,
    fullName,
    address,
    contactNumber,
    vehicleNumber,
    branchId
) => {
    let query = `
      INSERT INTO deliveryperson
      VALUES(?, ?, ?, ?, ?, ?, ?)
      `;

    try {
        const [rows] = await pool.query(query, [
            nic,
            email,
            fullName,
            address,
            contactNumber,
            vehicleNumber,
            branchId
        ]);

        await UserController.signUpUser(nic, nic, 4); // Role id 4 = delivery person

    } catch (e) {
        console.error(e);
        throw e;
    }
};

// Get all delivery persons
DeliveryPersonService.getAllDeliveryPersons = async () => {
    let query = `
        SELECT * FROM deliveryperson
        `;

    try {
        const [rows] = await pool.query(query);
        return rows;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

// Update a delivery person
DeliveryPersonService.updateDeliveryPerson = async (
    nic,
    email,
    fullName,
    address,
    contactNumber,
    vehicleNumber,
    
) => {
    let query = `
        UPDATE deliveryperson
        SET email = ?, fullName = ?, address = ?, contactNumber = ?, vehicleNumber = ?
        WHERE nic = ?
        `;

    try {
        console.log(nic)
        const [rows] = await pool.query(query, [
            email,
            fullName,
            address,
            contactNumber,
            vehicleNumber,
            
            nic
        ]);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

// Delete a delivery person
DeliveryPersonService.deleteDeliveryPerson = async (nic) => {
    let queryCheck = `
        SELECT * FROM orders
        WHERE senderNic  = ?
        `;
    let queryDelete = `
        DELETE FROM deliveryperson
        WHERE nic = ?
        `;

    try {
        const [rows] = await pool.query(queryCheck, [nic]);
        if (rows.length > 0) {
            // If there are related records, handle it here
            throw new Error('Cannot delete delivery person with active orders');
        } else {
            await pool.query(queryDelete, [nic]);
        }
    } catch (e) {
        console.error(e);
        throw e;
    }
};

// Get all delivery persons NICs by branch id
DeliveryPersonService.getAllDeliveryPersonsNics = async (branchId) => {
    let query = `
        SELECT nic FROM deliveryperson
        WHERE branchId = ?
        `;

    try {
        const [rows] = await pool.query(query, [branchId]);
        return rows;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

// Get orders by delivery person NIC

DeliveryPersonService.getOrdersByDeliveryPersonNic = async (nic) => {
    let query = `
    SELECT o.orderId, o.registeredDate, o.receiverName, o.receiverAddress, s.status
    FROM orders o, orderdelivery od, orderstatus s
    WHERE o.orderId = od.orderId AND o.statusId = s.statusId AND od.deliveryPersonNic = ?
        `;

    try {
        const [rows] = await pool.query(query, [nic]);
        return rows;
    } catch (e) {
        console.error(e);
        throw e;
    }
}


export default DeliveryPersonService;