const express = require('express');
const router = express.Router();
const Room = require('../models/roomModel'); 
const Landlord = require('../models/landlordModel'); 
const validateToken = require('../middleware/validateTokenHandler');
const cors = require('cors');
const Tenant = require('../models/tenantModel');

router.post('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id; // Use route parameter
    const landlord = await Landlord.findById(userId);
    
    if (!landlord) {
      return res.status(403).json({ message: 'You are not authorized to create a room' });
    }

    const newRoomData = {
      type: req.body.type,
      email: req.body.email,
      photos: req.body.photos,
      address: req.body.address,
      landlord: userId,
      status: req.body.status
    };
    console.log("New Room Data:", newRoomData);
    const newRoom = new Room(newRoomData);
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });

  }
});


// Update room by ID (only alloweo the landlord who owns the room)
// router.put('/:id',validateToken, async (req, res) => {
router.put('/user/:id', async (req, res) => {
  try {
    const roomId = req.params.id;
    const room = await Room.findById(roomId);
    // console.log("run1");
    if (!room) {
      const userId = req.params.id;
      const newRoomData = {
        type: req.body.type,
        email: req.body.email,
        photos: req.body.photos,
        address: req.body.address,
        landlord: userId,
        status: req.body.status
      };
      console.log("New Room Data:", newRoomData);
      const newRoom = new Room(newRoomData);
      const savedRoom = await newRoom.save();
      return res.status(201).json(savedRoom);
      // return res.status(404).json({ message: 'Room not found' });
      
    }
    // console.log("run2");
    if (room.landlord.toString() !== req.body.landlord) {
      return res.status(403).json({ message: 'You are not authorized to update this room' });
    }
    // console.log("run3");
    const updatedRoomData = {
      type: req.body.type,

      email:req.body.email,

      photos: req.body.photos,
      address: req.body.address,
      landlord: req.body.landlord,
      status: req.body.status
    };
    // console.log(updatedRoomData);
    const updatedRoom = await Room.findByIdAndUpdate(roomId, updatedRoomData, { new: true });

    return res.status(200).json(updatedRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Delete room by ID (only allowed for the landlord who owns the room)
// router.delete('/:id',validateToken, async (req, res) => {
  router.delete('/user/:id', async (req, res) => {
  try {
    const roomId = req.params.id;
    if (!roomId) {
      return res.status(400).json({ message: 'Invalid room ID back' });
    }

    const room = await Room.findById(roomId);
    console.log(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }


    await Room.findByIdAndDelete(roomId);
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Get all rooms (only allowe for authenticated landlords)
router.get('/all', async (req, res) => {
  try {
   
    
    const rooms = await Room.find();

    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the user is a landlord
    const tenant = await Tenant.findById(userId);
    console.log(tenant);
    if (!tenant) {
      return res.status(403).json({ message: 'You are not authorized to view rooms' });
    }

    // Fetch rooms associated with the landlord
    const rooms = await Room.find({ tenant: userId });


    console.log(rooms)


    return res.status(200).json({ rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// get a room details with help of room id&&&&&&&&&&&&&&&&&&&&&&&&
router.get('/:id', async (req, res) => {
  try {
    const roomId = req.params.id;
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





module.exports = router;

