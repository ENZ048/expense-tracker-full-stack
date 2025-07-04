const express = require("express");
const router = express.Router();
const { createExpense, getExpenses, deleteExpense } = require("../controllers/expenseController");
const protect = require("../middleware/authMiddleware");

router.route("/")
  .post(protect, createExpense)
  .get(protect, getExpenses);

router.delete("/:id", protect, deleteExpense);

module.exports = router;
