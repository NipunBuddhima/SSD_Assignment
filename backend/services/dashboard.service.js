// Dashboard Data Handle Service

import { pool } from "../database/database";

let DashboardService = {};

// Dashboard get all available order count of a branch
DashbaordService.getTotalOrderCountOfBranch = async(branchMangeNic) => {
    let query  = `
    SELECT COUNT(orderId) AS availableOrders
    FROM orders o, branchManager bm
    WHERE o.sendingBranchId = bm.branchId AND bm.nic = ? AND statusId = 1;
    `;

    try{
        const count = await pool.query(query, [branchMangeNic]);
        return count;
    }
    catch(e) {
        console.error(e);
        throw e;
    }
};

// Dashboard get all received order count
DashbaordService.getTotalReceivedOrderCount = async(branchMangerNic) => {
    let query = `
     
    `;

    try{
        const count = await pool.query(query, [branchMangerNic]);
        return count;
    }
    catch(e) {
        console.error(e);
        throw e;
    }
}


// Dashboard get all opened ticket count

DashbaordService.getTotalOpenedTicketCount = async(branchMangerNic) => {
    let query = `
     
    `;

    try{
        const count = await pool.query(query, [branchMangerNic]);
        return count;
    }
    catch(e) {
        console.error(e);
        throw e;
    }
}



// Dashboard get all feedback count
DashbaordService.getTotalFeedbackCount = async(branchMangerNic) => {
    let query = `
     
    `;

    try{
        const count = await pool.query(query, [branchMangerNic]);
        return count;
    }
    catch(e) {
        console.error(e);
        throw e;
    }
}


export default DashboardService;