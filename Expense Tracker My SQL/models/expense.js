const Sequelize = require("sequelize");
const sequelize = require("../config/databse");

const Expense = sequelize.define("expenses", {
  amount: Sequelize.STRING,
  description: Sequelize.STRING,
  category: Sequelize.STRING,
});

module.exports = Expense;
