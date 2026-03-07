import { MongoClient } from 'mongodb';

const mongoURI = "mongodb://localhost:27017";
const client = new MongoClient(mongoURI);

// Connecting to the database + catching any errors during the connection
export function connectToMongo (callback) {
    client.connect().then( (client) => {
        return callback();
    }).catch ( err => {
        callback(err);
    })
}

export function getDB (dbName = "GarnetDB") {
    return client.db(dbName);
}