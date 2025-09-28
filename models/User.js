import { model, Schema } from "mongoose";

const progressSchema = new Schema({
  level: {
    type: Number,
    default: 1,
  },
  score: {
    type: Number,
    default: 0,
  },
  stars: {
    type: Number,
    default: 0,
  },
  completedAt: {
    type: Date,
    default: null,
  },
});

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    progress: { type: progressSchema, default: () => ({}) },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
