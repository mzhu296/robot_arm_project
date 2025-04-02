const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// API endpoint to receive joint values
app.post('/api/joint-values', (req, res) => {
    const { name, direction, value } = req.body;

    // Validate the incoming data
    if (!name || !direction || typeof value !== 'number') {
        return res.status(400).json({ error: 'Invalid input data.' });
    }

    // Log the received data
    console.log(`Joint: ${name}, Direction: ${direction}, Value: ${value}`);

    // Respond to the client
    res.status(200).json({ message: 'Joint value received successfully.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
