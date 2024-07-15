var express = require('express');
var router = express.Router();
// Variable for the router.get below
var controller = require('../controllers/rooms');

/* GET travel page. */
// Route for the travlr controller
router.get('/', controller.rooms);

module.exports = router;