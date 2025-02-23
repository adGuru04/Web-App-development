const Product = require("../models/product"); // 📦 Import the Product model

// 🛠️ Render the "Add Product" page
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false, // 👷‍♂️ Not in editing mode
  });
};

// ✅ Handles form submission for adding a new product
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title; // 📝 Get product title from request
  const imageUrl = req.body.imageUrl; // 🖼️ Get product image URL
  const price = req.body.price; // 💰 Get product price
  const description = req.body.description; // 📝 Get product description

  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
    .then((result) => {
      console.log(result); // ✅ Log product creation success
      res.redirect("/admin/products"); // 🔄 Redirect to admin product list
    })
    .catch((err) => {
      console.log(err); // ❌ Log errors if any
    });
};

// 🛠️ Render the "Edit Product" page
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; // ✅ Check if edit mode is enabled
  if (!editMode) {
    return res.redirect("/"); // 🚀 Redirect if no edit mode is specified
  }
  const prodId = req.params.productId; // 🔍 Get product ID from request

  Product.findByPk(prodId) // 🔍 Find product by ID
    .then((product) => {
      if (!product) {
        return res.redirect("/"); // 🚀 Redirect if the product does not exist
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode, // ✏️ Editing mode enabled
        product: product, // 📦 Pass the product data
      });
    })
    .catch((err) => console.log(err)); // ❌ Log errors if any
};

// 🔄 Handles form submission for updating an existing product
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId; // 🔍 Get product ID from request
  const updatedTitle = req.body.title; // 📝 Get updated title
  const updatedPrice = req.body.price; // 💰 Get updated price
  const updatedImageUrl = req.body.imageUrl; // 🖼️ Get updated image URL
  const updatedDesc = req.body.description; // 📝 Get updated description

  Product.findByPk(prodId) // 🔍 Find product by ID
    .then((product) => {
      product.title = updatedTitle; // 🔄 Update title
      product.price = updatedPrice; // 🔄 Update price
      product.imageUrl = updatedImageUrl; // 🔄 Update image URL
      product.description = updatedDesc; // 🔄 Update description
      return product.save(); // 💾 Save updated product
    })
    .then((result) => {
      console.log("Updated product, wohoooo"); // ✅ Log success message
      res.redirect("/admin/products"); // 🔄 Redirect back to admin product list
    })
    .catch((err) => console.log(err)); // ❌ Log errors if any
};

// 📋 Fetches all active (non-deleted) products and renders the "Admin Products" page
exports.getProducts = (req, res, next) => {
  Product.findAll({ where: { isDeleted: false } }) // 🚫 Exclude deleted products
    .then((products) => {
      res.render("admin/products", {
        prods: products, // 📦 Pass products to the view
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err)); // ❌ Log errors if any
};

// ❌ Marks a product as "deleted" instead of permanently deleting it
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId; // 🔍 Get product ID from request

  Product.findByPk(prodId) // 🔍 Find product by ID
    .then((product) => {
      if (!product) {
        return console.log("No Product found"); // 🚫 Log if no product found
      }
      product.isDeleted = true; // ❌ Soft delete: Mark as deleted
      return product.save();
    })
    .then((result) => {
      console.log("Product marked as Deleted Successfully!"); // 🗑️ Log success message
      res.redirect("/admin/products"); // 🔄 Redirect to admin products page
    })
    .catch((err) => console.log(err)); // ❌ Log errors if any
};

// 📋 Fetches all deleted products and renders the "Deleted Products" page
exports.getDeletedProducts = (req, res, next) => {
  const prodId = req.params.productId; // 🔍 Get product ID from request (not used)
  
  Product.findAll({ where: { isDeleted: true } }) // 🔍 Fetch only deleted products
    .then((product) => {
      res.render("admin/deleted", {
        product: product, // 📦 Pass deleted products to the view
        pageTitle: "Deleted Products",
        path: "/admin/deleted-product",
      });
    })
    .catch((err) => console.log(err)); // ❌ Log errors if any
};

// 🔄 Restores a deleted product (marks it as active again)
exports.postRestoreProduct = (req, res, next) => {
  const prodId = req.body.productId; // 🔍 Get product ID from request

  Product.findByPk(prodId) // 🔍 Find product by ID
    .then((product) => {
      if (!product) {
        return res.redirect("/admin/deleted-products"); // 🚀 Redirect if product not found
      }
      product.isDeleted = false; // ✅ Restore the product
      return product.save();
    })
    .then(() => {
      console.log("Product Restored!"); // ✅ Log success message
      res.redirect("/admin/deleted-products"); // 🔄 Redirect back to deleted products page
    })
    .catch((err) => console.log(err)); // ❌ Log errors if any
};
