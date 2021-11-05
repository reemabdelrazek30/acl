//using express

const cors = require('cors');
const express=require('express');
const mongoose = require('mongoose');
const app =express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.static("public"))


const flightRouter=require('./Routes/flightRoutes');
const Flight=require('./models/Flight.js');


const MongoURL = 'mongodb+srv://mernstacktest:mernstacktest@cluster0.1wydc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(MongoURL).then((result)=>console.log('connected to DB'))
.catch((err)=>console.log(err));

 app.use(cors());
app.use(express);

app.use('/all_flights',flightRouter);

app.get("/", (req, res) => {
  console.log("balabizo");
});


app.listen(3001);
console.log("Back-end Listening on port 3001");
