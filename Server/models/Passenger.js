const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passengerSchema = new Schema({
  First_Name: {
    type: String,
    required: true,
  },
  Last_Name:{
    type: String,
    required: true,
  },
  Passport_Number:{
    type:String,
    required:true,
  },
  Email:{
    type:String,
    required:true,
    unique:true
  },
  Password :
  {
   type : String,
   required : true
  },
  Flights:{
    type:[{}]
  }}, { timestamps: true });

const Passenger = mongoose.model('Passenger', passengerSchema);
module.exports = Passenger; 