const express = require('express');
const router = express.Router();

const Guest = require('../models/Guest');

// Guest Forms - POST /guests
router.post('/', async (req, res) => {
  try {
    const newGuest = await Guest.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        guest: newGuest,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
});

// Note Gallery - GET /guests
router.get('/', async (req, res) => {
  try {
    const guests = await Guest.find({}, { name: 1, note: 1, _id: 0 });
    res.status(200).json({
      status: 'success',
      results: guests.length,
      data: {
        guests,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

module.exports = router;
