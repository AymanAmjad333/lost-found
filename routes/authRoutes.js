// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// POST /api/login
router.post('/login', authController.login);

module.exports = router;
