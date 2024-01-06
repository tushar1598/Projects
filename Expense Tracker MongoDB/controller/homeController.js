const Expense = require("../models/expense");

module.exports.Home = async function (req, res) {
  let expenses = await Expense.find({});
  return res.render("home", {
    expenses: expenses,
  });
};
