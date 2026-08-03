const { body } = require("express-validator");
const signUpValidation=[
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({min : 3, max:50})
        .withMessage("Name must be between 3 to 50 characters"),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email"),

    body("phone")
        .notEmpty()
        .withMessage("Phone number is required")
        .isLength({min: 10, max: 15})
        .withMessage("Phone number must be between 10 to 15 digits")
        .isNumeric()
        .withMessage("Phone number must contain only numbers"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/)
        .withMessage(
            "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
        )
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
]
module.exports = signUpValidation;