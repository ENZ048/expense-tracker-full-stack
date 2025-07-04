const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("./cron/weeklySUmmary");



dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://expense-tracker-full-stack-seven.vercel.app",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// @ts-ignore: TS1261 false positive on Windows
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const expenseRoutes = require("./routes/expenseRoutes");
app.use("/api/expenses", expenseRoutes);




mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });
