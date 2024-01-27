const mongoose = require('mongoose');

const SaleSchema = mongoose.Schema({
  productName: String,
  quantity: Number,
  amount: Number,
  totalAmount: Number
});

module.exports = mongoose.model('Sale', SaleSchema);