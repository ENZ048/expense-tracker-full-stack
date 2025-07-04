const cron = require("node-cron");
const Expense = require("../models/Expense");
const User = require("../models/User");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendWeeklySummary() {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 7);

  const users = await User.find({ verified: true });

  for (const user of users) {
    const expenses = await Expense.find({
      user: user._id,
      date: { $gte: start, $lte: end },
    });

    if (expenses.length === 0) continue;

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const breakdown = {};
    expenses.forEach((e) => {
      breakdown[e.category] = (breakdown[e.category] || 0) + e.amount;
    });

    const html = `
      <h2>Hi ${user.name || "there"},</h2>
      <p>Here’s your expense summary for the past week (${start.toDateString()} – ${end.toDateString()}):</p>
      <ul>
        <li><strong>Total Spent:</strong> ₹${total.toFixed(2)}</li>
        ${Object.entries(breakdown)
          .map(
            ([cat, amt]) =>
              `<li><strong>${cat}:</strong> ₹${amt.toFixed(2)}</li>`
          )
          .join("")}
      </ul>
      <p>Keep tracking your expenses and stay in control! 💸</p>
    `;

    try {
      await transporter.sendMail({
        from: `"Expense Tracker" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Your Weekly Expense Summary",
        html,
      });
      console.log(`Sent weekly summary to ${user.email}`);
    } catch (err) {
      console.error(`Email to ${user.email} failed`, err.message);
    }
  }
}

cron.schedule("0 8 * * 0", () => {
  console.log("Running weekly summary job...");
  sendWeeklySummary();
});
