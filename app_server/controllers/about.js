/* GET About View */
// Controller for the travlr page
const about = (req, res, next) => {
    res.render('about', {title: 'Travlr Getaways - About'});
};

module.exports = {
    about
};