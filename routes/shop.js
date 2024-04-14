const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products',shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);
// colon here is a signal that reflect that this middleware doesnt look for a route.

router.get('/cart',shopController.getCart);

router.post('/cart',shopController.postCart);

router.post('/cart-delete-item',shopController.postCartDeleteProduct);

router.get('/orders',shopController.getOrders);

router.get('/checkout',shopController.getCheckout);

module.exports = router;
