import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const verifyAuthentication = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).send({ message: "Unauthorized!" });
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "Unauthorized!" });
  }
};

export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    if (typeof roles === "string") {
      roles = [roles];
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).send({
        message: "Access denied: insufficient privileges",
      });
    }

    next();
  };
};
