const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');


router.post('/addSales', async (req, res) => {
    try {
      const totalAmount = req.body.quantity * req.body.amount;
  
      const sale = new Sale({
        productName: req.body.productName,
        quantity: req.body.quantity,
        amount: req.body.amount,
        totalAmount: totalAmount
      });
  
      const savedSale = await sale.save();
      res.json(savedSale);
    } catch (err) {
      res.json({ message: err });
    }
  });

router.get('/topFiveSales', async (req, res) => {
  try {
    const sales = await Sale.find().sort({ amount: -1 }).limit(5);
    res.json(sales);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/totalSales', async (req, res) => {
  try {
    const sales = await Sale.find();

    const totalAmount = sales.reduce((total, sale) => total + sale.totalAmount, 0);

    res.json(totalAmount);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;