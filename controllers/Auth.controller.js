import { User } from "../models/User.Schema.js";
import bcrypt from "bcryptjs";
import {generateCookie} from "../lib/generatecookies.js"

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password ) {
      return res
        .status(400)
        .json({ message: "all fields are required", success: false });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const passok = await bcrypt.compare(password, user.password);

    if (!passok) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    const token = generateCookie(res, user._id);
    res.json({ message: "Login successful", token, user, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "all fields are required", success: false });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateCookie(res, newUser._id);

    res.json({
      message: "Registration successful",
      token,
      newUser,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logout successful", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getprofile=async(req,res)=>{
  try {
    const userId=req.user
    console.log(userId);
    
  } catch (error) {
    res.status(500).json({message:"failed to fetch profile ",success :false})
  }
}
