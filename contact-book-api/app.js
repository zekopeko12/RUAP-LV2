const express = require('express');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contacts');
const path = require('path');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// Routes
app.use('/contacts', contactRoutes);
// Start server
app.listen(PORT, () => {
console.log(`Server is running on hbp://localhost:${PORT}`);
});