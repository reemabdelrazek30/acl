app.post('/addFlight', async (req, res) => {
    console.log("here");
    //console.log(req.body);  //Sha8al
    const seats = [];
    // console.log("business seats: ", req.body.Number_of_Business_seats);
    // console.log("economy seats: ", req.body.Number_of_Economy_seats);
    for (var i = 0; i < req.body.Number_of_Economy_seats; i++) {
        const newSeat = new Seat({ "seatNumber": i, "seatType": "Economy" });
        await newSeat.save();
        //console.log(newSeat.seatNumber);
        seats.push(newSeat);
    }
    for (var j = 0; j < req.body.Number_of_Business_seats; j++) {
        const newSeat = new Seat({ "seatNumber": j, "seatType": "Business" });
        await newSeat.save();
        seats.push(newSeat);
    }
    const new_flight = new Flight({
        'Flight_Number': req.body.Flight_Number,
        "Departure_Date": req.body.Departure_Date,
        "Departure_Time": req.body.Departure_Time,
        "Arrival_Date": req.body.Arrival_Date,
        'Arrival_Time': req.body.Arrival_Time,
        'Departure_Airport': req.body.Departure_Airport,
        'Arrival_Airport': req.body.Arrival_Airport,
        'Number_of_Economy_seats': req.body.Number_of_Economy_seats,
        'Number_of_Business_seats': req.body.Number_of_Business_seats,
        'numberOfAvailableEconomySeats': req.body.numberOfAvailableEconomySeats,
        'numberOfAvailableBusinessSeats': req.body.numberOfAvailableBusinessSeats,
        'price_child': req.body.price_child,
        'price_adult': req.body.price_adulte,
        'baggage': req.body.baggage,
        'flightSeats': seats
    });
    //new_flight.flightSeats = seats;
    console.log('passed'); // it never comes here
    //console.log(seats);
    //console.log(new_flight);
    await new_flight.save().then(() => res.json('flight is added')).catch(err => res.status(400).json('Error: ' + err))
});
app.put("/updateFlight/:id", async (req, res) => {
    console.log('here');
    //let flight = await Flight.findById(req.params.id);
    await Flight.findByIdAndUpdate(req.params.id, {
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
app.get("/schedule", (req, res) => {
    Flight.find({}).sort("Departure_Date").sort("Departure_Time")
        .then(flights => res.json(flights))
        .catch(err => res.status(400).json('Error: ' + err));
});
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await Flight.findByIdAndRemove(id).exec();
    // res.send("flight deleted");
});
app.get("/Flights", (req, res) => {
    console.log('here');
    Flight.find({})
        //res.json(flights)
        .then(flights => res.send(flights))
        .catch(err => res.status(400).json('Error: ' + err));
});
app.post("/get_flights", (req, res) => {
    const id = req.body.id
    Flight.findById(id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})
app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    var admin = await Admin.findOne({ 'Email': username });
    // find won't work here 
    //passenger.toObject();
    // console.log(passenger.Email);
    if (admin) {
        bcrypt.compare(password, admin.Password, (error, response) => {
            if (error)
                console.log(error);
            if (response) {
                req.session.userID = admin._id;
                //console.log(req.session.user);
                res.send(admin);
            }
            else
                res.send({ message: "Wrong username/password combination!" });
        });
    }
    else
        res.send({ message: "User doesn't exist" });
});
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.send({ LoggedOut: true })
})
app.post('/changePassword', (req, res) => {
    const userID = req.session.userID;
    bcrypt.hash(password, saltRounds).then(async (hash) => {
        await Admin.findByIdAndUpdate(userID, { "Password": hash }).then(() => console.log("updated").catch(err => console.log(err)));
    })
})