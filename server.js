const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dormRoutes = require('./routes/dormRoutes');
const { initAuth } = require('@propelauth/express');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch((error) => console.log('MongoDB connection error:', error));

// Initialize PropelAuth
const { requireUser } = initAuth({
    authUrl: process.env.PROPELAUTH_AUTH_URL,
    apiKey: process.env.PROPELAUTH_API_KEY  
});

// Protect the dorm routes with authentication
app.use('/api/dorms', requireUser, dormRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
