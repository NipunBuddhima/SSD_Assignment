// Dashbaord Data Handling Controller

import DashboardService  from "../services/dashboard.service";

let DashboardController = {};


// Get total available order count for belong branch
DashboardController.getTotalOrderCountOfBranch = async (req, res) => {

    try{
        let data = await DashbaordService.getTotalOrderCountOfBranch();
        res.status(200).send(data);
    }
    catch(e){
        res.status(500).send({ error: "Internal Server Error"});
    }

};

// Get total received order count for belong branch
DashboardController.getTotalReceivedOrderCount = async (req, res) => {

    try{
        let data = await DashbaordService.getTotalReceivedOrderCount();
        res.status(200).send(data);
    }
    catch(e){
        res.status(500).send({ error: "Internal Server Error"});
    }

};

// Get total tickets count for belong branch
DashboardController.getTotalOpenedTicketCount = async (req, res) => {

    try{
        let data = await DashbaordService.getTotalOpenedTicketCount();
        res.status(200).send(data);
    }
    catch(e){
        res.status(500).send({ error: "Internal Server Error"});
    }

};

// Get total feedback count for belong branch
DashboardController.getTotalFeedbackCount = async (req, res) => {

    try{
        let data = await DashbaordService.getTotalFeedbackCount();
        res.status(200).send(data);
    }
    catch(e){
        res.status(500).send({ error: "Internal Server Error"});
    }

};

export default DashboardController;