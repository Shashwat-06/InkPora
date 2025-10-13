import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
  },
  price: {
    type: Number,
  },
});

export const Product = mongoose.model("Product", productSchema);
