const connectDB = require('../database/connection');

module.exports.handler = async function (event, context) {
    if (event.requestContext.http.method !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method not allowed'
        };
    }

    const collection = await connectDB();
    if (!event.body)
        return {
            statusCode: 400,
            body: 'Invalid Request Body'
        };

    event.body = JSON.parse(event.body);

    if (!(event.body.username || event.body.password))
        return {
            statusCode: 400,
            body: 'Invalid Request Body'
        };

    const user = {
        username: event.body.username,
        password: event.body.password
    };

    const result = await collection.insertOne(user);

    return {
        statusCode: 200,
        body: JSON.stringify({
            id: result.insertedId,
            ...user
        })
    };
};