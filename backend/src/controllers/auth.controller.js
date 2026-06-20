import { sendWelcomeEmail } from "../emails/emailHandlers.js"
import generateToken from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import "dotenv/config"
import coudinary from "../lib/cloudinary.js"

export const singUp = async (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email" })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }


        const user = await User.findOne({ email: email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            fullName,
            email,
            password: hashPassword
        })

        if (newUser) {
            const savedUser = await newUser.save()
            generateToken(savedUser._id, savedUser.fullName, res)   //this fuction is genereting a token 

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
                message: "User created"
            })


            try {
                // await sendWelcomeEmail(savedUser.email, savedUser.fullName, process.env.CLIENT_URL)
                await sendWelcomeEmail("dk6614235890@gmail.com", savedUser.fullName, process.env.CLIENT_URL)
            } catch (error) {
                console.log("Error in sending email", error)
            }


        } else {
            res.status(400).json({ message: "User not created" })
        }



    } catch (error) {
        console.log("Error in singUp controller", error)
        res.status(500).json({ message: error.message })
    }
}


export const Login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" })
        }

        generateToken(user._id, user.fullName, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            message: "User logged in"
        })

    } catch (error) {
        console.log("Error in Login controller", error)
        return res.status(500).json({ message: error.message })
    }
}


export const Logout = async (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 })
        res.status(200).json({ message: "User logged out" })
    } catch (error) {
        console.log("Error in Logout controller", error)
        res.status(500).json({ message: error.message })
    }
}


export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" })
        }

        console.log(profilePic)

        const userId = req.user;

        coudinary.uploader.upload(profilePic)

        const updatedUser = await User.findByIdAndUpdate(userId, {
            profilePic: uploadResponse.secure_url,
        }, {
            new: true
        })

        return res.status(200).json({
            updatedUser
        })

    } catch (error) {
        console.log("Error in updateProfile controller", error)
        res.status(500).json({ message: error.message })
    }
}