import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import bcrypt from 'bcryptjs'
import { hashPassword } from "../utils/passwordUtils.js"
import { UnauthenticatedError } from "../errors/customErrors.js"

export const register = async (req, res) => {
    // const {name, email, password} = req.body
    //     const user = await User.create(req.body);
    //     await user.save()
    //     console.log(user);
    //     res.status(201).json({user})
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await hashPassword(req.body.password)
        req.body.password = hashedPassword

        const user = await User.create(req.body)
        res.status(StatusCodes.CREATED).json({msg: "user created"})
}