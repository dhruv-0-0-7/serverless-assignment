const { MongoClient } = require('mongodb');

module.exports = async function ({ database = 'serverless-assignment', collection = 'records' } = {}) {
    const url = process.env.DATABASE_URL;
    const client = new MongoClient(url);

    await client.connect();
    const db = client.db(database);
    return db.collection(collection);
};