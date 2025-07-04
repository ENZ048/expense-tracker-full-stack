import { Routes, Route } from "react-router-dom";
import "./App.css"
import AuthPage from "./pages/AuthPage";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/verify-email/:token" element={<VerifyEmail />} />
      <Route path="/Dashboard" element={<Dashboard />} />

    </Routes>
  );
}
