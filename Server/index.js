const express = require('express')
const app = express();
const mongoose = require('mongoose')
const Flight = require("./models/Flight")
const User = require("./models/User")
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
//const MongoURL = Process.env.MongoURL;
const MongoURL = "mongodb+srv://mernstacktest:mernstacktest@cluster0.1wydc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const saltRounds = 10;
// app.use(
//   cors({
//     origin: ["http://localhost:3001"],
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     credentials: true,
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(methodOverride('_method'));
//app.use(cookieParser());
require('dotenv').config();
// app.use(
//   session({
//     key: "userId",
//     secret: "subscribe",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 60 * 60 * 24,
//     },
//   })
// );

mongoose.connect(MongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log("MongoDB is now connected"))
  .catch(err => console.log(err));

app.listen(3001, () => {
  console.log("listening..");

})

// app.post("/register", (req, res) => {
//   const { First_Name, Last_Name, Passport_Number, Email, password } = req.body;
//   bcrypt.hash(password, 10).then((hash) => {
//     const newUser = new User({ "First_Name": First_Name, "Last_Name": Last_Name, "Passport_Number": Passport_Number, "Email": Email });
//     User.insertOne(newUser);
//   }).then(() => console.log("user registered"))
//     .catch(err => console.log(err));
// });

// const createTokens = (user) => {
//   const accessToken = sign({ email: user.Email, id: user._id }, Process.env.AccessToken);
//   return accessToken;
// }

// const validateToken = (req, res, next) => {
//   const accessToken = req.cookies("access-token");
//   if (!accessToken)
//     return res.status(400).json({error:"User not Auth"});
//   try 
//   {
//     const validToken = verify(accessToken,Process.env.AccessToken)
//     if (validToken)
//     {
//       req.authenticated = true;
//       return next();
//     }
//   }
//   catch(err) {res.status(400).json({error:err})}
// }


// m



