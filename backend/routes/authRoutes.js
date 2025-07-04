const express = require("express");
const { signup, verifyEmail, login, getMe } = require("../controllers/authController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.get("/verify-email/:token", verifyEmail);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;
