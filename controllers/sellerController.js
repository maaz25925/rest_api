const Catalog = require('../models/Catalog');
const Order = require('../models/Order');
const { CREATED, INTERNAL_SERVER_ERROR } = require('../config/status');

// @desc    Create catalog
// @route   GET /api/seller/create-catalog
// @access  Private
const createCatalog = async (req, res) => {
  try {
    // Extract products from the request body
    const { products } = req.body;

    // Create a new catalog for the seller and save it to the database
    const catalog = new Catalog({ sellerId: req.user._id, products });
    await catalog.save();
    
    res.status(CREATED.code).json({ message: 'Catalog created successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(INTERNAL_SERVER_ERROR.code)
      .json({ error: INTERNAL_SERVER_ERROR.message });
  }
};

// @desc    Get orders
// @route   GET /api/seller/orders
// @access  Private
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.user._id });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res
      .status(INTERNAL_SERVER_ERROR.code)
      .json({ error: INTERNAL_SERVER_ERROR.message });
  }
};

module.exports = { createCatalog, getOrders };
