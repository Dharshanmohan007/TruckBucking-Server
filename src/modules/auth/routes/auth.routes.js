const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller")
const signupValidation = require("../validators/auth.validator")

router.post("/signup", signupValidation,authController.signup);

module.exports = router;