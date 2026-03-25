const { mongoose } = require('mongoose');

// Connecting to the database + catching any errors during the connection
async function connectToMongo (callback) {
    const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
    var mongoURL = "mongodb+srv://halyvasi17_db_admin:fiZdX1fSNpMPDsBh@garnetdb.omcka8g.mongodb.net/?appName=GarnetDB"
    await mongoose.connect(mongoURL, clientOptions).then (() => {
        return callback();
    }).catch ( err => {
        callback(err);
    })

    await mongoose.connection.db.admin().command({ ping: 1 });
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
