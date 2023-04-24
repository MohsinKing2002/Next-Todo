import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    requried: [true, "Name is required !"],
  },
  email: {
    type: String,
    requried: [true, "Email is required !"],
    unique: true,
  },
  password: {
    type: String,
    requried: [true, "Password is required !"],
    select: false,
  },
});

mongoose.models = {};

export const User = mongoose.model("User", schema);
