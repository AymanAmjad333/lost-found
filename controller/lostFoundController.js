const { connectToMongoDB } = require('../controller/db');

exports.submitItem = async (req, res) => {
    try {
        const { status, name, email, contactNo, item, location, date, description } = req.body;
        const image = req.file; // Assuming you're using multer for file uploads

        // Check if an item with all parameters matching already exists in the database
        const { client, db } = await connectToMongoDB();
        const existingItem = await db.collection('items').findOne({ item, description, status });

        if (existingItem) {
            // If an item with all parameters matching exists, return an error
            await client.close();
            return res.status(400).json({ success: false, message: 'Similar item already exists' });
        }

        // Store the new item in the database
        const newItem = {
            status,
            name,
            email,
            contactNo,
            item,
            location,
            date,
            description,
            imageUrl: image ? image.path : null // Save image path if uploaded
        };

        await db.collection('items').insertOne(newItem);
        await client.close();

        return res.status(201).json({ success: true, message: 'Item submitted successfully!' });
    } catch (error) {
        console.error('Error submitting item:', error);
        return res.status(500).json({ success: false, message: 'Failed to submit item.' });
    }
};

exports.getLostItems = async (req, res) => {
    try {
        const { client, db } = await connectToMongoDB();
        const lostItems = await db.collection('items').find({ status: 'lost' }).toArray();
        await client.close();
        res.status(200).json({ success: true, data: lostItems });
    } catch (error) {
        console.error('Error retrieving lost items:', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve lost items.' });
    }
};

exports.getMatchingItems = async (req, res) => {
    try {
        const { item, description, status } = req.query;
        const { client, db } = await connectToMongoDB();

        // Set a default value for the status parameter if it's not provided
        const queryStatus = status || 'lost'; // Default to 'lost' if status is not provided

        // Find items with similar names and descriptions but opposite statuses
        const matchingItems = await db.collection('items').find({
            item,
            description,
            status: { $ne: queryStatus } // Opposite status
        }).toArray();

        await client.close();
        res.status(200).json({ success: true, items: matchingItems });
    } catch (error) {
        console.error('Error retrieving matching items:', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve matching items.' });
    }
};

exports.markItemClaimed = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const { client, db } = await connectToMongoDB();

        const result = await db.collection('items').deleteOne({ _id: ObjectId(itemId) });

        await client.close();

        if (result.deletedCountCount > 0) {
            return res.status(200).json({ success: true, message: 'Item marked as claimed successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'Item not found or already marked as claimed' });
        }
    } catch (error) {
        console.error('Error marking item as claimed:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while marking item as claimed' });
    }
};
