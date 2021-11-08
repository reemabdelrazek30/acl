const express = require('express')
const app = express();
const mongoose = require('mongoose')
const Flight = require("./models/Flight")
const MongoURL = 'mongodb+srv://mernstacktest:mernstacktest@cluster0.1wydc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const cors = require('cors')
//const {body-parser} = require('body-parser');
const methodOverride = require('method-override');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.static("public"))
app.use(methodOverride('_method'));
// require('dotenv').config();
// MongoURL = process.env.MongoURL;
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
    console.log(req.body);  //Sha8al
    const new_flight = new Flight(req.body);
    console.log('passed'); // it never comes here
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
 

