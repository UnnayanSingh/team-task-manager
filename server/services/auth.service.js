import User from "../models/User.model.js";
import { hashPassword } from "../utils/hashPassword.js";

// 🔹 Create user
export const createUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

// 🔹 Find user by email
export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};