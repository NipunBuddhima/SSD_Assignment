//Enhanced Auth Middleware with Role-Based Access Control (RBAC)
//Security improvements: proper error handling, role-based access, rate limiting
import jwt from 'jsonwebtoken';
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { pool } from "../database/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Basic authentication verification
export const verifyAuthentication = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid token."
        });
    }
};

// Role-based authorization middleware
export const authorizeRoles = (...roles) => {
    return async (req, res, next) => {
        try {
            if (!req.user || !req.user.userNic) {
                return res.status(401).json({
                    success: false,
                    message: "Authentication required."
                });
            }

            // Get user's role from database
            const query = `
                SELECT uc.roleId, r.role 
                FROM usercredentials uc 
                JOIN roles r ON uc.roleId = r.roleId 
                WHERE uc.userNic = ?
            `;
            const [rows] = await pool.query(query, [req.user.userNic]);
            
            if (rows.length === 0) {
                return res.status(403).json({
                    success: false,
                    message: "User role not found."
                });
            }

            const userRole = rows[0].role;
            req.user.role = userRole;
            req.user.roleId = rows[0].roleId;

            if (!roles.includes(userRole)) {
                return res.status(403).json({
                    success: false,
                    message: `Access denied. Required roles: ${roles.join(', ')}`
                });
            }

            next();
        } catch (error) {
            console.error("Authorization error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error during authorization."
            });
        }
    };
};

// Convenience middleware combinations
export const adminOnly = [verifyAuthentication, authorizeRoles('Admin')];
export const managerAccess = [verifyAuthentication, authorizeRoles('Admin', 'Branch Manager')];
export const clientAccess = [verifyAuthentication, authorizeRoles('Client')];
export const deliveryAccess = [verifyAuthentication, authorizeRoles('Delivery Person')];
export const transportAccess = [verifyAuthentication, authorizeRoles('Transport Agent')];

// Rate limiting for login attempts
const loginAttempts = new Map();

export const rateLimitLogin = (req, res, next) => {
    const clientIP = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxAttempts = 5;

    if (!loginAttempts.has(clientIP)) {
        loginAttempts.set(clientIP, { attempts: 1, lastAttempt: now });
        return next();
    }

    const clientData = loginAttempts.get(clientIP);
    
    // Reset if window has passed
    if (now - clientData.lastAttempt > windowMs) {
        loginAttempts.set(clientIP, { attempts: 1, lastAttempt: now });
        return next();
    }

    if (clientData.attempts >= maxAttempts) {
        return res.status(429).json({
            success: false,
            message: "Too many login attempts. Please try again later."
        });
    }

    clientData.attempts++;
    clientData.lastAttempt = now;
    next();
};