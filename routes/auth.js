// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

const authenticateJWT = authController.authenticateJWT;

router.get('/check-auth', authenticateJWT, (req, res) => {
    res.json({ isAuthenticated: true });
  });

module.exports = { router, authenticateJWT };
