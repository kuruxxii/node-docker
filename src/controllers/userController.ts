import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import bcrypt from "bcryptjs";

declare module "express-session" {
  export interface SessionData {
    user: { id: string; username: string };
  }
}

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const hashpassword: string = await bcrypt.hash(password, 12);
    const newUser = await UserModel.create({
      username,
      password: hashpassword,
    });
    req.session.user = {
      id: newUser._id.toString(),
      username: newUser.username,
    };
    return res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "user not found",
      });
    }
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (passwordIsCorrect) {
      req.session.user = { id: user._id.toString(), username: user.username };
      return res.status(200).json({ status: "success" });
    } else {
      return res
        .status(400)
        .json({ status: "fail", message: "incorrect password" });
    }
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: "Could not log out, please try again",
      });
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    return res
      .status(200)
      .json({ status: "success", message: "Logged out successfully" });
  });
};
