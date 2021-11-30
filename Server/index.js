const express = require('express')
const app = express();
const mongoose = require('mongoose')
const Flight = require("./models/Flight")
const Seat = require("./models/Seat")
//const dotenv=require('')
const cors = require('cors')
//const {body-parser} = require('body-parser');
const methodOverride = require('method-override');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.static("public"))
app.use(methodOverride('_method'));
require('dotenv').config();
const MongoURL = process.env.MongoURL;
console.log(MongoURL);
mongoose.connect(MongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

app.listen(3001,() => {
   console.log("listening..");
})

app.get("/", (req, res) => {
  Flight.find({})
   //res.json(users)
  .then(users =>  res.json(users))
  .catch(err => res.status(400).json('Error: ' + err));
});

app.post('/addFlight', async (req,res) =>
{
    console.log("here");
    //console.log(req.body);  //Sha8al
    const new_flight = new Flight(req.body);
    const seats = [];
    console.log("business seats: ", req.body.Number_of_Business_seats);
    console.log("economy seats: ", req.body.Number_of_Economy_seats);
    for (var i = 0; i < req.body.Number_of_Economy_seats; i++){
      const newSeat = new Seat({"seatNumber": i, "seatType":"Economy"});
      console.log(newSeat.seatNumber);
      seats.push(newSeat);
    }
    for (var j = 0; j < req.body.Number_of_Business_seats; j++){
      const newSeat = new Seat({"seatNumber": j, "seatType":"Business"});
      seats.push(newSeat);
    }
    new_flight.flightSeats = seats;
    new_flight.numberOfAvailableEconomySeats = req.body.Number_of_Economy_seats;
    new_flight.numberOfAvailableBusinessSeats = req.body.Number_of_Business_seats; 
    console.log('passed'); // it never comes here
    //console.log(seats);
    console.log(new_flight);
    await new_flight.save().then(()=> res.json('flight is added')).catch(err => res.status(400).json('Error: '+err))
});

app.get("/schedule", (req, res) => {
  Flight.find({}).sort("Departure_Date").sort("Departure_Time")
  
  .then(users =>  res.json(users))
  .catch(err => res.status(400).json('Error: ' + err));
})
  //-----------------// get all flights

  //------ to delete a flight--//
  app.delete("/delete/:id", async (req,res)=>{
    const id=req.params.id;  
    await Flight.findByIdAndRemove(id).exec();
    // res.send("flight deleted");
  });
     
  app.put("/updateFlight/:id", async (req,res)=>
  {
    console.log('here');
    let flight = await Flight.findById(req.params.id);
    await Flight.updateOne({ Flight_Number: req.body.Flight_Number,
      Departure_Date: req.body.Departure_Date,
      Departure_Time: req.body.Departure_Time,
      Arrival_Date: req.body.Arrival_Date,
      Arrival_Time: req.body.Arrival_Time,
      Departure_Airport:req.body.Departure_Airport,
      Arrival_Airport: req.body.Arrival_Airport,
      Number_of_Economy_seats: req.body.Number_of_Economy_Seats,
      Number_of_Business_seats: req.body.Number_of_Business_Seats});
      console.log('hello');
    // .then(res => console.log("filayy"))
    // .catch(err => console.log(err));
  });

  // app.put("/reserveSeats/:id", async(req,res) =>
  // {
  //   let flight = await Flight.findById(req.params.id);
  //   await Flight.updateOne({
  //      flightSeats: req.body.flightSeats
  //   });
  //   console.log('here i am :( ');
  // });
 
 app.get("/getSeats/:id", (req, res) => {
  /* console.log("I'M GETTING SEATS"); // doesn't reach here*/
 //  console.log(req.params.id);
  // let seats = Flight.find(req.body._id).select(flightSeats);
   Flight.findById(req.params.id,{_id:0,flightSeats:1})
   //console.log(seats);
   .then(users =>  res.json(users))
   .catch(err => res.status(400).json('Error: ' + err));
})

