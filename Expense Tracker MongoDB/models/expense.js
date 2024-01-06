const mongoose = require("mongoose");
const expenseSchema = new mongoose.Schema({
  amount: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;