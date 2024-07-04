import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import { NotFoundError } from "../errors/customErrors.js"

// get all users
export const getAllUsers = async (req, res) => {
    const users = await User.find({}).select('-password')
    res.status(StatusCodes.OK).json({users})
}

// get single User
export const getSingleUser = async(req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    res.status(StatusCodes.OK).json(user)
}

// get all admin users
// export const getAllAdminUsers = async(req, res) => {
//     const admins = await User.find({isAdmin: true})
//     res.status(StatusCodes.OK).json(admins)
// }

//get user count
export const getUserCount = async (req, res) => {
  const userCount = await User.countDocuments();
  console.log(userCount);
  res.status(StatusCodes.OK).json({ userCount: userCount });
};

// delete user
export const deleteUser = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    throw new NotFoundError("user not found");
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "user deleted", deletedUser: deletedUser });
};