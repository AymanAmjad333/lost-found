const express = require('express');
const router = express.Router();
const { registerUser } = require('../controller/registerController');

// Route to handle user registration
router.post('/register', registerUser);

module.exports = router;

