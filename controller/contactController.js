const Contact = require('../models/Contact');

async function addContact(req, res) {
  try {
    const { name, email, phone, desc } = req.body;
    const newContact = await Contact.create({ name, email, phone, desc });
    res.status(201).json({ success: true, message: 'Contact information stored successfully!', contact: newContact });
  } catch (error) {
    console.error('Error adding contact:', error);
    res.status(500).json({ success: false, message: 'An error occurred while storing contact information' });
  }
}

module.exports = { addContact };
