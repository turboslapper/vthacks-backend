const express = require('express');
const Dorm = require('../models/Dorm');
const router = express.Router();

// Create a dorm
router.post('/', async (req, res) => {
    const { name, room_number, price, bathroom_cleanliness, wifi_strength, room_size, safety, air_conditioning, roommate } = req.body;
    try {
        const dorm = new Dorm({
            userId: req.user.userId, // Associate dorm with the logged-in user
            name,
            room_number,
            price,
            bathroom_cleanliness,
            wifi_strength,
            room_size,
            safety,
            air_conditioning,
            roommate
        });
        await dorm.save();
        res.status(201).json(dorm);
    } catch (error) {
        console.error('Error creating dorm:', error);
        res.status(400).json({ message: 'Error creating dorm', error: error.message || error });
    }
});

// Get all dorms
router.get('/', async (req, res) => {
    try {
        const dorms = await Dorm.find();
        res.status(200).json(dorms);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching dorms', error });
    }
});

// Get a dorm by ID
router.get('/:id', async (req, res) => {
    try {
        const dorm = await Dorm.findById(req.params.id);
        if (!dorm) {
            return res.status(404).json({ message: 'Dorm not found' });
        }
        res.status(200).json(dorm);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching dorm', error });
    }
});

// Update a dorm by ID
router.put('/:id', async (req, res) => {
    const { name, room_number, price, bathroom_cleanliness, wifi_strength, room_size, safety, air_conditioning, roommate } = req.body;
    try {
        const dorm = await Dorm.findById(req.params.id);
        if (!dorm) {
            return res.status(404).json({ message: 'Dorm not found' });
        }
        if (dorm.userId !== req.user.userId) {
            return res.status(403).json({ message: 'You are not authorized to edit this dorm' });
        }
        dorm.name = name;
        dorm.room_number = room_number;
        dorm.price = price;
        dorm.bathroom_cleanliness = bathroom_cleanliness;
        dorm.wifi_strength = wifi_strength;
        dorm.room_size = room_size;
        dorm.safety = safety;
        dorm.air_conditioning = air_conditioning;
        dorm.roommate = roommate;

        await dorm.save();
        res.status(200).json(dorm);
    } catch (error) {
        res.status(400).json({ message: 'Error updating dorm', error });
    }
});

// Delete a dorm by ID
router.delete('/:id', async (req, res) => {
    try {
        const dorm = await Dorm.findById(req.params.id);
        if (!dorm) {
            return res.status(404).json({ message: 'Dorm not found' });
        }

        // Check if the logged-in user is the owner
        if (dorm.userId !== req.user.userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this dorm' });
        }

        // Delete the dorm using the model, not the instance
        await Dorm.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: 'Dorm deleted' });
    } catch (error) {
        console.error('Error deleting dorm:', error);
        return res.status(500).json({ message: 'Error deleting dorm', error: error.message || error });
    }
});


module.exports = router;
