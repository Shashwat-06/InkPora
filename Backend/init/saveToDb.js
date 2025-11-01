import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "../models/product.js";
import { products } from "./data.js";

dotenv.config({ path: "../.env" });

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(`${process.env.MONGO_URL}`);
}

const newData = async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("data was initialized");
};

newData();
