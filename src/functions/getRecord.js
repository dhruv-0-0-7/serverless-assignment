const { ObjectId } = require('mongodb');
const connectDB = require('../database/connection');

module.exports.handler = async function (event, context) {
    if (event.requestContext.http.method !== 'GET') {
        return {
            statusCode: 405,
            body: 'Method not allowed'
        };
    }

    const id = event.pathParameters?.id;

    if (!id)
        return {
            statusCode: 400,
            body: 'Provide UserID as Path Parameters'
        };

    const collection = await connectDB();
    try {
        const user = await collection.findOne({ _id: new ObjectId(id) });

        return {
            statusCode: 200,
            body: JSON.stringify(user)
        };

    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: err.message || 'Something went wrong'
        };
    }
};