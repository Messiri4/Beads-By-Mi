import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await hashPassword(req.body.password);
  // req.body.password = hashedPassword;

  //   check for isAdmin or toggle isAdmin

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const login = async (req, res) => {
  // check if user exists
  const user = await User.findOne({ email: req.body.email });

  //check if password is correct
  const isValidUser =
    user && (await comparePassword(req.body.password, user.phone));
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({ userId: user._id, isAdmin: user.isAdmin });
  
  const oneDay = 1000 * 60 * 60 * 24

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production'
  })
  res.status(StatusCodes.OK).json({msg: 'user logged in'})
};
