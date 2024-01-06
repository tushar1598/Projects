const express = require("express");
const router = express.Router();
const expenseController = require("../controller/expenseController");
const passport = require("passport");

router.post(
  "/create-expense",
  passport.CheckAuthentication,
  expenseController.CreateExpense
);
router.get("/total-expense", expenseController.TotalExpense);
router.get("/delete-expense/:id", expenseController.DeleteExpense);
router.get("/download-expenses", expenseController.DownloadExpenses);
router.get("/pagination-expenses", expenseController.PeginationExpenses);

module.exports = router;
