const express = require('express'); // Express app
const router = express.Router(); // Router logic

// import controullers that will be routed
const tripsController = require('../controllers/trips');

// Define route for trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList); // GET method routed tripList

// Define route for GET method routes tripsFindByCode
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;