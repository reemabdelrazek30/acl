const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // User_id:{
  //   type: Number,
  //   required: true,
  // },
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
    //unique:true,
  },
  Password :
  {
   type : String,
   //required : true
  },
  Flights:{
    type:[{}]
  }}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User; 
