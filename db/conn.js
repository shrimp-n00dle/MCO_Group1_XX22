const { mongoose } = require('mongoose');

const mongoURL = process.env.MONGO_URL;

// Connecting to the database + catching any errors during the connection
function connectToMongo (callback) {
    mongoose.connect(mongoURL, {dbName: process.env.DB_NAME}).then (() => {
        return callback();
    }).catch ( err => {
        callback(err);
    })
}

// Gets the database
// function getDB (dbName = process.env.DB_NAME) {
//     return client.db(dbName);
// }

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