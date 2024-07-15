/*
 * Using built in NodeJS filesystem componenet to read the data file.
 * Using the fs.readFileSync method to retrieve JSON file
 * newsLatest.json file contains the JSON description of the latest news for the purpose of testing
 * newsVacationTips.json file contains the JSON description of vacation tips for the purpose of testing
 * 
 * NOTE: not best practice to read JSON file every time the webserver processes a request, 
 * this method is used during development to support rapid prototyping and should be replaced before the 
 * application goes into production
*/
var fs = require('fs')
var newsLatest = JSON.parse(fs.readFileSync('./data/newsLatest.json', 'utf-8'));
var newsVacationTips = JSON.parse(fs.readFileSync('./data/newsVacationTips.json', 'utf-8'));

/* GET News View */
// Controller for the travlr page
const news = (req, res, next) => {
    res.render('news', {title: 'Travlr Getaways - News', newsLatest, newsVacationTips});
};

module.exports = {
    news
};