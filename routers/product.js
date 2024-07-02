import { Router } from "express";
const router = Router();

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getAllFeaturedProducts,
  getProduct,
  getProductCount,
  getUserProducts,
  updateAdminProduct,
  getFeaturedProducts,
  updateUserProduct,
} from "../controllers/productController.js";
import {
  validateProductInput,
  validateIdParam,
} from "../middleware/validation.js";

router.post("/", validateProductInput, createProduct);

//admin
router.patch(
  "/admin/:id",
  validateProductInput,
  validateIdParam,
  updateAdminProduct
);
router.get("/count", getProductCount);
router.get("/isFeatured", getAllFeaturedProducts);
router.get("/isFeatured/:count", getFeaturedProducts);
router.get("/", getAllProducts);

//user

router.get("/user-products/", getUserProducts);
router.get("/:id", validateIdParam, getProduct);

router.patch(
  "/user/:id",
  validateProductInput,
  validateIdParam,
  updateUserProduct
);
router.delete("/:id", validateIdParam, deleteProduct);

export default router;
