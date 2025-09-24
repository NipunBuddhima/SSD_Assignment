// User Management [COMPLETED] - Ashan

import { pool } from "../database/database.js";

let UserService = {};

//Function to get user credentials when logging in
UserService.getUserCrednetials = async (nicNo) => {
  try {
    let query = `
        SELECT * FROM usercredentials
        WHERE userNic = ?
        LIMIT 1
        `;
    const [rows] = await pool.query(query, [nicNo]);
    return rows;
  } catch (e) {
    console.error("Error getting credentials : " + e);
    throw e;
  }
};

//Function to register new user credentials
UserService.registerUser = async (nicNo, password, roleId) => {
  try {
    let query = `INSERT INTO usercredentials VALUES(?,?,?)`;
    await pool.query(query, [nicNo, password, roleId]);
  } catch (e) {
    console.error("Error registering user! :" + e);
    throw e;
  }
};

//Function to update user password
UserService.updateUserPassword = async (nicNo, password) => {
  try {
    let query = `UPDATE usercredentials SET password = ? WHERE userNic = ?`;
    await pool.query(query, [password, nicNo]);
  } catch (e) {
    console.error("Error updating user password! :" + e);
    throw e;
  }
};

export default UserService;
