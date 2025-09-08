import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"




// Register User :/api/user/register

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // check for fields are present or not
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }
        // check for existing User in schema
        const existingUser = await User.findOne({ email })
        // user Exists
        if (existingUser)
            return res.json({ Message: "user Already Exist" })
        // creting hash password using encryption
        const hashedPassword = await bcrypt.hash(password, 8)
        // creating user
        const user = await User.create({ name, email, password: hashedPassword })
        // creating a token for user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.cookie('token', token, {
            httpOnly: true, //Prevent js to access cookie
            secure: process.env.NODE_ENV === 'production', //Use secure Cokkies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF Protection
            maxAge: 7 * 24 * 60 * 60 * 1000 //cokkie expiration time
        })

        // user created successfully
        return res.json({ success: true, user: { email: user.email, name: user.name } })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Login User : /api/user/login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.json({ message: "enter valid email or password" })
        }

        const user = await User.findOne({ email })
        if (!user)
            return res.json({ success: false, message: "Email or Password Invalid" })


        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return res.json({ success: false, message: "Email or Password Invalid" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })


        return res.json({ success: true, user: { email: user.email, name: user.name } })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// check for authentic user : /api/user/is-auth

export const isAuth = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        return res.json({ success: true, user });

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


// Logout User : /api/user/logout

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.json({ success: true, message: "Logged Out" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }

}