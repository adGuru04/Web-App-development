const path = require("path"); // 📂 Import path module
const express = require("express"); // 🚀 Import Express framework
const bodyParser = require("body-parser"); // 📩 Import Body Parser for handling form data

const errorController = require("./controllers/error"); // ❌ Import 404 error controller
const sequelize = require("./util/database"); // 🛢️ Import Sequelize database connection
const Product = require("./models/product"); // 📦 Import Product model
const User = require("./models/user"); // 👤 Import User model

const app = express(); // 🏗️ Initialize Express app

// 🛠️ Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", "views"); // 📂 Set the directory for views (EJS files)

// 🚏 Import route handlers
const adminRoutes = require("./routes/admin"); // 🛠️ Admin routes
const shopRoutes = require("./routes/shop"); // 🏪 Shop routes

// 📦 Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: false }));

// 🌐 Serve static files (CSS, images, JS) from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// 🔗 Route middleware for handling admin and shop routes
app.use("/admin", adminRoutes); // 🛠️ Prefix "/admin" for admin routes
app.use(shopRoutes); // 🏪 Shop-related routes

// ❌ Handle 404 errors (for undefined routes)
app.use(errorController.get404);

// 🔗 **Associations: Defining relationships between models**
Product.belongsTo(User, { constraints: true, onDelete: "Cascade" }); // 🏗️ A product belongs to a user
User.hasMany(Product); // 👤 A user can have multiple products

// 🔄 Sync database and start the server
sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1); // 🔍 Try to find an existing user with ID 1
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "test@test.com" }); // 👤 Create a dummy user if none exists
    }
    return user;
  })
  .then((user) => {
    app.listen(2000); // 🚀 Start the server on port 2000
    console.log("Server is running on port 2000!"); // ✅ Log message
  })
  .catch((err) => {
    console.log(err); // ❌ Handle errors
  });
