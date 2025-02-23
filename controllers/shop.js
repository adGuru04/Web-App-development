const Product = require('../models/product'); // 📦 Import the Product model
const Cart = require('../models/cart'); // 🛒 Import the Cart model

// 📋 Fetch all active (non-deleted) products and render the "Product List" page
exports.getProducts = (req, res, next) => {
  Product.findAll({ where: { isDeleted: false } }) // 🚫 Exclude deleted products
    .then(products => {
      res.render('shop/product-list', {
        prods: products, // 📦 Pass products to the view
        pageTitle: 'All Products', // 📄 Set page title
        path: '/products' // 🛤️ Path for navigation highlighting
      });
    })
    .catch(err => {
      console.log(err); // ❌ Log errors if any
    })
};

// 🔍 Fetch details of a single product and render the "Product Detail" page
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId; // 🔍 Get product ID from request

  Product.findAll({ where: { id: prodId } }) // 🔍 Find product by ID
  .then(products => {
      res.render('shop/product-detail', {
        product: products[0], // 📦 Pass the first product found
        pageTitle: products[0].title, // 📝 Set the page title dynamically
        path: '/products' // 🛤️ Path for navigation highlighting
      });
    })
  .catch(err => console.log(err)); // ❌ Log errors if any
};

// 🏪 Fetch all active (non-deleted) products and render the "Shop Homepage"
exports.getIndex = (req, res, next) => {
  Product.findAll({ where : { isDeleted: false } }) // 🚫 Exclude deleted products
    .then(products => {
      res.render('shop/index', {
        prods: products, // 📦 Pass products to the view
        pageTitle: 'Shop', // 📄 Set page title
        path: '/' // 🛤️ Path for navigation highlighting
      });
    })
    .catch(err => {
      console.log(err); // ❌ Log errors if any
    })
};

// 🛒 Fetch cart data and render the "Cart" page
exports.getCart = (req, res, next) => {
  Cart.getCart(cart => { // 🛒 Fetch cart from storage
    Product.fetchAll(products => { // 📦 Fetch all products
      const cartProducts = [];

      for (product of products) { // 🔍 Loop through products to find cart items
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) { // ✅ If product is in the cart, add it to the list
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }

      res.render('shop/cart', {
        path: '/cart', // 🛤️ Path for navigation highlighting
        pageTitle: 'Your Cart', // 🛒 Set page title
        products: cartProducts // 📦 Pass cart products to the view
      });
    });
  });
};

// ➕ Add a product to the cart and redirect back to the cart page
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId; // 🔍 Get product ID from request

  Product.findById(prodId, product => { // 🔍 Find product by ID
    Cart.addProduct(prodId, product.price); // 🛒 Add product to cart
  });

  res.redirect('/cart'); // 🔄 Redirect back to cart page
};

// ❌ Remove a product from the cart and redirect back to the cart page
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId; // 🔍 Get product ID from request

  Product.findById(prodId, product => { // 🔍 Find product by ID
    Cart.deleteProduct(prodId, product.price); // 🛒 Remove product from cart
    res.redirect('/cart'); // 🔄 Redirect back to cart page
  });
};

// 📦 Render the "Orders" page (Placeholder for future order functionality)
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders', // 🛤️ Path for navigation highlighting
    pageTitle: 'Your Orders' // 📄 Set page title
  });
};

// 💳 Render the "Checkout" page (Placeholder for future checkout functionality)
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout', // 🛤️ Path for navigation highlighting
    pageTitle: 'Checkout' // 📄 Set page title
  });
};
