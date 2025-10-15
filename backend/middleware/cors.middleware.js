//CORS middleware to connect to frontend without issues

import cors from 'cors';

const corsOptions = {
  origin: "http://localhost:3000", // This should match your frontend's URL exactly
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Cookie'],
  exposedHeaders: ['Set-Cookie'],
  optionsSuccessStatus: 200
};

export default cors(corsOptions);