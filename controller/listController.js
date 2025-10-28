const { connectToMongoDB } = require('./db');

async function getListItems(req, res) {
    console.log('GET request received at /api/list-items');
    const { client, db } = await connectToMongoDB();
    try {
        const items = await db.collection('items').find({}).toArray();
        console.log('Items:', items); // Log retrieved items
        res.status(200).json({ success: true, items });
    } catch (error) {
        console.error('Error retrieving items:', error);
        res.status(500).json({ success: false, message: 'An error occurred while retrieving items' });
    } finally {
        await client.close();
    }
}

module.exports = {
    getListItems
};
