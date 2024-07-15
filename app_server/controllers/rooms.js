/*
 * Using built in NodeJS filesystem componenet to read the data file.
 * Using the fs.readFileSync method to retrieve JSON file
 * rooms.json file contains the JSON description of rooms for the purpose of testing
 * 
 * NOTE: not best practice to read JSON file every time the webserver processes a request, 
 * this method is used during development to support rapid prototyping and should be replaced before the 
 * application goes into production
*/
var fs = require('fs')
var roomsJSON = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf-8'));

/* GET Rooms View */
// Controller for the travlr page
const rooms = (req, res, next) => {
    res.render('rooms', {title: 'Travlr Getaways - Rooms', roomsJSON});
};

module.exports = {
    rooms
};