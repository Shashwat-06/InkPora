import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import pageRoutes from "./routes/page.route.js";
import authRoutes from "./routes/auth.route.js";
import { connectDb } from "./DB/connectDB.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT || 8080, () => {
  connectDb();
  console.log(`server listening to port ${process.env.PORT || 8080}`);
});

app.use("/api", pageRoutes);
app.use("/api/auth", authRoutes);
