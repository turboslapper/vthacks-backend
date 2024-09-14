const express = require('express');
const Dorm = require('../models/Dorm');
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, room_number, price, bathroom_cleanliness, wifi_strength, room_size, safety, air_conditioning, roommate } = req.body;

    try {
        const dorm = new Dorm({ name, room_number, price, bathroom_cleanliness, wifi_strength, room_size, safety, air_conditioning, roommate });
        await dorm.save();
        res.status(201).json(dorm);
    } catch (error) {
        console.error('Error creating dorm:', error);  // Log the error for debugging
        res.status(400).json({ message: 'Error creating dorm', error: error.message || error });
    }
});




// READ all dorms
router.get('/', async (req, res) => {
    try {
        const dorms = await Dorm.find();
        res.status(200).json(dorms);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching dorms', error });
    }
});

// READ a single dorm by ID
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

router.put('/:id', async (req, res) => {
    const { name, room_number, price, bathroom_cleanliness, wifi_strength, room_size, safety, air_conditioning, roommate } = req.body;

    try {
        const dorm = await Dorm.findByIdAndUpdate(
            req.params.id,
            { name, room_number, price, bathroom_cleanliness, wifi_strength, room_size, safety, air_conditioning, roommate },
            { new: true, runValidators: true }
        );

        if (!dorm) {
            return res.status(404).json({ message: 'Dorm not found' });
        }

        res.status(200).json(dorm);
    } catch (error) {
        res.status(400).json({ message: 'Error updating dorm', error });
    }
});



// DELETE a dorm by ID
router.delete('/:id', async (req, res) => {
    try {
        const dorm = await Dorm.findByIdAndDelete(req.params.id);

        if (!dorm) {
            return res.status(404).json({ message: 'Dorm not found' });
        }

        res.status(200).json({ message: 'Dorm deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting dorm', error });
    }
});

module.exports = router;
