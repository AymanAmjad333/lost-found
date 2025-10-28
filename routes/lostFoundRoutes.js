const express = require('express');
const router = express.Router();
const lostFoundController = require('../controller/lostFoundController');

// Submit an item
router.post('/submit-item', lostFoundController.submitItem);

// Retrieve lost items
router.get('/lost-items', lostFoundController.getLostItems);

// Retrieve matching items with opposite statuses
router.get('/matching-items', lostFoundController.getMatchingItems);

// Mark an item as claimed
router.put('/mark-item-claimed/:itemId', lostFoundController.markItemClaimed);

module.exports = router;
