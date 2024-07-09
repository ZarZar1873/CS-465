var express = require('express');
var router = express.Router();
// Variable for the router.get below
var controller = require('.../controllers/travel');

/* GET travel page. */
// Route for the travlr controller
router.get('/', controller.travel);

module.exports = router;