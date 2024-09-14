const mongoose = require('mongoose');

const dormSchema = new mongoose.Schema({
    name: { type: String, required: true },              // Dorm name
    room_number: { type: Number, required: true },       // Room number
    price: { type: Number, required: true },
    bathroom_cleanliness: { type: Number, min: 1, max: 5, required: true }, // 1 to 5 scale
    wifi_strength: { type: Number, min: 1, max: 5, required: true },        // 1 to 5 scale
    room_size: { type: Number, required: true },                           // In square feet
    safety: { type: Number, min: 1, max: 5, required: true },              // 1 to 5 scale
    air_conditioning: { type: Boolean, default: false },                   // Air conditioning availability
    roommate: { type: Boolean, default: false }                            // Roommate presence
}, { timestamps: true });

module.exports = mongoose.model('Dorm', dormSchema);
