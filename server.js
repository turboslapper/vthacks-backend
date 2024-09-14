const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const dormRoutes = require('./routes/dormRoutes');
const { initAuth } = require('@propelauth/express');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// CORS Configuration
app.use(cors({
    origin: 'https://hokiehomes.co', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'], // Allow Authorization header
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch((error) => console.log('MongoDB connection error:', error));

// Initialize PropelAuth
const { requireUser } = initAuth({
    authUrl: process.env.PROPELAUTH_AUTH_URL,
    apiKey: process.env.PROPELAUTH_API_KEY  
});

// Debugging: Log Authorization header to check access token
app.use('/api/dorms', (req, res, next) => {
    console.log('Access Token:', req.headers.authorization); // Log the Authorization header
    next();
}, requireUser, dormRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
