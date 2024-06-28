import { Router } from "express";
const router = Router();

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";
import {
  validateProductInput,
  validateIdParam,
} from "../middleware/validation.js";

router.post("/", validateProductInput, createProduct);
router.get("/", getAllProducts);
router.get("/:id", validateIdParam, getProduct);
router.patch("/:id", validateProductInput, validateIdParam, updateProduct);
router.delete("/:id", validateIdParam, deleteProduct);

export default router;
