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
app.get("/", (req, res) => {
  Flight.find({})
   //res.json(users)
  .then(flights =>  console.log(flights))
  .catch(err => res.status(400).json('Error: ' + err));
});

app.post('/addFlight', async (req,res) =>
{
    // console.log("here");
    
    // console.log(req.body);  //Sha8al
    // const new_flight = new Flight(req.body);
    // console.log('passed'); // it never comes here
    const Flight_Number=(req.body.Flight_Number)
  const Departure_Date= Date.parse(req.body.Departure_Date)
  const Departure_Time=req.body.Departure_Time
  const Arrival_Date= Date.parse(req.body.Arrival_Date)
  const Arrival_Time=req.body.Arrival_Time
  const Departure_Airport=req.body.Departure_Airport
  const Arrival_Airport=req.body.Arrival_Airport
  const Number_of_Economy_seats= Number(req.body.Number_of_Economy_seats)
  
  const Number_of_Business_seats= Number(req.body.Number_of_Business_seats)

  const new_flight= new Flight({
    Flight_Number,Departure_Date,Departure_Time,Arrival_Date,Arrival_Time,Departure_Airport,Arrival_Airport,Number_of_Economy_seats,Number_of_Business_seats
  })
    await new_flight.save().then(()=> res.json('flight is added')).catch(err => res.status(400).json('Error: '+err))
});
app.put('/updateFlight', async (req,res) =>
{
    // console.log("here");
    
    // console.log(req.body);  //Sha8al
    // const new_flight = new Flight(req.body);
    // console.log('passed'); // it never comes here
    const id=(req.body.id)
    const Flight_Number=(req.body.Flight_Number)
  const Departure_Date= Date.parse(req.body.Departure_Date)
  const Departure_Time=req.body.Departure_Time
  const Arrival_Date= Date.parse(req.body.Arrival_Date)
  const Arrival_Time=req.body.Arrival_Time
  const Departure_Airport=req.body.Departure_Airport
  const Arrival_Airport=req.body.Arrival_Airport
  const Number_of_Economy_seats= Number(req.body.Number_of_Economy_seats)
  
  const Number_of_Business_seats= Number(req.body.Number_of_Business_seats)
try{
  await Flight.findById(id,(err,newf)=>{
    newf.Flight_Number=Flight_Number
    newf.Departure_Date=Departure_Date
    newf.Departure_Time=Departure_Time
    newf.Arrival_Date=Arrival_Date
    newf.Arrival_Time=Arrival_Time
    newf.Departure_Airport=Departure_Airport
    newf.Arrival_Airport=Arrival_Airport
    newf.Number_of_Economy_seats=Number_of_Economy_seats
    newf.Number_of_Business_seats=Number_of_Business_seats
    newf.save()
    res.send("updated")

  })
}catch(err){
  console.log(err)
}
  
   
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
