// Add mongoose to requirements  and save to exportable varaible
const mongoose = require('mongoose');

const host = process.env.DB_HOST || '127.0.0.1';

// create connection to mongodb through travlr
const dbURI = `mongodb://${host}/travlr`;

const readLine = require('readline');

// Build the connection string and set the connection timeout.
// timeout is in milliseconds.
const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {
    }), 1000);
}

// Monitors for a successful connection through Mongoose
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

// Checks for a connection error
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ', err);
});

// Checks for a disconnection event
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Windows specific listner to emit the SIGINT signal
if(process.platform === 'win32'){
    const r1 = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    r1.on('SIGINT', () => {
        process.emit("SIGINT");
    });
}

// Capturing the process termination events
const gracefulShutdown = (msg) => { // Defines a function to accept a message
  // Closes the Mongoose connection, passing through an anonymous function to run when it’s closed
  mongoose.connection.close(() => {
    // Outputs a message when the Mongoose connection is closed
    console.log(`Mongoose disconnected through ${msg}`);
  });
};

// Listens for SIGUSR2, which is what nodemon uses
process.once('SIGUSR2', () => {
  // Sends a message to graceful-Shutdown and a callback to kill the process, emitting SIGUSR2 again
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// Listens for SIGINT to be emitted upon application termination
process.on('SIGINT', () => {
  // Sends a message to gracefulShutdown and exit the Node process
  gracefulShutdown('nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});
// Listens for SIGTERM to be emitted when Heroku shuts down the process
process.on('SIGTERM', () => {
  // Sends a message to gracefulShutdown and exit the Node process
  gracefulShutdown('app termination');
  process.exit(0);
});

// Make initial connection to DB
connect();

// Import Mongoose schema
require('./travlr');
module.exports = mongoose;