const Expense = require("../models/expense");
const User = require("../models/user");
const fastcsv = require("fast-csv");

module.exports.CreateExpense = async function (req, res) {
  const { amount, description, category } = req.body;
  let expense = await Expense.create({
    amount,
    description,
    category,
    userId: req.user.dataValues.id,
  });
  return res.status(200).json({
    message: "expenses created!!",
    expense: expense,
  });
};

module.exports.TotalExpense = async function (req, res) {
  let expense = await Expense.findAll({
    where: { userId: req.user.dataValues.id },
  });
  if (expense.length) {
    let totalAmount = 0;
    for (let i of expense) {
      totalAmount += Number(i.dataValues.amount);
    }

    User.update(
      { totalexpense: totalAmount },
      { where: { id: req.user.dataValues.id } }
    );

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
  await Expense.destroy({ where: { id: expenseId } });
  return res.redirect("back");
};

module.exports.DownloadExpenses = async function (req, res) {
  let expenses = await Expense.findAll({
    where: { userId: req.user.dataValues.id },
  });
  if (expenses.length) {
    const filename = "expense_report.csv";

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

    const csvStream = fastcsv.format({ headers: true });
    csvStream.pipe(res);

    // Write each row of expense data to the CSV stream
    expenses.forEach((expense, i) => {
      csvStream.write(expense.dataValues);
    });

    csvStream.end();
  }
};

module.exports.PeginationExpenses = async function (req, res) {
  let id = req.user.dataValues.id;
  let expenses = await Expense.findAll({ where: { userId: id } });
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
