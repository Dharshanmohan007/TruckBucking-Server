const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller")
const signupValidation = require("../validators/auth.validator")
const vaidationMiddleware = require("../../../middleware/validation.middleware")

router.post("/signup", signupValidation, vaidationMiddleware, authController.signup);
router.post("/verify-otp", authController.verifyOTP);

module.exports = router;