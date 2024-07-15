var express = require('express');
var router = express.Router();
// Variable for the router.get below
var controller = require('../controllers/news');

/* GET news page. */
// Route for the travlr controller
router.get('/', controller.news);

module.exports = router;