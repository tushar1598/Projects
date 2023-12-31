const Sequelize = require("sequelize");
const sequelize = require("../config/databse");

const User = sequelize.define("users", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  password: Sequelize.STRING,
});

module.exports = User;
