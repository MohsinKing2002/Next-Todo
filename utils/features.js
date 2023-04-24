import mongoose from "mongoose";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const connectDB = async () => {
  const { connection } = await mongoose.connect(process.env.MONGO_URI, {
    dbName: "next_todo_app",
  });
  console.log("Database is connected on host", connection.host);
};

export const setCookies = (res, token, set) => {
  res.setHeader(
    "set-cookie",
    serialize("token", set ? token : "", {
      path: "/",
      httpOnly: true,
      //maximum 1 day alloted ! as cookie expiry
      maxAge: set ? 1000 * 60 * 60 * 24 * 10 : 0,
    })
  );
};

export const genarateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY);
};

export const checkAuth = async (req) => {
  const cookie = req.headers.cookie;
  if (!cookie) return null;

  const token = cookie.split("=")[1];

  const { _id } = await jwt.verify(token, process.env.SECRET_KEY);
  return await User.findById(_id);
};
