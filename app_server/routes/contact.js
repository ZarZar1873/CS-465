var express = require('express');
var router = express.Router();
// Variable for the router.get below
var controller = require('../controllers/contact');

/* GET contact page. */
// Route for the travlr controller
router.get('/', controller.contact);

module.exports = router;