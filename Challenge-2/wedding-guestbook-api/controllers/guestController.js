// guestController.js

// Import the Guest model
const Guest = require('../models/Guest');

// Define the addGuest function
exports.addGuest = async (req, res, next) => {
  try {
    // Create a new guest object from the request body
    const newGuest = new Guest({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      note: req.body.note
    });

    // Save the new guest object to the database
    const savedGuest = await newGuest.save();

    // Send a response with the saved guest object
    res.status(201).json(savedGuest);
  } catch (error) {
    next(error);
  }
};

// Define the getAllGuests function
exports.getAllGuests = async (req, res, next) => {
  try {
    // Find all guests in the database
    const guests = await Guest.find();

    // Send a response with the guest array
    res.status(200).json(guests);
  } catch (error) {
    next(error);
  }
};
