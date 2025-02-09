// * Importing Libraries
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';

// * Importing Database Connection
import connectDB from './config/db.js';

// * Importing Routes
import playerRoutes from './routes/playerRoutes.js';
import userRoutes from './routes/userRoutes.js';
import teamRoutes from "./routes/teamRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";

// * Importing Custom Error Handlers (Middleware)
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// * Load Environment Variables
dotenv.config();

// * Connect to MongoDB
connectDB();

// * Initialize Express App
const app = express();

// ✅ Enhanced CORS Configuration
app.use(cors({
  origin: ["http://localhost:3000", "https://yourfrontenddomain.com"], // Allowed Frontend URLs
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP Methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed Headers
  credentials: true // Allow cookies (if using authentication)
}));

// * Middleware
app.use(express.json()); // Allows JSON data in requests
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Logs requests in development mode
}

// * API Routes
app.get('/', (req, res) => {
  res.send('API is running..........');
});
app.get('/api', (req, res) => {
  res.send('API is running..........');
});

// * Mount API Routes
app.use('/api/player', playerRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);

// * Custom Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// * Server Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`.yellow.bold);
}).on('error', (err) => {
  console.error(`❌ Server error: ${err.message}`.red);
});
