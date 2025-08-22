import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ userId }, 'secret@2025', { expiresIn: "7d" });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate fields
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Fill all the fields" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters long" });
    }

    // 2. Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    const user = await User.create({ name, email, password: hashedPassword });

    // 5. Generate JWT
    const token = generateToken(user._id.toString());

    // 6. Send response
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate fields
    if (!email || !password) {
      return res.json({ success: false, message: "Fill all the fields" });
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // 4. Generate token
    const token = generateToken(user._id.toString());

    // 5. Send response
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getUserData = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    res.json({ success: true, user: req.user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
