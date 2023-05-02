const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  note: {
    type: String,
    required: [true, 'Note is required'],
  },
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;
