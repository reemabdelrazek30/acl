const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//import Seat from './Seat'
const Seat = require("./Seat")
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
  flightSeats: {
    type: [{}],
    required: false
  },
  numberOfAvailableEconomySeats: {
    type: Number,
    required: false
  },
  numberOfAvailableBusinessSeats: {
    type: Number,
    required: false
  },
  price_child:{
    type:Number,
    require:true
  },
  price_adult:{
    type:Number,
    require:true
  },
  baggage:{
    type:Number,
    require:true
  }
}, { timestamps: false});


const Flight = mongoose.model('Flight', FlightSchema);
module.exports = Flight;

