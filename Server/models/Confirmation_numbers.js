const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const confirmation_number = new Schema({
  

  numbers:{
    type:['']
  }}, { timestamps: true });

const Confirmation_number = mongoose.model('Confirmation_number', confirmation_number);
module.exports = Confirmation_number; 