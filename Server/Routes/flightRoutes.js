const express = require('express');
const flightController = require('../Controller/flightController');
const flightRouter = express.Router();
flightRouter.use(express.json());
flightRouter.use(express.urlencoded({extended:false}));



flightRouter.get('allFlights', flightController.getAllFlights);
module.exports=flightRouter;