import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

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

// validate register input
export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
]);

// validate login input
export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
]);

// validate product input
export const validateProductInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("description").notEmpty().withMessage("description is required"),
  body("category")
    .notEmpty()
    .withMessage("category is required")
    .custom(async (id) => {
      const isCategoryId = mongoose.Types.ObjectId.isValid(id);
      if (!isCategoryId) throw new BadRequestError("invalid MongoDB id");
      const category = await Category.findById(id);
      if (!category) throw new NotFoundError(`no category with id ${id}`);
    }),
  body("price").notEmpty().withMessage("price is required"),
  body("countInStock")
    .notEmpty()
    .withMessage("amount of products in stock is required")
    .isInt({ min: 0, max: 255 })
    .withMessage("amount of products can only be between 0 and 255"),
  // body("createdBy").notEmpty().withMessage("user id is required")
]);

// validate id parameter
export const validateIdParam = withValidationErrors([
  param("id").custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid MongoDB id");
    const product = await Product.findById(value);

    if (!product) throw new NotFoundError(`no product with id ${value}`);
  }),
]);

// validate category input
export const validateCategoryInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("icon").notEmpty().withMessage("icon is required"),
  body("color").notEmpty().withMessage("color is required"),
]);
