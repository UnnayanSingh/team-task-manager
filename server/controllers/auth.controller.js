import { createUser, findUserByEmail } from "../services/auth.service.js";
import { generateToken } from "../utils/generateToken.js";
import { comparePassword } from "../utils/hashPassword.js";

// 🔹 Signup
export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await createUser({ name, email, password });

    const { password: _, ...userData } = user._doc;

    const token = generateToken(user._id);

    res.json({
      message: "User created",
      user: userData,
      token, // 🔥 important
    });
  } catch (error) {
    next(error);
  }
};

// 🔹 Login
export const login = async (req, res, next) => {
  try {
    const user = await findUserByEmail(req.body.email);

    if (!user) throw new Error("Invalid credentials");

    const isMatch = await comparePassword(
      req.body.password,
      user.password
    );

    if (!isMatch) throw new Error("Invalid credentials");

    const token = generateToken(user._id);

    res.json({ token });
  } catch (error) {
    next(error);
  }
};