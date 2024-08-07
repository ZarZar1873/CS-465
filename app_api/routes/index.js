const express = require('express'); // Express app
const router = express.Router(); // Router logic

// import controullers that will be routed
const tripsController = require('../controllers/trips');

// Define route for trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET method routed tripList
    .post(tripsController.tripsAddTrip) // POST Methos Adds a Trip
; 

// Define route
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode) // GET method routes tripsFindByCode - requires parameter
    .put(tripsController.tripsUpdateTrip) // PUT method routes tripsUpdateTrip - requires parameter
;

module.exports = router;