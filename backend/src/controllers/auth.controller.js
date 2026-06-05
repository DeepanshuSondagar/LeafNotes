import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

  const generateToken = (userId) => {
            return jwt.sign(
                { userId },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );
            };
        

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email is already in use" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        // create token and set cookie
        const token = generateToken(newUser._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        });
    } catch (error) {
        console.error("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});

        if(!user) {
             return res.status(400).json({message: "Invalid email or password"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid email or password"})
        }

        // generate token, set cookie, and return user
        const token = generateToken(user._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.error("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
 try {
        // clear cookie named 'jwt'
        res.clearCookie("jwt", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        res.status(200).json({ message: "Logged Out" });
 } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
 }
};

export const getProfile = (req, res) => {
  res.json(req.user); 
};