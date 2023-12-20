// routes/sales.js
const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const { authenticateJWT } = require('./auth');

router.post('/add', authenticateJWT, salesController.addSales);
router.get('/top', authenticateJWT, salesController.getTopSales);
router.get('/totalrevenue', authenticateJWT, salesController.getTotalRevenue);

module.exports = router;
