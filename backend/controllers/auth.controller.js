///This is the controller which creates json web tokens.
//TODO:Have to introduce a max age 
import jwt from "jsonwebtoken";
import validator from 'validator';

import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

let AuthController = {};

AuthController.createToken = (nicNo) => {
  return jwt.sign({ nicNo }, process.env.JWT_SECRET,);
};

AuthController.createTokenWithMaxAge = (nicNo, maxAge) => {
  return jwt.sign({ nicNo }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

// login using NIC and password
AuthController.login = async (req, res) => {
  try {
    let { nic, password } = req.body;

    // Input validation and sanitization
    if (!nic || !password) {
      return res.status(400).send({ error: "NIC and password are required" });
    }

    // Sanitize inputs
    nic = validator.escape(nic.trim());

    // Validate NIC format
    if (!/^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(nic)) {
      return res.status(400).send({ error: "Invalid NIC format" });
    }

    let userData = await UserService.getUserCrednetials(nic);

    if (userData.length > 0) {
      let userPassword = userData[0].password;

      let isMatch = await bcrypt.compare(password, userPassword);

      if (isMatch) {
        let userRole = userData[0].roleId;
        let jwtData = { nic: nic, roleId: userRole };
        let token = jwt.sign(jwtData, process.env.SECRET_KEY);

        // Set secure cookie options
        res.cookie("authToken", token, {
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        res.status(200).send({ roleId: userRole });
      } else {
        res.status(401).send({ error: "Invalid credentials!" });
      }
    } else {
      res.status(401).send({ error: "Invalid credentials!" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export default AuthController;
