import React, { useEffect, useState } from "react";
import api from "../services/api";
import ExpenseChart from "./ExpenseChart";
import ExpenseTable from "./ExpenseTable";
import AddExpenseForm from "./AddExpenseForm";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalSpent, setTotalSpent] = useState(0);
  const [categoryBreakdown, setCategoryBreakdown] = useState({});
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await api.get("/expenses");
      const fetched = res.data.expenses;

      setExpenses(fetched);
      setFilteredExpenses(fetched);

      const total = fetched.reduce((sum, e) => sum + e.amount, 0);
      setTotalSpent(total);

      const breakdown = fetched.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
      }, {});
      setCategoryBreakdown(breakdown);
    } catch (err) {
      console.error("Error loading dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (category) => {
    if (!category) {
      setFilteredExpenses(expenses);
    } else {
      const filtered = expenses.filter((e) => e.category === category);
      setFilteredExpenses(filtered);
    }
  };

  const handleDeleteExpense = () => {
    fetchData(); // re-fetch after delete
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExportCSV = async () => {
    try {
      const res = await api.get("/expenses/export", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expenses.csv");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleExpenseAdded = () => {
    fetchData(); // Refresh dashboard after new expense
  };

  if (loading) return <p className="p-6 text-slate-100 animate-pulse">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-4xl font-bold text-indigo-400 tracking-tight">💰 Dashboard</h1>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleExportCSV}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-xl shadow transition"
            >
              Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-xl shadow transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
          <p className="text-2xl font-semibold">
            Total Spent: <span className="text-emerald-400 font-bold">₹{totalSpent}</span>
          </p>
        </div>

        {/* Add Expense Form */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-indigo-300 mb-4">Add New Expense</h2>
          <AddExpenseForm onAdd={handleExpenseAdded} />
        </div>

        {/* Chart */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-indigo-300 mb-4">Category Breakdown</h2>
          <ExpenseChart data={categoryBreakdown} />
        </div>

        {/* Expense Table */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-indigo-300 mb-4">Your Expenses</h2>
          <ExpenseTable
            expenses={filteredExpenses}
            onDelete={handleDeleteExpense}
            onFilter={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
}
