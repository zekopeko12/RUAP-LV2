const express = require('express');
const pool = require('../db');
const router = express.Router();
// Create a new contact
router.post('/', async (req, res) => {
const { name, email, phone } = req.body;
try {
const result = await pool.query(
'INSERT INTO contacts (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
[name, email, phone]
);
res.status(201).json(result.rows[0]);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Get all contacts
router.get('/', async (req, res) => {
try {
const result = await pool.query('SELECT * FROM contacts');
res.status(200).json(result.rows);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Get a single contact by ID
router.get('/:id', async (req, res) => {
const { id } = req.params;
try {
const result = await pool.query('SELECT * FROM contacts WHERE id = $1', [id]);
if (result.rows.length === 0) {
return res.status(404).json({ error: 'Contact not found' });
}
res.status(200).json(result.rows[0]);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Update a contact
router.put('/:id', async (req, res) => {
const { id } = req.params;
const { name, email, phone } = req.body;
try {
const result = await pool.query(
'UPDATE contacts SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *',
[name, email, phone, id]
);
if (result.rows.length === 0) {
return res.status(404).json({ error: 'Contact not found' });
}
res.status(200).json(result.rows[0]);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Delete a contact
router.delete('/:id', async (req, res) => {
const { id } = req.params;
try {
const result = await pool.query('DELETE FROM contacts WHERE id = $1 RETURNING *', [id]);
if (result.rows.length === 0) {
return res.status(404).json({ error: 'Contact not found' });
}
res.status(200).json({ message: 'Contact deleted successfully' });
} catch (err) {
res.status(500).json({ error: err.message });
}
});
module.exports = router;