import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/inkpora");
    console.log("MongoDB connected");
  } catch (err) {
    console.log("error connecting to DB", err);
  }
};
