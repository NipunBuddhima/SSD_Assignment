// Branch Management Database Service

import {pool} from "../database/database.js";

let BranchService = {}

// Branch already existing validation
BranchService.checkBranchExistStatus = async (district) => {
    try{
        let query = `
        SELECT * FROM branch
        WHERE district = ?
        LIMIT 1
        `;

        const [rows] = await pool.query(query, [district]);

        if(rows.length !== 0){
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

// Add a new branch
BranchService.addBranch = async (district, address, mapLocation, contactNumber) => {
    let query = `
    INSERT INTO branch(district, address, mapLocation, contactNumber)
    VALUE(?, ?, ?, ?)
    `;

    try{
        const [rows] = await pool.query(query, [district, address, mapLocation, contactNumber]);
    }
    catch(e) {
        console.error(e);
        throw e;
    }
};

// Show all branches
BranchService.getAllBranches = async () => {
    let query = `
    SELECT * FROM branch
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


BranchService.getBranchIdByBranchManagerNIC = async (nic) =>{
    let query = `
    SELECT branchID FROM branchmanager
    WHERE nic = ?`;
    try{
        let [rows] = await pool.query(query, [nic]);
        return rows;
    }
    catch(e) {
        console.error(e);
        throw e;
    }
}

// Update a branch

BranchService.updateBranch = async (branchId, district, address, mapLocation, contactNumber) => {
    let query = `
    UPDATE branch
    SET district = ?, address = ?, mapLocation = ?, contactNumber = ?
    WHERE branchID = ?
    `;

    try{
        let [rows] = await pool.query(query, [district, address, mapLocation, contactNumber, branchId]);
        return rows;
    }
    catch(e) {
        console.error(e);
        throw e;
    }
}

// delete branch

BranchService.deleteBranch = async (branchId) => {
    let query = `
    DELETE FROM branch
    WHERE branchID = ?
    `;

    try{
        let [rows] = await pool.query(query, [branchId]);
        return rows;
    }
    catch(e) {
        console.error(e);
        throw e;
    }
}


export default BranchService;
