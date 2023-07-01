const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];


// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
   res.render('add-product', {pageTitle: 'Add Prouct',path: '/admin/add-prouct'});

   // next(); // Allows us to move the request to the next middleware in line
});


// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
   
   products.push({ title: req.body.title });
   console.log(products);
   res.redirect('/');
});

exports.routes = router;
exports.products = products; 


 // app.get or app.post or router.get/post are same as app.use but filter get and post req resp. 