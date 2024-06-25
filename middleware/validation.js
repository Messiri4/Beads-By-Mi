import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import mongoose from "mongoose";
import User from "../models/User.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateRegisterInput = withValidationErrors([
    body("name").notEmpty().withMessage("name is required"),
    body("email").notEmpty().withMessage("email is required").isEmail().withMessage("invalid email format").custom(async (email) => {
        const user = await User.findOne({email})
        if (user) {
            throw new BadRequestError("email already exists")
        }
    }),
    body("password").notEmpty().withMessage("password is required").isLength({min: 8}).withMessage("password must be at least 8 characters long"),
])
