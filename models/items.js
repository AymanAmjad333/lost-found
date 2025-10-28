const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['lost', 'found'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    location: String,
    date: {
        type: Date,
        required: true
    },
    description: String,
    imageUrl: String // Field to store the image path
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
