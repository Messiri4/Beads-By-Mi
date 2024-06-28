import Category from "../models/Category.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

// create category
export const createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(StatusCodes.CREATED).json({ category });
};

// delete category
export const deleteCategory = async (req, res) => {
  const deletedCategory = await Category.findByIdAndDelete(req.params.id);
  if (!deletedCategory) {
    throw new NotFoundError("category not found");
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "category deleted", product: deletedCategory });
};
// get category list
export const getCategoryList = async (req, res) => {
  const categoryList = await Category.find();
  if (!categoryList) {
    throw new NotFoundError("category list not found");
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "category list", categories: categoryList });
};

// get category detail
export const getCategoryDetail = async (req, res) => {
  const categoryDetail = await Category.findById(req.params.id);
  if (!categoryDetail) {
    throw new NotFoundError(
      `The category with ID: ${req.params.id} was not found`
    );
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "category list", category: categoryDetail });
};

// update category
export const updateCategory = async (req, res) => {
  const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updatedCategory) {
    throw new NotFoundError(
      `The Category with the ID: ${req.params.id} was not found`
    );
  }
  res.status(StatusCodes.OK).json({ updatedCategory: updatedCategory });
};
