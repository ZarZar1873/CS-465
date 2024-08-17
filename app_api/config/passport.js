/*
 * Configuration for the passport module to process the authentication verifications
 * 'Strategy-Based' authentication module: It can use various strategies to authenticate a user based on
 * programmatic design. 
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    async (username, password, done) => {
        const q = await User
            .findOne({email: username})
            .exec();

            // Uncomment the following line to show the results of the querey
            // console.log(q);

            if(!q){ // if the database returned no records, the user doesn't exist
                return done(null, false, {message: 'Incorrect Username'});
            }
            if(!q.validPassword(password)){ // password in invalid
                return done(null, false, {message: 'Incorrect Password'});
            }
            return done(null, q); // Everything is OK, return user object
    }
))