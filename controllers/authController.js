import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  //   if (req.body.isAdmin == false) {
  //     const admin = req.body.isAdmin ? true : false;
  //   }
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const login = async (req, res) => {
  // check if user exists
  const user = await User.findOne({ email: req.body.email });

  //check if password is correct
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");
  res.send("login route");
};
