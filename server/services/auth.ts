import { signAccessToken } from "../utils/jwt";

const User = require("../models/User");

interface userData {
  name: string;
  phone: string;
  email: string;
  address: string;
  password: string;
}

export const Register = async (userInfo: userData) => {
  try {
    //create user into the database
    const user = await User(userInfo).save();

    //sign jwt token with the user Id
    const accessToken = await signAccessToken(user._id);
    //response
    const data = {} as any;
    data.user = user;
    data.accessToken = accessToken;

    return data;
  } catch (error) {
    throw error;
  }
};

export const Login = async (user: any) => {
  try {
    //sign jwt token with the user Id
    const accessToken = await signAccessToken(user?._id);
    //wrapping up user data and token to a single object
    const data = {} as any;
    data.user = user;
    data.accessToken = accessToken;

    return data;
  } catch (error) {
    throw error;
  }
};
