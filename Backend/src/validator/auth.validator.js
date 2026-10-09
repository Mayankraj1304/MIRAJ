import { body, validationResult } from "express-validator";

export const registerValidationRules = [
  body("email")
    .isString()
    .withMessage("Email must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Email must be valid"),
  body("phoneNumber")
    .isString()
    .withMessage("Phone number must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .notEmpty()
    .withMessage("Password is required"),
  body("isBuyer")
    .isIn(["YES", "NO"])
    .withMessage("Please tick in the given option"),
];

export const loginValidationRules = [
  body("email")
    .isString()
    .withMessage("Email must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Email must be valid"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .notEmpty()
    .withMessage("Password is required"),
];

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors
        .array()
        .map(({ path, msg }) => ({ field: path, message: msg })),
    });
  }

  return next();
};
