//CORS middleware to connect to frontend without issues

import cors from 'cors';

const corsOptions = {
    origin: "http://localhost:3000", // This should match your frontend's URL exactly
    credentials: true,
  };

export default cors(corsOptions);