const mongoose = require('mongoose');

const dormSchema = new mongoose.Schema({
    userId: { type: String, required: true },  // User who created the dorm
    name: { type: String, required: true },
    room_number: { type: Number, required: true },
    price: { type: Number, required: true },
    bathroom_cleanliness: { type: Number, min: 1, max: 5, required: true },
    wifi_strength: { type: Number, min: 1, max: 5, required: true },
    room_size: { type: Number, required: true },
    safety: { type: Number, min: 1, max: 5, required: true },
    air_conditioning: { type: Boolean, default: false },
    roommate: { type: Boolean, default: false },
    comment: { type: String, maxlength: 500 }  // Comment section with max length of 500 characters
}, { timestamps: true });

module.exports = mongoose.model('Dorm', dormSchema);
