import User from "../models/User.js"

export const register = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        console.log(user);
        res.status(201).send({user})
    } catch (error) {
        res.status(400).send(error)
    }
}