app.get("/login", async (req, res) => {
    if (req.session.userID) {
      const passenger = await Passenger.findById(req.session.userID);
      //console.log('here');
      res.send({ loggedIn: true, user: passenger });
    } else {
      res.send({ loggedIn: false });
    }
  });
  app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    var passenger = await Passenger.findOne({ 'Email': username });
    // find won't work here 
    //passenger.toObject();
    // console.log(passenger.Email);
    if (passenger) {
      bcrypt.compare(password, passenger.Password, (error, response) => {
        if (error)
          console.log(error);
        if (response) {
          req.session.userID = passenger._id;
          //console.log(req.session.user);
          res.send(passenger);
        }
        else
          res.send({ message: "Wrong username/password combination!" });
      });
    }
    else
      res.send({ message: "User doesn't exist" });
  });
  app.post("/register", async (req, res) => {
    const { First_Name, Last_Name, Passport_Number, Email, password } = req.body;
    bcrypt.hash(password, saltRounds).then(async (hash) => {
      const newUser = await new Passenger({ "First_Name": First_Name, "Last_Name": Last_Name, "Passport_Number": Passport_Number, "Email": Email, "Password": hash });
      // User.
      // User.insert({ "First_Name": First_Name, "Last_Name": Last_Name, "Passport_Number": Passport_Number, "Email": Email , "Password":hash },{ writeConcern: { w: "majority" , wtimeout: 5000 } })
      await newUser.save();
      //.then(() => console.log("inserted").catch(err => console.log(err)));
    }).then(() => console.log("user registered"))
      .catch(err => console.log(err));
  
  });
  app.get("/viewProfile/:id", async (req, res) => {
    const passedID = req.params.id;
    Passenger.findById(passedID)
      .then(user => {
        //console.log(user)
        res.json(user)
      })
      .catch(err => res.status(400).json('Error: ' + err));
    //console.log(res.json);
  });

  app.put("/editProfile/:id", async (req, res) => {
    const passedID = req.params.id;
    console.log(req.body);
    if (req.body.First_Name == "" || req.body.Last_Name == "" || req.body.Passport_Number == "" || req.body.Email == "") {
      res.status(200)
      return
    }
    Passenger.findByIdAndUpdate(passedID, {
      First_Name: req.body.First_Name,
      Last_Name: req.body.Last_Name,
      Passport_Number: req.body.Passport_Number,
      Email: req.body.Email,
    }).then(res.status(200))
  })
  app.post("/payment", cors(), async (req, res) => {
    let { amount, id } = req.body
    try {
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "GUC Airlines",
        payment_method: id,
        confirm: true
      })
      console.log("Payment", payment)
      res.json({
        message: "Payment successful",
        success: true
      })
    } catch (error) {
      console.log("Error", error)
      res.json({
        message: "Payment failed",
        success: false
      })
    }
  })
  app.post('/logout', (req, res) => {
    req.session.destroy();
    res.send({ LoggedOut: true })
  })  
  app.post('/changePassword', (req, res) => {
    const userID = req.session.userID;
    bcrypt.hash(password, saltRounds).then(async (hash) => {
      await Passenger.findByIdAndUpdate(userID, { "Password": hash }).then(() => console.log("updated").catch(err => console.log(err)));
    })
  })
  app.post("/updateFlight/", async (req, res) => {
    console.log("entered..updateFlight");
    console.log(JSON.stringify(req.body) + "confirm booking");
    const userid = req.body.userid
    const flightID = req.body.flightID
    const NewflightID = req.body.NewflightID
    const flightNumber = req.body.flightNumber
    const flight_Departure_Date = req.body.flight_Departure_Date
    const flight_Arrival_Date = req.body.flight_Arrival_Date
    const flight_Departure_Time = req.body.flight_Departure_Time

    const flight_Arrival_Time = req.body.flight_Arrival_Time
    const flight_Departure_Airport = req.body.flight_Departure_Airport
    const flight_Arrival_Airport = req.body.flight_Arrival_Airport

    const Class = req.body.Class
    const Price = req.body.Price
    const Seats = req.body.Seats
    const cnumber = req.body.confnumber
    const flightprice = req.body.flightPrice
    console.log(flightprice);


    const flightType = req.body.flightType
    const newFlight = {
        "id": NewflightID, "Flight_Number": flightNumber, "flight_Departure_Date": flight_Departure_Date,
        "flight_Departure_Time": flight_Departure_Time, "flight_Arrival_Date": flight_Arrival_Date, "flight_Arrival_Time": flight_Arrival_Time,
        "flight_Departure_Airport": flight_Departure_Airport, "flight_Arrival_Airport": flight_Arrival_Airport,
        "Class": Class, "Price": Price, "Seats": Seats
    }


    if (flightType === "returnF") {
        console.log('return');
        await Passenger.findOneAndUpdate({ "Flights.Confirmation_number": cnumber },
            { '$set': { 'Flights.$.Arrival_flight': newFlight, 'Flights.$.Total_price': flightprice } })
            .then(users => { res.json(users), console.log(users) })
            .catch(err => res.status(400).json('Error: ' + err));

    }
    else if (flightType === "departF") {
        console.log('dep');
        await Passenger.updateOne({ 'Flights': { $elemMatch: { Confirmation_number: cnumber } } },
            { "$set": { "Flights.$.Departure_flight": newFlight, "Flights.$.Total_price": flightprice } })
            .then(users => console.log(users))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else
        console.log("not dep or return" + flightType);

})
app.post("/updateSeats", async (req, res) => {
  console.log("entered..confirm");
  console.log(JSON.stringify(req.body) + "confirm booking");
  //  const flightID= req.body.flightID
  const newSeats = req.body.newSeats

  const number = req.body.Confirmation_number

  // const userid=req.body.userid
  const flightType = req.body.type

  if (flightType === "returnF") {

      await Passenger.findOneAndUpdate({ "Flights.Confirmation_number": number },
          { '$set': { 'Flights.$.Arrival_seats': newSeats } })
          .then(users => res.json(users))
          .catch(err => res.status(400).json('Error: ' + err));
  }
  else if (flightType === "departF") {
      console.log('dep');
      await Passenger.findOneAndUpdate({ "Flights.Confirmation_number": number },
          { '$set': { 'Flights.$.Departure_seats': newSeats } })
          .then(users => res.json(users))
          .catch(err => res.status(400).json('Error: ' + err));
  }
  else
      console.log("not dep or return" + flightType);

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
      app.post("/get_return_flights", async (req, res) => {
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
        if (Class === "Economy") {
          await Flight.find({
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
          await Flight.find({
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
        }
      })
    }
  }
})
app.put("/reserveSeat", (async (req, res) => {
  console.log(req.body);
  const seatID = req.body.seatID;
  const flightID = req.body.flightID;
  const flightClass = req.body.flightClass;
  const flight = await Flight.findById(flightID);
  const seatsList = flight.flightSeats;
  let sclass;
  // if(flightClass ==="Economy"){ 

  //   console.log('ecoo');

  await
    //  Flight.findOne(
    //   {
    //     // _id: flightID,
    //     "flightSeats._id":seatID 
    //   }
    // //   ,
    // //   { $set: { "flightSeats.$.status" : "reserved" } }
    //  )
    // .then(user=>console.log(user))
    //   }
    //   //  Flight.findOne({"_id":flightID,"flightSeats._id":seatID}).then(doc => {
    //   //   //  let item = doc.flightSeats._id(seatID );
    //   //     doc["status"] = "reserved";

    //   //     doc.save();

    //   //     //sent respnse to client
    //   //   }).catch(err => {
    //   //     console.log('Oh! Dark'+err)
    //   //   });
    //   // }
    // // await   Flight.findOneAndUpdate( {"flightSeats._id":seatID}
    // // //returnF returnF
    // //   ,
    // //  {'$set': {
    // //     "status": "reserved" /*, $inc: { numberOfAvailableEconomySeats: -1 }*/

    // //    }})
    // //    .then(users => res.json(users))
    // //    .catch(err => res.status(400).json('Error: ' + err));
    // // }
    // else if(flightClass ==="Business"){ 

    //   console.log('bus');
    // await   Flight.findOneAndUpdate( {"_id":flightID,"flightSeats._id":seatID}
    // //returnF returnF
    // ,
    // {'$set': {
    //   'flightSeats.$.status': "reserved", $inc: { numberOfAvailableBusinessSeats: -1 }

    //  }}).then(users => res.json(users))
    //  .catch(err => res.status(400).json('Error: ' + err));
    // }
    //    else
    //    console.log("not dep or return"+flightClass);

    //     }))


    seatsList.map(val => { if ((val._id) == seatID) { val.status = "reserved"; sclass = val.seatType } });
  if (sclass === "Economy")
    Flight.findByIdAndUpdate(flightID, { $inc: { numberOfAvailableEconomySeats: -1 } })
  else
    Flight.findByIdAndUpdate(flightID, { $inc: { numberOfAvailableBusinessSeats: -1 } })
  console.log(seatsList);
})
)
app.delete("/deleteticket/:confirm/:user_id", async (req, res) => {
  const confirm = req.params.confirm;
  var result = [];
  const id = req.params.user_id;
  // var id="61ab47212867eed35a696d19";
  console.log("confirm  " + confirm);
  console.log("id  " + id);
  await Passenger.findByIdAndUpdate(id, { $pull: { Flights: { Confirmation_number: confirm } } })
  // Passenger.find({}).then(users => res.json(users))
  //   .catch(err => res.status(400).json('Error: ' + err));
});
app.post("/get_return_flights", async (req, res) => {
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
  if (Class === "Economy") {
    await Flight.find({
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
    await Flight.find({
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
  }
})
app.post("/get_available_flights", async (req, res) => {
  console.log("entered..");
  //console.log(JSON.stringify(req.body));
  const Departure_Date = req.body.Departure_Date
  //  const Arrival_Date = req.body.Arrival_Date
  const Departure_Airport = req.body.Departure_Airport
  const Arrival_Airport = req.body.Arrival_Airport
  const Class = req.body.Class
  const number_seats = req.body.seats
  if (Class === "Economy") {
    await Flight.find({
      "Departure_Date": (Departure_Date ? Departure_Date : { $nin: [null] }),

      "numberOfAvailableEconomySeats": { $gte: number_seats },
      "Departure_Airport": (Departure_Airport ? Departure_Airport : { $nin: [null] }), "Arrival_Airport": (Arrival_Airport ? Arrival_Airport : { $nin: [null] })

    }).then(flights => (res.json(flights)/*, console.log("before> " + JSON.stringify(flights) + "entered if")*/))
      .catch(err => console.log(err));
  }
  else {
    await Flight.find({
      "Departure_Date": (Departure_Date ? Departure_Date : { $nin: [null] }),

      "numberOfAvailableBusinessSeats": { $gte: number_seats },
      "Departure_Airport": (Departure_Airport ? Departure_Airport : { $nin: [null] }), "Arrival_Airport": (Arrival_Airport ? Arrival_Airport : { $nin: [null] })

    }).then(flights => res.json(flights))
      .catch(err => console.log(err));
  }

})
app.post("/get_flitered_flights", async (req, res) => {
  const totalprice = req.body.TotalPrice
  const Departure_flight_airport = req.body.depflightairport
  const arrival_flight_airport = req.body.arrivalflightairport
  const Class = req.body.chosen_class
  const Departure_Date = req.body.chosen_dep_date
  if (Class === "Economy") {

    await Flight.find({
      "Departure_Airport": Departure_flight_airport,
      "Arrival_Airport": arrival_flight_airport,
      "Departure_Date": Departure_Date,
      "numberOfAvailableEconomySeats": { $gte: 0 },
    }).then(flight => res.json(flight))
      .catch(err => res.status(400).json('Error: ' + err));
  } else {
    await Flight.find({
      "Departure_Airport": Departure_flight_airport,
      "Arrival_Airport": arrival_flight_airport,
      "Departure_Date": Departure_Date,
      "numberOfAvailableBusinessSeats": { $gte: 0 },
    }).then(flight => res.json(flight))
      .catch(err => res.status(400).json('Error: ' + err));
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
  const seatsAID = req.body.seatsAID
  const seatsDID = req.body.seatsDID
  const userid = req.body.userid
  const children_no = req.body.children
  const adult_no = req.body.adults

  console.log(adult_no);
  let user = await Passenger.findById(userid);
  let l = user.Flights;
  const flight_object = [{ "Departure_flight": Departure_flight, "Arrival_flight": Arrival_flight, "Total_price": Total_price, "Class": Class, "Departure_seats": Departure_seats, "Arrival_seats": Arrival_seats, "seatsAID": seatsAID, "seatsDID": seatsDID, "Confirmation_number": number, "children_no": children_no, "adult_no": adult_no }]
  // const list=[].push(Departure_flight)
  // user..push.apply(myArray, myArray2);
  l.push.apply(l, flight_object)
  console.log(Departure_flight)
  await user.updateOne({ Flights: l }, { writeConcern: { w: "majority", wtimeout: 5000 } })
    .then(flights => res.json(flights))
    .catch(err => { console.log("errrr" + err); console.log(user); });
})
app.get('/add_confirmation', async (req, res) => {
  Confirmation_number.find({})
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error: ' + err));
});
app.post('/add_confirmation', async (req, res) => {
  const new_number = new Confirmation_number({});
  // console.log('passed'); // it never comes here
  await new_number.save().then(() => res.json('number is added')).catch(err => res.status(400).json('Error: ' + err))
})
app.get("/getSeats/:id", (req, res) => {
  Flight.findById(req.params.id, { _id: 0, flightSeats: 1 })
    .then(users => { res.json(users), console.log(JSON.stringify(users)) })
    .catch(err => res.status(400).json('Error: ' + err));
})
app.put("/deleteReservedSeat", async (req, res) => {
  console.log(req.body);
  const flightID = req.body.flightID;
  const seatID = req.body.seatID;
  const flight = await Flight.findById(flightID);
  const seatsList = flight.flightSeats;
  let sclass;
  seatsList.map(val => { if ((val._id) == seatID) { val.status = "free"; sclass = val.seatType } });
  if (sclass.seatType === "Economy")
    Flight.findByIdAndUpdate(flightID, { $inc: { numberOfAvailableEconomySeats: 1 } })
  else
    Flight.findByIdAndUpdate(flightID, { $inc: { numberOfAvailableBusinessSeats: 1 } })
})