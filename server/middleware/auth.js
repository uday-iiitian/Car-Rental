import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "not authorized" });
  }

  try {
    // Verify token properly
    const decoded = jwt.verify(token, "secret@2025");

    if (!decoded.userId) {
      return res.status(401).json({ success: false, message: "not authorized" });
    }

    // Attach user
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      return res.status(401).json({ success: false, message: "not authorized" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "not authorized" });
  }
};
