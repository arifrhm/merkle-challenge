const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');
const auth = require('../middleware/auth');

router.post('/guests', guestController.addGuest);
router.get('/guests', auth, guestController.getAllGuests);

module.exports = router;
