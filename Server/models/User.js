<<<<<<< HEAD
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Name: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
=======
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Name: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
>>>>>>> cab9c52d8ff3e681ac511c1d4f3010d9b7f6feb5
module.exports = User;