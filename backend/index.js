import express from "express";

// dotenv : to configure environment variables in the .env file
import dotenv from "dotenv";

// middleware for parsing request bodies
import bodyParser from "body-parser";

// cookie parser importing
import cookieParser from "cookie-parser";

// importing cors middleware
import corsMiddleware from "./middleware/cors.middleware.js";

import { cookieParserMiddleware } from "./middleware/csrf.middleware.js";
import csrfProtection from "./middleware/csrf.middleware.js";

// Import routes below this line. Do not edit anything above.
import { router as userRouter } from "./routes/user.routes.js";
import { router as authRoutes } from "./routes/auth.routes.js";
import { router as clientRouter } from "./routes/client.routes.js";
import { router as branchRouter } from "./routes/branch.routes.js";
import { router as orderRouter } from "./routes/order.routes.js";
import { router as routeRouter } from "./routes/route.routes.js"
import { router as transportRouter } from "./routes/transport.routes.js"
import { router as deliveryRouter } from "./routes/delivery.routes.js"
import { router as ticketRouter } from "./routes/ticket.routes.js"
import { router as feedbackRouter } from "./routes/feedback.routes.js"

// Security headers
import helmet from "helmet";

// Rate limiting
import rateLimit from "express-rate-limit";

// Validation middleware
import ValidationMiddleware from "./middleware/validation.middleware.js";

// Do not edit anything below - (Ashan Thilochana)

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// CORS middleware - MUST BE FIRST!
app.use(corsMiddleware);
app.use(cookieParserMiddleware);
app.use(csrfProtection);

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' })); // Limit payload size

// Apply input sanitization to all routes
app.use(ValidationMiddleware.sanitizeInput);

// use imported routers here
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

// Setup port listner
/* app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
 */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});