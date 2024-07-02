import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";

// create product
export const createProduct = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

// get all products or products by category(ies)
export const getAllProducts = async (req, res) => {
  // localhost:3000/api/v1/products?categories=1234567,1256790
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  const products = await Product.find(filter).populate("category");
  res.status(StatusCodes.OK).json({ products });
};

// get all products for logged in user
export const getUserProducts = async (req, res) => {
  let filter = {};
  const products = await Product.find(
    { createdBy: req.user.userId },
    filter
  ).populate("createdBy");
  res.status(StatusCodes.OK).json({ products });
};

// update user product
export const updateUserProduct = async (req, res) => {
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (updateProduct?.createdBy?.toString() !== req.user.userId) {
    throw new BadRequestError("user not authorized");
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "product modified", product: updateProduct });
};

// can update any user product
export const updateAdminProduct = async (req, res) => {
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: "product modified", product: updateProduct });
};

// get single products
export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(StatusCodes.OK).json({ product });
};

// get product count
export const getProductCount = async (req, res) => {
  const productCount = await Product.countDocuments();
  console.log(productCount);
  res.status(StatusCodes.OK).json({ productCount: productCount });
};

// get all featured products
export const getAllFeaturedProducts = async (req, res) => {
  const products = await Product.find({ isFeatured: true });
  console.log(products);
  res.status(StatusCodes.OK).json({ isFeaturedProducts: products });
};

// get featured products using count
export const getFeaturedProducts = async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const products = await Product.find({ isFeatured: true }).limit(count);
  console.log(products);
  res.status(StatusCodes.OK).json({ isFeaturedProducts: products });
};

// delete product
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product?.createdBy?.toString() !== req.user.userId) {
    throw new BadRequestError("user not authorized");
  }
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ msg: "product deleted", product: deletedProduct });
};
