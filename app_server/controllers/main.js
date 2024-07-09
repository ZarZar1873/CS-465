/* GET Homepage */
// First controller for application, serves the main index page
const index = (req, res, next) => {
    res.render('index', {title: "Travlr Getaways"});
};

module.exports = {
    index
}