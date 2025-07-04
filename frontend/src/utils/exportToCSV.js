import { Parser } from "json2csv";

export const exportToCsv = (data, filename = "expenses.csv") => {
  const parser = new Parser();
  const csv = parser.parse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
