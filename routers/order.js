import { Router } from "express";
import { createOrder, getAllOrders } from "../controllers/orderController.js";
import {
  validateIdParam,
  validateOrderInput,
  validateUserIdParam,
//   validateOrderItemInput,
} from "../middleware/validation.js";
const router = Router();


router.get('/', getAllOrders)
router.post("/", validateOrderInput, createOrder);
export default router;
