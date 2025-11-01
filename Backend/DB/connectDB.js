import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("error connecting to DB", err);
  }
};
