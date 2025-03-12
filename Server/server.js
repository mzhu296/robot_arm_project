// server.js
require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); // We'll create this next

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'),
  console.log('Connected to database:', mongoose.connection.name)
)
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
