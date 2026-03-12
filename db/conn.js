const { mongoose } = require('mongoose');

const mongoURL = process.env.MONGO_URL;

// Connecting to the database + catching any errors during the connection
function connectToMongo (callback) {
    mongoose.connect('mongodb://127.0.0.1:27017/GarnetDB').then (() => {
        return callback();
    }).catch ( err => {
        callback(err);
    })
}

// Handles closing the connection to the database
function signalHandler() {
    console.log("Closing MongoDB Connection!");
    mongoose.disconnect();
    process.exit();
}
process.on('SIGINT', signalHandler);
process.on('SIGTERM', signalHandler);
process.on('SIGQUIT', signalHandler);

module.exports = {
    connectToMongo
};
