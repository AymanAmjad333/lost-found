const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
// Database name
const dbName = 'LostandFound';

// Function to connect to MongoDB
async function connectToMongoDB() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to MongoDB server');
        // Access the database
        const db = client.db(dbName);
        return { client, db };
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = { connectToMongoDB };
