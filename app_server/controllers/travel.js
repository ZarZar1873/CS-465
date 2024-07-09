/* GET Travel View */
// Controller for the travlr page
const index = (req, res, next) => {
    res.render('travel', {title: "Travlr Getaways"});
};

module.exports = {
    travel
}