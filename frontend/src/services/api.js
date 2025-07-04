import axios from "axios";

const api = axios.create({
  baseURL: "https://expense-tracker-full-stack-zrih.onrender.com/api",
  withCredentials: true,
});

export default api;
