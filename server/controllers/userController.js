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
    const { username, email, password } = req.body;
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
    });
    await createUser(user);
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

    res.status(201).json({
      token: loginToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
    //
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return next(
          res.status(400).json({ message: "Invalid email or password" })
        );
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
        user: {
          id: user._id,
          ...user._doc,
        },
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

export const updateUser = async (req, res, next) => {
  try {
    const { newUserData, userid } = req.body;
    const user = await getUserById(userid);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const email = newUserData.email;
    const emailExists = await getUserByEmail(email);
    if (emailExists && email !== user.email) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const username = newUserData.username;
    const userNameExists = await getUserByUsername(username);
    if (userNameExists && username !== user.username) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (user) {
      const updatedUser = await User.findByIdAndUpdate(
        userid,
        {
          $set: newUserData,
        },
        { new: true }
      );
      return res.status(200).json({
        user: updatedUser,
      });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const updateFoodPreferences = async (req, res, next) => {
  try {
    const { newFoodPreferences, userid } = req.body;
    console.log(newFoodPreferences, userid);
    const user = await getUserById(userid);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user) {
      const updatedUser = await User.findByIdAndUpdate(
        userid,
        {
          $set: { foodPreferences: newFoodPreferences },
        },
        { new: true }
      );
      return res.status(200).json({
        user: updatedUser,
      });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
