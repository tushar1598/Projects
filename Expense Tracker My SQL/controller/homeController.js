const Expense = require("../models/expense");

module.exports.Home = async function (req, res) {
  let expenses = await Expense.findAll();
  return res.render("home", {
    expenses: expenses,
  });
};
