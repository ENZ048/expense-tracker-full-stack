# 💸 Expense Tracker App

A full-stack expense tracking application with a modern UI, JWT-based authentication, RESTful APIs, and weekly email summaries. Built with **MERN Stack**.

---

## 🌟 Features

- ✅ User registration & login with JWT auth
- ✅ Email confirmation on signup
- ✅ Add, view, and delete expenses
- ✅ Categorize and filter expenses
- ✅ Weekly expense summary emails
- ✅ Export expenses to CSV
- ✅ Dashboard with category-wise chart
- ✅ Responsive dark-themed UI
- ✅ Protected API routes with middleware

---

## 🛠️ Tech Stack

**Frontend:**  
- React (Vite)  
- TailwindCSS  
- Axios  
- Chart.js  

**Backend:**  
- Node.js + Express  
- MongoDB (Mongoose)  
- JWT + Bcrypt  
- Nodemailer (Gmail or SendGrid)  
- json2csv (for export)

---

## 📦 Project Structure

```
/client       → React frontend (Vite)
/backend      → Node.js + Express backend
```

## 🌐 Deployment

- **Frontend**: [Vercel](https://expense-tracker-full-stack-seven.vercel.app/)
- **Backend**: [Render](https://expense-tracker-full-stack-zrih.onrender.com)

---

## 📬 Weekly Email Setup (Optional)

Uses Gmail SMTP or SendGrid to send weekly summaries. Ensure credentials in `.env` and a cron job (Render or external) triggers `/send-weekly-summary`.


