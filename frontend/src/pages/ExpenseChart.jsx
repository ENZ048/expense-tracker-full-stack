import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function ExpenseChart({ data }) {
  const chartData = Object.entries(data).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-3">Category Breakdown</h2>
      {chartData.length === 0 ? (
        <p>No expenses to display.</p>
      ) : (
        <PieChart width={350} height={300}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              borderColor: "#334155",
              color: "#f1f5f9",
            }}
          />
          <Legend wrapperStyle={{ color: "#f1f5f9" }} />
        </PieChart>
      )}
    </div>
  );
}
