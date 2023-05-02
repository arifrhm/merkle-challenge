const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/login', adminController.login);
router.get('/guests', auth, adminController.getAllGuests);
router.get('/notes', auth, adminController.getAllNotes);
router.delete('/guests/:id', auth, adminController.deleteGuest);
router.delete('/notes/:id', auth, adminController.deleteNote);

module.exports = router;
