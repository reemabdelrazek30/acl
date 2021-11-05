const express = require('express')
const app = express();
const mongoose = require('mongoose')
const Flight = require("./models/Flight")
const MongoURL = 'mongodb+srv://mernstacktest:mernstacktest@cluster0.1wydc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const cors = require('cors')
//const {body-parser} = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.static("public"))

mongoose.connect(MongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

app.listen(3001,() => {
   console.log("listening..");
})
app.get("/allFlights", (req, res) => {
  Flight.find({})
   //res.json(users)
  .then(users =>  res.send(users))
  .catch(err => res.status(400).json('Error: ' + err));
});

app.post('/addFlight', async (req,res) =>
{
    console.log("here");
    console.log(req.body);  //Sha8al
    const new_flight = new Flight(req.body);
    console.log('passed'); // it never comes here
    await new_flight.save().then(()=> res.json('flight is added')).catch(err => res.status(400).json('Error: '+err))
});


app.get("/searchByflightNumber/:flight_Number", (req, res) => {
    Flight.find({"Flight_Number":req.params.flight_Number})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
 });
  //-----------------//
  app.get("/searchByDate/:date", (req, res) => {
    Flight.find({"Flight_Date":req.params.date})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  
  //------------------//
  app.get("/searchByDeparture_Time/:Departure_Time", (req, res) => {
    Flight.find({"Departure_Time":req.params.Departure_Time})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  //--------------------//
  app.get("/searchByArrival_Time/:Arrival_Time", (req, res) => {
    Flight.find({"Arrival_Time":req.params.Arrival_Time})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  //---------------//
  app.get("/searchByAirport/:Airport", (req, res) => {
    Flight.find({"Airport":req.params.Airport})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  //-----------------// get all flights
