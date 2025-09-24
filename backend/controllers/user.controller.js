//// This is the controller which handles user logging in and registrations.

//Depends on UserService to interact with the database
//Depends on bcrypt to hash/compare user passwords

import UserService from "../services/user.service.js";
import bcrypt from "bcrypt"; // Encrypt password
import AuthController from "./auth.controller.js";

let UserController = {};

//Function to hash passwords when registereing users. Uses 10 salt rounds to hash. Modifiy if needed
function hashPassword(password) {
  let saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

//This is the loggin in handling function. Handeles user verifications.
//TODO:Impliment JWT for this.
UserController.verifyCredentials = async (req, res) => {
  let { nic_no, password } = req.body;
  let nicNo = nic_no;
  try {
    //New error handling functionalities
    if (!nicNo) {
      throw Error("NULL NIC No detected in login");
    }

    if (!password) {
      throw Error("NULL password detected in login");
    }

    // ^ Have to send a status/error code/ error message for each of the error cases

    let userList = await UserService.getUserCrednetials(nicNo);
    if (userList.length == 0) {
      res.status(404).send({ message: "User not found!" });
    } else {
      let user = userList[0];
      let match = await bcrypt.compare(password, user.password);
      if (match) {
        //JWT creation and sending through cookies
        let token = AuthController.createToken(nicNo);
        res.cookie("jwt", token, { httpOnly: true });

        //Now sending user details as well as role id for conditional rendering
        res
          .status(200)
          .send({ status: true, nic_no: nicNo, role_id: user.roleId });
      } else {
        res.status(401).send({ message: "Password mismatch" });
      }
    }
  } catch (error) {
    res.status(500).send({
      error: "Internal Server Error!",
    });
  }
};

//Function to register useres using user service, used to create customers, branch managers, etc.
UserController.signUpUser = async (nicNo, password, roleId) => {
  try {
    let userList = await UserService.getUserCrednetials(nicNo);
    if (userList.length !== 0) {
      throw Error("User already exists");
    } else {
      let hashedPassword = hashPassword(password);
      await UserService.registerUser(nicNo, hashedPassword, roleId);
    }
  } catch (e) {
    console.error("Error registering user : " + e);
    throw e;
  }
};

//Function to update user password. Used in the update profile password page.
UserController.updateUserPassword = async (nicNo, password) => {
  try {
    let hashedPassword = hashPassword(password);
    await UserService.updateUserPassword(nicNo, hashedPassword);
  } catch (e) {
    console.error("Error updating user password : " + e);
    throw e;
  }
};

//Logout function setting the jwt auth token to null and removing it after 1 millisecond.
UserController.logOutUser = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200);
};

export default UserController;
