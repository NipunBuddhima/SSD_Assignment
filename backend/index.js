import express from "express";
import helmet from "helmet";

// dotenv : to configure environment variables in the .env file
import dotenv from "dotenv";

// middleware for parsing request bodies
import bodyParser from "body-parser";

// cookie parser importing
import cookieParser from "cookie-parser";

// importing cors middleware
import corsMiddleware from "./middleware/cors.middleware.js";

// importing security middleware
import { securityHeaders, apiVersioning, securityLogging } from "./middleware/security.middleware.js";

// Import routes below this line. Do not edit anything above.
import { router as userRouter } from "./routes/user.routes.js";
import { router as authRoutes } from "./routes/auth.routes.js";
import { router as clientRouter } from "./routes/client.routes.js";
import { router as branchRouter } from "./routes/branch.routes.js";
import {router as orderRouter} from "./routes/order.routes.js";
import {router as routeRouter} from "./routes/route.routes.js"
import {router as transportRouter} from "./routes/transport.routes.js"
import {router as deliveryRouter} from "./routes/delivery.routes.js"
import {router as ticketRouter} from "./routes/ticket.routes.js"
import {router as feedbackRouter} from "./routes/feedback.routes.js"

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

// Security middleware - apply first
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// Trust proxy for rate limiting (if behind proxy)
app.set('trust proxy', 1);

app.use(securityHeaders);
app.use(securityLogging);
app.use(apiVersioning);

// Standard middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' })); // Limit payload size
app.use(corsMiddleware);

// Health check endpoint (no auth required)
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'CSMS API'
    });
});

// Route handlers
app.use(authRoutes);
app.use(userRouter);
app.use(clientRouter);
app.use(branchRouter);
app.use(orderRouter);
app.use(routeRouter);
app.use(transportRouter);
app.use(deliveryRouter);
app.use(ticketRouter);
app.use(feedbackRouter);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message
    });
});

// Setup port listener
app.listen(PORT, () => {
  console.log(`🔒 Secure CSMS Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
