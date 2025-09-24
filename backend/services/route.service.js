import { pool } from "../database/database.js";

let RouteService = {};

/////////////////////////////////////// Check router existing status ////////////////////////////////////////////////


RouteService.checkRouteExistStatus = async (fBranchId, sBranchId) => {
    let query = `
        SELECT * FROM route
        WHERE firstBranchId = ? AND secondBranchId = ?
        LIMIT 1
        `;

    try {
        const [rows] = await pool.query(query, [fBranchId, sBranchId]);

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


/////////////////////////////////////// Add a route ////////////////////////////////////////////////

RouteService.addRoute = async (
    routeName,
    fBranchId,
    sBranchId
) => {
    let query = `
      INSERT INTO route(routeName, firstBranchId, secondBranchId)
      VALUES(?, ?, ?)
      `;

    try {
        const [rows] = await pool.query(query, [
            routeName,
            fBranchId,
            sBranchId
        ]);
    } catch (e) {
        console.error(e);
        throw e;
    }
};


/////////////////////////////////////// Get all routes ////////////////////////////////////////////////

RouteService.getAllRoutes = async () => {
    let query = `
    SELECT * FROM route
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


/////////////////////////////////////// Get all routes for table ////////////////////////////////////////////////

RouteService.getAllRoutesForTable = async () => {
    let query = `
    SELECT r.routeId, r.routeName, r.firstBranchId, r.secondBranchId, b1.district AS firstBranch, b2.district AS secondBranch
    FROM route r, branch b2, branch b1
    WHERE r.secondBranchId = b2.branchId AND r.firstBranchId = b1.branchId
    `;
    
    try {
        let [rows] = await pool.query(query);
        return rows;
    }
    catch (e) {
        console.error(e);
        throw e;
    }
}

/////////////////////////////////////// Update route ////////////////////////////////////////////////

RouteService.updateRoute = async (
    routeId,
    routeName,
    firstBranchId,
    secondBranchId
) => {
    let query = `
    UPDATE route
    SET routeName = ?, firstBranchId = ?, secondBranchId = ?
    WHERE routeId = ?
    `;

    try {
        await pool.query(query, [routeName, firstBranchId, secondBranchId, routeId]);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
};

/////////////////////////////////////// Delete route ////////////////////////////////////////////////

RouteService.deleteRoute = async (routeId) => {
    let query = `
    DELETE FROM route
    WHERE routeId = ?
    `;

    try {
        await pool.query(query, [routeId]);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
}

/////////////////////////////////////// Get branches by transport agent NIC ////////////////////////////////////////////////

RouteService.getBranchesByTransportAgentNic = async (nic) => {
    let query = `
    SELECT b1.district AS firstBranch, b2.district AS secondBranch
    FROM transportagent t, route r, branch b1, branch b2
    WHERE t.nic = ? AND t.routeId = r.routeId AND r.firstBranchId = b1.branchId AND r.secondBranchId = b2.branchId
    `;

    try {
        let [rows] = await pool.query(query, [nic]);
        return rows[0];
    }
    catch (e) {
        console.error(e);
        throw e;
    }
}

export default RouteService;