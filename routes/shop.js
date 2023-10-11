const path = require('path');

const express = require('express');


const productsController = require('../controllers/products');
const router = express.Router();
//const router = express.Router();
//const adminData = require('./admin');


// products shown/got on the shop
router.get('/', productsController.getProduct);


module.exports = router;