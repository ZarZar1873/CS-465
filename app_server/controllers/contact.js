/* GET Contact View */
// Controller for the travlr page
const contact = (req, res, next) => {
    res.render('contact', {title: 'Travlr Getaways - Contact'});
};

module.exports = {
    contact
};