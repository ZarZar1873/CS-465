/*
 * Using built in NodeJS filesystem componenet to read the data file.
 * Using the fs.readFileSync method to retrieve JSON file
 * trips.json file contains the JSON description of trips for the purpose of testing
 * 
 * NOTE: not best practice to read JSON file every time the webserver processes a request, 
 * this method is used during development to support rapid prototyping and should be replaced before the 
 * application goes into production
*/
// var fs = require('fs')
// var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf-8'));

const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: { 
        'Accept': 'applications/json'
    }
}

/* GET Travel View */
// Controller for the travlr page
const travel = async function(req, res, next) {
    // console.log('TRAVEL CONTROLLER BEGIN');
    await fetch(tripsEndpoint, options)
        .then(res => res.json()) // takes the resulkt from the fetch command and provides the output as JSON
        .then(json => { // takes the json object from the previous clause and passes it to the render method
            let message = null;
            // if the response does not contain any data - specifically it isn’t an Array of JSON objects
            if(!(json instanceof Array)){
                message = 'API lookup error';
                json = [];
            }
            // The response is an Array of JSON objects, but the array is of length 0
            else {
                if(!json.length){
                    message = 'No trips exist in the database!';
                }
            }
            // console.log(json);
            // trips: json = key-value pair where trips: is the key and json is the collection of values retrieved from the API
            // message is the error message to be displayed
            res.render('travel', {title: 'Travlr Getaways', trips: json, message}) 
        })
        .catch(error => res.status(500).send(error.message)); // tags any errors in the communication with the api
        // console.log('TRAVEL CONTROLLER AFTER RENDER');
};

module.exports = {
    travel
};