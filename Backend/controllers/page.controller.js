import { Product } from "../models/product.js";

export const productData = async (req, res) => {
  const data = await Product.find({});
  console.log(data);
  res.send(data);
};
