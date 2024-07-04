import { Router } from "express";
import { deleteUser, getAllUsers, getSingleUser, getUserCount } from "../controllers/userController.js";
import { validateIdParam, validateUserIdParam } from "../middleware/validation.js";
const router = Router();

router.get("/", getAllUsers)
router.get("/:id", validateUserIdParam, getSingleUser);
router.get("/admin/count", getUserCount);
router.delete("/:id", validateUserIdParam, deleteUser);

export default router;
