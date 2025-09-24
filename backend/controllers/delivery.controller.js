import DeliveryPersonService from "../services/delivery.service.js";

let DeliverPersonController = {};

// Add a new delivery person
DeliverPersonController.addDeliveryPerson = async (req, res) => {
    try {
        const {
            nic,
            email,
            fullName,
            address,
            contactNumber,
            vehicleNumber,
            branchId
        } = req.body;

        let userExists = await DeliveryPersonService.checkUserExistStatus(nic);

        if (!userExists) {
            await DeliveryPersonService.addDeliveryPerson(
                nic,
                email,
                fullName,
                address,
                contactNumber,
                vehicleNumber,
                branchId
            );

            res.status(201).send({ message: "Delivery person added successfully" });
        } else {
            res.status(422).send({ error: "Delivery person already exists!" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// Update an existing delivery person
DeliverPersonController.updateDeliveryPerson = async (req, res) => {
    try {
        const {
            nic,
            email,
            fullName,
            address,
            contactNumber,
            vehicleNumber,
            
        } = req.body;

        await DeliveryPersonService.updateDeliveryPerson(
            nic,
            email,
            fullName,
            address,
            contactNumber,
            vehicleNumber,
            
        );

        res.status(200).send({ message: "Delivery person updated successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// Delete a delivery person
DeliverPersonController.deleteDeliveryPerson = async (req, res) => {
    try {
        let { nic } = req.body ;
        if(!nic){
          nic=  req.params.nic
        }

        await DeliveryPersonService.deleteDeliveryPerson(nic);

        res.status(200).send({ message: "Delivery person deleted successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: e });
    }
};

// Get all delivery persons
DeliverPersonController.getAllDeliveryPersons = async (req, res) => {
    try {
        const deliveryPersons = await DeliveryPersonService.getAllDeliveryPersons();

        res.status(200).send(deliveryPersons);
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// Get all delivery persons NICs by branch id
DeliverPersonController.getAllDeliveryPersonsNics = async (req, res) => {
    try {
        const { branchId } = req.params;
        const deliveryPersonsNics = await DeliveryPersonService.getAllDeliveryPersonsNics(branchId);

        res.status(200).send(deliveryPersonsNics);
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// Get orders by delivery person NIC

DeliverPersonController.getOrdersByDeliveryPersonNic = async (req, res) => {
    try {
        const { nic } = req.params;
        const orders = await DeliveryPersonService.getOrdersByDeliveryPersonNic(nic);

        res.status(200).send(orders);
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

export default DeliverPersonController;
