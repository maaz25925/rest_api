const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');

router.post('/create-catalog', sellerController.createCatalog);
router.get('/orders', sellerController.getOrders);

module.exports = router;
