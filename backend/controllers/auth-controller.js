import { User } from "../model/user.js"
import bcrypt from "bcrypt"
import { generateVerificationToken } from "../utils/generateVerificationToken.js"
import { generateJWTToken } from "../utils/generateJWTToken.js"

export const signup = async (req, res) => {
    const {name , email, password} = req.body
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message : "All fields are requried"})
        }
        const userAlreadyExists = await User.findOne({ email })
        if (userAlreadyExists) {
            return res.status(400).json({ message : "User Already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationToken = generateVerificationToken()
        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken: verificationToken,
            verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
            })

            await user.save()

            generateJWTToken(res, user._id)

            res.status(201).json({ 
                success: true,
                message: "User create succesfully" ,
                user: {
                    ...user._doc,
                    password: undefined
                }
            })
    } catch (error) {
        res.status(400).json({ success: false, massage: error.massage })
    }
}

export const login = (req, res) => {
    res.send("Login route")
}

export const logout = (req, res) => {
    res.send("Logout route")
}