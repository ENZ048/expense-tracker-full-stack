const Expense = require("../models/Expense");

exports.createExpense = async (req, res) => {
  try {
    const { title, amount, category, date, note } = req.body;

    const expense = await Expense.create({
      user: req.user._id,
      title,
      amount,
      category,
      date,
      note,
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error("Create expense error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const { category, startDate, endDate } = req.query;

    const filter = { user: req.user._id };

    if (category) filter.category = category;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const expenses = await Expense.find(filter).sort({ date: -1 });

    res.status(200).json(expenses);
  } catch (err) {
    console.error("Get expenses error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!expense) return res.status(404).json({ message: "Expense not found" });

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete expense error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
