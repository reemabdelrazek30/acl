const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeatSchema = new Schema({
  seatNumber: {
    type: Number,
    required: false
  },
  seatType: {
    type: String,
    required: false
  },
  status: {
    type: String,
    default: "free",
    required: false
  }
})

const Seat = mongoose.model('Seat', SeatSchema);
module.exports = Seat;