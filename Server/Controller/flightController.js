const Flight = require('../models/Flight');


const getAllFlights =  (req, res) =>
  {
    console.log("request for all flights came");
    Flight.find({})
     //res.json(users)
    .then(users =>  res.send(users))
    .catch(err => res.status(400).json('Error: ' + err));
  };

  module.exports= {getAllFlights};