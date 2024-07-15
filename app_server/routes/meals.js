var express = require('express');
var router = express.Router();
// Variable for the router.get below
var controller = require('../controllers/meals');

/* GET meals page. */
// Route for the travlr controller
router.get('/', controller.meals);

module.exports = router;