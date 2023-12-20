const Sales = require('../models/sales'); // Corrected file name

// Adding new sales entry logic
const addSales = async (req, res) => {
  try {
    const { productName, quantity, amount } = req.body;
    const userId = req.user.userId; // Extracted from JWT token

    // Create a new sales entry
    const newSale = new Sales({ user: userId, productName, quantity, amount });
    await newSale.save();

    res.status(201).json({ message: 'Sale entry added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fetching top 5 sales for today
const getTopSales = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from JWT token

    // Fetch top 5 sales for today
    const topSales = await Sales.find({ user: userId })
      .sort({ amount: -1 })
      .limit(5);

    res.json(topSales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Calculating total revenue for today
const getTotalRevenue = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from JWT token

    // Calculate total revenue for today
    const totalRevenue = await Sales.aggregate([
      { $match: { user: mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    res.json({ totalRevenue: totalRevenue[0] ? totalRevenue[0].total : 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  addSales,
  getTopSales,
  getTotalRevenue,
};
