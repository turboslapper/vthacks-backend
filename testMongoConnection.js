const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
        process.exit(0);  // Exit after successful connection
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);  // Exit with error
    });
