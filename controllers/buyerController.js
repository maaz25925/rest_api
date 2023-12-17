const User = require('../models/User');
const Catalog = require('../models/Catalog');
const Order = require('../models/Order');
const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  CREATED,
  BAD_REQUEST,
} = require('../config/status');

// @desc    Get list of sellers
// @route   GET /api/buyer/list-of-sellers
// @access  Private
const getSellers = async (req, res) => {
  try {
    const sellers = await User.find(
      { $or: [{ userType: 'seller' }, { userType: 'both' }] },
      'username'
    );
    res.json(sellers);
  } catch (error) {
    console.error(error);
    res
      .status(INTERNAL_SERVER_ERROR.code)
      .json({ error: INTERNAL_SERVER_ERROR.message });
  }
};

// @desc    Get seller's catalog
// @route   GET /api/buyer/seller-catalog/:seller_id
// @access  Private
const getSellerCatalog = async (req, res) => {
  try {
    const catalog = await Catalog.findOne({ sellerId: req.params.seller_id });
    catalog
      ? res.json(catalog.products)
      : res.status(NOT_FOUND.code).json({ error: 'Seller catalog not found' });
  } catch (error) {
    console.error(error);
    res
      .status(INTERNAL_SERVER_ERROR.code)
      .json({ error: INTERNAL_SERVER_ERROR.message });
  }
};

// @desc    Create order
// @route   POST /api/buyer/create-order/:seller_id
// @access  Private
const createOrder = async (req, res) => {
  try {
    // Extract products and sellerId from the request
    const { products } = req.body;
    const sellerId = req.params.seller_id;

    // Check if the seller exists and is of the correct user type (seller or both)
    const sellerExists = await User.exists({
      _id: sellerId,
      userType: { $in: ['seller', 'both'] },
    });
    if (!sellerExists)
      return res.status(NOT_FOUND.code).json({ error: 'Seller not found' });

    // Check if the seller has a catalog
    const catalog = await Catalog.findOne({ sellerId });
    if (!catalog)
      return res
        .status(NOT_FOUND.code)
        .json({ error: 'Seller catalog not found' });

    // Extract product names from the catalog
    const productsInCatalog = catalog.products.map((product) => product.name);

    // Check if all products in the order exist in the seller's catalog
    const allProductsExist = products.every((product) =>
      productsInCatalog.includes(product.name)
    );
    if (!allProductsExist)
      return res.status(BAD_REQUEST.code).json({
        error: `One or more products in your order are not available in the seller's catalog. Please choose valid products.`,
      });

    // Create a new order and save it to the database
    const order = new Order({
      buyerId: req.user._id,
      sellerId,
      products,
    });
    await order.save();

    res.status(CREATED.code).json({ mesage: 'Order created successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(INTERNAL_SERVER_ERROR.code)
      .json({ error: INTERNAL_SERVER_ERROR.message });
  }
};

module.exports = { getSellers, getSellerCatalog, createOrder };
