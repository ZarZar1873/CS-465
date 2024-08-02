/*
 * Schema for holding trips data
*/
const mongoose = require('mongoose');

// Define the trip schema
const tripSchema = new mongoose.Schema({
    code: { type: String, required: true, index: true }, // indexed for faster retrieval
    name: { type: String, required: true, index: true }, // indexed for faster retrieval
    length: { type: String, required: true },
    start: { type: Date, required: true }, // Stored using the ISO standard date format
    resort: { type: String, required: true },
    perPerson: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
});
const Trip = mongoose.model('trips', tripSchema); // collection will be named trips
module.exports = Trip;