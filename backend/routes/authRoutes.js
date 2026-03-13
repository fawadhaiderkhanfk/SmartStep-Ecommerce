const express = require("express");
const router = express.Router();
const { registerUser, loginUser, googleLogin } = require("../controllers/authController");

// The routes for our auth system
router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post("/google", googleLogin);

module.exports = router;