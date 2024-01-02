const express = require('express');
const Landlord = require('../models/landlordModel');
const validateToken = require("../middleware/validateTokenHandler"); 
const router = express.Router();

// Get landlord profile by ID
router.get('/profile/:id', async (req, res) => {
  try {
    const landlord = await Landlord.findById(req.params.id);
    console.log(landlord);
    if (!landlord) {
      // console.log("print");
      return res.status(404).json({ message: 'Landlord not found' });
    }
    console.log("print");
    res.status(200).json(landlord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update landlord profile by ID
router.put('/profile/:id', async (req, res) => {
  try {
    const updatedLandlord = await Landlord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLandlord) {
      return res.status(404).json({ message: 'Landlord not found' });
    }
    res.status(200).json(updatedLandlord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete landlord profile by ID
router.delete('/profile/:id', async (req, res) => {
  try {
    const deletedLandlord = await Landlord.findByIdAndDelete(req.params.id);
    if (!deletedLandlord) {
      return res.status(404).json({ message: 'Landlord not found' });
    }
    res.status(200).json({ message: 'Landlord deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
