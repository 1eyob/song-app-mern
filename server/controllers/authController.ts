import { userSchema } from "../utils/validator";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { Login, Register } from "../services/auth";
const User = require("../models/User");

//register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let password = req.body.password;

    const validated = await userSchema.validateAsync(req.body);

    const _user = await User.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    if (_user) {
      return res.status(400).json({
        success: false,
        message: "user account already exists",
      });
    }
    //encrypting user's password
    password = bcrypt.hashSync(password, 8);

    validated.password = password;

    const user = await Register(validated);

    res.status(200).json({
      success: true,
      message: "user created successfully",
      data: { user },
    });
  } catch (error: any) {
    return res.json({ error: error?.message });
  }
};

//login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "try login again! user account not found",
      });
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      return res.status(200).json({
        error: true,
        message: "Email or password not valid",
      });
    }

    const userData = await Login(user);

    //response
    return res.status(200).json({
      success: true,
      message: "user logged in successfully",
      data: { userData },
    });
  } catch (error: any) {
    return res.json({ error: error?.message });
  }
};
