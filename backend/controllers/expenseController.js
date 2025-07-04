const Expense = require("../models/Expense");
const { Parser } = require("json2csv");

exports.createExpense = async (req, res) => {
  try {
    const { description, amount, category, date, note } = req.body;

    const expense = await Expense.create({
      user: req.user._id,
      description,
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

    res.status(200).json({expenses});
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

exports.exportCsv = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).lean();

    if (expenses.length === 0) {
      return res.status(400).json({ message: "No expenses to export" });
    }

    const fields = ["date", "category", "description", "amount", "note"];
    const parser = new Parser({ fields });

    const csv = parser.parse(
      expenses.map((e) => ({
        date: e.date.toISOString().split("T")[0],
        category: e.category,
        description: e.description,
        amount: e.amount,
        note: e.note || "",
      }))
    );

    res.header("Content-Type", "text/csv");
    res.header("Content-Disposition", 'attachment; filename="expenses.csv"');
    return res.status(200).send(csv);
  } catch (err) {
    console.error("CSV export error:", err);
    res.status(500).json({ message: "Failed to generate CSV" });
  }
};
