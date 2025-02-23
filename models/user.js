const Sequelize = require("sequelize"); // 🛢️ Import Sequelize ORM
const sequelize = require("../util/database"); // 🔗 Import database connection

// 👤 Define the User model
const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER, // 🔢 User ID (Integer)
    allowNull: false, // 🚫 ID cannot be null
    autoIncrement: true, // 🔄 Automatically increases for each new user
    primaryKey: true, // 🔑 Primary key (Unique identifier)
  },
  name: {
    type: Sequelize.STRING, // 🏷️ User's Name (String)
    allowNull: false, // 🚫 Name is required
  },
  email: {
    type: Sequelize.STRING, // 📧 User's Email Address (String)
    allowNull: false, // 🚫 Email is required
  },
});

module.exports = User; // 📤 Export the User model
