const Expense = require("../models/expense");
const User = require("../models/user");
const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports.CreateExpense = async function (req, res) {
  const { amount, description, category } = req.body;
  let expense = await Expense.create({
    amount,
    description,
    category,
    user: req.user._id,
  });
  return res.status(200).json({
    message: "expenses created!!",
    expense: expense,
  });
};

module.exports.TotalExpense = async function (req, res) {
  let expense = await Expense.find({ user: req.user._id });
  if (expense.length) {
    let totalAmount = 0;
    for (let i of expense) {
      totalAmount += Number(i.amount);
    }
    User.findByIdAndUpdate(req.user._id, { totalexpense: totalAmount });
    return res.status(200).json({
      message: "Total expense",
      expense: expense,
    });
  } else {
    return res.redirect("/users/sign-in");
  }
};

module.exports.DeleteExpense = async function (req, res) {
  let expenseId = req.params.id;
  await Expense.findByIdAndDelete(expenseId);
  return res.redirect("back");
};

module.exports.DownloadExpenses = async function (req, res) {
  let expenses = await Expense.find({ user: req.user._id });
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream('expenses.pdf'));
  expenses.forEach((expense) => {
    doc.text(`${expense.amount + ",  "} ${expense.description + ",  "} ${expense.category + ",  "} ${new Date(expense.createdAt).toLocaleString()}`);
  });
  doc.end();
  res.download('expenses.pdf');
};

module.exports.PeginationExpenses = async function (req, res) {
  let id = req.user._id;
  let expenses = await Expense.find({ user: id });
  if (expenses.length) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < expenses.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.expenses = expenses.slice(startIndex, endIndex);
    return res.status(200).json({
      message: "Expenses",
      results: results,
    });
  } else {
    return res.redirect("/users/sign-in");
  }
};
