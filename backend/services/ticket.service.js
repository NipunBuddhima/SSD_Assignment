import { pool } from "../database/database.js";

let TicketService = {};

/////////////////////////////////////// Add a ticket ////////////////////////////////////////////////

TicketService.addTicket = async (
    nic,
    branchId,
    reasonId,
    message,
    responseStatusId
) => {
    let query = `
      INSERT INTO supportTicket(clientNic, branchId, reasonId, message, responseStatusId)
      VALUES(?, ?, ?, ?, ?)
      `;

    try {
        const [rows] = await pool.query(query, [
            nic,
            branchId,
            reasonId,
            message,
            responseStatusId
        ]);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

/////////////////////////////////////// Get all ticket reasons ////////////////////////////////////////////////

TicketService.getAllReasons = async () => {
    let query = `
    SELECT * FROM supportticketreasons
    `;

    try {
        let [rows] = await pool.query(query);
        return rows;
    }
    catch (e) {
        console.error(e);
        throw e;
    }
};

////Get all tickets(Query is not complete)
TicketService.getAllTickets = async() => {
    let query = `
    SELECT t.nic, t.email, t.fullName, t.vehicleNumber, r.routeName 
    FROM transportAgent t, route r
    WHERE t.routeId = r.routeId
    `;

    try{
        const [rows] = await pool.query(query);
        return rows;
    } catch(e) {
        console.error(e);
        throw e;
    }
};

// Update a ticket by ticket id
TicketService.updateTicket = async (ticketId, responseStatusId) => {
    let query = `
    UPDATE supportTicket
    SET responseStatusId = ?
    WHERE ticketId = ?
    `;

    try {
        const [rows] = await pool.query(query, [responseStatusId, ticketId]);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

//Get all tickets by branch id

TicketService.getAllTicketsByBranchId = async (branchId) => {
    let query = `
    SELECT t.ticketId, t.clientNic, r.reason, t.message, s.responseStatus, t.responseMessage
    FROM supportticket t, supportticketreasons r, supportresponsestatus s
    WHERE t.branchId = ? AND t.reasonId = r.reasonId AND t.responseStatusId = s.responseStatusId
    `;

    try {
        const [rows] = await pool.query(query, [branchId]);
        return rows;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

// Update ticket reply

TicketService.updateTicketReply = async (ticketId, responseMessage) => {
    let query = `
    UPDATE supportTicket
    SET responseMessage = ?
    WHERE ticketId = ?
    `;

    let updateTicketResponseStatusQuery = `
    UPDATE supportTicket
    SET responseStatusId = 2
    WHERE ticketId = ?
    `;

    try {
        await pool.query(query, [responseMessage, ticketId]);
        await pool.query(updateTicketResponseStatusQuery, [ticketId]);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

// Close ticket

TicketService.ticketStatusUpdate = async (ticketId, statusId) => {
    let query = `
    UPDATE supportTicket
    SET responseStatusId = ?
    WHERE ticketId = ?
    `;

    try {
        await pool.query(query, [statusId, ticketId]);
    } catch (e) {
        console.error(e);
        throw e;
    }
}

// Delete ticket

TicketService.deleteTicket = async (ticketId) => {
    let query = `
    DELETE FROM supportTicket
    WHERE ticketId = ?
    `;

    try {
        await pool.query(query, [ticketId]);
    } catch (e) {
        console.error(e);
        throw e;
    }
}

// Get tickets by NIC

TicketService.getTicketsByNic = async (nic) => {
    let query = `
    SELECT t.ticketId, t.clientNic, r.reason, t.message, s.responseStatus, t.responseMessage
    FROM supportTicket t, supportTicketReasons r, supportResponseStatus s
    WHERE t.clientNic = ? AND t.reasonId = r.reasonId AND t.responseStatusId = s.responseStatusId
    `;

    try {
        const [rows] = await pool.query(query, [nic]);
        return rows;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export default TicketService;