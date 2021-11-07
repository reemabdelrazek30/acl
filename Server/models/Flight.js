const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlightSchema = new Schema({
  Flight_Number: {
    type: String,
    required: true,
  },
  Departure_Date :{   
    type: Date,
    required: true,
  },
  Departure_Time: {
    type: String ,
    required: true
  },
  Arrival_Date :{
    type: Date,
    required: true,
  },
  Arrival_Time: {
    type: String,
    required: true
  },
  Departure_Airport: {
    type: String,
    required: true
  },
  Arrival_Airport: {
    type: String,
    required: true
  },
  Number_of_Economy_seats: {
    type: Number,
    required: true,
  },
  Number_of_Business_seats: {
    type: Number,
    required: true
  },
}, { timestamps: false});

const Flight = mongoose.model('Flight', FlightSchema);
module.exports = Flight;

