const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const salesController = require('./controllers/salesController');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err);
  }
})();

// Routes
app.use('/sales', salesController);
app.use('/auth', authRoutes);

// Start server
app.listen(5000, () => console.log('Server started on port 5000'));
