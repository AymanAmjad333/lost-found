const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';

// Database name
const dbName = 'LostAndFound';

// Function to connect to MongoDB
async function connectToMongoDB() {
    const client = new MongoClient(uri, { useNewUrlParser: true }); // Pass { useNewUrlParser: true }
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
    finally {
        // Close the MongoDB connection
        await client.close();
    }
}



// Function to create a new user
async function createUser(userData) {
    // Connect to MongoDB
    const { db, client } = await connectToMongoDB();
    try {
        // Insert the new user document into the 'users' collection
        const result = await db.collection('users').insertOne(userData);
        return result.ops[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    } finally {
        // Close the MongoDB connection
        await client.close();
    }
}

module.exports = { createUser };
