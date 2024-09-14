const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dormRoutes = require('./routes/dormRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch((error) => console.log('MongoDB connection error:', error));


// Routes for handling dorms
app.use('/api/dorms', dormRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
