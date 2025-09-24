//Auth Middleware to to check for autherization when accessing routes.
//TODO: use on other routes excepts user handling, auth routes
import jwt from 'jsonwebtoken';
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });


export const verifyAuthentication = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token)
    {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err)
            {
                res.status(401).send({message : "Unauthorized!"});
            }
            else
            {
                next();
            }
        })
    }
    else
    {
        res.status(401).send({message : "Unauthorized!"});
    }
}