var express = require('express');
var router = express.Router();
// Variable for the router.get below
var controller = require('../controllers/about');

/* GET about page. */
// Route for the travlr controller
router.get('/', controller.about);

module.exports = router;