// Import the User model
const User = require('../models/Users');

async function registerUser(req, res) {
    try {
        // Extract registration data from the request body
        const { fullName, email, phone, year, branch, password } = req.body;

        // Create a new user object
        const newUser = {
            fullName,
            email,
            phone,
            year,
            branch,
            password
        };

        // Assuming User.create() method exists in the User model
        const createdUser = await User.create(newUser);

        // Send a success response
        res.status(201).json({ success: true, message: 'Registration successful!', user: createdUser });
    } catch (error) {
        console.error('Error registering user:', error);
        // Send an error response
        res.status(501).json({ success: false, message: 'An error occurred while registering user' });
    }
}

module.exports = { registerUser };
