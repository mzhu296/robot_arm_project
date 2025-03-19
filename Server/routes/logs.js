// routes/logs.js
const express = require('express');
const router = express.Router();
const Log = require('../models/Log'); // <-- adjust the path if needed

/**
 * @route   POST /api/logs
 * @desc    Create a new log entry in the database
 * @access  Public (or protected if you prefer)
 */
router.post('/', async (req, res) => {
  try {
    const { timestamp, message } = req.body;
    if (!timestamp || !message) {
      return res.status(400).json({ error: "Missing 'timestamp' or 'message' field." });
    }

    // Create a new Log document
    const newLog = new Log({
      timestamp,
      message
    });

    // Save to database
    const savedLog = await newLog.save();
    return res.json({ status: 'Log saved', log: savedLog });
  } catch (err) {
    console.error('Error saving log:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route   GET /api/logs
 * @desc    Retrieve all logs from the database
 * @access  Public (or protected if you prefer)
 */
router.get('/', async (req, res) => {
  try {
    // If you want newest first, sort by createdAt descending:
    const allLogs = await Log.find().sort({ createdAt: -1 });
    return res.json(allLogs);
  } catch (err) {
    console.error('Error retrieving logs:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
