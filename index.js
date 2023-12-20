// server.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const salesRoutes = require('./routes/sales');
const connectDB = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables from .env file

// Connect to MongoDB
connectDB();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(express.json());

app.use('/api/auth', authRoutes.router);
app.use('/api/sales', salesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
