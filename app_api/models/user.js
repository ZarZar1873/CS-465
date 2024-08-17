const mongoose = require('mongoose');

// Constants to enable both the cryptography aspect and the JSON Web Tokens
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true, 
        required:true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

/*
 * Method to set the password on this record
 *
 * Void method that takes a single argument (user new password) and generates the hash. It stores the salt
 * value, and the resulting hashed password in the user record.
 * 
 * Without the salt, the password hash cannot be compared
 */
// Method to set the password on this record.
userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, 'sha512').toString('hex');
};

/*
 * Method to compare entered password against stored hash
 * 
 * Boolean method that takes a single argument (the user's password)
 * 
 * Uses pbkdf2Sync to generate the password hash and compare it to the stored value
 * 
 * Processing in validPassword and setPassword must be the same for test of equality
 */
// Method to compare entered password against stored hash
userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

/* 
 * Method to generate a JSON Web Token for trhe current record
 *
 * Indicates that there is the necessary permissions to act in the controlled portion of the application
 * 
 * payload: JSON object to be passed as part of the authentication process. This can contain values that 
 * the application can then use to make decisions on in order to determine access permissions
 * secret: Secret stored in the .env file. Not the only method of generating the JWT, but is straight-forward
 * experation time: More clear impementation than adding exp value in the JSON payload
 */
userSchema.methods.generateJWT = function() {
    return jwt.sign(
    { // Payload for our JSON Web Token
        _id: this._id,
        email: this.email,
        name: this.name,
    },
    process.env.JWT_SECRET, //SECRET stored in .env file
    { expiresIn: '1h' }); //Token expires an hour from creation
};

// Define constant for model and export it to make utilization easy in other modules
const User = mongoose.model('users', userSchema);
module.exports = User;