import React, { useState } from "react";
import api from "../services/api";

export default function AddExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().slice(0, 10),
    note: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/expenses", form);
      setForm({
        description: "",
        amount: "",
        category: "Food",
        date: new Date().toISOString().slice(0, 10),
        note: "",
      });
      onAdd();
    } catch (err) {
      console.error("Add expense error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="bg-slate-700 text-white p-3 rounded-xl w-full"
          required
        />
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="bg-slate-700 text-white p-3 rounded-xl w-full"
          required
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="bg-slate-700 text-white p-3 rounded-xl w-full"
        >
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="bg-slate-700 text-white p-3 rounded-xl w-full"
        />
      </div>
      <textarea
        name="note"
        value={form.note}
        onChange={handleChange}
        placeholder="Optional note"
        className="bg-slate-700 text-white p-3 rounded-xl w-full resize-none"
        rows={2}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-emerald-600 hover:bg-emerald-700 transition text-white font-semibold px-6 py-3 rounded-xl w-full md:w-auto"
      >
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
}
