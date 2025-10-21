import { Product } from "../models/product.js";

export const productData = async (req, res) => {
  const data = await Product.find({});
  console.log(data);
  res.send(data);
};

export const individualProduct = async (req, res) => {
  const { id } = req.params;
  const data = await Product.findById(id);
  res.send(data);
};
