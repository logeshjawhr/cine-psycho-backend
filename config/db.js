import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB Successfully");
  } catch (error) {
    console.log("Error while connecting to DB", error);
    process.exit(1);
  }
};
