const path = require('path'); // 📂 Import path module
const express = require('express'); // 🚀 Import Express framework
const shopController = require('../controllers/shop'); // 📦 Import shop controller

const router = express.Router(); // 🛤️ Create an Express router

// 🏪 Route to render the Shop homepage (GET request)
// 📌 URL: /
router.get('/', shopController.getIndex);

// 📋 Route to fetch and display all products (GET request)
// 📌 URL: /products
router.get('/products', shopController.getProducts);

// 🔍 Route to fetch details of a specific product (GET request)
// 📌 URL: /products/:productId
// 🏷️ The colon (:) indicates a dynamic route parameter
router.get('/products/:productId', shopController.getProduct);

// 🛒 Route to fetch and display the shopping cart (GET request)
// 📌 URL: /cart
router.get('/cart', shopController.getCart);

// ➕ Route to add a product to the cart (POST request)
// 📌 URL: /cart
router.post('/cart', shopController.postCart);

// ❌ Route to delete a product from the cart (POST request)
// 📌 URL: /cart-delete-item
router.post('/cart-delete-item', shopController.postCartDeleteProduct);

// 📦 Route to fetch and display orders (GET request)
// 📌 URL: /orders
router.get('/orders', shopController.getOrders);

// 💳 Route to render the checkout page (GET request)
// 📌 URL: /checkout
router.get('/checkout', shopController.getCheckout);

module.exports = router; // 📤 Export the router
