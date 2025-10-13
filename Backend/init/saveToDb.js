import mongoose from "mongoose";

import { Product } from "../models/product.js";
import { products } from "./data.js";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/inkpora");
}

const newData = async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("data was initialized");
};

newData();
