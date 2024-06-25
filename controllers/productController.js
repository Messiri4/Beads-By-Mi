import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

// create product
export const createProduct = async (req, res) => {
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({product})
}

// get all products
export const getAllProducts = async (req, res) => {
    const products = await Product.find({})
    res.status(StatusCodes.OK).json({products})
}

// get single products
export const getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.status(StatusCodes.OK).json({product})
}

// update product
export const updateProduct = async (req, res) => {
    const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(StatusCodes.OK).json({msg: "product modified", product: updateProduct })
}

// delete product
export const deleteProduct = async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.OK).json({msg: "product deleted", product: deletedProduct })
}