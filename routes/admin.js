const path = require('path'); // 📂 Import path module
const express = require('express'); // 🚀 Import Express framework
const adminController = require('../controllers/admin'); // 📦 Import admin controller

const router = express.Router(); // 🛤️ Create an Express router

// 🏗️ Route to render "Add Product" page (GET request)
// 📌 URL: /admin/add-product
router.get('/add-product', adminController.getAddProduct);

// 📋 Route to fetch and display all products (GET request)
// 📌 URL: /admin/products
router.get('/products', adminController.getProducts);

// 📝 Route to handle form submission for adding a new product (POST request)
// 📌 URL: /admin/add-product
router.post('/add-product', adminController.postAddProduct);

// ✏️ Route to render "Edit Product" page (GET request)
// 📌 URL: /admin/edit-product/:productId
router.get('/edit-product/:productId', adminController.getEditProduct);

// 🔄 Route to handle form submission for editing a product (POST request)
// 📌 URL: /admin/edit-product
router.post('/edit-product', adminController.postEditProduct);

// ❌ Route to handle deleting a product (POST request)
// 📌 URL: /admin/delete-product
router.post("/delete-product", adminController.postDeleteProduct);

// 🗑️ Route to fetch and display deleted products (GET request)
// 📌 URL: /admin/deleted-products
router.get('/deleted-products', adminController.getDeletedProducts);  

// 🔄 Route to restore a deleted product (POST request)
// 📌 URL: /admin/restore-product
router.post('/restore-product', adminController.postRestoreProduct);  

module.exports = router; // 📤 Export the router
