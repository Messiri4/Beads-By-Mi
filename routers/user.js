import express from "express";
// import User from "../models/User.js";
import { Router } from "express";
import { register } from "../controllers/authController.js";
const router = Router();

router.post("/register", register);

// router.post("/users/login", async (req, res) => {
//   try {
//       const user = await User.findByCredentials(req.body.email, req.body.password);
//     const token = await user.generateAuthToken();
//     res.send({ user, token });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

export default router;
