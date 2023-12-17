const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyerController');

router.get('/list-of-sellers', buyerController.getSellers);
router.get('/seller-catalog/:seller_id', buyerController.getSellerCatalog);
router.post('/create-order/:seller_id', buyerController.createOrder);

module.exports = router;