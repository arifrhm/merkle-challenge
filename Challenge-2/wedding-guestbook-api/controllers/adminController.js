const express = require('express');
const router = express.Router();

const Guest = require('../models/Guest');

// Admin page - GET /admin
router.get('/', async (req, res) => {
  try {
    const guests = await Guest.find({});
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

// Delete entry - DELETE /admin/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedGuest = await Guest.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        guest: deletedGuest,
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
