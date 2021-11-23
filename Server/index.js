const express = require('express')
const app = express();
const mongoose = require('mongoose')
const Flight = require("./models/Flight")
<<<<<<< HEAD
const User = require('./models/User');
const MongoURL = 'mongodb+srv://mernstacktest:mernstacktest@cluster0.1wydc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const cors = require('cors')
//const {body-parser} = require('body-parser');


=======
//const dotenv=require('')
const cors = require('cors')
//const {body-parser} = require('body-parser');
const methodOverride = require('method-override');
>>>>>>> cab9c52d8ff3e681ac511c1d4f3010d9b7f6feb5
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.static("public"))
app.use(methodOverride('_method'));
require('dotenv').config();
const MongoURL = process.env.MongoURL;
mongoose.connect(MongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

app.listen(3001,() => {
   console.log("listening..");
})
app.get("/", (req, res) => {
  Flight.find({})
   //res.json(users)
<<<<<<< HEAD
  .then(flights =>  res.json(flights))
=======
  .then(users =>  res.json(users))
>>>>>>> cab9c52d8ff3e681ac511c1d4f3010d9b7f6feb5
  .catch(err => res.status(400).json('Error: ' + err));
});
app.get("/schedule", (req, res) => {
  Flight.find({}).sort("Departure_Date").sort("Departure_Time")
  
  .then(users =>  res.json(users))
  .catch(err => res.status(400).json('Error: ' + err));
});



app.post('/addUser',  async(req,res) =>
{
  const Name=req.body.Name
  

  const new_user= new User({
    Name
  })
  new_user.save().then(()=> res.json('added')).catch(err => res.status(400).json('Error: '+err))
})

app.post('/addFlight', async (req,res) =>
{
    console.log("here");
    console.log(req.body);  //Sha8al
    const new_flight = new Flight(req.body);
    console.log('passed'); // it never comes here
    await new_flight.save().then(()=> res.json('flight is added')).catch(err => res.status(400).json('Error: '+err))
});
<<<<<<< HEAD
app.put('/updateFlight', async (req,res) =>
{
    // console.log("here");
    
    console.log(req.body);  //Sha8al
    // const new_flight = new Flight(req.body);
    // console.log('passed'); // it never comes here
    const id=(req.body._id)
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
    console.log("newf");
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
app.put('/test/:id', async (req,res) =>
{
    // console.log("here");
    
    console.log(req.body);  //Sha8al
    // const new_flight = new Flight(req.body);
    // console.log('passed'); // it never comes here
    const id=(req.params.id)
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
    console.log("newf");
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
=======
>>>>>>> cab9c52d8ff3e681ac511c1d4f3010d9b7f6feb5

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
 

