const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  buyerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      name: { type: String, unique: true, required: true },
      price: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('Order', orderSchema);
