/*
 * Using built in NodeJS filesystem componenet to read the data file.
 * Using the fs.readFileSync method to retrieve JSON file
 * trips.json file contains the JSON description of trips for the purpose of testing
 * 
 * NOTE: not best practice to read JSON file every time the webserver processes a request, 
 * this method is used during development to support rapid prototyping and should be replaced before the 
 * application goes into production
*/
var fs = require('fs')
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf-8'));

/* GET Travel View */
// Controller for the travlr page
const travel = (req, res, next) => {
    res.render('travel', {title: 'Travlr Getaways - Travel', trips});
};

module.exports = {
    travel
};