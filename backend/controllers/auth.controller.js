///This is the controller which creates json web tokens.
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

let AuthController = {};

AuthController.createToken = (nicNo) => {
  return jwt.sign({ nicNo }, process.env.JWT_SECRET);
};

AuthController.createTokenWithMaxAge = (nicNo, maxAge) => {
  return jwt.sign({ nicNo }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

AuthController.createGoogleToken = (user) => {
  return jwt.sign(
    {
      id: user.googleId,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
};

export default AuthController;
