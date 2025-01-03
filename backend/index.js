const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB
connectToMongo();

const app = express();
const port = process.env.PORT || 5000; // Use environment variable or fallback to 5000

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api/auth', require('./routes/auth')); // Authentication routes
app.use('/api/notes', require('./routes/notes')); // Notes-related routes

// Default route (optional, for health check)
app.get('/', (req, res) => {
  res.send('Welcome to MyNotebook Backend API');
});

// Start the server
app.listen(port, () => {
  console.log(`MyNotebook backend running at http://localhost:${port}`);
});
