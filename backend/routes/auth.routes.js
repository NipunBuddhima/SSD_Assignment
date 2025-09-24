//Auth routes to check for authentication
import express from 'express';
import jwt from 'jsonwebtoken';
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });


const router = express.Router();

router.route("/api/user/auth").post((req, res) => {
    const token = req.cookies.jwt;
    if(token)
    {
        //checking the jwt
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err)
            {
                res.status(401).send({
                    status : false,
                    message : "Unauthorized!"});
            }
            else
            {
                res.status(200).send({
                    status : true,
                    message : "Authorized!"});
            }
        })
    }
    else
    {
        res.status(401).send({
            status : false,
            message : "Unauthorized!"});
    }
});

export {router};