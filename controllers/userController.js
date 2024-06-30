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
export const getAllAdminUsers = async(req, res) => {
    const admins = await User.find({isAdmin: true})
    res.status(StatusCodes.OK).json(admins)
}