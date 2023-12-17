const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catalogSchema = new Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      name: { type: String, unique: true, required: true },
      price: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model('Catalog', catalogSchema);
