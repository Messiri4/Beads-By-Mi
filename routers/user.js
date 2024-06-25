import express from "express";
// import User from "../models/User.js";
import { Router } from "express";
import { register } from "../controllers/authController.js";
import { validateRegisterInput } from "../middleware/validation.js";
const router = Router();

router.post("/register", validateRegisterInput, register);

export default router;
