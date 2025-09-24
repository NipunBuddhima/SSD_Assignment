import express from "express";

// dotenv : to configure environment variables in the .env file
import dotenv from "dotenv";

// middleware for parsing request bodies
import bodyParser from "body-parser";

// cookie parser importing
import cookieParser from "cookie-parser";

// importing cors middleware
import corsMiddleware from "./middleware/cors.middleware.js";

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


// Do not edit anything below - (Ashan Thilochana)

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(corsMiddleware);

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
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
