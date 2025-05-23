const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database){
        console.log('Db is already itialized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            database = client;
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw Error('Database not itialized')
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};