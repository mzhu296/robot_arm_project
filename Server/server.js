// server.js
require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); 
const logsRoutes = require('./routes/logs'); 

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());


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


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'),
  console.log('Connected to database:', mongoose.connection.name)
)
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', authRoutes);
app.use('/api/logs', logsRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
