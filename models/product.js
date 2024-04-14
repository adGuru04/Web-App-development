//These lines bring in special tools (libraries) that help the program read and write files and work with file paths.
const { log } = require('console');
const fs = require('fs');
const path = require('path');

const Cart = require('./cart');
//This creates a path to a file called "products.json" in a folder called "data." 
//It figures out the full path to your main program file (process.mainModule.filename), then adds the folders and file name to it.
const p = path.join(
  __dirname,
  '../data',
  'products.json'
);


//This function reads the contents of the "products.json" file. 
//If there's an error (like the file doesn't exist), it calls a function (cb) with an empty array.
// If there's no error, it reads the file content, converts it from a text format to a JavaScript object (JSON.parse), and then calls the function with that array of products.
const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      console.error(err, 'Erorr reading file');
      cb([]);
    } else {
      try {
        cb(JSON.parse(fileContent));
      } catch (err) {
        console.error(err, 'Error parsing file');
        cb([]);
      }
    }
  });
};


//This part creates a blueprint (a class) for a product. Each product will have a title, and you create a new product by providing a title when you make it.
module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
  //This method adds the current product (the one you created) to the list of products, then writes this updated list back to the "products.json" file. 
  // If there's an error, it logs a message.
  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          prod => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static deletebyId(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price); 
        }
      });
    });
  }

  //This method gets all the products from the file and calls a function (cb) with those products.
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};

//In simple terms, this code helps you create products, save them to a file, and fetch all products from that file. 
//It's like keeping a digital list of all the things you're selling in your store.