import { Router } from "express";
import { createCategory, deleteCategory, getCategoryDetail, getCategoryList, updateCategory } from "../controllers/categoryController.js";
import { validateCategoryInput } from "../middleware/validation.js";
const router = Router();

router.post("/",validateCategoryInput, createCategory);
router.delete("/:id", deleteCategory);
router.get("/", getCategoryList)
router.get("/:id", getCategoryDetail);
router.put("/:id", validateCategoryInput, updateCategory);

export default router;
