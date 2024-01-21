import bcrypt from "bcrypt";
import {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
} from "../services/userServices.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import env from "../config/environment.js";
export const creatingUser = async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName, phone } = req.body;
    const emailExists = await getUserByEmail(email);
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const userNameExists = await getUserByUsername(username);
    if (userNameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
    });
    await createUser(user);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    if (error instanceof Error && error.name == "ValidationError") {
      next(res.status(400).json({ message: error.message }));
    } else {
      next(error);
    }
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return next(res.status(400).json({ message: "Invalid email or password" }));
      }
      const loginToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        env.jwtSecret,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({
        token: loginToken,
        user,
      });
    } else {
      return res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
