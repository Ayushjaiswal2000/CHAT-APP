import { generateToken } from "../lib/utils.js";
import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const slat = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, slat);

    const newUser = new User({ email, password: hashedPassword, fullName });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(500).json({ message: "Failed to create user" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const login = (req, res) => {
  res.send("login");
};
export const logout = (req, res) => {
  res.send("logout");
};
