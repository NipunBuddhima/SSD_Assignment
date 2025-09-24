import TicketService from "../services/ticket.service.js";

let TicketController = {};

/////////////////////////////////////// Add a route ////////////////////////////////////////////////

TicketController.addTicket = async (req, res) => {

    try {
        const {
            nic,
            branchId,
            reasonId,
            message,
            responseStatusId
        } = req.body;


        await TicketService.addTicket(
            nic,
            branchId,
            reasonId,
            message,
            responseStatusId
        );

        res.status(201).send({ message: "Ticket added successfully" });

    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

/////////////////////////////////////// Get all ticket reasons ////////////////////////////////////////////////

TicketController.getAllReasons = async (req, res) => {
    try {
        let data = await TicketService.getAllReasons();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}

// Update a ticket by ticket id
TicketController.updateTicket = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const {
            responseStatusId
        } = req.body;

        await TicketService.updateTicket(id, responseStatusId);
        res.status(200).send({ message: "Ticket updated successfully" });

    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// Get all tickets by branch id
TicketController.getAllTicketsByBranchId = async (req, res) => {
    try {
        const {
            branchId
        } = req.params;

        let data = await TicketService.getAllTicketsByBranchId(branchId);
        res.status(200).send(data);

    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

// Update ticket reply

TicketController.updateTicketReply = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const {
            responseMessage
        } = req.body;

        await TicketService.updateTicketReply(id, responseMessage);
        res.status(200).send({ message: "Ticket reply updated successfully" });

    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

// Close ticket

TicketController.ticketStatusUpdate = async (req, res) => {
    try {
        const {
            ticketId,
            statusId
        } = req.params;

        await TicketService.ticketStatusUpdate(ticketId, statusId);
        res.status(200).send({ message: "Ticket closed successfully" });

    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

// Delete ticket

TicketController.deleteTicket = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        await TicketService.deleteTicket(id);
        res.status(200).send({ message: "Ticket deleted successfully" });

    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

// Get tickets by NIC

TicketController.getTicketsByNic = async (req, res) => {
    try {
        const {
            nic
        } = req.params;

        let data = await TicketService.getTicketsByNic(nic);
        res.status(200).send(data);

    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

export default TicketController;