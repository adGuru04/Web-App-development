const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
    .then((result) => {
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      return product.save();
    })
    .then((result) => {
      console.log("Updated product, wohoooo");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
  //  const updatedProduct = new Product(
  //    prodId,
  //    updatedTitle,
  //    updatedImageUrl,
  //    updatedDesc,
  //    updatedPrice
  //  );
  //  updatedProduct.save();
};

exports.getProducts = (req, res, next) => {
  Product.findAll({ where: { isDeleted: false } })
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        return console.log("No Product found");
      }
      product.isDeleted = true;
      return product.save();
      //return product.destroy();
    })
    .then((result) => {
      console.log("Product marked as Deleted Successfully!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
  //  Product.deleteById(prodId);
};

exports.getDeletedProducts = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({ where: { isDeleted: true } })
    .then((product) => {
      res.render("admin/deleted", {
        product: product,
        pageTitle: "Deleted Products",
        path: "/admin/deleted-product"
      });
    })
    .catch((err) => console.log(err));
};

exports.postRestoreProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findByPk(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/admin/deleted-products');
      }
      product.isDeleted = false;  // ✅ Restore product
      return product.save();
    })
    .then(() => {
      console.log('Product Restored!');
      res.redirect('/admin/deleted-products');  // ✅ Stay on deleted products page
    })
    .catch(err => console.log(err));
};
