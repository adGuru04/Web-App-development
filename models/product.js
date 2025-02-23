const Sequelize = require('sequelize'); // 🛢️ Import Sequelize ORM
const sequelize = require('../util/database'); // 🔗 Import database connection
const { defaultValueSchemable, toDefaultValue } = require('sequelize/lib/utils');

// 📦 Define the Product model
const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER, // 🔢 Product ID (Integer)
        autoIncrement: true, // 🔄 Automatically increases for each new product
        allowNull: false, // 🚫 ID cannot be null
        primaryKey: true // 🔑 Primary key (Unique identifier)
    },
    title: Sequelize.STRING, // 🏷️ Product title (String)
    price: {
        type: Sequelize.STRING, // 💰 Product price (String format)
        allowNull: false // 🚫 Price is required
    },
    imageUrl: {
        type: Sequelize.STRING, // 🖼️ Image URL for the product
        allowNull: false // 🚫 Image URL is required
    },
    description: {
        type: Sequelize.STRING, // 📝 Product description
        allowNull: false // 🚫 Description is required
    },
    isDeleted: { // 🗑️ Soft delete flag (Tracks deleted products)
        type: Sequelize.BOOLEAN, // ✅ True (Deleted), False (Active)
        allowNull: false, // 🚫 Required field
        defaultValue: false // 🚀 Default is "false" (Not deleted)
    }
});

module.exports = Product; // 📤 Export the Product model

// ------------------------------------------------------------------------
// 📝 Below is the old raw SQL-based model (Commented Out)
/*
const db = require('../util/database'); // 🛢️ Import database utility
const Cart = require('./cart'); // 🛒 Import Cart model (if needed)

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id; // 🔢 Product ID
    this.title = title; // 🏷️ Product Title
    this.imageUrl = imageUrl; // 🖼️ Product Image URL
    this.description = description; // 📝 Product Description
    this.price = price; // 💰 Product Price
  }

  save() { // 💾 Save new product to database
    return db.execute(
      'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static deleteById(id) {} // ❌ Delete product by ID (Not implemented)

  static fetchAll() { // 📋 Fetch all products from database
    return db.execute('SELECT * FROM products');
  }

  static findById(id) { // 🔍 Find product by ID
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
}; 
*/
