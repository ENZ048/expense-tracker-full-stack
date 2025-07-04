import React, { useState } from "react";
import api from "../services/api";

export default function ExpenseTable({ expenses, onDelete, onFilter }) {
  const [category, setCategory] = useState("");

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setCategory(selected);
    onFilter(selected);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this expense?");
    if (!confirm) return;

    try {
      await api.delete(`/expenses/${id}`);
      onDelete();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold text-indigo-300">Expense History</h2>
        <select
          className="bg-slate-700 text-white p-2 rounded-xl w-full md:w-auto"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-slate-700 text-sm text-slate-100">
          <thead className="bg-slate-700 text-slate-300">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Note</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4 text-slate-400">
                  No expenses found.
                </td>
              </tr>
            ) : (
              expenses.map((e) => (
                <tr key={e._id} className="border-t border-slate-700 hover:bg-slate-700/50 transition">
                  <td className="p-3">{new Date(e.date).toLocaleDateString()}</td>
                  <td className="p-3">{e.category}</td>
                  <td className="p-3">{e.description}</td>
                  <td className="p-3">{e.note || "-"}</td>
                  <td className="p-3 text-right text-emerald-400">₹{e.amount}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(e._id)}
                      className="text-red-400 hover:text-red-500 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