app.get("/Flights", (req, res) => {
  console.log('here');
  Flight.find({})
    //res.json(flights)
    .then(flights => res.send(flights))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get("/user", (req, res) => {
  User.find({})
    //res.json(flights)
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.post("/get_available_flights", (req, res) => {
  console.log("entered..");
  console.log(JSON.stringify(req.body));
  const Departure_Date = req.body.Departure_Date
  //  const Arrival_Date = req.body.Arrival_Date
  const Departure_Airport = req.body.Departure_Airport
  const Arrival_Airport = req.body.Arrival_Airport
  const Class = req.body.Class
  const number_seats = req.body.seats
  console.log(`Departure_Airport +${Departure_Airport}` + "  body>" + req.body.Departure_Airport);
  console.log(JSON.stringify(req.body) + "the whole body")

  //  Flight.find({"Departure_Airport": Departure_Airport})



  // .then(flights =>  res.json(flights))
  //   .catch(err => res.status(400).json('Error: ' + err));

  //console.log(err);
  // if ( ! ( Departure_Date || Departure_Airport ||  Arrival_Airport || Arrival_Date ) ) 
  // { console.log("res=null")

  //   res = null ;}
  // else 
  if (Class === "Economy") {
    Flight.find({
      "Departure_Date": (Departure_Date ? Departure_Date : { $nin: [null] }),

      "numberOfAvailableEconomySeats": { $gte: number_seats },
      "Departure_Airport": (Departure_Airport ? Departure_Airport : { $nin: [null] }), "Arrival_Airport": (Arrival_Airport ? Arrival_Airport : { $nin: [null] })

    }).then(flights => (res.json(flights), console.log("before> " + JSON.stringify(flights) + "entered if")))
      .catch(err => console.log(err));
  }
  else {
    Flight.find({
      "Departure_Date": (Departure_Date ? Departure_Date : { $nin: [null] }),

      "numberOfAvailableBusinessSeats": { $gte: number_seats },
      "Departure_Airport": (Departure_Airport ? Departure_Airport : { $nin: [null] }), "Arrival_Airport": (Arrival_Airport ? Arrival_Airport : { $nin: [null] })

    }).then(flights => res.json(flights))
      .catch(err => console.log(err));
  }


})
//   let filerterby ={};
//   if(Departure_Airport!==''){
//     filerterby.Departure_Airport= Departure_Airport;
//   }
//   if(Arrival_Airport!==''){
//     filerterby.Arrival_Airport= Arrival_Airport
//   }
//   let result=Flight.find({});
//   console.log(result+"result1")
//   if((Object.keys(filerterby)).length>0){
//     //Object.keys(obj).forEach(key => {
// //   console.log(key, obj[key]);
// // });
// console.log(JSON.stringify(filerterby) +" filterby");

// Object.keys(filerterby).forEach(key => {
// // {filerterby.map((k,v)=>{
//   console.log(key, filerterby[key]);
//   //result= result.find({key: filerterby[key]})
//    Flight.find({key: filerterby[key]}) .then(flights =>  res.json(flights))
//   .catch(err => res.status(400).json('Error: ' + err));
// })}

//console.log(result+"result")

//  }
//     result= result.find({Departure_Airport: Departure_Airport})
//   }
// if(Departure_Date!==''){
//   result+=Flight.find({Departure_Airport: Departure_Airport})
//   flight.find(()=>{
//     (Departure_Date!==''? (Departure_Airport: Departure_Airport) :{})
//     })
// }

//await Flight.find({Departure_Airport: Departure_Airport})//.find( {Arrival_Airport: Arrival_Airport})
//res.json(flights)
//  .then(flights =>  res.json(flights))
// .catch(err => res.status(400).json('Error: ' + err));
// });
// find({
//   $or: [
//     {"Departure_Date": {$gt :Departure_Date}  ,
//  "Departure_Airport":Departure_Airport ,"Arrival_Airport":Arrival_Airport ,"Arrival_Date" :(Arrival_Date ? Arrival_Date : {$nin : [null]})
// },
//     { "Departure_Date": {$gte :Departure_Date}  ,"Arrival_Time":{$gt :Departure_Time}
//  "Departure_Airport":Departure_Airport ,"Arrival_Airport":Arrival_Airport ,"Arrival_Date" :(Arrival_Date ? Arrival_Date : {$nin : [null]})
// }
//   ]
// });
// $and: [
//   {
//     $or: [
//       { age: { $gte: 29 } },
//       { rank: 'Commander' }
//     ]
//   },
//   {
//     $or: [
//       { name: { $lte: 'D' } },
//       { name: { $gte: 'W' } }
//     ]
//   }
// ]
app.get("/getSeats/:id", (req, res) => {
  Flight.findById(req.params.id, { _id: 0, flightSeats: 1 })
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
})
app.post("/get_flights", (req, res) => {
  const id = req.body.id
  Flight.findById(id)
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
})


// app.post("/get_return_flights", (req, res) => {
//   console.log("entered..returnflight");
//   console.log(JSON.stringify(req.body) + "return flight");
//   const Departure_Date = req.body.Departure_Date
//   const Arrival_Date = req.body.Arrival_Date
//   const Departure_Airport = req.body.Departure_Airport
//   const Arrival_Airport = req.body.Arrival_Airport
//   const time = req.body.Dtime
//   const Class = req.body.Class
//   const number_seats = req.body.seats
//   console.log(`Departure_Airport +${Departure_Airport}` + "  body>" + req.body.Departure_Airport);
//   console.log(JSON.stringify(req.body) + "the whole body")

//   //"Arrival_Airport":(Arrival_Airport ? Arrival_Airport:{$nin : [null]}
//   //  Flight.find({"Departure_Date": {$gt :Departure_Date}  ,
//   //  "Departure_Airport":Departure_Airport ,"Arrival_Airport":Arrival_Airport ,"Arrival_Date" :(Arrival_Date ? Arrival_Date : {$nin : [null]})
//   // })
//   if (Class === "Economy") {
//     Flight.find({
//       $or: [
//         {
//           "Departure_Date": { $gt: Departure_Date }, "numberOfAvailableEconomySeats": { $gt: number_seats },
//           "Departure_Airport": Departure_Airport, "Arrival_Airport": Arrival_Airport, "Arrival_Date": (Arrival_Date ? Arrival_Date : { $nin: [null] })
//         },
//         {
//           "Departure_Date": { $gte: Departure_Date }, "Departure_Time": { $gt: time },
//           "Departure_Airport": Departure_Airport, "Arrival_Airport": Arrival_Airport, "Arrival_Date": (Arrival_Date ? Arrival_Date : { $nin: [null] })
//         }
//       ]
//     })

//   }})

app.post("/get_return_flights", (req, res) => {
  console.log("entered..returnflight");
  console.log(JSON.stringify(req.body) + "return flight");
  const Departure_Date = req.body.Departure_Date
  const Arrival_Date = req.body.Arrival_Date
  const Departure_Airport = req.body.Departure_Airport
  const Arrival_Airport = req.body.Arrival_Airport
  const time = req.body.Dtime
  const Class = req.body.Class
  const number_seats = req.body.seats
  console.log(`Departure_Airport +${Departure_Airport}` + "  body>" + req.body.Departure_Airport);
  console.log(JSON.stringify(req.body) + "the whole body")

  //"Arrival_Airport":(Arrival_Airport ? Arrival_Airport:{$nin : [null]}
  //  Flight.find({"Departure_Date": {$gt :Departure_Date}  ,
  //  "Departure_Airport":Departure_Airport ,"Arrival_Airport":Arrival_Airport ,"Arrival_Date" :(Arrival_Date ? Arrival_Date : {$nin : [null]})
  // })
  if (Class === "Economy") {
    Flight.find({
      $or: [
        {
          "Departure_Date": { $gt: Departure_Date }, "numberOfAvailableEconomySeats": { $gt: number_seats },
          "Departure_Airport": Departure_Airport, "Arrival_Airport": Arrival_Airport, "Arrival_Date": (Arrival_Date ? Arrival_Date : { $nin: [null] })
        },
        {
          "Departure_Date": { $gte: Departure_Date }, "Departure_Time": { $gt: time },
          "Departure_Airport": Departure_Airport, "Arrival_Airport": Arrival_Airport, "Arrival_Date": (Arrival_Date ? Arrival_Date : { $nin: [null] })
        }
      ]
    })

      .then(flights => res.json(flights))
      .catch(err => console.log(err));
  }
  else {
    Flight.find({
      $or: [
        {
          "Departure_Date": { $gt: Departure_Date }, "numberOfAvailableBusinessSeats": { $gt: number_seats },
          "Departure_Airport": Departure_Airport, "Arrival_Airport": Arrival_Airport, "Arrival_Date": (Arrival_Date ? Arrival_Date : { $nin: [null] })
        },
        {
          "Departure_Date": { $gte: Departure_Date }, "Departure_Time": { $gt: time },
          "Departure_Airport": Departure_Airport, "Arrival_Airport": Arrival_Airport, "Arrival_Date": (Arrival_Date ? Arrival_Date : { $nin: [null] })
        }
      ]
    })

      .then(flights => res.json(flights))
      .catch(err => console.log(err));
  }

})
app.post("/confirm_booking", async (req, res) => {
  console.log("entered..confirm");
  console.log(JSON.stringify(req.body) + "confirm booking");
  const Departure_flight = req.body.Departure_flight
  const Arrival_flight = req.body.Arrival_flight
  const Total_price = req.body.Total_price
  const Class = req.body.Class
  const Departure_seats = req.body.Departure_seats

  const Arrival_seats = req.body.Arrival_seats
  const number = req.body.Confirmation_number

  let user = await User.findOne({})
  let l = user.Flights;
  const flight_object = [{ "Departure_flight": Departure_flight, "Arrival_flight": Arrival_flight, "Total_price": Total_price, "Class": Class, "Departure_seats": Departure_seats, "Arrival_seats": Arrival_seats, "Confirmation_number": number }]
  // const list=[].push(Departure_flight)
  // user..push.apply(myArray, myArray2);
  l.push.apply(l, flight_object)
  console.log(Departure_flight)
  await user.updateOne({ Flights: l }, { writeConcern: { w: "majority", wtimeout: 5000 } })

    // console.log(JSON.stringify(req.body)+"the whole body")

    //"Arrival_Airport":(Arrival_Airport ? Arrival_Airport:{$nin : [null]}
    // Flight.find({})
    // Flight.find({"Departure_Date": {$gt :Departure_Date}  ,
    // "Departure_Airport":Departure_Airport ,"Arrival_Airport":Arrival_Airport ,"Arrival_Date" :(Arrival_Date ? Arrival_Date : {$nin : [null]})

    .then(flights => res.json(flights))
    .catch(err => { console.log("errrr" + err); console.log(user); });
})

app.get("/confirmition_number", async (req, res) => {
  let rand = Math.random().toString(16).substr(2, 8); // 6de5ccda
  let code;
  //   list=[].push(rand)
  code = await Confirmation_number.findOne({})

  let code1 = code.numbers
  if (code1.length !== 0) {


    while (code1.indexOf(rand) !== -1) {
      rand = Math.random().toString(16).substr(2, 8); // 6de5ccda
    }
  }
  code1.push(rand)
  code.updateOne({ numbers: code1 }, { writeConcern: { w: "majority", wtimeout: 5000 } })
    .then(res.json(rand))
    .catch(err => { console.log("errrr" + err); console.log(code1); });

})




app.get("/schedule", (req, res) => {
  Flight.find({}).sort("Departure_Date").sort("Departure_Time")

    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error: ' + err));
});


app.post('/add_confirmation', async (req, res) => {
  const new_number = new Confirmation_number({});
  // console.log('passed'); // it never comes here
  await new_number.save().then(() => res.json('number is added')).catch(err => res.status(400).json('Error: ' + err))
});

app.get('/add_confirmation', async (req, res) => {
  Confirmation_number.find({})

    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error: ' + err));
});
app.post('/addFlight', async (req, res) => {
  console.log("here");
  //console.log(req.body);  //Sha8al
  const new_flight = new Flight(req.body);
  const seats = [];
  console.log("business seats: ", req.body.Number_of_Business_seats);
  console.log("economy seats: ", req.body.Number_of_Economy_seats);
  for (var i = 0; i < req.body.Number_of_Economy_seats; i++) {
    const newSeat = new Seat({ "seatNumber": i, "seatType": "Economy" });
    console.log(newSeat.seatNumber);
    seats.push(newSeat);
  }
  for (var j = 0; j < req.body.Number_of_Business_seats; j++) {
    const newSeat = new Seat({ "seatNumber": j, "seatType": "Business" });
    seats.push(newSeat);
  }
  new_flight.flightSeats = seats;
  new_flight.numberOfAvailableEconomySeats = req.body.Number_of_Economy_seats;
  new_flight.numberOfAvailableBusinessSeats = req.body.Number_of_Business_seats;
  console.log('passed'); // it never comes here
  //console.log(seats);
  console.log(new_flight);
  await new_flight.save().then(() => res.json('flight is added')).catch(err => res.status(400).json('Error: ' + err))
});

app.get("/schedule", (req, res) => {
  Flight.find({}).sort("Departure_Date").sort("Departure_Time")

    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error: ' + err));
})
//-----------------// get all flights

//------ to delete a flight--//
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Flight.findByIdAndRemove(id).exec();
  // res.send("flight deleted");
});

app.put("/updateFlight/:id", async (req, res) => {
  console.log('here');
  //let flight = await Flight.findById(req.params.id);
  await Flight.findByIdAndUpdate(req.params.id,{
    Flight_Number: req.body.Flight_Number,
    Departure_Date: req.body.Departure_Date,
    Departure_Time: req.body.Departure_Time,
    Arrival_Date: req.body.Arrival_Date,
    Arrival_Time: req.body.Arrival_Time,
    Departure_Airport: req.body.Departure_Airport,
    Arrival_Airport: req.body.Arrival_Airport,
    Number_of_Economy_seats: req.body.Number_of_Economy_Seats,
    Number_of_Business_seats: req.body.Number_of_Business_Seats
  });
  console.log('hello');
  // .then(res => console.log("filayy"))
  // .catch(err => console.log(err));
});

app.get("/viewProfile/:id", async (req, res) => {
  const passedID = req.params.id;
  User.find({ User_id: passedID })
    .then(users => {
      console.log(users)
      res.json(users)
    })
    .catch(err => res.status(400).json('Error: ' + err));
  console.log(res.json);
});

app.put("/editProfile/:id", async (req, res) => {
  const passedID = req.params.id;
  console.log(req.body);
  if (req.body.First_Name == "" || req.body.Last_Name == "" || req.body.Passport_Number == "" || req.body.Email == "") {
    res.status(200)
    return
  }
  User.findOneAndUpdate({ User_id: passedID }, {
    First_Name: req.body.First_Name,
    Last_Name: req.body.Last_Name,
    Passport_Number: req.body.Passport_Number,
    Email: req.body.Email,
  }).then(res.status(200))
})


