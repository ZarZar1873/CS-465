/*
 * Using built in NodeJS filesystem componenet to read the data file.
 * Using the fs.readFileSync method to retrieve JSON file
 * meals.json file contains the JSON description of meals for the purpose of testing
 * 
 * NOTE: not best practice to read JSON file every time the webserver processes a request, 
 * this method is used during development to support rapid prototyping and should be replaced before the 
 * application goes into production
*/
var fs = require('fs')
var mealsJSON = JSON.parse(fs.readFileSync('./data/meals.json', 'utf-8'));

/* GET Meal View */
// Controller for the travlr page
const meals = (req, res, next) => {
    res.render('meals', {title: 'Travlr Getaways - Meals', mealsJSON});
};

module.exports = {
    meals
};