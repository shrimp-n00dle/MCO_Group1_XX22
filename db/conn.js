const { MongoClient } = require('mongodb');

const mongoURL = process.env.MONGO_URL;
const client = new MongoClient(mongoURL);

// Connecting to the database + catching any errors during the connection
function connectToMongo (callback) {
    client.connect().then( (client) => {
        return callback();
    }).catch ( err => {
        callback(err);
    })
}

// Gets the database
function getDB (dbName = process.env.DB_NAME) {
    return client.db(dbName);
}

// Handles closing the connection to the database
function signalHandler() {
    console.log("Closing MongoDB Connection!");
    client.close();
    process.exit();
}
process.on('SIGINT', signalHandler);
process.on('SIGTERM', signalHandler);
process.on('SIGQUIT', signalHandler);

module.exports = {
    connectToMongo,
    getDB
};