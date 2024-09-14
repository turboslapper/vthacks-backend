const express = require('express');
const Dorm = require('../models/Dorm');
const router = express.Router();

// Create a dorm
// Create a dorm
router.post('/', async (req, res) => {
    const { name, room_number, price, bathroom_cleanliness, wifi_strength, room_size, safety, air_conditioning, roommate, comment } = req.body;
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
            roommate,
            comment // Add comment to the dorm creation
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

// Update a dorm by ID (with partial updates)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body; // Get only the fields the user wants to update

        // Find and update the dorm with the given ID
        const dorm = await Dorm.findByIdAndUpdate(
            id,
            { $set: updates }, // Set only the fields provided in the request body
            { new: true, runValidators: true } // Return the updated dorm and validate the data
        );

        if (!dorm) {
            return res.status(404).json({ message: 'Dorm not found' });
        }

        res.status(200).json(dorm);
    } catch (error) {
        console.error('Error updating dorm:', error);
        res.status(400).json({ message: 'Error updating dorm', error: error.message || error });
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
