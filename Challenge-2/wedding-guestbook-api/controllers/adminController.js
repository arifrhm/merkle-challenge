const jwt = require('jsonwebtoken');
const Guest = require('../models/Guest');
const Note = Guest;

// Helper function to create JWT token
function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });
}

module.exports = {
  login: async (req, res) => {
    try {
      // Check if email and password are provided
      if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'Email and password are required' });
      }

      // Check if user exists and password matches
      const user = await Admin.findOne({ email: req.body.email });
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).send({ message: 'Invalid email or password' });
      }

      // Create JWT token
      const token = createToken(user);

      // Return token and user details
      res.status(200).send({ token, user: user.toJSON() });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Internal server error' });
    }
  },

  getAllGuests: async (req, res) => {
    try {
      // Get all guests from database
      const guests = await Guest.find();

      // Remove sensitive information from each guest object
      const guestsWithoutSensitiveInfo = guests.map((guest) => {
        const { _id, name, note } = guest;
        return { _id, name, note };
      });

      // Return guests data
      res.status(200).send(guestsWithoutSensitiveInfo);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Internal server error' });
    }
  },

  getAllNotes: async (req, res) => {
    try {
      // Get all notes from database
      const notes = await Note.find();

      // Remove sensitive information from each note object
      const notesWithoutSensitiveInfo = notes.map((note) => {
        const { _id, name } = note;
        return { _id, name };
      });

      // Return notes data
      res.status(200).send(notesWithoutSensitiveInfo);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Internal server error' });
    }
  },

  deleteGuest: async (req, res) => {
    try {
      // Find guest by id and remove from database
      await Guest.findByIdAndRemove(req.params.id);

      // Return success message
      res.status(200).send({ message: 'Guest successfully deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Internal server error' });
    }
  },

  deleteNote: async (req, res) => {
    try {
      // Find note by id and remove from database
      await Note.findByIdAndRemove(req.params.id);

      // Return success message
      res.status(200).send({ message: 'Note successfully deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Internal server error' });
    }
  }
};
