// Client Management Database Service [COMPLETED] - Ashan

import { pool } from "../database/database.js";
import UserController from "../controllers/user.controller.js";

let ClientService = {};

// Client already existing validation
ClientService.checkUserExistStatus = async (nic) => {
    let query = `
        SELECT * FROM client
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

// Add a new client
ClientService.addClient = async (
    nic,
    email,
    fullName,
    address,
    contactNumber,
    branchId
  ) => {
    let queryForClientTable = `
      INSERT INTO client
      VALUES(?, ?, ?, ?, ?, ?)
      `;
  
    try {
      const [rows] = await pool.query(queryForClientTable, [
        nic,
        email,
        fullName,
        address,
        contactNumber,
        branchId,
      ]);
      
      await UserController.signUpUser(nic, nic, 6);
  
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

// Get all clients
ClientService.getAllClients = async() => {
    let query = `
    SELECT c.nic, c.fullName, c.email, c.address, c.contactNumber, b.district
    FROM client c, branch b
    WHERE b.branchId = c.branchId
    `;

    try{
        const [rows] = await pool.query(query);
        return rows;
    } catch(e) {
        console.error(e);
        throw e;
    }
};

// Get all client belong to the branch by branchId
ClientService.getAllClientsByBranchId = async(branchId) => {
    let query = `
    SELECT c.nic, c.fullName, c.email, c.address, c.contactNumber, b.district
    FROM client c, branch b
    WHERE b.branchId = c.branchId AND b.branchId = ?
    `;

    try{
        const [rows] = await pool.query(query, [branchId]);
        return rows;
    } catch(e) {
        console.error(e);
        throw e;
    }
};

ClientService.getAllClientsWithoutJoins = async () => {
    let query = `
      SELECT * FROM client
      `;
  
    try {
      const [rows] = await pool.query(query);
      return rows;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

// Delete a client
ClientService.deleteClient = async (nic) => {
    let queryDeleteClientFeedbacks = `
    DELETE FROM clientfeedback WHERE clientNic = ?
    `;

    let queryDeleteSupportTickets = `
    DELETE FROM supportticket WHERE clientNic = ?
    `;

    let queryDeleteReturnedOrders = `
    DELETE FROM returnedorder WHERE orderId = (SELECT orderId FROM orders WHERE senderNic = ?)
    `;

    let queryDeleteOrderDeliveries = `
    DELETE FROM orderdelivery WHERE orderId = (SELECT orderId FROM orders WHERE senderNic = ?)
    `;
    
    let queryDeleteOrders = `
    DELETE FROM orders WHERE senderNic = ?
    `;

    let query = `
    DELETE FROM client WHERE nic = ?
    `;

    try {
        await pool.query(queryDeleteClientFeedbacks, [nic]);
        await pool.query(queryDeleteSupportTickets, [nic]);
        await pool.query(queryDeleteReturnedOrders, [nic]);
        await pool.query(queryDeleteOrderDeliveries, [nic]);
        await pool.query(queryDeleteOrders, [nic]);
        await pool.query(query, [nic]);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
};

// Update a client
ClientService.updateClient = async (nic, email, fullName, address, contactNumber) => {
    let query = `
    UPDATE client
    SET email = ?, fullName = ?, address = ?, contactNumber = ?
    WHERE nic = ?
    `;

    try {
        await pool.query(query, [email, fullName, address, contactNumber, nic]);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
};

// Get a client by NIC
ClientService.getClientDetails = async (nic) => {
    let query = `
    SELECT c.nic, c.fullName, c.email, c.address, c.contactNumber, b.district
    FROM client c, branch b
    WHERE b.branchId = c.branchId AND c.nic = ?
    `;

    try {
        const [rows] = await pool.query(query, [nic]);
        return rows[0];
    }
    catch (e) {
        console.error(e);
        throw e;
    }
};

// Update client password

ClientService.updateClientPassword = async (nic, password) => {
    try {
        await UserController.updateUserPassword(nic, password);
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export default ClientService;