const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();


// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
   res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

   // next(); // Allows us to move the request to the next middleware in line
});


// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
   console.log(req.body);
   res.redirect('/');
});


module.exports = router;

 // app.get or app.post or router.get/post are same as app.use but filter get and post req resp. 
