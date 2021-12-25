const express = require('express')
const app = express();
const mongoose = require('mongoose')
const Flight = require("./models/Flight")
//const User = require("./models/User")
const Passenger = require("./models/Passenger")
const Confirmation_number = require("./models/Confirmation_numbers")
const Seat = require("./models/Seat")
const cors = require('cors')
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { response } = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
//const { sign, verify } = require('jsonwebtoken');
const session = require("express-session");
// const Stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const Stripe = require("stripe")
const stripe = Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const saltRounds = 10;
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
////important to understand its name 
app.use(methodOverride('_method'));
app.use(cookieParser());
require('dotenv').config();
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    // store : sessionStore,
    cookie: {
      expires: 1000 * 60 * 60 * 24,
    },
  })
);
const stripeSecretKey = "";
const stripePublicKey = "";
//cmongodb+srv://mernstacktest:mernstacktest@cluster0.1wydc.mongodb.net/myFirstDatabase?retryWrites=true
const MongoURL = process.env.MongoURL;
mongoose.connect(MongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log("MongoDB is now connected"))
  .catch(err => console.log(err));

app.listen(3001, () => {
  console.log("listening..");

})


app.get("/passenger/:id", (req, res) => {
  const id = req.params.id;
  Passenger.findById(id)
    //res.json(flights)
    .then(passengers => res.json(passengers))
    .catch(err => res.status(400).json('Error: ' + err));
});
// app.get("/passenger", (req, res) => {
//   const id =req.params.id;
//   Passenger.find({})
//     //res.json(flights)
//     .then(passengers => res.json(passengers))
//     .catch(err => res.status(400).json('Error: ' + err));
// });
// app.get("/passengers", (req, res) => {
//   Passenger.find({});









//-----------------// get all flights

// app.post('/addFlight', async (req, res) => {
//   console.log("here add flight");
//   //console.log(req.body);  //Sha8al
//   const new_flight = new Flight(req.body);
//   console.log(new_flight);
//   await new_flight.save().then(() => res.json('flight is added')).catch(err => res.status(400).json('Error: ' + err))
// });
//------ to delete a flight--//


