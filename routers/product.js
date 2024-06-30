import { Router } from "express";
const router = Router();

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getAllFeaturedProducts,
  getProduct,
  getProductCount,
  // getProductsByName,
  updateProduct,
  getFeaturedProducts,
} from "../controllers/productController.js";
import {
  validateProductInput,
  validateIdParam,
} from "../middleware/validation.js";

router.post("/", validateProductInput, createProduct);
router.get("/", getAllProducts);
// router.get("/name", getProductsByName);
router.get("/isFeatured", getAllFeaturedProducts);
router.get("/isFeatured/:count", getFeaturedProducts);
router.get("/count", getProductCount);
router.get("/:id", validateIdParam, getProduct);
router.patch("/:id", validateProductInput, validateIdParam, updateProduct);
router.delete("/:id", validateIdParam, deleteProduct);

export default router;
