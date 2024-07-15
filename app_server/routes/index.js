var express = require('express');
var router = express.Router();
// Variable for router.get below
const controller = require('../controllers/main')

/* GET home page. */
// Pass the request for the site-default starting page
router.get('/', controller.index);

module.exports = router;