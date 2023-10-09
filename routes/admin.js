const path = require('path');

const express = require('express');

//const rootDir = require('../util/path');

const productsController = require('../controllers/products');

const router = express.Router();

// const products = []; // shifted to controller- [products.js]


// /admin/add-product => GET (the page where you see the added book)
router.get('/add-product', productsController.getAddProduct);


// /admin/add-product => POST (showing the data you put in the text box like - book 1)
router.post("/add-product", productsController.postAddProducts);

module.exports = router;


 // app.get or app.post or router.get/post are same as app.use but filter get and post req resp. 
