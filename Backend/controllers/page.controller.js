import { Product } from "../models/product.js";
import { User } from "../models/user.js";

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

export const searchData = async (req, res) => {
  const searchParam = req.params.searchParam;
  const data = await Product.find({
    $or: [
      { title: { $regex: searchParam, $options: "i" } },
      { category: { $regex: searchParam, $options: "i" } },
      { description: { $regex: searchParam, $options: "i" } },
      { detail: { $regex: searchParam, $options: "i" } },
    ],
  });
  if (!data) {
    res
      .status(400)
      .json({ success: false, message: "no such product in inventory" });
  }
  console.log(data);
  res.send(data);
};
