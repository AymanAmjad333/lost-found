const express = require('express');
const router = express.Router();
const { getListItems } = require('../controller/listController');

router.get('/list-items', getListItems);

module.exports = router;
