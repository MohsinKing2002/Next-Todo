import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is requried !"],
  },
  description: {
    type: String,
    required: [true, "Description is required !"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

mongoose.models = {};

export const Task = mongoose.model("Task", schema);
